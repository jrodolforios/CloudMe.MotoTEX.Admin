/* tslint:disable */
import { LocalizacaoSummary } from './localizacao-summary';
export interface PassageiroSummary {
  id?: string;
  idUsuario?: string;
  cpf?: string;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  endereco?: LocalizacaoSummary;
}
