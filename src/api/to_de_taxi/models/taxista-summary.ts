/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { EnderecoSummary } from './endereco-summary';
export interface TaxistaSummary {
  id?: string;
  numeroIdentificacao?: number;
  ativo?: boolean;
  disponivel?: boolean;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  idPontoTaxi?: string;
  usuario?: UsuarioSummary;
  endereco?: EnderecoSummary;
}
