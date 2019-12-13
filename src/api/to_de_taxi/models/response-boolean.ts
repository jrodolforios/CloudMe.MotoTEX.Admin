/* tslint:disable */
import { Notification } from './notification';
export interface ResponseBoolean {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: boolean;

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
