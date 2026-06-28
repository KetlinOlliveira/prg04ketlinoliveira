import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getInicialUsuario,
  getUsuarioLogado,
} from "../../services/authStorage";
import "./Header.css";

/*
  Header principal do sistema.

  Ele contém o nome do projeto, botões de ação e menu de navegação.
  O menu mobile é controlado com useState.
*/

// Função para renderizar o componente Header
function Header() {

  function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(getUsuarioLogado());

  const usuarioEstaLogado = Boolean(usuarioLogado);

  useEffect(() => {
    function atualizarUsuarioLogado() {
      setUsuarioLogado(getUsuarioLogado());
    }

    window.addEventListener("usuarioLogadoAtualizado", atualizarUsuarioLogado);
    window.addEventListener("storage", atualizarUsuarioLogado);

    return () => {
      window.removeEventListener("usuarioLogadoAtualizado", atualizarUsuarioLogado);
      window.removeEventListener("storage", atualizarUsuarioLogado);
    };
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }
}
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const usuarioLogado = getUsuarioLogado();
  const usuarioEstaLogado = Boolean(usuarioLogado);

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="topbar">
      <Link to="/" className="topbar-brand-name">
        Find<span>Pet</span>
      </Link>

      <div className="topbar-right">


      <Link to="/quiz" className="btn-login-header">
        Fazer quiz
      </Link>
      
        {usuarioEstaLogado ? (
          <Link to="/conta" className="btn-conta-header">
            <span className="btn-conta-header__avatar">
              {getInicialUsuario(usuarioLogado)}
            </span>
            Conta
          </Link>
        ) : (
          <Link to="/login" className="btn-login-header">
            Entrar
          </Link>
        )}

        <Link to="/contato" className="btn-adotar-header">
          Adotar um amigo
        </Link>

        <button
          type="button"
          className="btn-menu"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      <nav className={`topbar-nav ${isMenuOpen ? "topbar-nav-open" : ""}`}>
        <button
          type="button"
          className="menu-close"
          onClick={closeMenu}
          aria-label="Fechar menu"
        >
          ✕
        </button>

        <Link to="/" onClick={closeMenu}>
          Início
        </Link>

        <Link to="/palheta" onClick={closeMenu}>
          Palheta
        </Link>

        <Link to="/contato" onClick={closeMenu}>
          Contato
        </Link>



       {usuarioEstaLogado ? (
        <Link to="/conta" onClick={closeMenu}>
          Conta
        </Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;