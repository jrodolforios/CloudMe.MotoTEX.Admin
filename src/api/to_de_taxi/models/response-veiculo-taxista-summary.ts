/* tslint:disable */
import { VeiculoTaxistaSummary } from './veiculo-taxista-summary';
import { Notification } from './notification';
export interface ResponseVeiculoTaxistaSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: VeiculoTaxistaSummary;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
