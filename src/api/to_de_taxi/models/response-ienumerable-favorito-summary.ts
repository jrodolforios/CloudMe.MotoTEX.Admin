/* tslint:disable */
import { FavoritoSummary } from './favorito-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableFavoritoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<FavoritoSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
