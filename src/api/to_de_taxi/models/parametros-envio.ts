/* tslint:disable */
import { MensagemSummary } from './mensagem-summary';
import { DestinatariosMensagem } from './destinatarios-mensagem';
export interface ParametrosEnvio {
  mensagem?: MensagemSummary;
  destinatarios?: DestinatariosMensagem;
}
