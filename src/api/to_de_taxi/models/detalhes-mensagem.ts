/* tslint:disable */
import { DestinatariosMensagem } from './destinatarios-mensagem';
export interface DetalhesMensagem {
  idMensagem?: string;
  idRemetente?: string;
  destinatarios?: DestinatariosMensagem;
  assunto?: string;
  corpo?: string;
  dataEnvio?: string;
  dataRecebimento?: string;
  dataLeitura?: string;
}
