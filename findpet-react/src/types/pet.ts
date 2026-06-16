// Tipos centrais do domínio de pets do FindPet.
// Mantidos isolados para facilitar a troca dos dados mockados
// por respostas de uma API REST no futuro.

// Categorias permitidas/legalizadas para adoção.
// "todos" é usado apenas como filtro, nunca como categoria de um pet.
export type PetCategory = "caes" | "gatos" | "roedores" | "aves";

export type CategoryFilter = "todos" | PetCategory;

export type PetSex = "Macho" | "Fêmea";

export interface Pet {
  id: string;
  name: string;
  category: PetCategory;
  breed: string;
  /** Distância fictícia em km até o abrigo/tutor. Ex.: 2.5 */
  distance: number;
  /** Idade fictícia já formatada. Ex.: "2 anos", "8 meses" */
  age: string;
  sex: PetSex;
  description: string;
  /** Caminho da imagem. Ex.: "/assets/pets/luna.png" */
  image: string;
}

export interface Category {
  /** Valor usado no filtro do grid */
  id: CategoryFilter;
  label: string;
  /** Caminho do ícone/desenho. Ex.: "/assets/categories/caes.svg" */
  icon: string;
}
