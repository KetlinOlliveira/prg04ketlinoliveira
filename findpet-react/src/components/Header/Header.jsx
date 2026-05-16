import { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

/*
  Header principal do sistema.

  Ele contém o nome do projeto, botões de ação e menu de navegação.
  O menu mobile é controlado com useState.
*/
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Link to="/login" className="btn-login-header">
          Entrar
        </Link>

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

        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;