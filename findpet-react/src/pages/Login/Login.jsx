import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFindPet from "../../assets/images/patinha-logo-transp.png";
import { cadastrarUsuario, loginUsuario } from "../../services/usuarioService";
import { salvarUsuarioLogado } from "../../services/authStorage";
import "./Login.css";


function Login() {
  const navigate = useNavigate();
  //state para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Função para validar o formato do email usando expressão regular
  function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função para validar os campos do formulário de cadastro
  function validarCadastro() {
  if (!nome.trim() || !email.trim() || !senha.trim()) {
    return "Preencha nome, email e senha para criar sua conta.";
  }

  if (nome.trim().length < 3) {
    return "O nome deve ter pelo menos 3 caracteres.";
  }

  if (!emailValido(email)) {
    return "Digite um email válido.";
  }

  if (senha.length < 6) {
    return "A senha deve ter no mínimo 6 caracteres.";
  }

  return "";
}

// Função para validar os campos do formulário de login
function validarLogin() {
  if (!email.trim() || !senha.trim()) {
    return "Preencha email e senha para entrar.";
  }

  if (!emailValido(email)) {
    return "Digite um email válido.";
  }

  return "";
}

// Função para lidar com o cadastro do usuário
  async function handleCadastro() {
  const erroValidacao = validarCadastro();

  if (erroValidacao) {
    setMensagem(erroValidacao);
    return;
  }

  try {
    setCarregando(true);
    setMensagem("");

    await cadastrarUsuario({
      nome: nome.trim(),
      email: email.trim(),
      senha: senha,
    });

    setMensagem("Conta criada com sucesso! Agora você já pode entrar.");
    setNome("");
    setEmail("");
    setSenha("");
  } catch (error) {
    setMensagem(error.message || "Erro ao cadastrar usuário.");
  } finally {
    setCarregando(false);
  }
}

  // Função para lidar com o login do usuário
  async function handleLogin() {
  const erroValidacao = validarLogin();

  if (erroValidacao) {
    setMensagem(erroValidacao);
    return;
  }

  try {
    setCarregando(true);
    setMensagem("");

    const usuario = await loginUsuario({
      email: email.trim(),
      senha: senha,
    });

    salvarUsuarioLogado(usuario);

    navigate("/");
  } catch (error) {
    setMensagem(error.message || "Email ou senha inválidos.");
  } finally {
    setCarregando(false);
  }
}

  // Renderiza o formulário de login e cadastro
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="form-container">
          <button className="close-login" onClick={() => navigate("/")}>
            ✕
          </button>

          <div className="brand">
             <img
                className="login-logo"
                src={logoFindPet}
                alt="Logo FindPet"
              />
            <div className="nome-logo">
              Find<span>Pet</span>
            </div>
          </div>

          <h2>Bem-vindo de volta!</h2>
          <p className="subtitle">
            Entre ou crie sua conta para continuar no FindPet.
          </p>

          <form>
            <div className="input-field">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>

            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="input-field">
              <label>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>

            {mensagem && <p className="mensagem-login">{mensagem}</p>}

            <button
              type="button"
              className="btn-login"
              onClick={handleLogin}
              disabled={carregando}
            >
              {carregando ? "Aguarde..." : "Entrar"}
            </button>

            <button
              type="button"
              className="btn-cadastro"
              onClick={handleCadastro}
              disabled={carregando}
            >
              Criar conta
            </button>
          </form>
        </div>

        <div className="image-container"></div>
      </section>
    </main>
  );
}

export default Login;