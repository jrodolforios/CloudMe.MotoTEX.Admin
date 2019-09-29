/* tslint:disable */
import { Notification } from './notification';
export interface ResponseGuid {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: string;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
