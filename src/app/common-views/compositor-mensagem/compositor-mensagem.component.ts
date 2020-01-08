import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GrupoUsuarioSummary, UsuarioSummary } from '../../../api/to_de_taxi/models';
import { UsuarioService, GrupoUsuarioService, MensagemService } from '../../../api/to_de_taxi/services';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { GlobaisService } from '../../globais.service';

@Component({
	selector: 'ngx-compositor-mensagem',
	templateUrl: './compositor-mensagem.component.html',
	styleUrls: ['./compositor-mensagem.component.scss']
})
export class CompositorMensagemComponent implements OnInit {

	dropdownList = [];
	selectedItems = [];

	@Input() destinatariosUsr: UsuarioSummary[] = [];
	@Input() destinatariosGrpUsr: GrupoUsuarioSummary[] = [];

	dropdownSettings: {};

	form: FormGroup = new FormGroup(
	{
		'assunto': new FormControl('', [Validators.required]),
		'corpo': new FormControl('', [Validators.required]),
	});

	get assunto() { return this.form.get('assunto'); }
	@Input() set assuntoMensagem(value: string) { this.form.patchValue({'assunto': value}); }

	get corpo() { return this.form.get('corpo'); }
	@Input() set corpoMensagem(value: string) { this.form.patchValue({'corpo': value}); }

	constructor(
		protected ref: NbDialogRef<CompositorMensagemComponent>,
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

		// obtém todos os taxistas
		usuarios.push(...self.catalogosSrv.taxistas.items.map(x => x.usuario));

		// TODO: obtém todos os usuários administradores
		await self.usuarioSrv.ApiV1UsuarioAdminsGet().toPromise().then(resultado =>
		{
			if (resultado && resultado.success && resultado.data)
			{
				usuarios.push(...resultado.data);
			}
		}).catch(() => {});

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

		const destinatarios = [];
		// seleciona os destinatários desejados (usuários independentes)
		self.destinatariosUsr.forEach(destinatario => {
			destinatarios.push(...items.filter(x => x.id === destinatario.id && !x.grupo));
		});

		// seleciona os destinatários desejados (grupos de usuários)
		self.destinatariosGrpUsr.forEach(destinatario => {
			destinatarios.push(...items.filter(x => x.id === destinatario.id && x.grupo === true));
		});

		self.selectedItems = destinatarios;
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

		this.ref.close(true);
	}

	cancelar()
	{
		this.ref.close(false);
	}
}
