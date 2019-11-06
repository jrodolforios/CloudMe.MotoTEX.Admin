import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { Subscription } from 'rxjs';
import { CatalogosService } from '../../../catalogos/catalogos.service';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';
import { CorVeiculoSummary } from '../../../../api/to_de_taxi/models';
import { UUID } from 'angular2-uuid';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../../common-views/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'ngx-controle-cores',
	templateUrl: './controle-cores.component.html',
	styleUrls: ['./controle-cores.component.scss'],
})
export class ControleCoresComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;

	busyStack = new BusyStack();
	busyStackSub: Subscription = null;
	coresSub: Subscription = null;

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
			nome: {
				title: 'Nome da cor',
				type: 'text'
			},
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private catalogosSrv: CatalogosService,
		private toastSrv: NbToastrService,
		private dialogSrv: NbDialogService)
	{
		const data = [];
		this.source.load(data);
	}


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

		self.obterCores();

		self.coresSub = self.catalogosSrv.cores.changesSubject.subscribe(() =>
		{
			self.obterCores();
		});

		self.busyStack.pop();
	}

	obterCores()
	{
		const self = this;

		const cores = self.catalogosSrv.cores.items;
		self.source.load([...cores]);
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.busyStackSub.unsubscribe();
		self.coresSub.unsubscribe();
	}

	async onCreateConfirm(event)
	{
		const self = this;

		const nova_cor = event.newData as CorVeiculoSummary;
		nova_cor.id = UUID.UUID();

		self.busyStack.push();
		await self.catalogosSrv.cores.post(nova_cor).then(async resultado =>
		{
			if (resultado)
			{
				self.toastSrv.success('Cor criada com sucesso!', 'Cores');
				event.confirm.resolve(null);
			}
			else
			{
				event.confirm.reject();
			}
		}).catch(reason => {});

		self.obterCores();

		self.busyStack.pop();
	}

	async onEditConfirm(event)
	{
		const self = this;

		const corEditada = event.newData as CorVeiculoSummary;

		self.busyStack.push();
		await self.catalogosSrv.cores.put(corEditada).then(async resultado => {
			if (resultado)
			{
				self.toastSrv.success('Cor atualizada com sucesso!', 'Cores');
				event.confirm.resolve(null);
			}
			else
			{
				event.confirm.reject();
			}
		}).catch(reason =>
		{
			event.confirm.reject();
		});

		self.obterCores();

		self.busyStack.pop();
	}

	async onDeleteConfirm(event)
	{
		const self = this;

		const cor = event.data as CorVeiculoSummary;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Cores',
					prompt: 'A remoção do registro implicará no rompimento de outras associações/agrupamentos no sistema. Confirma remoção?'
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.busyStack.push();
					await self.catalogosSrv.cores.delete(cor.id).then(async resultado => {
						if (resultado)
						{
							event.confirm.resolve();
							self.toastSrv.success('Registro removido com sucesso!', 'Veículos');

							// busca novamente associações com:
							// - Veículos
							await self.catalogosSrv.veiculos.getAll();
						}
						else
						{
							event.confirm.reject();
						}
					}).catch(reason =>
					{
						event.confirm.reject();
					});

					self.busyStack.pop();
				}
				else
				{
					event.confirm.reject();
				}
			}).catch(() => {});
	}
}
