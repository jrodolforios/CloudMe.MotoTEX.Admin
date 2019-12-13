/* tslint:disable */
import { CorridaSummary } from './corrida-summary';
import { Notification } from './notification';
export interface ResponseCorridaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: CorridaSummary;

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
