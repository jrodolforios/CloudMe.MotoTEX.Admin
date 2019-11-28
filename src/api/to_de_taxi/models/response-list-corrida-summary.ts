/* tslint:disable */
import { CorridaSummary } from './corrida-summary';
import { Notification } from './notification';
export interface ResponseListCorridaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<CorridaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
