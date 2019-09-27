import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';
import { LocalDataSource } from 'ng2-smart-table';
import { FaixaDescontoService } from '../../../../api/to_de_taxi/services';
import { FaixaDescontoSummary } from '../../../../api/to_de_taxi/models';
import { UUID } from 'angular2-uuid';
import { ValorEditorComponent } from './valor/valor-editor.component';

@Component({
	selector: 'ngx-faixas-desconto',
	templateUrl: './faixas-desconto.component.html',
	styleUrls: ['./faixas-desconto.component.scss'],
	entryComponents: [
		ValorEditorComponent,
	]
})
export class FaixasDescontoComponent implements OnInit {

	@ViewChild('base_card', null) baseCard: BaseCardComponent;

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
				title: 'Valor',
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
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private faixaDescSrv: FaixaDescontoService,
	) { }

	async ngOnInit()
	{
		const self = this;
		await self.faixaDescSrv.ApiV1FaixaDescontoGet().toPromise().then(veics =>
		{
			this.source.load(veics);
		});
	}

	async onCreateConfirm(event)
	{
		const self = this;

		const nova_faixa_desc = event.newData as FaixaDescontoSummary;
		nova_faixa_desc.id = UUID.UUID();

		const sumarioVeic: FaixaDescontoSummary = {
			id: nova_faixa_desc.id,
			valor: nova_faixa_desc.valor,
			descricao: nova_faixa_desc.descricao
		};


		await self.faixaDescSrv.ApiV1FaixaDescontoPost(sumarioVeic).toPromise().then(async id_veic => {
			if (id_veic)
			{
				nova_faixa_desc.id = id_veic;
				event.confirm.resolve(nova_faixa_desc);
			}
			else
			{
				event.confirm.reject();
			}
		});
	}

	async onEditConfirm(event)
	{
		// altera informações do usuário (login, senha, admin)
		const self = this;

		//await this.enviarFoto(event.newData.veicExt);

		const origFxDsc = event.data as FaixaDescontoSummary;
		const newFxDsc = event.newData as FaixaDescontoSummary;

		const sumarioVeic: FaixaDescontoSummary = {
			id: newFxDsc.id,
			valor: newFxDsc.valor,
			descricao: newFxDsc.descricao
		};

		await self.faixaDescSrv.ApiV1FaixaDescontoPut(sumarioVeic).toPromise().then(async resultado => {
			if (resultado)
			{
				event.confirm.resolve();
			}
			else
			{
				event.confirm.reject();
			}
		});
	}

	async onDeleteConfirm(event)
	{
		const self = this;

		const veic = event.data as FaixaDescontoSummary;

		if (window.confirm('Confirma exclusão?'))
		{
			await self.faixaDescSrv.ApiV1FaixaDescontoByIdDelete(veic.id).toPromise().then(resultado => {
				if (resultado)
				{
					event.confirm.resolve();
				}
				else
				{
					event.confirm.reject();
				}
			});
		}
	}
}
