/* tslint:disable */
import { EnderecoSummary } from './endereco-summary';
import { UsuarioSummary } from './usuario-summary';
export interface PassageiroSummary {
  id?: string;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  endereco?: EnderecoSummary;
  usuario?: UsuarioSummary;
}
