import { useEffect, useState } from "react";
import {
  atualizarAnimal,
  criarAnimal,
  listarEspecies,
  listarRacas,
} from "../../services/animalService";
import { redimensionarImagem } from "../../utils/imageResize";
import type {
  AnimalRequest,
  AnimalResponse,
  EspecieResponse,
  RacaResponse,
} from "../../types/animal";
import "./AnimalForm.css";

// Formulário de cadastro/edição de um animal para adoção, usado na seção
// "Meus pets" da página de Conta. O mesmo formulário serve pros dois casos:
// se "animalAtual" vier preenchido, edita; senão, cadastra um novo.
interface AnimalFormProps {
  usuarioId: number;
  animalAtual: AnimalResponse | null;
  onSalvo: (animal: AnimalResponse) => void;
  onCancel: () => void;
}

const PORTES = ["Pequeno", "Médio", "Grande"];

function AnimalForm({
  usuarioId,
  animalAtual,
  onSalvo,
  onCancel,
}: AnimalFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");
  const [sexo, setSexo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [especieId, setEspecieId] = useState<string>("");
  const [racaId, setRacaId] = useState<string>("");

  const [especies, setEspecies] = useState<EspecieResponse[]>([]);
  const [racas, setRacas] = useState<RacaResponse[]>([]);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">(
    "sucesso"
  );
  const [salvando, setSalvando] = useState(false);
  const [processandoFoto, setProcessandoFoto] = useState(false);
  const [erroFoto, setErroFoto] = useState("");

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        const [especiesResponse, racasResponse] = await Promise.all([
          listarEspecies(),
          listarRacas(),
        ]);

        setEspecies(especiesResponse.content);
        setRacas(racasResponse.content);
      } catch {
        setEspecies([]);
        setRacas([]);
      }
    }

    carregarOpcoes();
  }, []);

  useEffect(() => {
    if (!animalAtual) {
      return;
    }

    setNome(animalAtual.nome ?? "");
    setIdade(
      animalAtual.idade || animalAtual.idade === 0
        ? String(animalAtual.idade)
        : ""
    );
    setPorte(animalAtual.porte ?? "");
    setSexo(animalAtual.sexo ?? "");
    setDescricao(animalAtual.descricao ?? "");
    setFotoUrl(animalAtual.fotoUrl ?? "");
    setEspecieId(String(animalAtual.especieId ?? ""));
    setRacaId(String(animalAtual.racaId ?? ""));
  }, [animalAtual]);

  const racasDaEspecie = racas.filter(
    (raca) => String(raca.especieId ?? "") === especieId
  );

  function handleEspecieChange(valor: string) {
    setEspecieId(valor);
    setRacaId("");
  }

  async function handleSelecionarFoto(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = event.target.files?.[0];
    event.target.value = "";

    if (!arquivo) {
      return;
    }

    if (!arquivo.type.startsWith("image/")) {
      setErroFoto("Selecione um arquivo de imagem (JPG, PNG, etc).");
      return;
    }

    try {
      setProcessandoFoto(true);
      setErroFoto("");

      const dataUrl = await redimensionarImagem(arquivo);
      setFotoUrl(dataUrl);
    } catch (error) {
      setErroFoto(
        error instanceof Error
          ? error.message
          : "Não foi possível processar essa imagem."
      );
    } finally {
      setProcessandoFoto(false);
    }
  }

  function handleRemoverFoto() {
    setFotoUrl("");
    setErroFoto("");
  }

  function validarFormulario() {
    if (!nome.trim()) {
      return "Informe o nome do animal.";
    }

    if (!especieId) {
      return "Selecione a espécie.";
    }

    if (!racaId) {
      return "Selecione a raça.";
    }

    if (!idade.trim() || Number.isNaN(Number(idade)) || Number(idade) < 0) {
      return "Informe uma idade válida (em anos).";
    }

    if (!porte) {
      return "Selecione o porte.";
    }

    if (!sexo) {
      return "Selecione o sexo.";
    }

    return "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const erro = validarFormulario();

    if (erro) {
      setTipoMensagem("erro");
      setMensagem(erro);
      return;
    }

    try {
      setSalvando(true);
      setMensagem("");

      const payload: AnimalRequest = {
        nome: nome.trim(),
        idade: Number(idade),
        porte,
        sexo,
        descricao: descricao.trim(),
        fotoUrl: fotoUrl.trim(),
        usuarioId,
        especieId: Number(especieId),
        racaId: Number(racaId),
      };

      const animalSalvo = animalAtual?.id
        ? await atualizarAnimal(animalAtual.id, payload)
        : await criarAnimal(payload);

      onSalvo(animalSalvo);

      setTipoMensagem("sucesso");
      setMensagem("Animal salvo com sucesso.");
    } catch (error) {
      setTipoMensagem("erro");
      setMensagem(
        error instanceof Error ? error.message : "Não foi possível salvar o animal."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="animal-form" onSubmit={handleSubmit}>
      <div className="animal-form__grid">
        <label className="animal-form__field">
          Nome
          <input
            type="text"
            placeholder="Ex: Minu"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </label>

        <label className="animal-form__field">
          Espécie
          <select
            value={especieId}
            onChange={(event) => handleEspecieChange(event.target.value)}
          >
            <option value="">Selecione</option>
            {especies.map((especie) => (
              <option key={especie.id} value={especie.id}>
                {especie.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="animal-form__field">
          Raça
          <select
            value={racaId}
            onChange={(event) => setRacaId(event.target.value)}
            disabled={!especieId}
          >
            <option value="">Selecione</option>
            {racasDaEspecie.map((raca) => (
              <option key={raca.id} value={raca.id}>
                {raca.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="animal-form__field">
          Idade (em anos)
          <input
            type="number"
            min="0"
            placeholder="Ex: 2"
            value={idade}
            onChange={(event) => setIdade(event.target.value)}
          />
        </label>

        <label className="animal-form__field">
          Porte
          <select
            value={porte}
            onChange={(event) => setPorte(event.target.value)}
          >
            <option value="">Selecione</option>
            {PORTES.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>

        <label className="animal-form__field">
          Sexo
          <select
            value={sexo}
            onChange={(event) => setSexo(event.target.value)}
          >
            <option value="">Selecione</option>
            <option value="MACHO">Macho</option>
            <option value="FEMEA">Fêmea</option>
          </select>
        </label>

        <label className="animal-form__field animal-form__field--full">
          Foto
          <input type="file" accept="image/*" onChange={handleSelecionarFoto} />
        </label>

        {(processandoFoto || erroFoto || fotoUrl) && (
          <div className="animal-form__foto-preview animal-form__field--full">
            {processandoFoto && (
              <p className="animal-form__foto-status">
                Processando imagem...
              </p>
            )}

            {erroFoto && (
              <p className="animal-form__foto-status animal-form__foto-status--erro">
                {erroFoto}
              </p>
            )}

            {fotoUrl && !processandoFoto && (
              <>
                <img src={fotoUrl} alt="Pré-visualização da foto do animal" />
                <button
                  type="button"
                  className="animal-form__foto-remover"
                  onClick={handleRemoverFoto}
                >
                  Remover foto
                </button>
              </>
            )}
          </div>
        )}

        <label className="animal-form__field animal-form__field--full">
          Descrição
          <textarea
            placeholder="Conte um pouco sobre o jeitinho do animal..."
            rows={4}
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </label>
      </div>

      {mensagem && (
        <p
          className={`animal-form__message animal-form__message--${tipoMensagem}`}
        >
          {mensagem}
        </p>
      )}

      <div className="animal-form__actions">
        <button
          type="button"
          className="animal-form__cancel"
          onClick={onCancel}
          disabled={salvando}
        >
          Cancelar
        </button>

        <button type="submit" className="animal-form__submit" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar animal"}
        </button>
      </div>
    </form>
  );
}

export default AnimalForm;
