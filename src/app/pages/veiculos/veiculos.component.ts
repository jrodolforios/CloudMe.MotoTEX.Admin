import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MarcaVeiculoService, ModeloVeiculoService } from '../../../api/fipe/services';
import { MarcaVeiculo } from '../../../api/fipe/models';

@Component({
	selector: 'ngx-veiculos',
	templateUrl: './veiculos.component.html',
	styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

	grid_settings = {
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
			/*viewDashboard:
			{
				title:'Visualizar',
				type:'html',
				valuePrepareFunction:(cell,row) => {
					return row.idCli ? `<span class="nb-bar-chart" (click)="visualizarDashboardCliente(${row})"></span>` : ""
				},
				editable: false,
				filter:false
			},*/
			marca: {
				title: 'Marca',
				type: 'custom',
				/*renderComponent: SeletorClienteViewComponent,
				editor:
				{
					type: 'custom',
					component: SeletorClienteEditorComponent
				}*/
			},
			modelo: {
				title: 'Modelo',
				type: 'custom',
				/*renderComponent: SeletorClienteViewComponent,
				editor:
				{
					type: 'custom',
					component: SeletorClienteEditorComponent
				}*/
			},
			placa: {
				title: 'Placa',
				type: 'text',
			},
			capacidade: {
				title: 'Capacidade',
				type: 'text',
			},
			cor: {
				title: 'Cor',
				type: 'text',
			},
			foto: {
				title: 'Foto',
				type: 'custom',
				/*renderComponent: SeletorClienteViewComponent,
				editor:
				{
					type: 'custom',
					component: SeletorClienteEditorComponent
				}*/
			},
		},
	};

	source: LocalDataSource = new LocalDataSource();

	marcas: MarcaVeiculo[] = [];

	constructor(private marcasVeicSrv: MarcaVeiculoService, private modelosVeicSrv: ModeloVeiculoService)
	{
		const data = [];
		this.source.load(data);
	}

	ngOnInit()
	{
		const self = this;
		self.marcasVeicSrv.GetAll().toPromise().then(marcas => {
			self.marcas = marcas;
		});
	}

	async onCreateConfirm(event)
	{
		/*
		const self = this;

		const novo_usr = event.newData as InfoUsuarioEx;
		const resultado = await self.usrMsrMgr.criarUsuario(novo_usr);

		if (resultado.sucesso)
		{
			event.confirm.resolve(novo_usr);
		}
		else
		{
			const alert = await this.alertController.create({
				header: 'Gerenciamento de usuários',
				subHeader: 'Cadastro não realizado',
				message: resultado.msg,
				buttons: ['OK']
			});

			await alert.present();

			event.confirm.reject();
		}
		*/
	}

	async onEditConfirm(event)
	{
		/*
		// altera informações do usuário (login, senha, admin)
		const oldUsr = event.data as InfoUsuarioEx;
		const newUsr = new InfoUsuarioEx(event.newData);

		const self = this;

		const resultado = await self.usrMsrMgr.alterarUsuario(oldUsr, newUsr);
		if (resultado.sucesso)
		{
			event.confirm.resolve();
		}
		else
		{
			event.confirm.reject();
		}
		*/
	}

	async onDeleteConfirm(event)
	{
		/*
		const self = this;

		const info_usr = event.data as InfoUsuarioEx;

		if (window.confirm('Confirma exclusão do usuário?'))
		{
			const resultado = await self.usrMsrMgr.removerUsuario(info_usr);
			if (resultado.sucesso)
			{
				event.confirm.resolve();
			}
			else
			{
				event.confirm.reject();
			}
		}
		*/
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
