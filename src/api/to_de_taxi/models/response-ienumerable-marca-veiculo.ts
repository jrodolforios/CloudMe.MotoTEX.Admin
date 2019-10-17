/* tslint:disable */
import { MarcaVeiculo } from './marca-veiculo';
import { Notification } from './notification';
export interface ResponseIEnumerableMarcaVeiculo {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<MarcaVeiculo>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
