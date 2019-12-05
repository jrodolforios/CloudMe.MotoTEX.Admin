/* tslint:disable */
import { Notification } from './notification';
export interface ResponseIEnumerableGuid {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<string>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
