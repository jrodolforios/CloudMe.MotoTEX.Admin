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
  tipo?: 0 | 1 | 2 | 3;
}
