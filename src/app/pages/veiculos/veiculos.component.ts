import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import { MarcaVeiculoService, ModeloVeiculoService } from '../../../api/fipe/services';
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
export class VeiculosComponent implements OnInit {

	@ViewChild('base_card', null) baseCard: BaseCardComponent;
	@ViewChild('table', null) table: Ng2SmartTableComponent;

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
			foto: {
				title: 'Foto',
				type: 'custom',
				renderComponent: FotoViewComponent,
				editor:
				{
					type: 'custom',
					component: FotoEditorComponent
				}
			},
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private marcasVeicSrv: MarcaVeiculoService,
		private veiculoSrv: VeiculoService,
		private fotoSrv: FotoService,
		private veiculosSrv: VeiculosService)
	{
		const data = [];
		this.source.load(data);
	}

	async ngOnInit()
	{
		const self = this;
		await self.marcasVeicSrv.GetAll().toPromise().then(marcas => {
			self.veiculosSrv.marcasVeiculos.next(marcas);
		});

		await self.veiculoSrv.GetAll().toPromise().then(veics => {
			/*const veicsEx: VeiculoSummaryExt[] = [];
			veics.forEach(veic => {
				veicsEx.push();
			});
			this.source.load(veicsEx);*/
			this.source.load(veics);
		});
	}

	async enviarFoto(veiculoSummary: VeiculoSummaryExt)
	{
		const self = this;

		if (!veiculoSummary.veicRef)
		{
			return;
		}

		if (veiculoSummary.fotoSummaryRef.id)
		{
			await self.fotoSrv.Put(veiculoSummary.fotoSummaryRef).toPromise().then(_ => {});
		}
		else
		{
			/*veiculoSummary.fotoSummaryRef.id = UUID.UUID(); // para serializalçao do parâmetro
			await self.fotoSrv.Post(veiculoSummary.fotoSummaryRef).toPromise().then(id_foto => {
				veiculoSummary.idFoto = id_foto;
			});*/

			await self.fotoSrv.Upload(veiculoSummary.arquivoFoto).toPromise().then(id_foto => {
				veiculoSummary.veicRef.idFoto = id_foto;
			});
		}
	}

	async removerFoto(fotoSummary: FotoSummary, veiculoSummary: VeiculoSummary)
	{
		const self = this;
		if (fotoSummary && fotoSummary.id)
		{
			await self.fotoSrv.Delete(fotoSummary.id).toPromise().then(_ => {
				veiculoSummary.idFoto = '';
			});
		}
	}

	async onCreateConfirm(event)
	{
		const self = this;


		await this.enviarFoto(event.newData.veicExt);

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


		await self.veiculoSrv.Post(sumarioVeic).toPromise().then(async id_veic => {
			if (id_veic)
			{
				novo_veic.id = id_veic;
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
	}

	async onEditConfirm(event)
	{
		// altera informações do usuário (login, senha, admin)
		const self = this;

		await this.enviarFoto(event.newData.veicExt);

		const newVeic = event.newData as VeiculoSummary;

		const sumarioVeic: VeiculoSummary = {
			id: newVeic.id,
			marca: newVeic.marca,
			modelo: newVeic.modelo,
			placa: newVeic.placa,
			capacidade: newVeic.capacidade,
			cor: newVeic.cor,
			idFoto: newVeic.idFoto
		};

		await self.veiculoSrv.Put(sumarioVeic).toPromise().then(async resultado => {
			if (resultado)
			{
				// TODO: tem que usar event.newData!!!

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

		const veic = event.data as VeiculoSummary;

		if (window.confirm('Confirma exclusão do veículo?'))
		{
			await self.veiculoSrv.Delete(veic.id).toPromise().then(resultado => {
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
