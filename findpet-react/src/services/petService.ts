import { pets as mockPets } from "../data/pets";
import type { CategoryFilter, Pet } from "../types/pet";

// Camada de acesso a dados.
// Hoje retorna os dados mockados, mas a assinatura já é assíncrona
// para que no futuro baste trocar o corpo por um fetch à API REST,
// sem alterar os componentes que consomem estas funções.
//
// Exemplo futuro:
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/pets`);
//   return (await res.json()) as Pet[];

export async function getPets(): Promise<Pet[]> {
  return Promise.resolve(mockPets);
}

export async function getPetsByCategory(
  category: CategoryFilter
): Promise<Pet[]> {
  const all = await getPets();
  if (category === "todos") return all;
  return all.filter((pet) => pet.category === category);
}
