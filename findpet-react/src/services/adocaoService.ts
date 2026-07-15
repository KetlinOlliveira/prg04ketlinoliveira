import { api } from "./api";
import type { PageResponse } from "../types/api";
import type { AdocaoRequest, AdocaoResponse, AdocaoStatus } from "../types/adocao";

export async function solicitarAdocao(
  dados: AdocaoRequest
): Promise<AdocaoResponse> {
  return api.post<AdocaoResponse>("/adocoes", dados);
}

// A API não filtra a listagem por usuário/animal — como em animalService,
// busca-se uma página grande e filtra-se no cliente.
export async function listarAdocoes(): Promise<PageResponse<AdocaoResponse>> {
  return api.get<PageResponse<AdocaoResponse>>(
    "/adocoes?page=0&size=100&sort=dataSolicitacao,desc"
  );
}

export async function buscarAdocaoPorId(id: number): Promise<AdocaoResponse> {
  return api.get<AdocaoResponse>(`/adocoes/${id}`);
}

export async function atualizarStatusAdocao(
  id: number,
  status: AdocaoStatus
): Promise<AdocaoResponse> {
  return api.patch<AdocaoResponse>(`/adocoes/${id}/status`, { status });
}

export async function excluirAdocao(id: number): Promise<void> {
  return api.delete<void>(`/adocoes/${id}`);
}
