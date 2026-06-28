import { api } from "./api";
import type {
  CepResponse,
  EnderecoRequest,
  EnderecoResponse,
} from "../types/endereco";

export async function buscarCep(cep: string): Promise<CepResponse> {
  const cepLimpo = cep.replace(/\D/g, "");

  return api.get<CepResponse>(`/ceps/${cepLimpo}`);
}

export async function cadastrarEndereco(
  endereco: EnderecoRequest
): Promise<EnderecoResponse> {
  return api.post<EnderecoResponse>("/enderecos", endereco);
}

export async function buscarEnderecoPorId(
  id: number
): Promise<EnderecoResponse> {
  return api.get<EnderecoResponse>(`/enderecos/${id}`);
}

export async function atualizarEndereco(
  id: number,
  endereco: EnderecoRequest
): Promise<EnderecoResponse> {
  return api.put<EnderecoResponse>(`/enderecos/${id}`, endereco);
}