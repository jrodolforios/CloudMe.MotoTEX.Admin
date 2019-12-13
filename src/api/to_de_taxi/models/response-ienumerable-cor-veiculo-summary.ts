/* tslint:disable */
import { CorVeiculoSummary } from './cor-veiculo-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableCorVeiculoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<CorVeiculoSummary>;

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
