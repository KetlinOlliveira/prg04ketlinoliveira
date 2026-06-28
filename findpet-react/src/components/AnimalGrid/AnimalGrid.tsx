import type { AnimalResponse } from "../../types/animal";
import AnimalCard from "../AnimalCard/AnimalCard";
import "./AnimalGrid.css";

interface AnimalGridProps {
  animals: AnimalResponse[];
  isLoading: boolean;
  error: string;
  onSelectAnimal: (animal: AnimalResponse) => void;
}

function AnimalGrid({
  animals,
  isLoading,
  error,
  onSelectAnimal,
}: AnimalGridProps) {
  if (isLoading) {
    return <p className="animal-grid__message">Carregando animais...</p>;
  }

  if (error) {
    return <p className="animal-grid__message animal-grid__message--error">{error}</p>;
  }

  if (animals.length === 0) {
    return (
      <p className="animal-grid__message">
        Nenhum animal disponível nesta categoria por enquanto.
      </p>
    );
  }

  return (
    <div className="animal-grid">
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          onSelect={onSelectAnimal}
        />
      ))}
    </div>
  );
}

export default AnimalGrid;