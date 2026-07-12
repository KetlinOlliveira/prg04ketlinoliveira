import { useState } from "react";
import type { AnimalResponse } from "../../types/animal";
import { getAnimalImageUrl, getSexoIcon } from "../../utils/animalFormat";
import "./AnimalCard.css";

// Card individual do feed: foto do animal, nome, sexo e localização do
// tutor. Ao clicar, abre o AnimalModal com os detalhes completos.
interface AnimalCardProps {
  animal: AnimalResponse;
  onSelect: (animal: AnimalResponse) => void;
  localizacao?: string;
}

function AnimalCard({ animal, onSelect, localizacao }: AnimalCardProps) {
  const [imgError, setImgError] = useState<boolean>(false);

  const imageUrl = getAnimalImageUrl(animal.fotoUrl);
  const sexoIcon = getSexoIcon(animal.sexo);

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
        </div>

        <div className="animal-card__body">
          <div className="animal-card__heading">
            <h3 className="animal-card__name">{animal.nome}</h3>

            {sexoIcon && (
              <span
                className="animal-card__sexo"
                aria-label={animal.sexo}
                title={animal.sexo}
              >
                {sexoIcon}
              </span>
            )}
          </div>

          <p className="animal-card__location">
            {localizacao ?? `${animal.especieNome} · ${animal.racaNome}`}
          </p>
        </div>
      </button>
    </article>
  );
}

export default AnimalCard;
