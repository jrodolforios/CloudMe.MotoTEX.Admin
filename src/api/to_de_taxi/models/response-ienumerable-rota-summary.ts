/* tslint:disable */
import { RotaSummary } from './rota-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableRotaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<RotaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
