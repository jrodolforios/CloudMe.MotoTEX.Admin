/* tslint:disable */
import { SolicitacaoCorridaSummary } from './solicitacao-corrida-summary';
import { Notification } from './notification';
export interface ResponseSolicitacaoCorridaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: SolicitacaoCorridaSummary;

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
