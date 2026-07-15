import { Link } from "react-router-dom";
import { FaClipboardCheck, FaHandHoldingHeart } from "react-icons/fa";
import { FaShieldDog } from "react-icons/fa6";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./StepsSection.css";

// Passo a passo de como funciona a adoção no FindPet, exibido logo abaixo
// do feed na Home. Cada card usa useScrollReveal pra aparecer com uma
// animação de entrada conforme o usuário rola a página.
const passos = [
  {
    numero: 1,
    Icone: FaClipboardCheck,
    titulo: "Descubra se está pronto para adotar",
    texto:
      "Responda nosso quiz rápido e descubra se a sua rotina combina com a chegada de um pet.",
    botaoLabel: "Fazer o quiz",
    to: "/quiz",
  },
  {
    numero: 2,
    Icone: FaShieldDog,
    titulo: "Veja os cuidados que cada animal precisa",
    texto:
      "Conheça as necessidades de cães, gatos, roedores e aves antes de decidir qual combina com você.",
    botaoLabel: "Ver guia de cuidados",
    to: "/cuidados",
  },
  {
    numero: 3,
    Icone: FaHandHoldingHeart,
    titulo: "Entre em contato e faça a adoção",
    texto:
      "Encontre um animal no feed e fale direto com quem cadastrou para combinar a adoção.",
    botaoLabel: "Ver animais",
    to: "/#adotar",
  },
];

function StepCard({ passo, indice }) {
  const [ref, visivel] = useScrollReveal();
  const { Icone } = passo;

  return (
    <li
      ref={ref}
      className={`step-card${visivel ? " step-card--visible" : ""}`}
      style={{ transitionDelay: `${indice * 120}ms` }}
    >
      <span className="step-card__numero">{passo.numero}</span>

      <span className="step-card__icone">
        <Icone aria-hidden="true" />
      </span>

      <h3>{passo.titulo}</h3>
      <p>{passo.texto}</p>

      {passo.to ? (
        <Link to={passo.to} className="step-card__botao">
          {passo.botaoLabel}
        </Link>
      ) : (
        <span className="step-card__botao step-card__botao--desabilitado">
          {passo.botaoLabel}
        </span>
      )}
    </li>
  );
}

function StepsSection() {
  return (
    <section className="steps-section">
      <div className="steps-section__inner">
        <p className="steps-section__eyebrow">Como funciona</p>
        <h2 className="steps-section__title">
          Da dúvida até a adoção, em 3 passos
        </h2>

        <ul className="steps-section__list">
          {passos.map((passo, indice) => (
            <StepCard key={passo.numero} passo={passo} indice={indice} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default StepsSection;
