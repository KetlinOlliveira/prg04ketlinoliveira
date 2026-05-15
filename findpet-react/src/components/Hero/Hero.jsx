import { Link } from "react-router-dom";
import heroAnimais from "../../assets/images/hero-animais.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-bg"
        src={heroAnimais}
        alt="Animais disponíveis para adoção"
      />

      <div className="hero-overlay"></div>

      <h1 className="hero-headline">
        Todo lar que acolhe um animal torna-se <em>mais completo.</em>
      </h1>

      <div className="hero-bottom">
        <Link to="/contato" className="btn-adotar-hero">
          Adotar agora →
        </Link>
      </div>
    </section>
  );
}

export default Hero;