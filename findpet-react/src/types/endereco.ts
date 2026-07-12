// Resposta da busca de CEP (endpoint /ceps/{cep}).
export interface CepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood?: string;
  street?: string;
  service?: string;
}

// Payload enviado para cadastrar/atualizar um endereço.
export interface EnderecoRequest {
  cep: string;
  estado: string;
  cidade: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
}

// Endereço já cadastrado, como devolvido pela API.
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

// Payload enviado para cadastrar/atualizar os dados pessoais do usuário
// (CPF, telefone, nascimento), vinculado a um usuário e a um endereço.
export interface PessoaRequest {
  cpf: string;
  telefone?: string;
  dataNascimento?: string | null;
  usuarioId: number;
  enderecoId: number;
}

// Dados pessoais já cadastrados, com o endereço e o usuário já achatados
// (cidade/estado/nome/email vêm prontos, sem precisar de outra requisição).
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