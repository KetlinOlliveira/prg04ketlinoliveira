import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import "./Footer.css";

// Rodapé do site: onda decorativa, endereço/menu/redes sociais fictícias e
// um card de contato (formulário sem back-end, só ilustrativo).
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,40 C240,100 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z"
            fill="var(--mogno)"
          />
        </svg>
      </div>

      <div className="footer__inner">
        <div className="footer__brand">
          <FaPaw className="footer__paw" aria-hidden="true" />
          <div className="footer__logo">
            Find<strong>Pet</strong>
          </div>
        </div>

        <div className="footer__column">
          <h3>Endereço</h3>
          <ul>
            <li>Rua Pet, Número 1</li>
            <li>Irecê - BA</li>
            <li>CEP 44900-000</li>
            <li>Brasil</li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Menu</h3>
          <nav aria-label="Links do rodapé">
            <Link to="/">Início</Link>
            <Link to="/#adotar">Adotar</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h3>Siga-nos</h3>
          <nav aria-label="Redes sociais do FindPet">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TikTok</a>
            <a href="#">YouTube</a>
          </nav>
        </div>

        <div className="footer__contact-card">
          <h3>Fale conosco</h3>

          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Seu email"
              aria-label="Seu email"
            />
            <input
              type="tel"
              placeholder="Seu telefone"
              aria-label="Seu telefone"
            />
            <input
              type="text"
              placeholder="Assunto (opcional)"
              aria-label="Assunto"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright © 2026 FindPet. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
