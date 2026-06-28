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