import { useEffect, useMemo, useState } from "react";
import { animalCategories } from "../../data/animalCategories";
import { listarAnimais } from "../../services/animalService";
import { listarPessoas } from "../../services/pessoaService";
import type { AnimalResponse, CategoryFilter } from "../../types/animal";
import { getCategorySlugByEspecieName } from "../../utils/animalFormat";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import AnimalGrid from "../AnimalGrid/AnimalGrid";
import AnimalModal from "../AnimalModal/AnimalModal";
import "./AdoptionSection.css";

function AdoptionSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("todos");

  const [animaisDisponiveis, setAnimaisDisponiveis] = useState<
    AnimalResponse[]
  >([]);
  const [selectedAnimal, setSelectedAnimal] =
    useState<AnimalResponse | null>(null);
  const [localizacaoPorUsuario, setLocalizacaoPorUsuario] = useState<
    Record<number, string>
  >({});

  const [isLoadingAnimals, setIsLoadingAnimals] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // A API não filtra por espécie no servidor, então buscamos todos os
  // animais disponíveis de uma vez e filtramos por categoria no cliente.
  const animals = useMemo(() => {
    if (selectedCategory === "todos") {
      return animaisDisponiveis;
    }

    return animaisDisponiveis.filter(
      (animal) =>
        getCategorySlugByEspecieName(animal.especieNome) === selectedCategory
    );
  }, [animaisDisponiveis, selectedCategory]);

  useEffect(() => {
    async function carregarLocalizacoes() {
      try {
        const response = await listarPessoas();

        const mapa: Record<number, string> = {};

        response.content.forEach((pessoa) => {
          if (!pessoa.cidade) {
            return;
          }

          mapa[pessoa.usuarioId] = pessoa.estado
            ? `${pessoa.cidade} - ${pessoa.estado}`
            : pessoa.cidade;
        });

        setLocalizacaoPorUsuario(mapa);
      } catch {
        setLocalizacaoPorUsuario({});
      }
    }

    carregarLocalizacoes();
  }, []);

  useEffect(() => {
    async function carregarAnimais() {
      try {
        setIsLoadingAnimals(true);
        setError("");

        const response = await listarAnimais({
          status: "DISPONIVEL",
          size: 100,
        });

        setAnimaisDisponiveis(response.content);
      } catch {
        setError(
          "Não foi possível carregar os animais. Verifique se o backend está rodando e se o endpoint /api/animais já foi criado."
        );
        setAnimaisDisponiveis([]);
      } finally {
        setIsLoadingAnimals(false);
      }
    }

    carregarAnimais();
  }, []);

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
          localizacaoPorUsuario={localizacaoPorUsuario}
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
