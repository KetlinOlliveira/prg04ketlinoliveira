import { getToken } from "./authStorage";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

const API_URL = `${API_BASE_URL}/usuarios`;

// Traduz mensagens de erro cruas do backend para um texto mais amigável.
function normalizarMensagemErro(mensagem) {
  const mensagens = {
    "Email não encontrado.": "Usuário não cadastrado.",
    "Senha incorreta.": "Senha inválida.",
    "Existem campos inválidos na requisição.": "Verifique os campos informados.",
    "Email já cadastrado.": "Este email já está cadastrado.",
  };

  return mensagens[mensagem] ?? mensagem;
}

// Lê o corpo de uma resposta de erro e extrai a mensagem mais útil dela.
async function extrairMensagemErro(resposta) {
  const texto = await resposta.text();

  if (!texto) {
    return "Não foi possível concluir a solicitação.";
  }

  try {
    const erro = JSON.parse(texto);

    if (erro.campos && erro.campos.length > 0) {
      return erro.campos
        .map((campo) => campo.mensagem)
        .filter(Boolean)
        .join(" ");
    }

    if (erro.mensagem) {
      return normalizarMensagemErro(erro.mensagem);
    }

    if (erro.erro) {
      return normalizarMensagemErro(erro.erro);
    }

    return "Não foi possível concluir a solicitação.";
  } catch {
    return normalizarMensagemErro(texto);
  }
}

// Wrapper de fetch específico do módulo de usuários (login/cadastro têm um
// tratamento de erro próprio, diferente do cliente genérico em api.ts).
async function requisicao(endpoint, options) {
  let resposta;
  const token = getToken();

  try {
    resposta = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Não foi possível conectar com o servidor.");
  }

  if (!resposta.ok) {
    const mensagem = await extrairMensagemErro(resposta);
    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

// Cria uma nova conta de usuário.
export async function cadastrarUsuario(usuario) {
  return requisicao("/cadastro", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

// Autentica um usuário por email/senha e devolve seus dados.
export async function loginUsuario(usuario) {
  return requisicao("/login", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

// Busca um usuário pelo id (usado para revalidar a sessão salva no navegador).
export async function buscarUsuarioPorId(id) {
  return requisicao(`/${id}`, {
    method: "GET",
  });
}

// Atualiza (ou remove, enviando string vazia) a foto de perfil do usuário.
export async function atualizarFotoUsuario(id, fotoUrl) {
  return requisicao(`/${id}/foto`, {
    method: "PUT",
    body: JSON.stringify({ fotoUrl }),
  });
}