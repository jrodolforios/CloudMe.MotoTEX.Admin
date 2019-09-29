/* tslint:disable */
import { UsuarioGrupoUsuarioSummary } from './usuario-grupo-usuario-summary';
import { Notification } from './notification';
export interface ResponseUsuarioGrupoUsuarioSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: UsuarioGrupoUsuarioSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
