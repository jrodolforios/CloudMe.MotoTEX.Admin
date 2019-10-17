/* tslint:disable */
import { InfoMarca } from './info-marca';
import { Notification } from './notification';
export interface ResponseInfoMarca {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: InfoMarca;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
