import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../../services/userService";
import patinhaIcon from "../../assets/icons/patinha.ico";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    lembrar: false
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nome = formData.nome.trim();
    const email = formData.email.trim();
    const senha = formData.senha.trim();

    if (!nome || !email || !senha) {
      setErrorMessage("Preencha todos os campos para continuar.");
      return;
    }

    createUser({
      nome,
      email,
      senha
    });

    navigate("/admin");
  }

  return (
    <section className="form-container">
      <Link to="/" className="close-login">
        ✕
      </Link>

      <div className="brand">
        <img src={patinhaIcon} alt="Logo FindPet" />
        <div className="nome-logo">
          Find<span>Pet</span>
        </div>
      </div>

      <h2>Bem-vindo de volta!</h2>
      <p className="subtitle">Por favor, insira seus dados para continuar.</p>

      <button type="button" className="btn-google">
        <img
          src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          alt=""
        />
        Entrar com Google
      </button>

      <div className="divider">
        <span>ou</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="nome" className="form-label">
            Usuário
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            placeholder="Seu nome de usuário"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            className="form-control"
            placeholder="••••••••"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>

        <div className="extra-options">
          <label>
            <input
              type="checkbox"
              name="lembrar"
              checked={formData.lembrar}
              onChange={handleChange}
            />
            Lembrar-me
          </label>

          <a href="#">Esqueceu a senha?</a>
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <button type="submit" className="btn-login-form">
          Entrar
        </button>
      </form>
    </section>
  );
}

export default LoginForm;