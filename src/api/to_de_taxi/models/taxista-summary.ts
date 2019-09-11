/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { LocalizacaoSummary } from './localizacao-summary';
export interface TaxistaSummary {
  id?: string;
  cpf?: string;
  rg?: string;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  idPontoTaxi?: string;
  usuario?: UsuarioSummary;
  endereco?: LocalizacaoSummary;
}
