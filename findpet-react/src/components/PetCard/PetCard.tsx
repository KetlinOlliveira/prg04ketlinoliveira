import { useState } from "react";
import type { Pet } from "../../types/pet";
import { categoryLabels, formatDistance } from "../../utils/petFormat";
import "./PetCard.css";

interface PetCardProps {
  pet: Pet;
  onSelect: (pet: Pet) => void;
}

function PetCard({ pet, onSelect }: PetCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="pet-card">
      <button
        type="button"
        className="pet-card__button"
        onClick={() => onSelect(pet)}
        aria-label={`Ver detalhes de ${pet.name}`}
      >
        <div className="pet-card__media">
          {imgError ? (
            <span className="pet-card__placeholder" aria-hidden="true">
              {pet.name.charAt(0)}
            </span>
          ) : (
            <img
              className="pet-card__image"
              src={pet.image}
              alt={`Foto de ${pet.name}, ${pet.breed}`}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
          <span className="pet-card__distance">{formatDistance(pet.distance)}</span>
        </div>

        <div className="pet-card__body">
          <div className="pet-card__heading">
            <h3 className="pet-card__name">{pet.name}</h3>
            <span className="pet-card__category">
              {categoryLabels[pet.category]}
            </span>
          </div>
          <p className="pet-card__breed">{pet.breed}</p>
          <span className="pet-card__cta">Ver detalhes →</span>
        </div>
      </button>
    </article>
  );
}

export default PetCard;
