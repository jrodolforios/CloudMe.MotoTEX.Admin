/* tslint:disable */
import { Notification } from './notification';
import { EstatisticasSolicitacoesCorrida } from './estatisticas-solicitacoes-corrida';
export interface ResponseEstatisticasSolicitacoesCorrida {

  /**
   * Indica se a operação foi bem sucedida
   */
  success?: boolean;

  /**
   * Notificações do domínio.
   */
  notifications?: Array<Notification>;

  /**
   * Dados vinculados à resposta da operação (de qualquer formato)
   */
  data?: EstatisticasSolicitacoesCorrida;

  /**
   * Utilizado para paginação de resultados
   */
  count?: number;

  /**
   * Código HTTP correspondente
   */
  responseCode?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 300 | 301 | 301 | 302 | 302 | 303 | 303 | 304 | 305 | 306 | 307 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 421 | 422 | 423 | 424 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
}
