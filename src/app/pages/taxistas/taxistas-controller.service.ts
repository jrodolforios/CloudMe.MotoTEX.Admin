import { Injectable } from '@angular/core';
import { TaxistaService, FotoService } from '../../../api/to_de_taxi/services';
import { BehaviorSubject } from 'rxjs';
import { TaxistaSummary, FotoSummary, LocalizacaoSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';

export interface TaxistaExt extends TaxistaSummary
{
	fotoSummary: FotoSummary;
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
			};
		}
		else
		{
			taxista =
			{
				id: emptyUUID,
				usuario:
				{
					id: emptyUUID,
					nome: '',
					rg: '',
					cpf: '',
					email: '',
					telefone: '',
					credenciais:
					{
						login: '',
						senha: '',
						confirmarSenha: '',
						senhaAnterior: ''
					}
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
				cpf: taxista.usuario.cpf,
				rg: taxista.usuario.rg,
				email: taxista.usuario.email,
				telefone: taxista.usuario.telefone,
				credenciais:
				{
					login: taxista.usuario.credenciais.login,
					senha: taxista.usuario.credenciais.senha,
					confirmarSenha: taxista.usuario.credenciais.confirmarSenha,
					senhaAnterior: taxista.usuario.credenciais.senhaAnterior
				}
			},
			endereco:
			{
				id: taxista.endereco.id,
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

		let taxistaSel = self.taxistaSelecionado.value;
		const taxistas = self.taxistas.value;

		if (taxistaSel && !taxistas.find(tx => tx.id === taxistaSel.id))
		{
			taxistaSel = null;
		}

		if (!taxistaSel)
		{
			self.taxistaSelecionado.next(taxistas.length > 0 ? taxistas[0] : null);
		}
	}

	private async obterTaxistas()
	{
		const self = this;

		self.busyStackAtualizar.push();

		const taxistas: TaxistaExt[] = [];

		// obtém informações de acesso dos usuários
		await self.taxistasSrv.ApiV1TaxistaGet().toPromise().then(async resp => {
			if (resp.success)
			{
				resp.data.forEach(taxista_sum => {
					taxistas.push(self.instanciarTaxista(taxista_sum));
				});
			}
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
			await self.fotoSrv.ApiV1FotoPost(fotoSummary).toPromise().then(resp =>
			{
				if (resp.success)
				{
					fotoSummary.id = resp.data;
				}
			});
		}
	}

	async removerFoto(fotoSummary: FotoSummary)
	{
		const self = this;
		if (fotoSummary.id && fotoSummary.id !== emptyUUID)
		{
			await self.fotoSrv.ApiV1FotoByIdGet(fotoSummary.id).toPromise().then(_ =>
			{
				fotoSummary.id = '';
			});
		}
	}

	async criarTaxista(novo_taxista: TaxistaExt): Promise<boolean>
	{
		const self = this;
		let result = false;

		try
		{
			self.busyStackCriar.push();

			const taxistaSummary = this.criarSumario(novo_taxista);

			// cria o registro do taxista
			await self.taxistasSrv.ApiV1TaxistaPost(taxistaSummary).toPromise().then(async resp =>
			{
				if (resp.success)
				{
					novo_taxista.id = resp.data;
					await self.enviarFoto(novo_taxista.fotoSummary);

					result = true;
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
			return result;
		}
	}

	async alterarTaxista(oldTaxista: TaxistaExt, newTaxista: TaxistaExt): Promise<boolean>
	{
		const self = this;

		let result = false;

		try
		{
			self.busyStackAlterar.push();

			await self.taxistasSrv.ApiV1TaxistaPut(newTaxista).toPromise().then(async resp =>
			{
				if (resp.success)
				{
					if (newTaxista.fotoSummary.nomeArquivo !== oldTaxista.fotoSummary.nomeArquivo)
					{
						await self.enviarFoto(newTaxista.fotoSummary);
					}

					result = true;
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
			return result;
		}
	}

	async removerTaxista(taxista: TaxistaExt): Promise<boolean>
	{
		const self = this;
		let result = false;

		try
		{
			self.busyStackRemover.push();

			await self.removerFoto(taxista.fotoSummary);

			await self.taxistasSrv.ApiV1TaxistaByIdDelete(taxista.id).toPromise().then(resp =>
			{
				if (resp.success)
				{
					result = true;
				}
			});
		}
		finally
		{
			self.busyStackRemover.pop();
			return result;
		}
	}
}
