import { useEffect, useState } from "react";
import type { Pet } from "../../types/pet";
import { categoryLabels, formatDistance } from "../../utils/petFormat";
import "./PetModal.css";

interface PetModalProps {
  pet: Pet | null;
  onClose: () => void;
}

function PetModal({ pet, onClose }: PetModalProps) {
  const [imgError, setImgError] = useState(false);

  // Reinicia o estado da imagem sempre que troca o pet exibido.
  useEffect(() => {
    setImgError(false);
  }, [pet]);

  // Fecha com a tecla Esc e bloqueia o scroll do fundo enquanto aberto.
  useEffect(() => {
    if (!pet) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [pet, onClose]);

  if (!pet) return null;

  return (
    <div
      className="pet-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-modal-title"
    >
      <div className="pet-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="pet-modal__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="pet-modal__media">
          {imgError ? (
            <span className="pet-modal__placeholder" aria-hidden="true">
              {pet.name.charAt(0)}
            </span>
          ) : (
            <img
              className="pet-modal__image"
              src={pet.image}
              alt={`Foto de ${pet.name}, ${pet.breed}`}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="pet-modal__content">
          <div className="pet-modal__header">
            <div>
              <h2 className="pet-modal__name" id="pet-modal-title">
                {pet.name}
              </h2>
              <p className="pet-modal__breed">
                {categoryLabels[pet.category]} · {pet.breed}
              </p>
            </div>
            <span className="pet-modal__distance">
              {formatDistance(pet.distance)}
            </span>
          </div>

          <ul className="pet-modal__facts">
            <li className="pet-modal__fact">
              <span className="pet-modal__fact-label">Idade</span>
              <span className="pet-modal__fact-value">{pet.age}</span>
            </li>
            <li className="pet-modal__fact">
              <span className="pet-modal__fact-label">Sexo</span>
              <span className="pet-modal__fact-value">{pet.sex}</span>
            </li>
            <li className="pet-modal__fact">
              <span className="pet-modal__fact-label">Categoria</span>
              <span className="pet-modal__fact-value">
                {categoryLabels[pet.category]}
              </span>
            </li>
          </ul>

          <p className="pet-modal__description">{pet.description}</p>

          <div className="pet-modal__actions">
            <button type="button" className="pet-modal__adopt">
              Quero adotar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetModal;
