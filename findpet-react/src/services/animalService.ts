import { api } from "./api";
import type { PageResponse } from "../types/api";
import type {
  AnimalRequest,
  AnimalResponse,
  EspecieResponse,
  RacaResponse,
} from "../types/animal";

interface ListarAnimaisParams {
  page?: number;
  size?: number;
  status?: string;
}

function buildQueryParams(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

// A API só filtra por "status" no servidor (GET /api/animais?status=&page=&size=).
// Filtros por espécie ou por dono são feitos no cliente, depois da busca.
export async function listarAnimais({
  page = 0,
  size = 12,
  status,
}: ListarAnimaisParams = {}): Promise<PageResponse<AnimalResponse>> {
  const query = buildQueryParams({
    page,
    size,
    status,
    sort: "nome,asc",
  });

  return api.get<PageResponse<AnimalResponse>>(`/animais?${query}`);
}

export async function buscarAnimalPorId(
  id: number
): Promise<AnimalResponse> {
  return api.get<AnimalResponse>(`/animais/${id}`);
}

export async function criarAnimal(
  animal: AnimalRequest
): Promise<AnimalResponse> {
  return api.post<AnimalResponse>("/animais", animal);
}

export async function atualizarAnimal(
  id: number,
  animal: AnimalRequest
): Promise<AnimalResponse> {
  return api.put<AnimalResponse>(`/animais/${id}`, animal);
}

export async function excluirAnimal(id: number): Promise<void> {
  return api.delete<void>(`/animais/${id}`);
}

export async function listarEspecies(): Promise<PageResponse<EspecieResponse>> {
  return api.get<PageResponse<EspecieResponse>>(
    "/especies?page=0&size=50&sort=nome,asc"
  );
}

export async function listarRacas(): Promise<PageResponse<RacaResponse>> {
  return api.get<PageResponse<RacaResponse>>(
    "/racas?page=0&size=100&sort=nome,asc"
  );
}