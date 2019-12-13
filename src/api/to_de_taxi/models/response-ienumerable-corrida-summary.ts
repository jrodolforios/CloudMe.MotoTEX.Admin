/* tslint:disable */
import { CorridaSummary } from './corrida-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableCorridaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<CorridaSummary>;

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
