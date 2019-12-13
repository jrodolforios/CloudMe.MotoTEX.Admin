/* tslint:disable */
import { ContratoSummary } from './contrato-summary';
import { Notification } from './notification';
export interface ResponseContratoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: ContratoSummary;

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
