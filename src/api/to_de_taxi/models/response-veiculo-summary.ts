/* tslint:disable */
import { VeiculoSummary } from './veiculo-summary';
import { Notification } from './notification';
export interface ResponseVeiculoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: VeiculoSummary;

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
