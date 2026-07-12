import { Link } from "react-router-dom";
import petsSobre from "../../assets/images/pet-section.png";
import "./AboutSection.css";

// Seção "Sobre nós" exibida logo abaixo do feed de adoção na Home: uma
// foto à esquerda e a mensagem/valores do FindPet à direita.
function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-section__inner">
        <div className="about-section__media">
          <img
            src={petsSobre}
            alt="Dois cães felizes esperando por adoção"
            className="about-section__image"
          />
        </div>

        <div className="about-section__content">
          <p className="about-section__eyebrow">Sobre nós</p>

          <h2 className="about-section__title">
            Conectamos quem tem amor pra dar com quem precisa de um lar.
          </h2>

          <p className="about-section__text">
            O FindPet nasceu para tornar a adoção responsável mais simples:
            conectamos diretamente tutores e futuros adotantes, com
            transparência sobre cada animal e apoio em todas as etapas do
            processo.
          </p>

          <ul className="about-section__list">
            <li>
              <span aria-hidden="true">🐾</span> Cadastro de animais 100%
              gratuito
            </li>
            <li>
              <span aria-hidden="true">🤝</span> Contato direto com quem
              cadastrou o pet
            </li>
            <li>
              <span aria-hidden="true">💛</span> Feito para incentivar a
              adoção responsável
            </li>
          </ul>

          <Link to="/contato" className="about-section__button">
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
