// Guarda o usuário logado no localStorage (sem token/JWT — só o objeto do
// usuário) e avisa o resto do app via evento customizado quando ele muda.
const STORAGE_KEY = "usuarioLogado";

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

// Salva o usuário logado após login/cadastro bem-sucedido.
export function salvarUsuarioLogado(usuario) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));

  window.dispatchEvent(new Event("usuarioLogadoAtualizado"));
}

// Remove a sessão salva (usado no logout e quando a sessão é inválida).
export function removerUsuarioLogado() {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(new Event("usuarioLogadoAtualizado"));
}

// Retorna a inicial do nome do usuário, usada no avatar circular do header/conta.
export function getInicialUsuario(usuario) {
  if (!usuario?.nome) {
    return "?";
  }

  return usuario.nome.trim().charAt(0).toUpperCase();
}