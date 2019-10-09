/* tslint:disable */
import { CredenciaisUsuario } from './credenciais-usuario';
export interface UsuarioSummary {
  id?: string;
  nome?: string;
  cpf?: string;
  rg?: string;
  telefone?: string;
  email?: string;
  credenciais?: CredenciaisUsuario;
}
