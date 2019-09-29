/* tslint:disable */
import { GrupoUsuarioSummary } from './grupo-usuario-summary';
import { Notification } from './notification';
export interface ResponseGrupoUsuarioSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: GrupoUsuarioSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
