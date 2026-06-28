const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

const API_URL = `${API_BASE_URL}/usuarios`;

function normalizarMensagemErro(mensagem) {
  const mensagens = {
    "Email não encontrado.": "Usuário não cadastrado.",
    "Senha incorreta.": "Senha inválida.",
    "Existem campos inválidos na requisição.": "Verifique os campos informados.",
    "Email já cadastrado.": "Este email já está cadastrado.",
  };

  return mensagens[mensagem] ?? mensagem;
}

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

async function requisicao(endpoint, options) {
  let resposta;

  try {
    resposta = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
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

export async function cadastrarUsuario(usuario) {
  return requisicao("/cadastro", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

export async function loginUsuario(usuario) {
  return requisicao("/login", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}