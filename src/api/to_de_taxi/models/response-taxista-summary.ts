/* tslint:disable */
import { TaxistaSummary } from './taxista-summary';
import { Notification } from './notification';
export interface ResponseTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: TaxistaSummary;

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
