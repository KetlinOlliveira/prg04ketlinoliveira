// Registro de auditoria (LogSistema) — gerado automaticamente pelo backend
// a cada cadastro/edição/exclusão de animal.
export interface LogResponse {
  id: number;
  acao: string;
  descricao: string;
  dataHora: string;
  usuarioId?: number;
  usuarioNome?: string;
}
