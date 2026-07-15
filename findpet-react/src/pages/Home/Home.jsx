import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import AdoptionSection from "../../components/AdoptionSection/AdoptionSection";
import StepsSection from "../../components/StepsSection/StepsSection";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  const location = useLocation();

  // Quando a URL chega com #adotar (ex: clicou em "Adotar" em outra página),
  // rola suavemente até o feed de animais.
  useEffect(() => {
    if (location.hash !== "#adotar") {
      return;
    }

    const secaoFeed = document.getElementById("adotar");
    secaoFeed?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div className="home-page">
      <Header />
      <Hero />
      <AdoptionSection />
      <StepsSection />
      <Footer />
    </div>
  );
}

export default Home;
