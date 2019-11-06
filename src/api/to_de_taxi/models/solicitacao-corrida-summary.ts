/* tslint:disable */
export interface SolicitacaoCorridaSummary {
  tipoAtendimento?: 0 | 1 | 2 | 3;
  id?: string;
  idLocalizacaoOrigem?: string;
  idLocalizacaoDestino?: string;
  idRota?: string;
  idFormaPagamento?: string;
  idFaixaDesconto?: string;
  idPassageiro?: string;
  data?: string;
  eta?: number;
  tempoDisponivel?: number;
  valorEstimado?: number;
  valorProposto?: number;
  situacao?: 0 | 1 | 2 | 3;
}
