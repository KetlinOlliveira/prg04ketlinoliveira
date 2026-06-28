import { useEffect, useState } from "react";
import {
  atualizarEndereco,
  buscarCep,
  cadastrarEndereco,
} from "../../services/enderecoService";
import {
  atualizarPessoa,
  cadastrarPessoa,
} from "../../services/pessoaService";
import type {
  EnderecoRequest,
  EnderecoResponse,
  PessoaResponse,
} from "../../types/endereco";
import "./AddressForm.css";

interface AddressFormProps {
  usuarioId: number;
  pessoaAtual: PessoaResponse | null;
  enderecoAtual: EnderecoResponse | null;
  onEnderecoSalvo: (
    pessoa: PessoaResponse,
    endereco: EnderecoResponse
  ) => void;
  onCancel?: () => void;
}

function AddressForm({
  usuarioId,
  pessoaAtual,
  enderecoAtual,
  onEnderecoSalvo,
  onCancel,
}: AddressFormProps) {
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">("sucesso");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (pessoaAtual) {
      setCpf(pessoaAtual.cpf ?? "");
      setTelefone(pessoaAtual.telefone ?? "");
      setDataNascimento(pessoaAtual.dataNascimento ?? "");
    }

    if (enderecoAtual) {
      setCep(enderecoAtual.cep ?? "");
      setEstado(enderecoAtual.estado ?? "");
      setCidade(enderecoAtual.cidade ?? "");
      setBairro(enderecoAtual.bairro ?? "");
      setRua(enderecoAtual.rua ?? "");
      setNumero(enderecoAtual.numero ?? "");
      setComplemento(enderecoAtual.complemento ?? "");
    }
  }, [pessoaAtual, enderecoAtual]);

  function limparCep(value: string) {
    return value.replace(/\D/g, "");
  }

  function validarFormulario() {
    if (!cpf.trim()) {
      return "Informe o CPF para vincular o endereço à sua conta.";
    }

    if (!cep.trim()) {
      return "Informe o CEP.";
    }

    if (limparCep(cep).length !== 8) {
      return "O CEP deve ter 8 números.";
    }

    if (!estado.trim()) {
      return "Informe o estado.";
    }

    if (!cidade.trim()) {
      return "Informe a cidade.";
    }

    return "";
  }

  async function handleBuscarCep() {
    const cepLimpo = limparCep(cep);

    if (cepLimpo.length !== 8) {
      setTipoMensagem("erro");
      setMensagem("Digite um CEP válido com 8 números.");
      return;
    }

    try {
      setBuscandoCep(true);
      setMensagem("");

      const dadosCep = await buscarCep(cepLimpo);

      setCep(dadosCep.cep ?? cepLimpo);
      setEstado(dadosCep.state ?? "");
      setCidade(dadosCep.city ?? "");
      setBairro(dadosCep.neighborhood ?? "");
      setRua(dadosCep.street ?? "");

      setTipoMensagem("sucesso");
      setMensagem("Endereço encontrado pelo CEP.");
    } catch (error) {
      setTipoMensagem("erro");
      setMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível buscar o CEP."
      );
    } finally {
      setBuscandoCep(false);
    }
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

      const enderecoPayload: EnderecoRequest = {
        cep: limparCep(cep),
        estado: estado.trim(),
        cidade: cidade.trim(),
        bairro: bairro.trim(),
        rua: rua.trim(),
        numero: numero.trim(),
        complemento: complemento.trim(),
      };

      const enderecoSalvo = enderecoAtual?.id
        ? await atualizarEndereco(enderecoAtual.id, enderecoPayload)
        : await cadastrarEndereco(enderecoPayload);

      const pessoaPayload = {
        cpf: cpf.trim(),
        telefone: telefone.trim(),
        dataNascimento: dataNascimento || null,
        usuarioId,
        enderecoId: enderecoSalvo.id,
      };

      const pessoaSalva = pessoaAtual?.id
        ? await atualizarPessoa(pessoaAtual.id, pessoaPayload)
        : await cadastrarPessoa(pessoaPayload);

      onEnderecoSalvo(pessoaSalva, enderecoSalvo);

      setTipoMensagem("sucesso");
      setMensagem("Endereço salvo com sucesso.");
    } catch (error) {
      setTipoMensagem("erro");
      setMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o endereço."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <div className="address-form__grid">
        <label className="address-form__field">
          CPF
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Telefone
          <input
            type="text"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Data de nascimento
          <input
            type="date"
            value={dataNascimento}
            onChange={(event) => setDataNascimento(event.target.value)}
          />
        </label>

        <label className="address-form__field address-form__field--cep">
          CEP
          <div className="address-form__cep-row">
            <input
              type="text"
              placeholder="00000000"
              value={cep}
              onChange={(event) => setCep(event.target.value)}
            />

            <button
              type="button"
              className="address-form__cep-button"
              onClick={handleBuscarCep}
              disabled={buscandoCep}
            >
              {buscandoCep ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </label>

        <label className="address-form__field">
          Estado
          <input
            type="text"
            placeholder="BA"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Cidade
          <input
            type="text"
            placeholder="Irecê"
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Bairro
          <input
            type="text"
            placeholder="Centro"
            value={bairro}
            onChange={(event) => setBairro(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Rua
          <input
            type="text"
            placeholder="Rua, avenida..."
            value={rua}
            onChange={(event) => setRua(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Número
          <input
            type="text"
            placeholder="123"
            value={numero}
            onChange={(event) => setNumero(event.target.value)}
          />
        </label>

        <label className="address-form__field">
          Complemento
          <input
            type="text"
            placeholder="Casa, bloco, referência..."
            value={complemento}
            onChange={(event) => setComplemento(event.target.value)}
          />
        </label>
      </div>

      {mensagem && (
        <p
          className={`address-form__message address-form__message--${tipoMensagem}`}
        >
          {mensagem}
        </p>
      )}

      <button type="submit" className="address-form__submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar endereço"}
      </button>
    </form>
  );
}

export default AddressForm;