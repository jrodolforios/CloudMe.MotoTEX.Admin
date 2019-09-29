/* tslint:disable */
import { TarifaSummary } from './tarifa-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableTarifaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<TarifaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
