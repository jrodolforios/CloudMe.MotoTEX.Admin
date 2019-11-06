/* tslint:disable */
import { Notification } from './notification';
export interface ResponseDecimal {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: number;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
