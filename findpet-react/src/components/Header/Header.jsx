import {useState} from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu(){
        setIsMenuOpen((currentState) => !currentState);
    }

    function closeMenu(){
        setIsMenuOpen(false);
    }

    return(
        <header className="topbar">
            <Link to ="/" className="logo">
            Find<span>Pet</span></Link>

            <div className="topbar-right">
                <Link to= "/login" className="btn-login-header">Entrar</Link>
                <Link to= "/contact" className="btn-contact-header">Adotar um amigo</Link>
                <button className="btn-menu" onClick={toggleMenu} aria-label="Abrir menu">
                ☰
                </button>
           </div>

        <nav className = {`topbar-nav ${isMenuOpen ? "topbar-nav-open": ""}`}>
          <button type="button"
          className="menu-close"
          onClick={closeMenu}
          aria-label= "fechar menu">
            X
        </button> 

        <Link to="/" onClick={closeMenu}> Início</Link>
        <Link to="/palheta" onClick={closeMenu}>Palheta</Link>
        <Link to="/contato" onClick={closeMenu}>Contato</Link>
        <Link to="/login" onClick={closeMenu}>Login</Link>
        </nav>
        </header>
    );
}

    export default Header;