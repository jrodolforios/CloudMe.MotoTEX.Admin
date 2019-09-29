/* tslint:disable */
import { FormaPagamentoSummary } from './forma-pagamento-summary';
import { Notification } from './notification';
export interface ResponseFormaPagamentoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: FormaPagamentoSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
