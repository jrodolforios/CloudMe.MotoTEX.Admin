/* tslint:disable */
import { FaixaDescontoTaxistaSummary } from './faixa-desconto-taxista-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableFaixaDescontoTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<FaixaDescontoTaxistaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
