/* tslint:disable */
import { FotoSummary } from './foto-summary';
import { Notification } from './notification';
export interface ResponseFotoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: FotoSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
