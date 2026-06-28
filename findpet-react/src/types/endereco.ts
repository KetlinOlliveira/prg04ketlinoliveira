export interface CepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood?: string;
  street?: string;
  service?: string;
}

export interface EnderecoRequest {
  cep: string;
  estado: string;
  cidade: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
}

export interface EnderecoResponse {
  id: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
}

export interface PessoaRequest {
  cpf: string;
  telefone?: string;
  dataNascimento?: string | null;
  usuarioId: number;
  enderecoId: number;
}

export interface PessoaResponse {
  id: number;
  cpf: string;
  telefone?: string;
  dataNascimento?: string;

  usuarioId: number;
  usuarioNome?: string;
  usuarioEmail?: string;

  enderecoId: number;
  cep?: string;
  cidade?: string;
  estado?: string;
}