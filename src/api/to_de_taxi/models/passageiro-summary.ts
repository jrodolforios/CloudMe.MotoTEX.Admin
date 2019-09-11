/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { LocalizacaoSummary } from './localizacao-summary';
export interface PassageiroSummary {
  id?: string;
  cpf?: string;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  usuario?: UsuarioSummary;
  endereco?: LocalizacaoSummary;
}
