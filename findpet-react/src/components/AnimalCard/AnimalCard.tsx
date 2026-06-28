import { useState } from "react";
import type { AnimalResponse } from "../../types/animal";
import {
  formatAnimalStatus,
  getAnimalImageUrl,
} from "../../utils/animalFormat";
import "./AnimalCard.css";

interface AnimalCardProps {
  animal: AnimalResponse;
  onSelect: (animal: AnimalResponse) => void;
}

function AnimalCard({ animal, onSelect }: AnimalCardProps) {
  const [imgError, setImgError] = useState<boolean>(false);

  const imageUrl = getAnimalImageUrl(animal.fotoURL);

  return (
    <article className="animal-card">
      <button
        type="button"
        className="animal-card__button"
        onClick={() => onSelect(animal)}
        aria-label={`Ver detalhes de ${animal.nome}`}
      >
        <div className="animal-card__media">
          {imgError || !imageUrl ? (
            <span className="animal-card__placeholder" aria-hidden="true">
              {animal.nome.charAt(0)}
            </span>
          ) : (
            <img
              className="animal-card__image"
              src={imageUrl}
              alt={`Foto de ${animal.nome}`}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}

          <span className="animal-card__status">
            {formatAnimalStatus(animal.status)}
          </span>
        </div>

        <div className="animal-card__body">
          <div className="animal-card__heading">
            <h3 className="animal-card__name">{animal.nome}</h3>

            <span className="animal-card__species">
              {animal.especieNome}
            </span>
          </div>

          <p className="animal-card__breed">{animal.racaNome}</p>

          <div className="animal-card__details">
            <span>{animal.idade}</span>
            <span>{animal.porte}</span>
            <span>{animal.sexo}</span>
          </div>

          <span className="animal-card__cta">Ver detalhes →</span>
        </div>
      </button>
    </article>
  );
}

export default AnimalCard;