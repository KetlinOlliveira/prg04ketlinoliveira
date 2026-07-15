import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuarioLogado } from "../../services/authStorage";
import { listarLogs } from "../../services/logService";
import { USUARIO_ID_LOGS } from "../../utils/permissions";
import type { LogResponse } from "../../types/log";
import "./Logs.css";

const LABELS_ACAO: Record<string, string> = {
  CADASTRO_ANIMAL: "Cadastro de animal",
  ATUALIZACAO_ANIMAL: "Atualização de animal",
  EXCLUSAO_ANIMAL: "Exclusão de animal",
};

function formatarAcao(acao: string): string {
  return LABELS_ACAO[acao] ?? acao;
}

function formatarData(dataHora: string): string {
  const data = new Date(dataHora);

  if (Number.isNaN(data.getTime())) {
    return dataHora;
  }

  return data.toLocaleString("pt-BR");
}

function Logs() {
  const navigate = useNavigate();
  const usuario = getUsuarioLogado();

  const [logs, setLogs] = useState<LogResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const acessoPermitido = usuario?.id === USUARIO_ID_LOGS;

  useEffect(() => {
    if (!acessoPermitido) {
      navigate("/", { replace: true });
    }
  }, [acessoPermitido, navigate]);

  useEffect(() => {
    async function carregarLogs() {
      if (!acessoPermitido) {
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const response = await listarLogs();
        setLogs(response.content);
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os logs."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarLogs();
  }, [acessoPermitido]);

  if (!acessoPermitido) {
    return null;
  }

  return (
    <main className="logs-page">
      <div className="logs-shell">
        <header className="logs-header">
          <Link to="/" className="logs-back">
            ← Voltar para início
          </Link>

          <p className="logs-eyebrow">Auditoria</p>
          <h1>Logs do sistema</h1>
          <p className="logs-subtitulo">
            Registro de cadastros, edições e exclusões de animais feitas na
            plataforma.
          </p>
        </header>

        <section className="logs-card">
          {carregando && <p className="logs-status">Carregando logs...</p>}

          {erro && <p className="logs-status logs-status--erro">{erro}</p>}

          {!carregando && !erro && logs.length === 0 && (
            <p className="logs-status">Nenhum registro encontrado ainda.</p>
          )}

          {!carregando && !erro && logs.length > 0 && (
            <div className="logs-table-wrapper">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Ação</th>
                    <th>Descrição</th>
                    <th>Usuário</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <span
                          className={`logs-badge logs-badge--${log.acao.toLowerCase()}`}
                        >
                          {formatarAcao(log.acao)}
                        </span>
                      </td>
                      <td>{log.descricao}</td>
                      <td>{log.usuarioNome ?? "—"}</td>
                      <td>{formatarData(log.dataHora)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Logs;
