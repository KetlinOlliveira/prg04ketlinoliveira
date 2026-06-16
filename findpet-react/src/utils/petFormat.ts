import type { PetCategory } from "../types/pet";

// Rótulos amigáveis (singular) para exibir a categoria de um pet.
export const categoryLabels: Record<PetCategory, string> = {
  caes: "Cão",
  gatos: "Gato",
  roedores: "Roedor",
  aves: "Ave",
};

// Formata a distância em km usando vírgula como separador decimal (pt-BR).
// Ex.: 2.5 -> "2,5 km"
export function formatDistance(distance: number): string {
  return `${distance.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} km`;
}
