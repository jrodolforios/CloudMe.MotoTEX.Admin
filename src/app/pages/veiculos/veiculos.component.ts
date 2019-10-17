import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import { VeiculoSummary, FotoSummary } from '../../../api/to_de_taxi/models';
import { VeiculoService, FotoService } from '../../../api/to_de_taxi/services';
import { UUID } from 'angular2-uuid';
import { VeiculosService, VeiculoSummaryExt } from './veiculos.service';
import { SeletorMarcaViewComponent } from './seletor-marca/seletor-marca-view.component';
import { SeletorMarcaEditorComponent } from './seletor-marca/seletor-marca-editor.component';
import { SeletorModeloViewComponent } from './seletor-modelo/seletor-modelo-view.component';
import { SeletorModeloEditorComponent } from './seletor-modelo/seletor-modelo-editor.component';
import { PlacaEditorComponent } from './placa/placa-editor.component';
import { CapacidadeEditorComponent } from './capacidade/capacidade-editor.component';
import { FotoEditorComponent } from './foto/foto-editor.component';
import { FotoViewComponent } from './foto/foto-view.component';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { BusyStack } from '../../@core/utils/busy_stack';
import { Subscription } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'ngx-veiculos',
	templateUrl: './veiculos.component.html',
	styleUrls: ['./veiculos.component.scss'],
	entryComponents: [
		SeletorMarcaEditorComponent,
		SeletorMarcaViewComponent,
		SeletorModeloEditorComponent,
		SeletorModeloViewComponent,
		PlacaEditorComponent,
		CapacidadeEditorComponent,
		FotoEditorComponent,
		FotoViewComponent
	]
})
export class VeiculosComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;
	@ViewChild('table', null) table: Ng2SmartTableComponent;

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
			marca: {
				title: 'Marca',
				type: 'text',
				editor:
				{
					type: 'custom',
					component: SeletorMarcaEditorComponent
				}
			},
			modelo: {
				title: 'Modelo',
				type: 'text',
				editor:
				{
					type: 'custom',
					component: SeletorModeloEditorComponent
				}
			},
			placa: {
				title: 'Placa',
				type: 'text',
				editor:
				{
					type: 'custom',
					component: PlacaEditorComponent
				}
			},
			capacidade: {
				title: 'Passageiros',
				type: 'text',
				editor:
				{
					type: 'custom',
					component: CapacidadeEditorComponent
				}
			},
			/*foto: {
				title: 'Foto',
				type: 'custom',
				renderComponent: FotoViewComponent,
				editor:
				{
					type: 'custom',
					component: FotoEditorComponent
				},
			},*/
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private veiculoSrv: VeiculoService,
		private fotoSrv: FotoService,
		private veiculosSrv: VeiculosService,
		private dialogSrv: NbDialogService,
		private toastSrv: NbToastrService)
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

		await self.veiculoSrv.ApiV1VeiculoMarcasGet().toPromise().then(resp_marcas => {
			if (resp_marcas && resp_marcas.success)
			{
				self.veiculosSrv.marcasVeiculos.next(resp_marcas.data);
			}
		});

		await self.veiculoSrv.ApiV1VeiculoGet().toPromise().then(resp =>
		{
			if (resp)
			{
				this.source.load(resp.data);
			}
		});

		self.busyStack.pop();
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.busyStackSub.unsubscribe();
	}

	async enviarFoto(veiculoSummary: VeiculoSummaryExt)
	{
		const self = this;

		if (!veiculoSummary.veicRef)
		{
			return;
		}

		self.busyStack.push();
		if (veiculoSummary.fotoSummaryRef.id &&
			veiculoSummary.novaFotoSummaryRef.nomeArquivo !== veiculoSummary.fotoSummaryRef.nomeArquivo)
		{
			await self.fotoSrv.ApiV1FotoPut(veiculoSummary.novaFotoSummaryRef).toPromise().then(_ => {});
		}
		else
		{
			veiculoSummary.novaFotoSummaryRef.id = UUID.UUID(); // para serializalçao do parâmetro
			await self.fotoSrv.ApiV1FotoPost(veiculoSummary.novaFotoSummaryRef).toPromise().then(resp =>
			{
				if (resp && resp.success)
				{
					veiculoSummary.veicRef.idFoto = resp.data;
				}
			});

			/*await self.fotoSrv.Upload(veiculoSummary.arquivoFoto).toPromise().then(id_foto => {
				veiculoSummary.veicRef.idFoto = id_foto;
			});*/
		}
		self.busyStack.pop();
	}

	async removerFoto(veiculoSummary: VeiculoSummaryExt)
	{
		const self = this;
		self.busyStack.push();
		if (veiculoSummary.fotoSummaryRef.id)
		{
			await self.fotoSrv.ApiV1FotoByIdGet(veiculoSummary.fotoSummaryRef.id).toPromise().then(_ => {
				veiculoSummary.veicRef.idFoto = '';
			});
		}
		self.busyStack.pop();
	}

	async onCreateConfirm(event)
	{
		const self = this;


		//await this.enviarFoto(event.newData.veicExt);

		const novo_veic = event.newData as VeiculoSummary;
		novo_veic.id = UUID.UUID();

		const sumarioVeic: VeiculoSummary = {
			id: novo_veic.id,
			marca: novo_veic.marca,
			modelo: novo_veic.modelo,
			placa: novo_veic.placa,
			capacidade: novo_veic.capacidade,
			cor: novo_veic.cor,
			idFoto: novo_veic.idFoto
		};

		self.busyStack.push();
		await self.veiculoSrv.ApiV1VeiculoPost(sumarioVeic).toPromise().then(async resp => {
			if (resp && resp.success)
			{
				novo_veic.id = resp.data;
				/*await self.fotoSrv.Post(data).toPromise().then*/
				event.confirm.resolve(novo_veic);
			}
			else
			{
				/*const alert = await this.alertController.create({
					header: 'Gerenciamento de usuários',
					subHeader: 'Cadastro não realizado',
					message: resultado.msg,
					buttons: ['OK']
				});

				await alert.present();*/

				event.confirm.reject();
			}
		});
		self.busyStack.pop();
	}

	async onEditConfirm(event)
	{
		// altera informações do usuário (login, senha, admin)
		const self = this;

		//await this.enviarFoto(event.newData.veicExt);

		const origVeic = event.data as VeiculoSummary;
		const newVeic = event.newData as VeiculoSummary;

		const sumarioVeic: VeiculoSummary = {
			id: newVeic.id,
			marca: newVeic.marca,
			modelo: newVeic.modelo,
			placa: newVeic.placa,
			capacidade: newVeic.capacidade,
			cor: newVeic.cor,
			idFoto: origVeic.idFoto
		};

		self.busyStack.push();
		await self.veiculoSrv.ApiV1VeiculoPut(sumarioVeic).toPromise().then(async resultado => {
			if (resultado)
			{
				event.confirm.resolve();
			}
			else
			{
				event.confirm.reject();
			}
		});
		self.busyStack.pop();
	}

	async onDeleteConfirm(event)
	{
		const self = this;

		const veic = event.data as VeiculoSummary;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Veículos',
					prompt: 'Confirma remoção?'
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.busyStack.push();
					await self.veiculoSrv.ApiV1VeiculoByIdDelete(veic.id).toPromise().then(resultado => {
						if (resultado)
						{
							event.confirm.resolve();
							self.toastSrv.success('Registro removido com sucesso!', 'Veículos');
						}
						else
						{
							event.confirm.reject();
						}
					});
					self.busyStack.pop();
				}
				else
				{
					event.confirm.reject();
				}
			});
	}

	onCustomAction(event)
	{
		/*
		if (event.action === 'visualizar_cliente')
		{
			const info_usr = event.data as InfoUsuarioEx;
			this.visualizarDashboardUsuario(info_usr.usuario);
		}
		*/
	}
}
