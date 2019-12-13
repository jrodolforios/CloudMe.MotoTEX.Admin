/* tslint:disable */
import { TarifaSummary } from './tarifa-summary';
import { Notification } from './notification';
export interface ResponseTarifaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: TarifaSummary;

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
