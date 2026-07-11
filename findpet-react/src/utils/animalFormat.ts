import { API_ORIGIN } from "../services/api";
import type { AnimalCategorySlug } from "../types/animal";

export function formatAnimalStatus(status: string): string {
  const labels: Record<string, string> = {
    DISPONIVEL: "Disponível",
    EM_PROCESSO: "Em processo",
    ADOTADO: "Adotado",
    INATIVO: "Inativo",
  };

  return labels[status] ?? status;
}

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

export function getAnimalImageUrl(fotoUrl?: string | null): string {
  if (!fotoUrl) {
    return "";
  }

  if (fotoUrl.startsWith("http") || fotoUrl.startsWith("/")) {
    return fotoUrl;
  }

  return `${API_ORIGIN}/${fotoUrl}`;
}

export function formatAnimalIdade(idade?: number | null): string {
  if (idade === null || idade === undefined) {
    return "Idade não informada";
  }

  return idade === 1 ? "1 ano" : `${idade} anos`;
}

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

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