/* tslint:disable */
import { EmergenciaSummary } from './emergencia-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableEmergenciaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<EmergenciaSummary>;

  /**
   * Utilizado para paginação de resultados
   */
  count?: number;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
