/* tslint:disable */
import { UsuarioSummary } from './usuario-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableUsuarioSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<UsuarioSummary>;

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
