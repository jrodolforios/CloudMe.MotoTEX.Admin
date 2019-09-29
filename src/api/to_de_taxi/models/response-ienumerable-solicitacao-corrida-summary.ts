/* tslint:disable */
import { SolicitacaoCorridaSummary } from './solicitacao-corrida-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableSolicitacaoCorridaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<SolicitacaoCorridaSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
