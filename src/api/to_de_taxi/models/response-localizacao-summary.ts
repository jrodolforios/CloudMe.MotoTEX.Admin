/* tslint:disable */
import { LocalizacaoSummary } from './localizacao-summary';
import { Notification } from './notification';
export interface ResponseLocalizacaoSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: LocalizacaoSummary;

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
