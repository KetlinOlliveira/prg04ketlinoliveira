import { Link } from "react-router-dom";
import petsContato from "../../assets/images/pets-contato.jpg";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">
      <Link to="/" className="close-contact">
        ✕
      </Link>

      <section className="contact-card">
        <div className="contact-info">
          <p className="section-label">Contato</p>
          <h1>Fale com o FindPet</h1>

          <ul>
            <li>
              <strong>Telefone:</strong> 11 22223333
            </li>
            <li>
              <strong>Email:</strong> findpet@gmail.com
            </li>
            <li>
              <strong>Endereço:</strong> Rua Pet, Número 1
            </li>
          </ul>
        </div>

        <img
          src={petsContato}
          alt="Imagem de pets"
          className="pets-contato"
        />
      </section>
    </main>
  );
}

export default Contact;