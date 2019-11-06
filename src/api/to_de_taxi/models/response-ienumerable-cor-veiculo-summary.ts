/* tslint:disable */
import { CorVeiculoSummary } from './cor-veiculo-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableCorVeiculoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<CorVeiculoSummary>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}