import { api } from "./api";
import type { PageResponse } from "../types/api";
import type { LogResponse } from "../types/log";

// Lista os registros de auditoria mais recentes primeiro. Exige um usuário
// autenticado (o token JWT já é anexado automaticamente pelo api.ts).
export async function listarLogs(): Promise<PageResponse<LogResponse>> {
  return api.get<PageResponse<LogResponse>>(
    "/logs?page=0&size=100&sort=id,desc"
  );
}
