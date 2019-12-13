/* tslint:disable */
import { UsuarioGrupoUsuarioSummary } from './usuario-grupo-usuario-summary';
import { Notification } from './notification';
export interface ResponseIEnumerableUsuarioGrupoUsuarioSummary {

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: Array<UsuarioGrupoUsuarioSummary>;

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
