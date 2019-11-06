/* tslint:disable */
import { CorVeiculoSummary } from './cor-veiculo-summary';
import { Notification } from './notification';
export interface ResponseCorVeiculoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: CorVeiculoSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
