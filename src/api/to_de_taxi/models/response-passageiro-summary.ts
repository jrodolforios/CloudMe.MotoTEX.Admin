/* tslint:disable */
import { PassageiroSummary } from './passageiro-summary';
import { Notification } from './notification';
export interface ResponsePassageiroSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: PassageiroSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
