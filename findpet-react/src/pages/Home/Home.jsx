import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import AdoptionSection from "../../components/AdoptionSection/AdoptionSection";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <AdoptionSection />
    </div>
  );
}

export default Home;
