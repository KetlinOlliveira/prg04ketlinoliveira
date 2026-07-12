// Formato de página do Spring Data, retornado por todo endpoint de listagem.
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Formato padrão de erro devolvido pelo backend (usado por api.ts para
// montar a mensagem de erro exibida ao usuário).
export interface ApiErrorResponse {
  status: number;
  erro: string;
  mensagem: string;
  path: string;
  campos?: {
    campo: string;
    mensagem: string;
  }[];
}