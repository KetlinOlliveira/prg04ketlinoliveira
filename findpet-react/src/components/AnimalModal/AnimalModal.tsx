import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { AnimalResponse } from "../../types/animal";
import {
  formatAnimalIdade,
  formatAnimalStatus,
  getAnimalImageUrl,
} from "../../utils/animalFormat";
import { buscarPessoaPorUsuarioId } from "../../services/pessoaService";
import { buscarUsuarioPorId } from "../../services/usuarioService";
import { getUsuarioLogado } from "../../services/authStorage";
import "./AnimalModal.css";

// Modal de detalhes de um animal. Ao clicar em "Quero adotar", abre um
// segundo modal por cima buscando o contato (email/telefone) de quem cadastrou.
interface AnimalModalProps {
  animal: AnimalResponse | null;
  onClose: () => void;
}

interface ContatoDono {
  nome: string;
  email?: string;
  telefone?: string;
}

function AnimalModal({ animal, onClose }: AnimalModalProps) {
  const [imgError, setImgError] = useState<boolean>(false);

  const [mostrarContato, setMostrarContato] = useState(false);
  const [precisaLogin, setPrecisaLogin] = useState(false);
  const [contato, setContato] = useState<ContatoDono | null>(null);
  const [carregandoContato, setCarregandoContato] = useState(false);
  const [erroContato, setErroContato] = useState("");
  const [imagemExpandida, setImagemExpandida] = useState(false);

  useEffect(() => {
    setImgError(false);
    setMostrarContato(false);
    setPrecisaLogin(false);
    setContato(null);
    setErroContato("");
    setImagemExpandida(false);
  }, [animal]);

  useEffect(() => {
    if (!animal) {
      return;
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (imagemExpandida) {
          setImagemExpandida(false);
          return;
        }
        if (mostrarContato) {
          setMostrarContato(false);
          return;
        }
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [animal, onClose, mostrarContato, imagemExpandida]);

  if (!animal) {
    return null;
  }

  const imageUrl = getAnimalImageUrl(animal.fotoUrl);

  async function handleQueroAdotar() {
    setMostrarContato(true);

    if (!getUsuarioLogado()) {
      setPrecisaLogin(true);
      return;
    }

    setPrecisaLogin(false);

    if (contato || !animal?.usuarioId) {
      return;
    }

    try {
      setCarregandoContato(true);
      setErroContato("");

      const [usuario, pessoa] = await Promise.all([
        buscarUsuarioPorId(animal.usuarioId).catch(() => null),
        buscarPessoaPorUsuarioId(animal.usuarioId).catch(() => null),
      ]);

      setContato({
        nome: usuario?.nome ?? animal.usuarioNome ?? "Tutor do animal",
        email: usuario?.email,
        telefone: pessoa?.telefone,
      });
    } catch {
      setErroContato("Não foi possível carregar os dados de contato.");
    } finally {
      setCarregandoContato(false);
    }
  }

  return (
    <>
    <div
      className="animal-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="animal-modal-title"
    >
      <div className="animal-modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="animal-modal__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="animal-modal__media">
          {imgError || !imageUrl ? (
            <span className="animal-modal__placeholder" aria-hidden="true">
              {animal.nome.charAt(0)}
            </span>
          ) : (
            <button
              type="button"
              className="animal-modal__media-button"
              onClick={() => setImagemExpandida(true)}
              aria-label={`Ver foto de ${animal.nome} em tamanho maior`}
            >
              <img
                className="animal-modal__image"
                src={imageUrl}
                alt={`Foto de ${animal.nome}`}
                onError={() => setImgError(true)}
              />
              <span className="animal-modal__zoom-hint" aria-hidden="true">
                🔍
              </span>
            </button>
          )}
        </div>

        <div className="animal-modal__content">
          <div className="animal-modal__header">
            <div>
              <h2 className="animal-modal__name" id="animal-modal-title">
                {animal.nome}
              </h2>

              <p className="animal-modal__breed">
                {animal.especieNome} · {animal.racaNome}
              </p>
            </div>

            <span className="animal-modal__status">
              {formatAnimalStatus(animal.status)}
            </span>
          </div>

          <ul className="animal-modal__facts">
            <li className="animal-modal__fact">
              <span className="animal-modal__fact-label">Idade</span>
              <span className="animal-modal__fact-value">
                {formatAnimalIdade(animal.idade)}
              </span>
            </li>

            <li className="animal-modal__fact">
              <span className="animal-modal__fact-label">Porte</span>
              <span className="animal-modal__fact-value">{animal.porte}</span>
            </li>

            <li className="animal-modal__fact">
              <span className="animal-modal__fact-label">Sexo</span>
              <span className="animal-modal__fact-value">{animal.sexo}</span>
            </li>
          </ul>

          <p className="animal-modal__description">{animal.descricao}</p>

          {animal.usuarioNome && (
            <p className="animal-modal__owner">
              Cadastrado por: <strong>{animal.usuarioNome}</strong>
            </p>
          )}

          <div className="animal-modal__actions">
            <button
              type="button"
              className="animal-modal__adopt"
              onClick={handleQueroAdotar}
            >
              Quero adotar
            </button>
          </div>
        </div>

        {mostrarContato && (
          <div
            className="animal-modal__contato-overlay"
            onClick={() => setMostrarContato(false)}
          >
            <div
              className="animal-modal__contato"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="animal-modal-contato-title"
            >
              <button
                type="button"
                className="animal-modal__contato-close"
                onClick={() => setMostrarContato(false)}
                aria-label="Fechar"
              >
                ×
              </button>

              <h3 id="animal-modal-contato-title">
                {precisaLogin ? "Faça login para adotar" : "Contato para adoção"}
              </h3>

              {precisaLogin ? (
                <>
                  <p className="animal-modal__contato-intro">
                    Você precisa estar logado para ver os dados de contato de
                    quem cadastrou <strong>{animal.nome}</strong>.
                  </p>

                  <Link to="/login" className="animal-modal__contato-login">
                    Fazer login
                  </Link>
                </>
              ) : (
                <>
                  {carregandoContato && (
                    <p className="animal-modal__contato-status">
                      Carregando dados de contato...
                    </p>
                  )}

                  {erroContato && (
                    <p className="animal-modal__contato-status animal-modal__contato-status--erro">
                      {erroContato}
                    </p>
                  )}

                  {contato && !carregandoContato && (
                    <>
                      <p className="animal-modal__contato-intro">
                        Fale com <strong>{contato.nome}</strong> para combinar
                        a adoção de <strong>{animal.nome}</strong>:
                      </p>

                      <ul className="animal-modal__contato-lista">
                        {contato.email && (
                          <li>
                            <span aria-hidden="true">📧</span> {contato.email}
                          </li>
                        )}

                        {contato.telefone && (
                          <li>
                            <span aria-hidden="true">📱</span>{" "}
                            {contato.telefone}
                          </li>
                        )}

                        {!contato.email && !contato.telefone && (
                          <li>
                            Esse tutor ainda não cadastrou um contato. Tente
                            pelo formulário de contato do FindPet.
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {imagemExpandida && imageUrl && (
      <div
        className="animal-modal__lightbox"
        onClick={() => setImagemExpandida(false)}
        role="dialog"
        aria-modal="true"
        aria-label={`Foto de ${animal.nome} em tamanho maior`}
      >
        <button
          type="button"
          className="animal-modal__lightbox-close"
          onClick={() => setImagemExpandida(false)}
          aria-label="Fechar"
        >
          ×
        </button>

        <img
          className="animal-modal__lightbox-image"
          src={imageUrl}
          alt={`Foto de ${animal.nome} em tamanho maior`}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    )}
    </>
  );
}

export default AnimalModal;
