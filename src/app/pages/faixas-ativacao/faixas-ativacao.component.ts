import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Subscription } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { BusyStack } from '../../@core/utils/busy_stack';
import { FaixaAtivacaoService } from '../../../api/to_de_taxi/services';
import { FaixaAtivacaoSummary } from '../../../api/to_de_taxi/models';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'ngx-faixas-ativacao',
	templateUrl: './faixas-ativacao.component.html',
	styleUrls: ['./faixas-ativacao.component.scss'],
})
export class FaixasAtivacaoComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;
	busyStack = new BusyStack();
	busyStackSub: Subscription = null;

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
			raio: {
				title: 'Raio (metros)',
				type: 'text',
			},
			janela: {
				title: 'Janela (segundos)',
				type: 'text',
			}
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private faixaAtivacaoSrv: FaixaAtivacaoService,
		private dialogSrv: NbDialogService,
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

		await self.obterFaixasAtivacao();

		self.busyStack.pop();
	}

	ngOnDestroy()
	{
		const self = this;
		self.busyStackSub.unsubscribe();
	}

	async obterFaixasAtivacao()
	{
		const self = this;

		self.faixaAtivacaoSrv.ApiV1FaixaAtivacaoByRadiusGet().toPromise().then(resutado =>
		{
			if (resutado && resutado.success)
			{
				self.source.load([...resutado.data]);
			}
		}).catch(() => {});
	}

	async onCreateConfirm(event)
	{
		const self = this;

		const nova_faixa_ativ = event.newData as FaixaAtivacaoSummary;
		nova_faixa_ativ.id = UUID.UUID();

		self.busyStack.push();
		await self.faixaAtivacaoSrv.ApiV1FaixaAtivacaoPost(nova_faixa_ativ).toPromise().then(async resultado =>
		{
			if (resultado && resultado.success)
			{
				self.toastSrv.success('Faixa de ativação criada com sucesso!', 'Faixas de ativação');
				event.confirm.resolve(null);
			}
			else
			{
				event.confirm.reject();
			}
		}).catch(() => { event.confirm.reject(); });

		await self.obterFaixasAtivacao();

		self.busyStack.pop();
	}

	async onEditConfirm(event)
	{
		// altera informações do usuário (login, senha, admin)
		const self = this;

		//await this.enviarFoto(event.newData.veicExt);

		const newFxAtiv = event.newData as FaixaAtivacaoSummary;

		self.busyStack.push();
		await self.faixaAtivacaoSrv.ApiV1FaixaAtivacaoPut(newFxAtiv).toPromise().then(resultado =>
		{
			if (resultado && resultado.success)
			{
				self.toastSrv.success('Faixa de ativação atualizada com sucesso!', 'Faixas de ativação');
				event.confirm.resolve(null);
			}
			else
			{
				event.confirm.reject();
			}
		}).catch(reason => event.confirm.reject());

		await self.obterFaixasAtivacao();

		self.busyStack.pop();
	}

	async onDeleteConfirm(event)
	{
		const self = this;

		const veic = event.data as FaixaAtivacaoSummary;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Faixas de ativação',
					prompt: 'Confirma remoção da faixa de ativação?'
				},
			})
			.onClose.toPromise().then(async result =>
			{
				self.busyStack.push();
				if (result)
				{
					await self.faixaAtivacaoSrv.ApiV1FaixaAtivacaoByIdDelete(veic.id).toPromise().then(resultado =>
					{
						if (resultado && resultado.success)
						{
							self.toastSrv.success('Faixa de ativação removida com sucesso!', 'Faixas de ativação');
							event.confirm.resolve();
						}
						else
						{
							event.confirm.reject();
						}
					}).catch(() => {});

					await self.obterFaixasAtivacao();
				}
				else
				{
					event.confirm.reject();
				}

				self.busyStack.pop();
			}).catch(() => {});
	}
}
