export type AnimalCategorySlug = "todos" | "caes" | "gatos" | "roedores" | "aves";

export type CategoryFilter = AnimalCategorySlug;

export type AnimalStatus =
  | "DISPONIVEL"
  | "EM_PROCESSO"
  | "ADOTADO"
  | "INATIVO"
  | string;

export interface EspecieResponse {
  id: number;
  nome: string;
}

export interface RacaResponse {
  id: number;
  nome: string;
  especieId?: number;
  especieNome?: string;
}

export interface AnimalResponse {
  id: number;
  nome: string;
  idade: string;
  porte: string;
  sexo: string;
  descricao: string;
  status: AnimalStatus;
  fotoURL: string;
  dataCadastro: string;

  usuarioId?: number;
  usuarioNome?: string;

  especieId: number;
  especieNome: string;

  racaId: number;
  racaNome: string;
}

export interface AdocaoResponse {
  id: number;
  dataSolicitacao: string;
  dataConclusao?: string;
  status: string;
  observacao?: string;

  usuarioId: number;
  usuarioNome?: string;

  animalId: number;
  animalNome?: string;
}

export interface CategoryOption {
  id: CategoryFilter;
  label: string;
  icon: string;
}