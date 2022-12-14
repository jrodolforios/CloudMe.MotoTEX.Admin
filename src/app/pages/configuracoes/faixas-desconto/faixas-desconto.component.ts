import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';
import { FaixaDescontoService } from '../../../../api/to_de_taxi/services';
import { FaixaDescontoSummary, TaxistaSummary } from '../../../../api/to_de_taxi/models';
import { UUID } from 'angular2-uuid';
import { ValorEditorComponent } from './valor/valor-editor.component';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../common-views/confirm-dialog/confirm-dialog.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CatalogosService } from '../../../catalogos/catalogos.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
	selector: 'ngx-faixas-desconto',
	templateUrl: './faixas-desconto.component.html',
	styleUrls: ['./faixas-desconto.component.scss'],
	entryComponents: [
		ValorEditorComponent,
	]
})
export class FaixasDescontoComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;
	busyStack = new BusyStack();
	busyStackSub: Subscription = null;

	faixasDescontoChangesSub: Subscription = null;

	grid_settings = {
		noDataMessage: 'Sem registros para exibição.',
		actions:
		{
			columnTitle: 'Ações',
			/*custom: [
				{
					name: 'visualizar_cliente',
					title: `<button nbButton shape="semi-round" class="btn-primary" size="small"><i class="nb-bar-chart"></i></button>`,
				}]*/
		},
		add: {
			addButtonContent: '<i class="nb-plus"></i>',
			createButtonContent: '<i class="nb-checkmark"></i>',
			cancelButtonContent: '<i class="nb-close"></i>',
			confirmCreate: true
		},
		edit: {
			editButtonContent: '<i class="nb-edit acao"></i>',
			saveButtonContent: '<i class="nb-checkmark"></i>',
			cancelButtonContent: '<i class="nb-close"></i>',
			confirmSave: true
		},
		delete: {
			deleteButtonContent: '<i class="nb-trash acao"></i>',
			confirmDelete: true,
		},
		columns: {
			valor: {
				title: 'Valor (%)',
				type: 'text',
				editor:
				{
					type: 'custom',
					component: ValorEditorComponent
				}
			},
			descricao: {
				title: 'Descrição',
				type: 'text',
			},
			taxistas: {
				title: 'Taxistas adeptos',
				type: 'text',
				editable: false
			}
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private catalogosSrv: CatalogosService,
		private dialogSrv: NbDialogService,
		private faixaDescSrv: FaixaDescontoService,
		private toastSrv: NbToastrService
	) { }

	async ngOnInit()
	{
		const self = this;

		self.busyStackSub = self.busyStack.busy.subscribe(count =>
		{
			if (self.baseCard)
			{
				self.baseCard.toggleRefresh(count > 0);
			}
		});
	}

	async ngAfterViewInit()
	{
		const self = this;
		self.busyStack.push();
		// await self.catalogosSrv.faixasDesconto.getAll().then(faixas_desconto =>

		self.obterFaixasDesconto();

		self.faixasDescontoChangesSub = self.catalogosSrv.faixasDesconto.changesSubject.subscribe(() =>
		{
			self.obterFaixasDesconto();
		});
		self.busyStack.pop();
	}

	ngOnDestroy()
	{
		const self = this;
		self.busyStackSub.unsubscribe();
		self.faixasDescontoChangesSub.unsubscribe();
	}

	obterFaixasDesconto()
	{
		const self = this;

		const faixas_desconto = self.catalogosSrv.faixasDesconto.items;
		const taxistas = self.catalogosSrv.taxistas.items;

		const totalTaxistas = taxistas.length;
		faixas_desconto.forEach(fx_desc =>
		{
			let taxistasFxDesc: TaxistaSummary[] = [];

			const faixasDescTx = self.catalogosSrv.faixasDescontoTaxistas.items.filter(fx_desc_tx =>
			{
				return fx_desc_tx.idFaixaDesconto === fx_desc.id;
			});

			if (faixasDescTx)
			{
				taxistasFxDesc = taxistas.filter(tx =>
				{
					return faixasDescTx.find(veic_tx => veic_tx.idTaxista === tx.id) !== undefined;
				});
			}

			const numTaxistas = taxistasFxDesc ? taxistasFxDesc.length : 0;
			const percent = numTaxistas / totalTaxistas * 100;
			fx_desc['taxistas'] = `${percent.toLocaleString('pt-BR', { minimumIntegerDigits: 1, maximumFractionDigits: 0 })}% (${numTaxistas}/${totalTaxistas})`;
		});
		self.source.load([...faixas_desconto]);
	}

	async onCreateConfirm(event)
	{
		const self = this;

		const nova_faixa_desc = event.newData as FaixaDescontoSummary;
		nova_faixa_desc.id = UUID.UUID();

		const sumarioFxDesc: FaixaDescontoSummary = {
			id: nova_faixa_desc.id,
			valor: nova_faixa_desc.valor,
			descricao: nova_faixa_desc.descricao
		};

		self.busyStack.push();
		await self.catalogosSrv.faixasDesconto.post(sumarioFxDesc).then(async resultado =>
		{
			if (resultado)
			{
				//event.confirm.resolve.skipAdd = true;
				self.toastSrv.success('Faixa de desconto criada com sucesso!', 'Faixas de desconto');
				event.confirm.resolve(null);
			}
			else
			{
				event.confirm.reject();
			}
		}).catch(() => { event.confirm.reject(); });

		self.obterFaixasDesconto();

		self.busyStack.pop();
	}

	async onEditConfirm(event)
	{
		// altera informações do usuário (login, senha, admin)
		const self = this;

		//await this.enviarFoto(event.newData.veicExt);

		const origFxDsc = event.data as FaixaDescontoSummary;
		const newFxDsc = event.newData as FaixaDescontoSummary;

		const sumarioFxDesc: FaixaDescontoSummary = {
			id: newFxDsc.id,
			valor: newFxDsc.valor,
			descricao: newFxDsc.descricao
		};

		self.busyStack.push();
		await self.catalogosSrv.faixasDesconto.put(sumarioFxDesc).then(async resultado =>
		{
			if (resultado)
			{
				self.toastSrv.success('Faixa de desconto atualizada com sucesso!', 'Faixas de desconto');
				event.confirm.resolve(null);
			}
			else
			{
				event.confirm.reject();
			}
		}).catch(reason => event.confirm.reject());

		self.obterFaixasDesconto();

		self.busyStack.pop();
	}

	async onDeleteConfirm(event)
	{
		const self = this;

		const veic = event.data as FaixaDescontoSummary;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Faixas de desconto',
					prompt: 'A remoção do registro implicará no rompimento de outras associações/agrupamentos no sistema. Confirma remoção?'
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.busyStack.push();
					await self.catalogosSrv.faixasDesconto.delete(veic.id).then(async resultado =>
					{
						if (resultado)
						{
							event.confirm.resolve();
							self.toastSrv.success('Faixa de desconto removida com sucesso!', 'Faixas de desconto');

							// busca novamente associações com:
							// - Taxistas
							await self.catalogosSrv.faixasDescontoTaxistas.getAll();
						}
						else
						{
							event.confirm.reject();
						}
					}).catch(() => {});

					self.busyStack.pop();
				}
				else
				{
					event.confirm.reject();
				}
			}).catch(() => {});
	}
}
