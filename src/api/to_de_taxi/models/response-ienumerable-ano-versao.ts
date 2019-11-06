/* tslint:disable */
import { AnoVersao } from './ano-versao';
import { Notification } from './notification';
export interface ResponseIEnumerableAnoVersao {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<AnoVersao>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}