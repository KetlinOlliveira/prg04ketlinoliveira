/*
  Redimensiona e compacta uma imagem no navegador (sem backend), gerando um
  data URL (base64) pronto para ser salvo direto no campo fotoUrl.

  Necessário porque a API hoje só aceita fotoUrl como texto (uma URL) — não
  existe endpoint de upload de arquivo. Isso permite ao usuário escolher uma
  foto do computador mesmo assim, mantendo o arquivo pequeno o bastante para
  caber num campo de texto do banco.
*/

const LADO_MAXIMO = 900;
const TAMANHO_ALVO = 700_000; // ~700KB em base64
const TAMANHO_LIMITE = 950_000; // ~950KB em base64

function lerComoDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject(new Error("Arquivo de imagem inválido."));
    img.onload = () => resolve(img);
    img.src = src;
  });
}

export async function redimensionarImagem(file: File): Promise<string> {
  const dataUrlOriginal = await lerComoDataUrl(file);
  const img = await carregarImagem(dataUrlOriginal);

  let { width, height } = img;

  if (width > height && width > LADO_MAXIMO) {
    height = Math.round((height * LADO_MAXIMO) / width);
    width = LADO_MAXIMO;
  } else if (height > LADO_MAXIMO) {
    width = Math.round((width * LADO_MAXIMO) / height);
    height = LADO_MAXIMO;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const contexto = canvas.getContext("2d");
  if (!contexto) {
    throw new Error("Não foi possível processar essa imagem.");
  }

  contexto.drawImage(img, 0, 0, width, height);

  let qualidade = 0.82;
  let resultado = canvas.toDataURL("image/jpeg", qualidade);

  while (resultado.length > TAMANHO_ALVO && qualidade > 0.35) {
    qualidade -= 0.15;
    resultado = canvas.toDataURL("image/jpeg", qualidade);
  }

  if (resultado.length > TAMANHO_LIMITE) {
    throw new Error(
      "Essa imagem ficou grande demais mesmo depois de compactada. Tente uma foto menor."
    );
  }

  return resultado;
}
