/* tslint:disable */
import { EnderecoSummary } from './endereco-summary';
import { UsuarioSummary } from './usuario-summary';
export interface PassageiroSummary {
  id?: string;
  ativo?: boolean;
  idFoto?: string;
  idLocalizacaoAtual?: string;
  endereco?: EnderecoSummary;
  usuario?: UsuarioSummary;
}
