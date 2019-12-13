/* tslint:disable */
import { FormaPagamentoSummary } from './forma-pagamento-summary';
import { Notification } from './notification';
export interface ResponseFormaPagamentoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: FormaPagamentoSummary;

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
