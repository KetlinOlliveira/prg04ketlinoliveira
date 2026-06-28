import { useEffect, useMemo, useState } from "react";
import { animalCategories } from "../../data/animalCategories";
import { listarAnimais, listarEspecies } from "../../services/animalService";
import type {
  AnimalResponse,
  CategoryFilter,
  EspecieResponse,
} from "../../types/animal";
import { getCategorySlugByEspecieName } from "../../utils/animalFormat";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import AnimalGrid from "../AnimalGrid/AnimalGrid";
import AnimalModal from "../AnimalModal/AnimalModal";
import "./AdoptionSection.css";

function AdoptionSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("todos");

  const [especies, setEspecies] = useState<EspecieResponse[]>([]);
  const [animals, setAnimals] = useState<AnimalResponse[]>([]);
  const [selectedAnimal, setSelectedAnimal] =
    useState<AnimalResponse | null>(null);

  const [isLoadingAnimals, setIsLoadingAnimals] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const selectedEspecieId = useMemo(() => {
    if (selectedCategory === "todos") {
      return undefined;
    }

    const especieEncontrada = especies.find((especie) => {
      const slug = getCategorySlugByEspecieName(especie.nome);
      return slug === selectedCategory;
    });

    return especieEncontrada?.id;
  }, [selectedCategory, especies]);

  useEffect(() => {
    async function carregarEspecies() {
      try {
        const response = await listarEspecies();
        setEspecies(response.content);
      } catch {
        setEspecies([]);
      }
    }

    carregarEspecies();
  }, []);

  useEffect(() => {
    async function carregarAnimais() {
      try {
        setIsLoadingAnimals(true);
        setError("");

        const response = await listarAnimais({
          especieId: selectedEspecieId,
          status: "DISPONIVEL",
        });

        setAnimals(response.content);
      } catch {
        setError(
          "Não foi possível carregar os animais. Verifique se o backend está rodando e se o endpoint /api/animais já foi criado."
        );
        setAnimals([]);
      } finally {
        setIsLoadingAnimals(false);
      }
    }

    carregarAnimais();
  }, [selectedEspecieId]);

  return (
    <section className="adoption-section" id="adotar">
      <div className="adoption-section__inner">
        <header className="adoption-section__intro">
          

          <h2 className="adoption-section__title">
            Mudando vidas, uma pata de cada vez!
          </h2>
        </header>

        <CategoryCarousel
          categories={animalCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <AnimalGrid
          animals={animals}
          isLoading={isLoadingAnimals}
          error={error}
          onSelectAnimal={setSelectedAnimal}
        />
      </div>

      <AnimalModal
        animal={selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
      />
    </section>
  );
}

export default AdoptionSection;