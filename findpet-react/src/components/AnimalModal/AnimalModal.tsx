import { useEffect, useState } from "react";
import type { AnimalResponse } from "../../types/animal";
import {
  formatAnimalStatus,
  getAnimalImageUrl,
} from "../../utils/animalFormat";
import "./AnimalModal.css";

interface AnimalModalProps {
  animal: AnimalResponse | null;
  onClose: () => void;
}

function AnimalModal({ animal, onClose }: AnimalModalProps) {
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    setImgError(false);
  }, [animal]);

  useEffect(() => {
    if (!animal) {
      return;
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [animal, onClose]);

  if (!animal) {
    return null;
  }

  const imageUrl = getAnimalImageUrl(animal.fotoURL);

  return (
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
            <img
              className="animal-modal__image"
              src={imageUrl}
              alt={`Foto de ${animal.nome}`}
              onError={() => setImgError(true)}
            />
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
              <span className="animal-modal__fact-value">{animal.idade}</span>
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
            <button type="button" className="animal-modal__adopt">
              Quero adotar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalModal;