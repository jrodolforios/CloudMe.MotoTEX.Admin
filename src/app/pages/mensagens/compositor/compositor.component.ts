import { Component, OnInit } from '@angular/core';
import { UsuarioSummary, GrupoUsuarioSummary } from '../../../../api/to_de_taxi/models';
import { UsuarioService, GrupoUsuarioService, TaxistaService, PontoTaxiService, MensagemService } from '../../../../api/to_de_taxi/services';
import { CatalogosService } from '../../../catalogos/catalogos.service';
import { SendMessageComponent } from '../../../common-views/send-message/send-message.component';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobaisService } from '../../../globais.service';

@Component({
	selector: 'ngx-compositor',
	templateUrl: './compositor.component.html',
	styleUrls: ['./compositor.component.scss']
})
export class CompositorComponent implements OnInit {

	dropdownList = [];
	selectedItems = [];

	dropdownSettings: {};

	form: FormGroup = new FormGroup(
	{
		'assunto': new FormControl('', [Validators.required]),
		'corpo': new FormControl('', [Validators.required]),
	});

	get assunto() { return this.form.get('assunto'); }
	get corpo() { return this.form.get('corpo'); }

	constructor(
		protected ref: NbDialogRef<SendMessageComponent>,
		private usuarioSrv: UsuarioService,
		private grupoUsuarioSrv: GrupoUsuarioService,
		private catalogosSrv: CatalogosService,
		private mensagemSrv: MensagemService,
		private globaisSrv: GlobaisService,
		private toastSrv: NbToastrService) { }

	async ngOnInit()
	{
		this.dropdownSettings =
		{
			singleSelection: false,
			text: 'Selecione',
			labelKey: 'name',
			primaryKey: 'id',
			searchPlaceholderText: 'Pesquisar',
			enableCheckAll: false,
			itemsShowLimit: 10,
			enableSearchFilter: true,
			filterSelectAllText: 'Marcar todos os itens filtrados',
			filterUnSelectAllText: 'Desmarcar todos os itens filtrados'
		};

		await this.obterDestinatarios();
	}

	async obterDestinatarios()
	{
		const self = this;

		const usuarios: UsuarioSummary[] = [];
		const gruposUsuarios: GrupoUsuarioSummary[] = [];

		// obtém os grupo de usuários
		await self.grupoUsuarioSrv.ApiV1GrupoUsuarioGet().toPromise().then(resultado =>
		{
			if (resultado && resultado.success && resultado.data)
			{
				gruposUsuarios.push(...resultado.data);
			}
		}).catch(() => {});

		/*
		// obtém o grupo de taxistas
		await self.grupoUsuarioSrv.ApiV1GrupoUsuarioByNameGet('Taxistas').toPromise().then(resultado =>
		{
			if (resultado && resultado.success && resultado.data)
			{
				gruposUsuarios.push(resultado.data);
			}
		}).catch(() => {});

		// obtém o grupo de passageiros
		await self.grupoUsuarioSrv.ApiV1GrupoUsuarioByNameGet('Passageiros').toPromise().then(resultado =>
		{
			if (resultado && resultado.success && resultado.data)
			{
				gruposUsuarios.push(resultado.data);
			}
		}).catch(() => {});

		// obtém os grupos de usuários associados aos pontos de taxi
		for (const ptTx of self.catalogosSrv.pontosTaxi.items)
		{
			await self.grupoUsuarioSrv.ApiV1GrupoUsuarioByNameGet(ptTx.nome).toPromise().then(resultado =>
			{
				if (resultado && resultado.success && resultado.data)
				{
					gruposUsuarios.push(resultado.data);
				}
			}).catch(() => {});
		}
		*/

		// obtém todos os taxistas
		usuarios.push(...self.catalogosSrv.taxistas.items.map(x => x.usuario));

		// TODO: obtém todos os usuários administradores


		const items: any[] = [];

		items.push(...usuarios.map(x => {
			return {
				id: x.id,
				name: x.nome,
				grupo: false
			};
		}));

		items.push(...gruposUsuarios.map(x => {
			return {
				id: x.id,
				name: `[${x.nome}]`,
				grupo: true
			};
		}));

		self.dropdownList = items;
	}

	enviar()
	{
		const self = this;
		const usuarioLogado = self.globaisSrv.usuario.value;

		if (!usuarioLogado) return;

		const idsGrupos = [];
		const idsUsuarios = [];
		this.selectedItems.forEach(x => {
			if (x.grupo)
			{
				idsGrupos.push(x.id);
			}
			else
			{
				idsUsuarios.push(x.id);
			}
		});

		let resultadoEnvio = true;

		self.mensagemSrv.ApiV1MensagemEnviarPost({
			destinatarios:
			{
				idsGruposUsuarios: idsGrupos,
				idsUsuarios: idsUsuarios
			},
			mensagem:
			{
				idRemetente: usuarioLogado.id,
				assunto: self.assunto.value,
				corpo: self.corpo.value
			}
		}).toPromise().then(resultado =>
		{
			if (!resultado || !resultado.success)
			{
				self.toastSrv.danger('Erro ao enviar mensagem', 'Mensagens');
				resultadoEnvio = false;
			}
		}).catch(reason =>
		{
			self.toastSrv.danger(`Erro ao enviar mensagem: ${reason}`, 'Mensagens');
			resultadoEnvio = false;
		});

		self.ref.close(resultadoEnvio);
	}

	cancelar()
	{
		this.ref.close();
	}
}
