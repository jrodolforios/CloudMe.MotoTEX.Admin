/* tslint:disable */
import { TaxistaSummary } from './taxista-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<TaxistaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
