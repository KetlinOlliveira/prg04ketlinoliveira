import { useMemo, useState } from "react";
import { categories, pets } from "../../data/pets";
import type { CategoryFilter, Pet } from "../../types/pet";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import PetGrid from "../PetGrid/PetGrid";
import PetModal from "../PetModal/PetModal";
import "./AdoptionSection.css";

function AdoptionSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("todos");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // Filtra os pets pela categoria escolhida.
  // No futuro, troque este useMemo por getPetsByCategory() de petService
  // (com useEffect/estado) para buscar os dados da API REST.
  const filteredPets = useMemo(() => {
    if (selectedCategory === "todos") return pets;
    return pets.filter((pet) => pet.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="adoption-section" id="adotar">
      <div className="adoption-section__inner">
        <header className="adoption-section__intro">
          <span className="adoption-section__eyebrow">
            <span className="adoption-section__eyebrow-dot" aria-hidden="true" />
            Encontre seu novo amigo
          </span>
          <h2 className="adoption-section__title">
            Pets esperando por um <em>lar</em>
          </h2>
          <p className="adoption-section__subtitle">
            Escolha uma categoria e conheça os bichinhos prontos para receber
            todo o seu carinho.
          </p>
        </header>

        <CategoryCarousel
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <PetGrid pets={filteredPets} onSelectPet={setSelectedPet} />
      </div>

      <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
    </section>
  );
}

export default AdoptionSection;
