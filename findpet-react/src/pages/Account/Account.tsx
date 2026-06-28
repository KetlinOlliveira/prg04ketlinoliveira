import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddressForm from "../../components/AddressForm/AddressForm";
import {
  getInicialUsuario,
  getUsuarioLogado,
  removerUsuarioLogado,
} from "../../services/authStorage";
import { buscarEnderecoPorId } from "../../services/enderecoService";
import { buscarPessoaPorUsuarioId } from "../../services/pessoaService";
import type { EnderecoResponse, PessoaResponse } from "../../types/endereco";
import "./Account.css";

function Account() {
  const navigate = useNavigate();
  const [usuario] = useState(() => getUsuarioLogado());

  const [pessoa, setPessoa] = useState<PessoaResponse | null>(null);
  const [endereco, setEndereco] = useState<EnderecoResponse | null>(null);
  const [carregandoEndereco, setCarregandoEndereco] = useState(true);
  const [mostrarFormularioEndereco, setMostrarFormularioEndereco] =
  useState(false);

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  useEffect(() => {
    async function carregarDadosDaConta() {
      if (!usuario?.id) {
        return;
      }

      try {
        setCarregandoEndereco(true);

        const pessoaEncontrada = await buscarPessoaPorUsuarioId(usuario.id);

        if (pessoaEncontrada) {
          setPessoa(pessoaEncontrada);

          if (pessoaEncontrada.enderecoId) {
            const enderecoEncontrado = await buscarEnderecoPorId(
              pessoaEncontrada.enderecoId
            );

            setEndereco(enderecoEncontrado);
          }
        }
      } catch {
        setPessoa(null);
        setEndereco(null);
      } finally {
        setCarregandoEndereco(false);
      }
    }

    carregarDadosDaConta();
  }, [usuario]);

  if (!usuario) {
    return null;
  }

  function handleLogout() {
    removerUsuarioLogado();
    navigate("/");
  }

  function handleEnderecoSalvo(
  pessoaSalva: PessoaResponse,
  enderecoSalvo: EnderecoResponse
) {
  setPessoa(pessoaSalva);
  setEndereco(enderecoSalvo);
  setMostrarFormularioEndereco(false);
}

  return (
    <main className="account-page">
      <section className="account-shell">
        <aside className="account-sidebar">
          <Link to="/" className="account-back-button">
            ← Voltar para início
          </Link>

          <div className="account-sidebar__profile">
            <div className="account-avatar">{getInicialUsuario(usuario)}</div>

            <div>
              <strong>{usuario.nome}</strong>
              <span>{usuario.email}</span>
            </div>
          </div>

          <nav className="account-menu" aria-label="Menu da conta">
            <a href="#perfil">Perfil</a>
            <a href="#endereco">Endereço</a>
            <a href="#pets">Meus pets</a>

            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          </nav>
        </aside>

        <section className="account-content">
          <header className="account-header">

            <span className="account-eyebrow">Minha conta</span>

            <h1>Perfil</h1>

            <p>
              Gerencie suas informações pessoais, endereço e futuramente os pets
              vinculados à sua conta.
            </p>
          </header>

          <section className="account-card" id="perfil">
            <div className="account-profile-top">
              <div className="account-avatar account-avatar--large">
                {getInicialUsuario(usuario)}
              </div>

              <div>
                <h2>{usuario.nome}</h2>
                <p>{usuario.email}</p>
                <span className="account-status">
                  {usuario.ativo ? "Conta ativa" : "Conta inativa"}
                </span>
              </div>
            </div>
          </section>

          <section className="account-card" id="endereco">
  <div className="account-card__header account-card__header--row">
    <div>
      <h2>Endereço</h2>
      <p className="account-muted">
        Cadastre ou atualize seu endereço para facilitar futuras solicitações de
        adoção.
      </p>
    </div>

    {!mostrarFormularioEndereco && (
      <button
        type="button"
        className="account-address-action"
        onClick={() => setMostrarFormularioEndereco(true)}
      >
        {endereco ? "Editar endereço" : "Cadastrar endereço"}
      </button>
    )}
  </div>

  {carregandoEndereco ? (
    <p className="account-muted">Carregando endereço...</p>
  ) : (
    <>
      {endereco && !mostrarFormularioEndereco && (
        <article className="account-address-card">
          <div className="account-address-card__top">
            <div className="account-address-card__icon" aria-hidden="true">
              📍
            </div>

            <div>
              <span className="account-address-card__label">
                Endereço cadastrado
              </span>
              <h3>
                {endereco.rua || "Rua não informada"}
                {endereco.numero ? `, ${endereco.numero}` : ""}
              </h3>
              <p>
                {endereco.bairro || "Bairro não informado"} ·{" "}
                {endereco.cidade} - {endereco.estado}
              </p>
            </div>
          </div>

          <div className="account-address-details">
            <div className="account-address-detail">
              <span>CEP</span>
              <strong>{endereco.cep}</strong>
            </div>

            <div className="account-address-detail">
              <span>Estado</span>
              <strong>{endereco.estado}</strong>
            </div>

            <div className="account-address-detail">
              <span>Cidade</span>
              <strong>{endereco.cidade}</strong>
            </div>

            <div className="account-address-detail">
              <span>Bairro</span>
              <strong>{endereco.bairro || "Não informado"}</strong>
            </div>

            <div className="account-address-detail">
              <span>Rua</span>
              <strong>{endereco.rua || "Não informado"}</strong>
            </div>

            <div className="account-address-detail">
              <span>Número</span>
              <strong>{endereco.numero || "Não informado"}</strong>
            </div>

            <div className="account-address-detail account-address-detail--full">
              <span>Complemento</span>
              <strong>{endereco.complemento || "Não informado"}</strong>
            </div>
          </div>
        </article>
      )}

      {!endereco && !mostrarFormularioEndereco && (
        <div className="account-address-empty">
          <div className="account-address-empty__icon" aria-hidden="true">
            🏠
          </div>
          <h3>Nenhum endereço cadastrado</h3>
          <p>
            Cadastre seu endereço para deixar sua conta mais completa e facilitar
            futuras solicitações.
          </p>
        </div>
      )}

      {mostrarFormularioEndereco && (
        <AddressForm
          usuarioId={usuario.id}
          pessoaAtual={pessoa}
          enderecoAtual={endereco}
          onEnderecoSalvo={handleEnderecoSalvo}
          onCancel={() => setMostrarFormularioEndereco(false)}
        />
      )}
    </>
  )}
</section>

          <section className="account-card" id="pets">
            <h2>Meus pets</h2>
            <p className="account-muted">
              Futuramente seus pets cadastrados aparecerão nesta área.
            </p>
          </section>
        </section>
      </section>
    </main>
  );
}

export default Account;