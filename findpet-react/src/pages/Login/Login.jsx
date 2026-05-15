import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.css";

function Login() {
  return (
    <main className="login-page">
      <div className="login-card">
        <LoginForm />

        <section className="image-container">
          <Link to="/admin" className="arrow-button" aria-label="Ir para painel admin">
            →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Login;