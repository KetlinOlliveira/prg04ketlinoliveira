// Guarda o usuário logado e o token JWT no localStorage, e avisa o resto do
// app via evento customizado quando a sessão muda.
const STORAGE_KEY = "usuarioLogado";
const TOKEN_KEY = "authToken";

// Lê o usuário logado salvo no navegador, ou null se não houver/estiver corrompido.
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

// Lê o token JWT salvo, ou null se não houver (usuário deslogado).
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Salva o usuário logado e o token JWT após login bem-sucedido.
export function salvarUsuarioLogado(usuario, token) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  window.dispatchEvent(new Event("usuarioLogadoAtualizado"));
}

// Remove a sessão salva (usado no logout e quando a sessão é inválida).
export function removerUsuarioLogado() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);

  window.dispatchEvent(new Event("usuarioLogadoAtualizado"));
}

// Retorna a inicial do nome do usuário, usada no avatar circular do header/conta.
export function getInicialUsuario(usuario) {
  if (!usuario?.nome) {
    return "?";
  }

  return usuario.nome.trim().charAt(0).toUpperCase();
}