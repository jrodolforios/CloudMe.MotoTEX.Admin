/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { Notification } from './notification';
export interface ResponseUsuarioSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: UsuarioSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
