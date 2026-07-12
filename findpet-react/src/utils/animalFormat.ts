import { API_ORIGIN } from "../services/api";
import type { AnimalCategorySlug } from "../types/animal";

// Traduz o status do animal (enum do backend) para o texto exibido na tela.
export function formatAnimalStatus(status: string): string {
  const labels: Record<string, string> = {
    DISPONIVEL: "Disponível",
    EM_PROCESSO: "Em processo",
    ADOTADO: "Adotado",
    INATIVO: "Inativo",
  };

  return labels[status] ?? status;
}

// Converte "MACHO"/"FEMEA" no símbolo ♂/♀ exibido nos cards e no modal.
export function getSexoIcon(sexo?: string | null): string {
  const valor = normalizeText(sexo ?? "");

  if (valor.startsWith("m")) {
    return "♂";
  }

  if (valor.startsWith("f")) {
    return "♀";
  }

  return "";
}

// Resolve a URL da foto do animal: aceita link absoluto, caminho relativo
// do backend ou uma imagem em base64 (data:) enviada por upload.
export function getAnimalImageUrl(fotoUrl?: string | null): string {
  if (!fotoUrl) {
    return "";
  }

  if (
    fotoUrl.startsWith("http") ||
    fotoUrl.startsWith("/") ||
    fotoUrl.startsWith("data:")
  ) {
    return fotoUrl;
  }

  return `${API_ORIGIN}/${fotoUrl}`;
}

// Formata a idade (número em anos vindo do backend) em texto legível.
export function formatAnimalIdade(idade?: number | null): string {
  if (idade === null || idade === undefined) {
    return "Idade não informada";
  }

  return idade === 1 ? "1 ano" : `${idade} anos`;
}

// Remove acentos e caixa alta/baixa, pra comparar textos de forma tolerante.
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Mapeia o nome da espécie (vindo da API) para o slug de categoria do
// carrossel de filtro, já que a API não devolve esse slug pronto.
export function getCategorySlugByEspecieName(
  especieNome: string
): AnimalCategorySlug | null {
  const nome = normalizeText(especieNome);

  if (nome.includes("cao") || nome.includes("caes") || nome.includes("cachorro")) {
    return "caes";
  }

  if (nome.includes("gato") || nome.includes("gatos")) {
    return "gatos";
  }

  if (
    nome.includes("roedor") ||
    nome.includes("roedores") ||
    nome.includes("hamster") ||
    nome.includes("porquinho")
  ) {
    return "roedores";
  }

  if (
    nome.includes("ave") ||
    nome.includes("aves") ||
    nome.includes("passaro") ||
    nome.includes("calopsita") ||
    nome.includes("canario")
  ) {
    return "aves";
  }

  return null;
}