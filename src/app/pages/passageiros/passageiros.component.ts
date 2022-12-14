import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription } from 'rxjs';
import { NbDialogService, NbToastrService, NbAccordionComponent } from '@nebular/theme';
import { PassageiroService, UsuarioService } from '../../../api/to_de_taxi/services';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { FormUsuarioComponent } from '../../common-views/forms/form-usuario/form-usuario.component';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';
import { PassageiroSummary, PontoTaxiSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { CompositorMensagemComponent } from '../../common-views/compositor-mensagem/compositor-mensagem.component';

@Component({
	selector: 'ngx-passageiros',
	templateUrl: './passageiros.component.html',
	styleUrls: ['./passageiros.component.scss'],
})
export class PassageirosComponent implements OnInit, AfterViewInit, OnDestroy
{
	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;

	@ViewChild('pesquisaTaxista', null) inputPesquisaTaxista: ElementRef;
	@ViewChild('abas', null) abas: NbAccordionComponent;

	@ViewChild('formUsuario', null) formUsuario: FormUsuarioComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;

	exibirFiltros = false;

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	passageiro: PassageiroSummary = null;
	passageiros: PassageiroSummary[] = [];
	passageirosPesquisa: PassageiroSummary[] = [];
	// passageirosSub: Subscription = null;
	passageirosChangesSub: Subscription = null;

	get endereco() { return this.passageiro ? this.passageiro.endereco : null; }
	get usuario() { return this.passageiro ? this.passageiro.usuario : null; }
	get foto() { return this.passageiro ? this.passageiro['foto'] : null; }

	passageiroSelSub: Subscription;
	busyStackListagemSub: Subscription = null;
	busyStackDetalhesSub: Subscription = null;

	// paginação
	itemsPerPage: number = 10;
	currentPage: number = 1;

	constructor(
		private dialogSrv: NbDialogService,
		private catalogosSrv: CatalogosService,
		private toastSrv: NbToastrService,
		private usuarioSrv: UsuarioService)
	{
	}

	ngOnInit(): void
	{
		const self = this;
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.passageirosChangesSub.unsubscribe();
	}

	ngAfterViewInit(): void
	{
		const self = this;

		self.busyStackListagemSub = self.busyStackListagem.busy.subscribe(() =>
		{
			if (self.cardListagem)
			{
				self.cardListagem.toggleRefresh(self.busyStackListagem.busy.value > 0);
			}
		});

		self.busyStackDetalhesSub = self.busyStackDetalhes.busy.subscribe(() =>
		{
			if (self.cardDetalhes)
			{
				self.cardDetalhes.toggleRefresh(self.busyStackDetalhes.busy.value > 0);
			}
		});

		self.atualizar();

		self.passageirosChangesSub = self.catalogosSrv.passageiros.changesSubject.subscribe(() =>
		{
			self.atualizar();
		});
	}

	public async atualizar()
	{
		const self = this;
		await self.obterPassageiros();

		if (!self.passageiro || !self.passageiros.find(tx => tx.id === self.passageiro.id))
		{
			self.passageiro = self.passageiros.length > 0 ? self.passageiros[0] : null;
		}
	}

	private async obterPassageiros()
	{
		const self = this;

		self.busyStackListagem.push();

		self.passageiros = self.catalogosSrv.passageiros.items.sort((passg1, passg2) =>
		{
			if (!passg1.usuario || !passg2.usuario)
			{
				return passg1.usuario ? 1 : (passg2.usuario ? -1 : 0);
			}
			return passg1.usuario.nome.localeCompare(passg2.usuario.nome);
		});

		// await self.passageiros.forEach(async x =>{
		// 	await self.usuarioSrv.ApiV1UsuarioByIdGet(x.usuario.id).toPromise().then(y =>{
		// 		if(y.success)
		// 			x.usuario.credenciais = y.data.credenciais;
		// 	})
		// });

		/*self.passageiros.forEach(async tx =>
		{
			self.catalogosSrv.passageiros.recuperarFoto(tx);
		});*/

		self.filtrarPassageiros();

		self.busyStackListagem.pop();
	}

	selecionar(passageiro: PassageiroSummary)
	{
		const self = this;
		self.passageiro = passageiro;
		self.catalogosSrv.passageiros.recuperarFoto(self.passageiro);
	}

	async visualizar(passageiro: PassageiroSummary)
	{
		const self = this;
		self.selecionar(passageiro);
	}

	async ativar(passageiro: PassageiroSummary, ativo: boolean)
	{
		const self = this;
		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Passageiros',
					prompt: `${ativo ? 'Ativar' : 'Desativar'} passageiro?`
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.busyStackListagem.push();

					const passgSummary: PassageiroSummary =
					{
						id: passageiro.id,
						ativo,
					};

					await self.catalogosSrv.passageiros.put(passgSummary).then(resultado =>
					{
						if (resultado)
						{
							// taxista.ativo = ativo;
							self.toastSrv.success( `Taxista ${passageiro.usuario.nome} ${ativo ? 'ativado' : 'desativado'} com sucesso!`, 'Passageiros');
							self.atualizar();
						}
					}).catch(() => {});

					self.busyStackListagem.pop();
				}
			}).catch(() => {});
	}

	async enviarMensagem(passageiro: PassageiroSummary)
	{
		const self = this;
		await self.dialogSrv.open(CompositorMensagemComponent,
			{
				context:
				{
					destinatariosUsr: [passageiro.usuario],
				}
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.toastSrv.success( `Mensagem enviada para  ${passageiro.usuario.nome} com sucesso!`, 'Passageiros');
				}
			}).catch(() => {});
	}

	_filtroSituacao: boolean = null;
	set filtroSituacao(value: boolean)
	{
		const self = this;
		self._filtroSituacao = value;
		self.filtrarPassageiros();
	}
	get filtroSituacao(): boolean
	{
		return this._filtroSituacao;
	}

	_filtroCPF: string = null;
	set filtroCPF(value: string)
	{
		const self = this;
		self._filtroCPF = value;
		self.filtrarPassageiros();
	}
	get filtroCPF(): string
	{
		return this._filtroCPF;
	}

	_filtroPesquisa: string = '';
	set filtroPesquisa(value: string)
	{
		const self = this;
		self._filtroPesquisa = value;
		self.filtrarPassageiros();
	}
	get filtroPesquisa(): string
	{
		return this._filtroPesquisa;
	}

	todosPontosTaxi: PontoTaxiSummary = {};
	_filtroPontoTaxi: PontoTaxiSummary = this.todosPontosTaxi;
	set filtroPontoTaxi(value: PontoTaxiSummary)
	{
		const self = this;
		self._filtroPontoTaxi = value;
		self.filtrarPassageiros();
	}
	get filtroPontoTaxi(): PontoTaxiSummary
	{
		return this._filtroPontoTaxi;
	}

	filtrarPassageiros()
	{
		const self = this;

		self.passageirosPesquisa = self.passageiros.filter(passageiro =>
		{
			let passa_filtro = true;

			if (self.filtroPesquisa)
			{
				passa_filtro = passageiro.usuario.nome.toUpperCase().includes(self.filtroPesquisa.toUpperCase());
			}

			if (self.filtroCPF)
			{
				passa_filtro = passageiro.usuario.cpf.toUpperCase().includes(self.filtroCPF.toUpperCase());
			}

			if (self.filtroSituacao !== null)
			{
				passa_filtro = passa_filtro && passageiro.ativo === self.filtroSituacao;
			}

			return passa_filtro;
		});
	}

	limparFiltros()
	{
		const self = this;
		self.filtroPesquisa = '';
		self.filtroCPF = '';
		self.filtroSituacao = null;
		self.filtroPontoTaxi = self.todosPontosTaxi;

		self.filtrarPassageiros();
	}

	expandir()
	{
		this.abas.openAll();
	}

	encolher()
	{
		this.abas.closeAll();
	}

	get quantidadePassageiros()
	{
		const self = this;
		return self.passageiros.length;
	}
}
