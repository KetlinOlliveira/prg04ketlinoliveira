// Contrato do endpoint /api/adocoes (solicitações de adoção), espelhando os
// DTOs do backend (AdocaoRequestDTO/AdocaoResponseDTO/AdocaoStatusUpdateDTO).
export type AdocaoStatus =
  | "SOLICITADA"
  | "EM_ANALISE"
  | "APROVADA"
  | "RECUSADA"
  | "CANCELADA";

export interface AdocaoResponse {
  id: number;
  dataSolicitacao?: string;
  dataConclusao?: string;
  status: AdocaoStatus;
  observacao?: string;
  usuarioId: number;
  usuarioNome?: string;
  animalId: number;
  animalNome?: string;
}

export interface AdocaoRequest {
  usuarioId: number;
  animalId: number;
  observacao?: string;
}
