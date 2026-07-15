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
import { solicitarAdocao } from "../../services/adocaoService";
import {
  getToken,
  getUsuarioLogado,
  removerUsuarioLogado,
} from "../../services/authStorage";
import "./AnimalModal.css";

// Modal de detalhes de um animal. Ao clicar em "Quero adotar", abre um
// segundo modal por cima buscando o contato (email/telefone) de quem cadastrou
// e permitindo enviar uma solicitação formal de adoção (POST /api/adocoes).
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
  const [sessaoExpirada, setSessaoExpirada] = useState(false);
  const [contato, setContato] = useState<ContatoDono | null>(null);
  const [carregandoContato, setCarregandoContato] = useState(false);
  const [erroContato, setErroContato] = useState("");
  const [imagemExpandida, setImagemExpandida] = useState(false);

  const [solicitandoAdocao, setSolicitandoAdocao] = useState(false);
  const [adocaoEnviada, setAdocaoEnviada] = useState(false);
  const [erroAdocao, setErroAdocao] = useState("");

  useEffect(() => {
    setImgError(false);
    setMostrarContato(false);
    setPrecisaLogin(false);
    setSessaoExpirada(false);
    setContato(null);
    setErroContato("");
    setImagemExpandida(false);
    setSolicitandoAdocao(false);
    setAdocaoEnviada(false);
    setErroAdocao("");
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
  const usuarioLogado = getUsuarioLogado();
  const podeSolicitarAdocao =
    !!usuarioLogado &&
    usuarioLogado.id !== animal.usuarioId &&
    animal.status === "DISPONIVEL";

  async function handleQueroAdotar() {
    setMostrarContato(true);

    // Além de existir um usuário salvo, precisa existir um token válido —
    // sessões salvas antes do login com JWT (ou expiradas, o token dura só
    // 1h) têm o usuário salvo mas nenhum token, e toda chamada autenticada
    // falharia silenciosamente se não checássemos isso aqui.
    if (!getUsuarioLogado() || !getToken()) {
      setSessaoExpirada(false);
      setPrecisaLogin(true);
      return;
    }

    setPrecisaLogin(false);
    setSessaoExpirada(false);

    if (contato || !animal?.usuarioId) {
      return;
    }

    try {
      setCarregandoContato(true);
      setErroContato("");

      // A busca do usuário não é "abafada": se o token expirou no meio da
      // sessão (dura só 1h) o servidor recusa, e isso é tratado como sessão
      // expirada em vez de cair na mensagem genérica de "tutor não
      // cadastrou contato". Já a busca da pessoa pode legitimamente não
      // existir (tutor não cadastrou telefone ainda), então essa sim segue
      // com fallback silencioso.
      const usuario = await buscarUsuarioPorId(animal.usuarioId);
      const pessoa = await buscarPessoaPorUsuarioId(animal.usuarioId).catch(
        () => null
      );

      setContato({
        nome: usuario?.nome ?? animal.usuarioNome ?? "Tutor do animal",
        email: usuario?.email,
        telefone: pessoa?.telefone,
      });
    } catch {
      removerUsuarioLogado();
      setSessaoExpirada(true);
      setPrecisaLogin(true);
    } finally {
      setCarregandoContato(false);
    }
  }

  async function handleSolicitarAdocao() {
    const usuarioLogado = getUsuarioLogado();

    if (!usuarioLogado || !getToken() || !animal) {
      setSessaoExpirada(false);
      setPrecisaLogin(true);
      return;
    }

    try {
      setSolicitandoAdocao(true);
      setErroAdocao("");

      await solicitarAdocao({
        usuarioId: usuarioLogado.id,
        animalId: animal.id,
      });

      setAdocaoEnviada(true);
    } catch (error) {
      // O backend recusa com uma mensagem de negócio (ex.: "animal não está
      // disponível") quando já existe uma solicitação em andamento — essa
      // mensagem já é amigável o bastante para mostrar direto ao usuário.
      setErroAdocao(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a solicitação de adoção."
      );
    } finally {
      setSolicitandoAdocao(false);
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
                {precisaLogin
                  ? sessaoExpirada
                    ? "Sessão expirada"
                    : "Faça login para adotar"
                  : "Contato para adoção"}
              </h3>

              {precisaLogin ? (
                <>
                  <p className="animal-modal__contato-intro">
                    {sessaoExpirada
                      ? "Sua sessão expirou. Faça login novamente para ver os dados de contato de "
                      : "Você precisa estar logado para ver os dados de contato de quem cadastrou "}
                    <strong>{animal.nome}</strong>.
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

                      {podeSolicitarAdocao && !adocaoEnviada && (
                        <>
                          <button
                            type="button"
                            className="animal-modal__contato-solicitar"
                            onClick={handleSolicitarAdocao}
                            disabled={solicitandoAdocao}
                          >
                            {solicitandoAdocao
                              ? "Enviando solicitação..."
                              : "Confirmar solicitação de adoção"}
                          </button>

                          {erroAdocao && (
                            <p className="animal-modal__contato-status animal-modal__contato-status--erro">
                              {erroAdocao}
                            </p>
                          )}
                        </>
                      )}

                      {adocaoEnviada && (
                        <p className="animal-modal__contato-status animal-modal__contato-status--sucesso">
                          Solicitação enviada! Acompanhe o andamento em "Minha
                          conta" → "Solicitações de adoção".
                        </p>
                      )}

                      {!!usuarioLogado &&
                        usuarioLogado.id === animal.usuarioId && (
                          <p className="animal-modal__contato-status">
                            Você é quem cadastrou esse animal.
                          </p>
                        )}

                      {!!usuarioLogado &&
                        usuarioLogado.id !== animal.usuarioId &&
                        animal.status !== "DISPONIVEL" &&
                        !adocaoEnviada && (
                          <p className="animal-modal__contato-status">
                            Este animal já está{" "}
                            {formatAnimalStatus(animal.status).toLowerCase()}{" "}
                            e não aceita novas solicitações no momento.
                          </p>
                        )}
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
