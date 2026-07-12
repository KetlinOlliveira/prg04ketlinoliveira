import { api } from "./api";
import type {
  CepResponse,
  EnderecoRequest,
  EnderecoResponse,
} from "../types/endereco";

// Consulta um CEP na API (usado pelo botão "Buscar" do AddressForm).
export async function buscarCep(cep: string): Promise<CepResponse> {
  const cepLimpo = cep.replace(/\D/g, "");

  return api.get<CepResponse>(`/ceps/${cepLimpo}`);
}

// Cadastra um novo endereço.
export async function cadastrarEndereco(
  endereco: EnderecoRequest
): Promise<EnderecoResponse> {
  return api.post<EnderecoResponse>("/enderecos", endereco);
}

// Busca um endereço já cadastrado pelo id.
export async function buscarEnderecoPorId(
  id: number
): Promise<EnderecoResponse> {
  return api.get<EnderecoResponse>(`/enderecos/${id}`);
}

// Atualiza um endereço existente.
export async function atualizarEndereco(
  id: number,
  endereco: EnderecoRequest
): Promise<EnderecoResponse> {
  return api.put<EnderecoResponse>(`/enderecos/${id}`, endereco);
}