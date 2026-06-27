// Tipos do Quiz "Qual pet combina com você?".
// Mantidos isolados para facilitar a montagem das perguntas e,
// no futuro, a troca por dados vindos de uma API.

export interface QuizOption {
  /** Identificador único da alternativa dentro da pergunta */
  id: string;
  /** Emoji exibido no canto do card (opcional, pode deixar "") */
  emoji: string;
  /** Texto principal da alternativa. Ex.: "Não costumo" */
  title: string;
  /** Texto de apoio menor, abaixo do título (opcional) */
  description?: string;
}

export interface QuizQuestion {
  /** Identificador único da pergunta */
  id: string;
  /** Enunciado da pergunta */
  question: string;
  /** Lista de alternativas da pergunta */
  options: QuizOption[];
}

// Respostas escolhidas pelo usuário: { [idDaPergunta]: idDaAlternativa }
export type QuizAnswers = Record<string, string>;

// Etapas/telas possíveis do fluxo do quiz.
export type QuizStep = "intro" | "question" | "result";
