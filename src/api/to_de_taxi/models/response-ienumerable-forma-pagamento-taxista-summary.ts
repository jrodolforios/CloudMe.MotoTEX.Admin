/* tslint:disable */
import { FormaPagamentoTaxistaSummary } from './forma-pagamento-taxista-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableFormaPagamentoTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<FormaPagamentoTaxistaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
