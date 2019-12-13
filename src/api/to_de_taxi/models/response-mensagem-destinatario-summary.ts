/* tslint:disable */
import { MensagemDestinatarioSummary } from './mensagem-destinatario-summary';
import { Notification } from './notification';
export interface ResponseMensagemDestinatarioSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: MensagemDestinatarioSummary;

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
