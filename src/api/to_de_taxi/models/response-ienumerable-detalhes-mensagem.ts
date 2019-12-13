/* tslint:disable */
import { DetalhesMensagem } from './detalhes-mensagem';
import { Notification } from './notification';
export interface ResponseIEnumerableDetalhesMensagem {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<DetalhesMensagem>;

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
