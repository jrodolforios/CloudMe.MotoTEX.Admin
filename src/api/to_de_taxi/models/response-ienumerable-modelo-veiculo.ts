/* tslint:disable */
import { ModeloVeiculo } from './modelo-veiculo';
import { Notification } from './notification';
export interface ResponseIEnumerableModeloVeiculo {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<ModeloVeiculo>;

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;
}
