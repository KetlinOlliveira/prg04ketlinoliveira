import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import patinhaLogo from "../../assets/images/patinha-logo-transp.png";
import "./Footer.css";

// Rodapé do site: logo + newsletter (fictícia), menu de navegação, contato
// e barra de copyright com redes sociais (links fictícios, sem back-end).
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={patinhaLogo} alt="" aria-hidden="true" />
            <span>
              Find<strong>Pet</strong>
            </span>
          </div>

          <p className="footer__tagline">
            Assine nossa newsletter e receba novidades sobre adoção
            responsável.
          </p>

          <form
            className="footer__newsletter"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Seu endereço de email"
              aria-label="Seu endereço de email"
            />
            <button type="submit">Inscrever</button>
          </form>
        </div>

        <div className="footer__column">
          <h3>Menu</h3>
          <nav aria-label="Links do rodapé">
            <Link to="/">Início</Link>
            <Link to="/#adotar">Adotar</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/palheta">Identidade visual</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h3>Contato</h3>
          <ul className="footer__contato">
            <li>
              <FaMapMarkerAlt aria-hidden="true" />
              Rua Pet, Número 1
            </li>
            <li>
              <FaEnvelope aria-hidden="true" />
              findpet@gmail.com
            </li>
            <li>
              <FaPhoneAlt aria-hidden="true" />
              (11) 2222-3333
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright © 2026 FindPet. Todos os direitos reservados.</p>

        <div className="footer__social">
          <a href="#" aria-label="Instagram do FindPet">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook do FindPet">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="TikTok do FindPet">
            <FaTiktok />
          </a>
          <a href="#" aria-label="YouTube do FindPet">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
