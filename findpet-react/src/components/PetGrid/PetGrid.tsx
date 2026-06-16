import type { Pet } from "../../types/pet";
import PetCard from "../PetCard/PetCard";
import "./PetGrid.css";

interface PetGridProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
}

function PetGrid({ pets, onSelectPet }: PetGridProps) {
  if (pets.length === 0) {
    return (
      <p className="pet-grid__empty">
        Nenhum pet encontrado nesta categoria por enquanto. 🐾 Volte em breve!
      </p>
    );
  }

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onSelect={onSelectPet} />
      ))}
    </div>
  );
}

export default PetGrid;
