import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddressForm from "../../components/AddressForm/AddressForm";
import AnimalForm from "../../components/AnimalForm/AnimalForm";
import {
  getInicialUsuario,
  getUsuarioLogado,
  removerUsuarioLogado,
  salvarUsuarioLogado,
} from "../../services/authStorage";
import { buscarEnderecoPorId } from "../../services/enderecoService";
import { buscarPessoaPorUsuarioId } from "../../services/pessoaService";
import { atualizarFotoUsuario, buscarUsuarioPorId } from "../../services/usuarioService";
import {
  excluirAnimal,
  listarAnimais,
} from "../../services/animalService";
import {
  atualizarStatusAdocao,
  excluirAdocao,
  listarAdocoes,
} from "../../services/adocaoService";
import {
  formatAdocaoStatus,
  formatAnimalStatus,
  getAnimalImageUrl,
} from "../../utils/animalFormat";
import { redimensionarImagem } from "../../utils/imageResize";
import type { EnderecoResponse, PessoaResponse } from "../../types/endereco";
import type { AnimalResponse } from "../../types/animal";
import type { AdocaoResponse } from "../../types/adocao";
import "./Account.css";

function Account() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(() => getUsuarioLogado());

  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const [erroFoto, setErroFoto] = useState("");

  const [pessoa, setPessoa] = useState<PessoaResponse | null>(null);
  const [endereco, setEndereco] = useState<EnderecoResponse | null>(null);
  const [carregandoEndereco, setCarregandoEndereco] = useState(true);
  const [mostrarFormularioEndereco, setMostrarFormularioEndereco] =
  useState(false);

  const [meusAnimais, setMeusAnimais] = useState<AnimalResponse[]>([]);
  const [carregandoAnimais, setCarregandoAnimais] = useState(true);
  const [mostrarFormularioAnimal, setMostrarFormularioAnimal] =
    useState(false);
  const [animalEmEdicao, setAnimalEmEdicao] = useState<AnimalResponse | null>(
    null
  );

  const [adocoes, setAdocoes] = useState<AdocaoResponse[]>([]);
  const [carregandoAdocoes, setCarregandoAdocoes] = useState(true);
  const [erroAdocaoAcao, setErroAdocaoAcao] = useState("");

  const [sessaoVerificada, setSessaoVerificada] = useState(false);

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    // Confirma no servidor que a conta salva no navegador ainda existe e é a
    // mesma (evita atribuir cadastros a outra conta caso a sessão salva
    // esteja desatualizada/inválida, ex: banco de dados reiniciado). Usa um
    // prazo curto: se a rede estiver lenta ou o servidor não responder a
    // tempo, seguimos com a sessão salva em vez de travar a tela carregando.
    async function validarSessao() {
      try {
        const usuarioAtual = await Promise.race([
          buscarUsuarioPorId(usuario.id),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("tempo esgotado")), 10000)
          ),
        ]);

        const emailConfere =
          usuarioAtual?.email?.toLowerCase() === usuario.email?.toLowerCase();

        if (!emailConfere) {
          removerUsuarioLogado();
          navigate("/login");
          return;
        }

        setSessaoVerificada(true);
      } catch {
        // Não deu para confirmar a tempo (rede lenta, backend "acordando",
        // etc.) — não travamos o usuário aqui, seguimos com a sessão local.
        setSessaoVerificada(true);
      }
    }

    validarSessao();
  }, [usuario, navigate]);

  useEffect(() => {
    async function carregarDadosDaConta() {
      if (!usuario?.id || !sessaoVerificada) {
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
  }, [usuario, sessaoVerificada]);

  useEffect(() => {
    async function carregarAnimais() {
      if (!usuario?.id || !sessaoVerificada) {
        return;
      }

      try {
        setCarregandoAnimais(true);

        const response = await listarAnimais({ size: 100 });

        setMeusAnimais(
          response.content.filter((animal) => animal.usuarioId === usuario.id)
        );
      } catch {
        setMeusAnimais([]);
      } finally {
        setCarregandoAnimais(false);
      }
    }

    carregarAnimais();
  }, [usuario, sessaoVerificada]);

  useEffect(() => {
    async function carregarAdocoes() {
      if (!usuario?.id || !sessaoVerificada) {
        return;
      }

      try {
        setCarregandoAdocoes(true);

        const response = await listarAdocoes();

        setAdocoes(response.content);
      } catch {
        setAdocoes([]);
      } finally {
        setCarregandoAdocoes(false);
      }
    }

    carregarAdocoes();
  }, [usuario, sessaoVerificada]);

  if (!usuario) {
    return null;
  }

  if (!sessaoVerificada) {
    return (
      <main className="account-page">
        <p className="account-loading">Carregando sua conta...</p>
      </main>
    );
  }

  function handleLogout() {
    removerUsuarioLogado();
    navigate("/");
  }

  async function handleSelecionarFotoPerfil(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = event.target.files?.[0];
    event.target.value = "";

    if (!arquivo || !usuario) {
      return;
    }

    if (!arquivo.type.startsWith("image/")) {
      setErroFoto("Selecione um arquivo de imagem (JPG, PNG, etc).");
      return;
    }

    try {
      setEnviandoFoto(true);
      setErroFoto("");

      const dataUrl = await redimensionarImagem(arquivo);
      const usuarioAtualizado = await atualizarFotoUsuario(usuario.id, dataUrl);

      setUsuario(usuarioAtualizado);
      salvarUsuarioLogado(usuarioAtualizado);
    } catch (error) {
      setErroFoto(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a foto de perfil."
      );
    } finally {
      setEnviandoFoto(false);
    }
  }

  function handleEnderecoSalvo(
  pessoaSalva: PessoaResponse,
  enderecoSalvo: EnderecoResponse
) {
  setPessoa(pessoaSalva);
  setEndereco(enderecoSalvo);
  setMostrarFormularioEndereco(false);
}

  function handleNovoAnimal() {
    setAnimalEmEdicao(null);
    setMostrarFormularioAnimal(true);
  }

  function handleEditarAnimal(animal: AnimalResponse) {
    setAnimalEmEdicao(animal);
    setMostrarFormularioAnimal(true);
  }

  function handleAnimalSalvo(animalSalvo: AnimalResponse) {
    setMeusAnimais((atual) => {
      const jaExiste = atual.some((item) => item.id === animalSalvo.id);

      if (jaExiste) {
        return atual.map((item) =>
          item.id === animalSalvo.id ? animalSalvo : item
        );
      }

      return [animalSalvo, ...atual];
    });

    setMostrarFormularioAnimal(false);
    setAnimalEmEdicao(null);
  }

  async function handleExcluirAnimal(animal: AnimalResponse) {
    const confirmado = window.confirm(
      `Tem certeza que deseja excluir ${animal.nome}? Essa ação não pode ser desfeita.`
    );

    if (!confirmado) {
      return;
    }

    try {
      await excluirAnimal(animal.id);
      setMeusAnimais((atual) => atual.filter((item) => item.id !== animal.id));
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o animal."
      );
    }
  }

  async function handleCancelarSolicitacao(adocao: AdocaoResponse) {
    const confirmado = window.confirm(
      `Cancelar sua solicitação de adoção de ${adocao.animalNome ?? "este animal"}?`
    );

    if (!confirmado) {
      return;
    }

    try {
      setErroAdocaoAcao("");
      await excluirAdocao(adocao.id);
      setAdocoes((atual) => atual.filter((item) => item.id !== adocao.id));
    } catch (error) {
      setErroAdocaoAcao(
        error instanceof Error
          ? error.message
          : "Não foi possível cancelar a solicitação."
      );
    }
  }

  async function handleResponderSolicitacao(
    adocao: AdocaoResponse,
    status: "APROVADA" | "RECUSADA"
  ) {
    try {
      setErroAdocaoAcao("");
      const atualizada = await atualizarStatusAdocao(adocao.id, status);
      setAdocoes((atual) =>
        atual.map((item) => (item.id === adocao.id ? atualizada : item))
      );
    } catch (error) {
      setErroAdocaoAcao(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a solicitação."
      );
    }
  }

  const minhasSolicitacoes = adocoes.filter(
    (adocao) => adocao.usuarioId === usuario.id
  );

  const meusAnimaisIds = new Set(meusAnimais.map((animal) => animal.id));
  const solicitacoesRecebidas = adocoes.filter((adocao) =>
    meusAnimaisIds.has(adocao.animalId)
  );

  return (
    <main className="account-page">
      <section className="account-shell">
        <aside className="account-sidebar">
          <Link to="/" className="account-back-button">
            ← Voltar para início
          </Link>

          <div className="account-sidebar__profile">
            <div className="account-avatar">
              {usuario.fotoUrl ? (
                <img src={usuario.fotoUrl} alt="" />
              ) : (
                getInicialUsuario(usuario)
              )}
            </div>

            <div>
              <strong>{usuario.nome}</strong>
              <span>{usuario.email}</span>
            </div>
          </div>

          <nav className="account-menu" aria-label="Menu da conta">
            <a href="#perfil">Perfil</a>
            <a href="#endereco">Endereço</a>
            <a href="#pets">Meus pets</a>
            <a href="#adocoes">Solicitações de adoção</a>
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
                {usuario.fotoUrl ? (
                  <img src={usuario.fotoUrl} alt={`Foto de ${usuario.nome}`} />
                ) : (
                  getInicialUsuario(usuario)
                )}
              </div>

              <div>
                <h2>{usuario.nome}</h2>
                <p>{usuario.email}</p>
                <span className="account-status">
                  {usuario.ativo ? "Conta ativa" : "Conta inativa"}
                </span>

                <label className="account-foto-action">
                  {enviandoFoto ? "Enviando foto..." : "Alterar foto de perfil"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelecionarFotoPerfil}
                    disabled={enviandoFoto}
                    hidden
                  />
                </label>

                {erroFoto && <p className="account-foto-erro">{erroFoto}</p>}
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
            <div className="account-card__header account-card__header--row">
              <div>
                <h2>Meus pets</h2>
                <p className="account-muted">
                  Cadastre animais para adoção e gerencie os que você já
                  publicou no feed.
                </p>
              </div>

              {!mostrarFormularioAnimal && (
                <button
                  type="button"
                  className="account-address-action"
                  onClick={handleNovoAnimal}
                >
                  Cadastrar novo pet
                </button>
              )}
            </div>

            {mostrarFormularioAnimal ? (
              <AnimalForm
                usuarioId={usuario.id}
                animalAtual={animalEmEdicao}
                onSalvo={handleAnimalSalvo}
                onCancel={() => {
                  setMostrarFormularioAnimal(false);
                  setAnimalEmEdicao(null);
                }}
              />
            ) : carregandoAnimais ? (
              <p className="account-muted">Carregando seus pets...</p>
            ) : meusAnimais.length === 0 ? (
              <div className="account-address-empty">
                <div
                  className="account-address-empty__icon"
                  aria-hidden="true"
                >
                  🐾
                </div>
                <h3>Nenhum pet cadastrado</h3>
                <p>
                  Cadastre um animal para que ele apareça no feed de adoção da
                  página inicial.
                </p>
              </div>
            ) : (
              <ul className="account-pets-list">
                {meusAnimais.map((animal) => {
                  const imagemUrl = getAnimalImageUrl(animal.fotoUrl);

                  return (
                    <li key={animal.id} className="account-pet-card">
                      <div className="account-pet-card__media">
                        {imagemUrl ? (
                          <img
                            src={imagemUrl}
                            alt={`Foto de ${animal.nome}`}
                          />
                        ) : (
                          <span aria-hidden="true">
                            {animal.nome.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="account-pet-card__info">
                        <strong>{animal.nome}</strong>
                        <span>
                          {animal.especieNome} · {animal.racaNome}
                        </span>
                        <span className="account-pet-card__status">
                          {formatAnimalStatus(animal.status)}
                        </span>
                      </div>

                      <div className="account-pet-card__actions">
                        <button
                          type="button"
                          onClick={() => handleEditarAnimal(animal)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="account-pet-card__delete"
                          onClick={() => handleExcluirAnimal(animal)}
                        >
                          Excluir
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="account-card" id="adocoes">
            <div className="account-card__header">
              <h2>Solicitações de adoção</h2>
              <p className="account-muted">
                Acompanhe os pedidos de adoção que você enviou e os que
                recebeu para os pets que cadastrou.
              </p>
            </div>

            {erroAdocaoAcao && (
              <p className="account-foto-erro">{erroAdocaoAcao}</p>
            )}

            {carregandoAdocoes ? (
              <p className="account-muted">Carregando solicitações...</p>
            ) : (
              <>
                <h3 className="account-subtitle">Enviadas por mim</h3>

                {minhasSolicitacoes.length === 0 ? (
                  <p className="account-muted">
                    Você ainda não solicitou a adoção de nenhum pet.
                  </p>
                ) : (
                  <ul className="account-pets-list">
                    {minhasSolicitacoes.map((adocao) => (
                      <li key={adocao.id} className="account-pet-card">
                        <div className="account-pet-card__info">
                          <strong>{adocao.animalNome ?? "Animal"}</strong>
                          <span className="account-pet-card__status">
                            {formatAdocaoStatus(adocao.status)}
                          </span>
                          {adocao.observacao && (
                            <span>{adocao.observacao}</span>
                          )}
                        </div>

                        {adocao.status === "SOLICITADA" && (
                          <div className="account-pet-card__actions">
                            <button
                              type="button"
                              className="account-pet-card__delete"
                              onClick={() => handleCancelarSolicitacao(adocao)}
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="account-subtitle">Recebidas para meus pets</h3>

                {solicitacoesRecebidas.length === 0 ? (
                  <p className="account-muted">
                    Nenhuma solicitação recebida até o momento.
                  </p>
                ) : (
                  <ul className="account-pets-list">
                    {solicitacoesRecebidas.map((adocao) => (
                      <li key={adocao.id} className="account-pet-card">
                        <div className="account-pet-card__info">
                          <strong>
                            {adocao.usuarioNome ?? "Interessado"} quer adotar{" "}
                            {adocao.animalNome ?? "este pet"}
                          </strong>
                          <span className="account-pet-card__status">
                            {formatAdocaoStatus(adocao.status)}
                          </span>
                          {adocao.observacao && (
                            <span>{adocao.observacao}</span>
                          )}
                        </div>

                        {(adocao.status === "SOLICITADA" ||
                          adocao.status === "EM_ANALISE") && (
                          <div className="account-pet-card__actions">
                            <button
                              type="button"
                              onClick={() =>
                                handleResponderSolicitacao(adocao, "APROVADA")
                              }
                            >
                              Aprovar
                            </button>
                            <button
                              type="button"
                              className="account-pet-card__delete"
                              onClick={() =>
                                handleResponderSolicitacao(adocao, "RECUSADA")
                              }
                            >
                              Recusar
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        </section>
      </section>
    </main>
  );
}

export default Account;