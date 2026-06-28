const STORAGE_KEY = "usuarioLogado";

export function getUsuarioLogado() {
  const usuarioSalvo = localStorage.getItem(STORAGE_KEY);

  if (!usuarioSalvo) {
    return null;
  }

  try {
    return JSON.parse(usuarioSalvo);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function salvarUsuarioLogado(usuario) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));

  window.dispatchEvent(new Event("usuarioLogadoAtualizado"));
}

export function removerUsuarioLogado() {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(new Event("usuarioLogadoAtualizado"));
}

export function getInicialUsuario(usuario) {
  if (!usuario?.nome) {
    return "?";
  }

  return usuario.nome.trim().charAt(0).toUpperCase();
}