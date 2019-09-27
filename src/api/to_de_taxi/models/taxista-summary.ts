/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { EnderecoSummary } from './endereco-summary';
export interface TaxistaSummary {
  id?: string;
  cpf?: string;
  rg?: string;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  idPontoTaxi?: string;
  usuario?: UsuarioSummary;
  endereco?: EnderecoSummary;
}
