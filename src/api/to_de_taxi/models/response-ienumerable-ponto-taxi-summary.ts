/* tslint:disable */
import { PontoTaxiSummary } from './ponto-taxi-summary';
import { Notification } from './notification';
export interface ResponseIEnumerablePontoTaxiSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<PontoTaxiSummary>;

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
