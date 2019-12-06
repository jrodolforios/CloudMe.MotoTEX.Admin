/* tslint:disable */
import { EmergenciaSummary } from './emergencia-summary';
import { Notification } from './notification';
export interface ResponseEmergenciaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: EmergenciaSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
