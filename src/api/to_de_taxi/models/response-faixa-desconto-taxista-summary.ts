/* tslint:disable */
import { FaixaDescontoTaxistaSummary } from './faixa-desconto-taxista-summary';
import { Notification } from './notification';
export interface ResponseFaixaDescontoTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: FaixaDescontoTaxistaSummary;

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
