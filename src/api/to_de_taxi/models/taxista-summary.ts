/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { EnderecoSummary } from './endereco-summary';
import { FotoSummary } from './foto-summary';
export interface TaxistaSummary {
  id?: string;
  ativo?: boolean;
  disponivel?: boolean;
  idLocalizacaoAtual?: string;
  idPontoTaxi?: string;
  usuario?: UsuarioSummary;
  endereco?: EnderecoSummary;
  foto?: FotoSummary;
}
