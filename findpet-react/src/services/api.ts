import type { ApiErrorResponse } from "../types/api";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
  let message = "Não foi possível concluir a requisição.";

  try {
    const errorData = (await response.json()) as ApiErrorResponse;

    if (errorData.campos && errorData.campos.length > 0) {
      message = errorData.campos
        .map((campo) => campo.mensagem)
        .join(" ");
    } else {
      message = errorData.mensagem || errorData.erro || message;
    }
  } catch {
    message = `Erro ${response.status} ao conectar com a API.`;
  }

  throw new Error(message);
}

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get<T>(endpoint: string) {
    return apiRequest<T>(endpoint);
  },

  post<T>(endpoint: string, body: unknown) {
    return apiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body: unknown) {
    return apiRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string) {
    return apiRequest<T>(endpoint, {
      method: "DELETE",
    });
  },
};