/* tslint:disable */
import { EnderecoSummary } from './endereco-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableEnderecoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<EnderecoSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
