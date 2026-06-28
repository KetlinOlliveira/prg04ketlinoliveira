import { api } from "./api";
import type { PageResponse } from "../types/api";
import type { PessoaRequest, PessoaResponse } from "../types/endereco";

export async function listarPessoas(): Promise<PageResponse<PessoaResponse>> {
  return api.get<PageResponse<PessoaResponse>>(
    "/pessoas?page=0&size=100&sort=cpf,asc"
  );
}

export async function buscarPessoaPorUsuarioId(
  usuarioId: number
): Promise<PessoaResponse | null> {
  const response = await listarPessoas();

  const pessoa = response.content.find(
    (item) => item.usuarioId === usuarioId
  );

  return pessoa ?? null;
}

export async function cadastrarPessoa(
  pessoa: PessoaRequest
): Promise<PessoaResponse> {
  return api.post<PessoaResponse>("/pessoas", pessoa);
}

export async function atualizarPessoa(
  id: number,
  pessoa: PessoaRequest
): Promise<PessoaResponse> {
  return api.put<PessoaResponse>(`/pessoas/${id}`, pessoa);
}