import { Injectable } from '@angular/core';
import { TaxistaService, FotoService } from '../../../api/to_de_taxi/services';
import { BehaviorSubject } from 'rxjs';
import { TaxistaSummary, FotoSummary, LocalizacaoSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';

export interface TaxistaExt extends TaxistaSummary
{
	fotoSummary: FotoSummary;
	arquivoFoto: File;
}

export const emptyUUID = '00000000-0000-0000-0000-000000000000';

@Injectable({
	providedIn: 'root'
})
export class TaxistasControllerService
{
	taxistas = new BehaviorSubject<TaxistaExt[]>([]);
	taxistaSelecionado = new BehaviorSubject<TaxistaExt>(null);

	// indicação de carregamento de dados da API em background
	busyStackAtualizar = new BusyStack();
	busyStackRemover = new BusyStack();
	busyStackCriar = new BusyStack();
	busyStackAlterar = new BusyStack();

	constructor(
		private taxistasSrv: TaxistaService,
		private fotoSrv: FotoService)
	{
	}

	public instanciarTaxista(sumario?: TaxistaSummary): TaxistaExt
	{
		let taxista: TaxistaExt;
		if (sumario)
		{
			taxista =
			{
				id: sumario.id,
				rg: sumario.rg,
				cpf: sumario.cpf,
				usuario: sumario.usuario,
				endereco: sumario.endereco,
				idPontoTaxi: sumario.idPontoTaxi,
				idLocalizacaoAtual: sumario.idLocalizacaoAtual,
				idFoto: sumario.idFoto,
				fotoSummary:
				{
					id: emptyUUID,
					dados: null,
					nome: '',
					nomeArquivo: ''
				},
				arquivoFoto: null
			};
		}
		else
		{
			taxista =
			{
				id: emptyUUID,
				rg: '',
				cpf: '',
				usuario:
				{
					id: emptyUUID,
					nome: '',
					login: '',
					email: '',
					senha: '',
					confirmarSenha: '',
					telefone: ''
				},
				endereco:
				{
					id: emptyUUID,
					cep: '',
					logradouro: '',
					numero: '',
					complemento: '',
					bairro: '',
					localidade: '',
					uf: ''
				},
				idLocalizacaoAtual: null,
				idPontoTaxi: null,
				idFoto: '',
				arquivoFoto: null,
				fotoSummary:
				{
					id: emptyUUID,
					dados: null,
					nome: '',
					nomeArquivo: ''
				}
			};
		}

		return taxista;
	}

	private criarSumario(taxista: TaxistaExt): TaxistaSummary
	{
		const summary: TaxistaSummary = {
			id: taxista.id,
			usuario:
			{
				id: taxista.usuario.id,
				nome: taxista.usuario.nome,
				email: taxista.usuario.email,
				telefone: taxista.usuario.telefone,
				login: taxista.usuario.login,
				senha: taxista.usuario.senha,
				confirmarSenha: taxista.usuario.confirmarSenha
			},
			cpf: taxista.cpf,
			rg: taxista.rg,
			endereco:
			{
				cep: taxista.endereco.cep,
				logradouro: taxista.endereco.logradouro,
				numero: taxista.endereco.numero,
				complemento: taxista.endereco.complemento,
				bairro: taxista.endereco.bairro,
				localidade: taxista.endereco.localidade,
				uf: taxista.endereco.uf
			},
			idFoto: taxista.idFoto,
			idPontoTaxi: taxista.idPontoTaxi
		};

		return summary;
	}

	public async atualizar()
	{
		const self = this;
		await self.obterTaxistas();
	}

	private async obterTaxistas()
	{
		const self = this;

		self.busyStackAtualizar.push();

		const taxistas: TaxistaExt[] = [];

		// obtém informações de acesso dos usuários
		await self.taxistasSrv.ApiV1TaxistaGet().toPromise().then(async res_taxistas => {

			res_taxistas.forEach(taxista_sum => {
				taxistas.push(self.instanciarTaxista(taxista_sum));
			});
		});

		self.taxistas.next(taxistas);

		self.busyStackAtualizar.pop();
	}

	async enviarFoto(fotoSummary: FotoSummary)
	{
		const self = this;

		if (fotoSummary.id)
		{
			await self.fotoSrv.ApiV1FotoPut(fotoSummary).toPromise().then(_ => {});
		}
		else
		{
			fotoSummary.id = emptyUUID; // para serializalçao do parâmetro
			await self.fotoSrv.ApiV1FotoPost(fotoSummary).toPromise().then(id_foto =>
			{
				fotoSummary.id = id_foto;
			});
		}
	}

	async removerFoto(fotoSummary: FotoSummary)
	{
		const self = this;
		if (fotoSummary.id)
		{
			await self.fotoSrv.ApiV1FotoByIdGet(fotoSummary.id).toPromise().then(_ =>
			{
				fotoSummary.id = '';
			});
		}
	}

	async criarTaxista(novo_taxista: TaxistaExt)
	{
		const self = this;

		try
		{
			self.busyStackCriar.push();

			const taxistaSummary = this.criarSumario(novo_taxista);

			// cria o registro do taxista
			await self.taxistasSrv.ApiV1TaxistaPost(taxistaSummary).toPromise().then(async id_taxista =>
			{
				if (id_taxista)
				{
					novo_taxista.id = id_taxista;
					await self.enviarFoto(novo_taxista.fotoSummary);
				}
				else
				{
				}
			})
			.catch(reason =>
			{
				throw new Error(`${reason}`);
			});
		}
		finally
		{
			self.busyStackCriar.pop();
			self.atualizar();
		}
	}

	async alterarTaxista(oldTaxista: TaxistaExt, newTaxista: TaxistaExt)
	{
		const self = this;

		try
		{
			self.busyStackAlterar.push();

			await self.taxistasSrv.ApiV1TaxistaPut(newTaxista).toPromise().then(async res_edit_usr =>
			{
				if (newTaxista.fotoSummary.nomeArquivo !== oldTaxista.fotoSummary.nomeArquivo)
				{
					await self.enviarFoto(newTaxista.fotoSummary);
				}
			})
			.catch(reason =>
			{
				throw new Error(`${reason}`);
			});
		}
		finally
		{
			self.busyStackAlterar.pop();
			self.atualizar();
		}
	}

	async removerTaxista(taxista: TaxistaExt)
	{
		const self = this;

		try
		{
			self.busyStackRemover.push();

			await self.removerFoto(taxista.fotoSummary);

			await self.taxistasSrv.ApiV1TaxistaByIdDelete(taxista.id).toPromise().then(_ => {});
		}
		finally
		{
			self.busyStackRemover.pop();
		}
	}
}
