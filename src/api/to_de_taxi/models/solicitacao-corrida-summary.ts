/* tslint:disable */
export interface SolicitacaoCorridaSummary {
  tempoDisponivel?: number;
  id?: string;
  idLocalizacaoOrigem?: string;
  idLocalizacaoDestino?: string;
  idRota?: string;
  idFormaPagamento?: string;
  idFaixaDesconto?: string;
  tipoAtendimento?: 0 | 1 | 2 | 3;
  data?: string;
  eta?: number;
  idPassageiro?: string;
  valorEstimado?: number;
  valorProposto?: number;
  isInterUrbano?: boolean;
  situacao?: 0 | 1 | 2 | 3 | 4;
  statusMonitoramento?: 0 | 1 | 2 | 3 | 4;
  idxFaixaBusca?: number;
  latitudeOrigem?: string;
  longitudeOrigem?: string;
  latitudeDestino?: string;
  longitudeDestino?: string;
}
