/* tslint:disable */
export interface SolicitacaoCorridaSummary {
  id?: string;
  idPassageiro?: string;
  idLocalizacaoOrigem?: string;
  idLocalizacaoDestino?: string;
  idRota?: string;
  idFormaPagamento?: string;
  idFaixaDesconto?: string;
  tipoAtendimento?: 0 | 1 | 2 | 3;
  data?: string;
  eta?: number;
  tempoDisponivel?: number;
  valorEstimado?: number;
  valorProposto?: number;
  isInterUrbano?: boolean;
  situacao?: 0 | 1 | 2 | 3 | 4;
}
