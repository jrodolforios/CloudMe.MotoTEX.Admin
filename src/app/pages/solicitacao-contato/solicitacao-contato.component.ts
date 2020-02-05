import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { NbAccordionComponent, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormUsuarioComponent } from '../../common-views/forms/form-usuario/form-usuario.component';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { BusyStack } from '../../@core/utils/busy_stack';
import { ContatoSummary } from '../../../api/to_de_taxi/models';
import { Subscription } from 'rxjs';
import { CatalogosService } from '../../catalogos/catalogos.service';

@Component({
	selector: 'ngx-solicitacao-contato',
	templateUrl: './solicitacao-contato.component.html',
	styleUrls: ['./solicitacao-contato.component.scss']
})
export class SolicitacaoContatoComponent implements OnInit, OnDestroy
{
	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;

	@ViewChild('pesquisaContato', null) inputPesquisaTaxista: ElementRef;
	@ViewChild('abas', null) abas: NbAccordionComponent;

	@ViewChild('formUsuario', null) formUsuario: FormUsuarioComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;

	exibirFiltros = false;

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	contato: ContatoSummary = null;
	contatos: ContatoSummary[] = [];
	contatoPesquisa: ContatoSummary[] = [];
	contatosChangesSub: Subscription = null;

	busyStackListagemSub: Subscription = null;
	busyStackDetalhesSub: Subscription = null;

	// paginação
	itemsPerPage: number = 10;
	currentPage: number = 1;

	constructor(
		private dialogSrv: NbDialogService,
		private catalogosSrv: CatalogosService,
		private toastSrv: NbToastrService)
	{
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.contatosChangesSub.unsubscribe();
		self.busyStackListagemSub.unsubscribe();
		self.busyStackDetalhesSub.unsubscribe();
	}

	ngOnInit(): void
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

		self.contatosChangesSub = self.catalogosSrv.solicitacoesContato.changesSubject.subscribe(() =>
		{
			self.atualizar();
		});
	}

	public async atualizar()
	{
		const self = this;
		await self.obterContatos();

		if (!self.contato || !self.contatos.find(tx => tx.id === self.contato.id))
		{
			self.contato = self.contatos.length > 0 ? self.contatos[0] : null;
		}
	}

	private async obterContatos()
	{
		const self = this;

		self.busyStackListagem.push();

		self.contatos = self.catalogosSrv.solicitacoesContato.items.sort((con1, con2) =>
		{
			return con1.id.localeCompare(con2.id);
		});

		self.filtrarContatos();

		self.busyStackListagem.pop();
	}

	selecionar(contato: ContatoSummary)
	{
		this.contato = contato;
	}

	async visualizar(contato: ContatoSummary)
	{
		const self = this;
		self.selecionar(contato);
	}

	_filtroPesquisa: string = '';
	set filtroPesquisa(value: string)
	{
		const self = this;
		self._filtroPesquisa = value;
		self.filtrarContatos();
	}
	get filtroPesquisa(): string
	{
		return this._filtroPesquisa;
	}

	filtrarContatos()
	{
		const self = this;

		self.contatoPesquisa = self.contatos.filter(passageiro =>
		{
			let passa_filtro = true;

			if (self.filtroPesquisa)
			{
				passa_filtro = passageiro.nome.toUpperCase().includes(self.filtroPesquisa.toUpperCase());
			}

			return passa_filtro;
		});
	}

	limparFiltros()
	{
		const self = this;
		self.filtroPesquisa = '';

		self.filtrarContatos();
	}

	expandir()
	{
		this.abas.openAll();
	}

	encolher()
	{
		this.abas.closeAll();
	}

	get quantidadeContatos()
	{
		const self = this;
		return self.contatos.length;
	}

}
