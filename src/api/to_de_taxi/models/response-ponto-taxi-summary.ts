/* tslint:disable */
import { PontoTaxiSummary } from './ponto-taxi-summary';
import { Notification } from './notification';
export interface ResponsePontoTaxiSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: PontoTaxiSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
