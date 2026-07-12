import { api } from "./api";
import type { PageResponse } from "../types/api";
import type { PessoaRequest, PessoaResponse } from "../types/endereco";

// Lista todas as pessoas cadastradas (não existe filtro por usuário no backend).
export async function listarPessoas(): Promise<PageResponse<PessoaResponse>> {
  return api.get<PageResponse<PessoaResponse>>(
    "/pessoas?page=0&size=100&sort=cpf,asc"
  );
}

// Busca a pessoa vinculada a um usuário, filtrando a lista completa no cliente.
export async function buscarPessoaPorUsuarioId(
  usuarioId: number
): Promise<PessoaResponse | null> {
  const response = await listarPessoas();

  const pessoa = response.content.find(
    (item) => item.usuarioId === usuarioId
  );

  return pessoa ?? null;
}

// Cadastra os dados pessoais (CPF, telefone etc.) de um usuário.
export async function cadastrarPessoa(
  pessoa: PessoaRequest
): Promise<PessoaResponse> {
  return api.post<PessoaResponse>("/pessoas", pessoa);
}

// Atualiza os dados pessoais já cadastrados.
export async function atualizarPessoa(
  id: number,
  pessoa: PessoaRequest
): Promise<PessoaResponse> {
  return api.put<PessoaResponse>(`/pessoas/${id}`, pessoa);
}