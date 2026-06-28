import { api } from "./api";
import type { PageResponse } from "../types/api";
import type {
  AnimalResponse,
  EspecieResponse,
  RacaResponse,
} from "../types/animal";

interface ListarAnimaisParams {
  page?: number;
  size?: number;
  especieId?: number;
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

export async function listarAnimais({
  page = 0,
  size = 12,
  especieId,
  status = "DISPONIVEL",
}: ListarAnimaisParams = {}): Promise<PageResponse<AnimalResponse>> {
  const query = buildQueryParams({
    page,
    size,
    especieId,
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