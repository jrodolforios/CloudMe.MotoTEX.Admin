/* tslint:disable */
import { FormaPagamentoTaxistaSummary } from './forma-pagamento-taxista-summary';
import { Notification } from './notification';
export interface ResponseFormaPagamentoTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: FormaPagamentoTaxistaSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}