import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TaxistasControllerService, TaxistaExt } from './taxistas-controller.service';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription, Subject, EMPTY } from 'rxjs';
import { ValidatorFn, FormGroup, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { FotoService } from '../../../api/to_de_taxi/services';
import { EnderecoService } from '../../../api/viacep/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { FormCredenciaisComponent } from '../../common-views/forms/form-credenciais/form-credenciais.component';
import { FormFotoComponent } from '../../common-views/forms/form-foto/form-foto.component';
import { FormUsuarioComponent } from '../../common-views/forms/form-usuario/form-usuario.component';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';

enum Modo
{
	mdEdicao,
	mdCriacao,
	mdVisualizacao
}

@Component({
	selector: 'ngx-taxistas',
	templateUrl: './taxistas.component.html',
	styleUrls: ['./taxistas.component.scss'],
})
export class TaxistasComponent implements OnInit, AfterViewInit, OnDestroy
{
	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;

	@ViewChild('formUsuario', null) formUsuario: FormUsuarioComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;
	@ViewChild('formCredenciais', null) formCredenciais: FormCredenciaisComponent;
	@ViewChild('formFoto', null) formFoto: FormFotoComponent;

	_modo: Modo = Modo.mdVisualizacao;
	get modo(): Modo
	{
		return this._modo;
	}

	taxista: TaxistaExt = null;
	taxistas: TaxistaExt[] = [];
	taxistasSub: Subscription;

	get credenciais() { return this.taxista ? this.taxista.usuario.credenciais : null; }
	get endereco() { return this.taxista ? this.taxista.endereco : null; }
	get foto() { return this.taxista ? this.taxista.fotoSummary : null; }
	get usuario() { return this.taxista ? this.taxista.usuario : null; }

	taxistaSelSub: Subscription;
	busyStackCriarSub: Subscription = null;
	busyStackAlterarSub: Subscription = null;
	busyStackAtualizarSub: Subscription = null;
	busyStackRemoverSub: Subscription = null;

	get alterado(): boolean
	{
		const self = this;

		if (!self.taxista) return false;
		return (
			self.formUsuario.alterado ||
			self.formEndereco.alterado ||
			self.formCredenciais.alterado ||
			self.formFoto.alterado);
	}

	constructor(
		private taxistasCtrl: TaxistasControllerService,
		private dialogSrv: NbDialogService,
		private fotoSrv: FotoService,
		private enderecoSrv: EnderecoService,
		private toastSrv: NbToastrService)
	{
	}

	ngOnInit(): void
	{
		const self = this;
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.taxistasSub.unsubscribe();
	}

	ngAfterViewInit(): void
	{
		const self = this;

		this.taxistasCtrl.atualizar();

		const atualizarRemoverCallback = () =>
		{
			if (self.cardListagem)
			{
				self.cardListagem.toggleRefresh(
					self.taxistasCtrl.busyStackAtualizar.busy.value > 0 &&
					self.taxistasCtrl.busyStackRemover.busy.value > 0);
			}
		};

		const criarAlterarCallback = () =>
		{
			if (self.cardDetalhes)
			{
				self.cardDetalhes.toggleRefresh(
					self.taxistasCtrl.busyStackAtualizar.busy.value > 0 &&
					self.taxistasCtrl.busyStackRemover.busy.value > 0);
			}
		};

		self.busyStackAtualizarSub = self.taxistasCtrl.busyStackAtualizar.busy.subscribe(atualizarRemoverCallback);
		self.busyStackRemoverSub = self.taxistasCtrl.busyStackRemover.busy.subscribe(atualizarRemoverCallback);
		self.busyStackCriarSub = self.taxistasCtrl.busyStackCriar.busy.subscribe(criarAlterarCallback);
		self.busyStackAlterarSub = self.taxistasCtrl.busyStackAlterar.busy.subscribe(criarAlterarCallback);

		self.taxistasSub = self.taxistasCtrl.taxistas.subscribe(novos_taxistas =>
		{
			self.taxistas = novos_taxistas;
		});

		self.taxistaSelSub = self.taxistasCtrl.taxistaSelecionado.subscribe(async tax_sel =>
		{
			self.limparCampos();
			self.taxista = tax_sel;
		});
	}

	async setModo(value: Modo): Promise<boolean>
	{
		const self = this;
		if (self._modo !== value)
		{
			if (self.alterado)
			{
				let descartar = false;

				await self.dialogSrv.open(
					ConfirmDialogComponent,
					{
						context:
						{
							title: 'Taxistas',
							prompt: 'Existem alterações não salvas para o registro atual. Deseja descartá-las?'
						},
					})
					.onClose.toPromise().then(result =>
					{
						descartar = result;
					});

				if (!descartar)
				{
					return false;
				}
			}

			self._modo = value;
			return true;
		}
	}

	get desabilitarControles(): boolean
	{
		const self = this;
		return self.modo === Modo.mdVisualizacao;
	}

	get podeCriar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdVisualizacao;
	}

	get podeEditar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdVisualizacao && self.taxista !== null;
	}

	get podeConfirmar(): boolean
	{
		const self = this;
		return (self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao) && self.alterado && self.formUsuario.form.valid;
	}

	get podeCancelar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao;
	}

	selecionar(taxista: TaxistaExt)
	{
		this.taxistasCtrl.taxistaSelecionado.next(taxista);
	}

	async visualizar(taxista: TaxistaExt)
	{
		const self = this;
		await self.setModo(Modo.mdVisualizacao).then(result =>
		{
			if (result)
			{
				self.selecionar(taxista);
			}
		});
	}

	editar(taxista: TaxistaExt)
	{
		const self = this;
		if (!self.podeEditar) return; // sanity check

		self.setModo(Modo.mdEdicao).then(result =>
		{
			if (result)
			{
				self.selecionar(taxista);
			}
		});
	}

	async deletar(taxista: TaxistaExt)
	{
		const self = this;

		let confirmaRemocao = false;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Taxistas',
					prompt: 'Confirma remoção?'
				},
			})
			.onClose.toPromise().then(result =>
			{
				confirmaRemocao = result;
			});

		if (confirmaRemocao)
		{
			const sucesso = await self.taxistasCtrl.removerTaxista(taxista);
			if (sucesso)
			{
				self.toastSrv.success("Registro removido com sucesso!", "Taxistas", {
					destroyByClick: true,
					duration: 0,
					position: NbGlobalPhysicalPosition.TOP_RIGHT
				});
				self.taxistasCtrl.atualizar();
			}
		}
	}

	async criar()
	{
		const self = this;
		if (!self.podeCriar) return; // sanity check

		await self.setModo(Modo.mdCriacao).then(result =>
		{
			if (result)
			{
				self.selecionar(self.taxistasCtrl.instanciarTaxista());
			}
		});
	}

	public async confirmarEdicao()
	{
		const self = this;
		if (!self.podeConfirmar) return; // sanity check

		let sucesso = false;

		if (self.modo === Modo.mdCriacao)
		{
			const novoTaxista = self.taxistasCtrl.instanciarTaxista();
			novoTaxista.usuario = self.formUsuario.obterAlteracoes();
			novoTaxista.endereco = self.formEndereco.obterAlteracoes();
			novoTaxista.usuario.credenciais = self.formCredenciais.obterAlteracoes();
			novoTaxista.fotoSummary = self.formFoto.obterAlteracoes();

			sucesso = await self.taxistasCtrl.criarTaxista(novoTaxista);
			if (sucesso)
			{
				self.toastSrv.success("Registro criado com sucesso!", "Taxistas", {
					destroyByClick: true,
					duration: 0,
					position: NbGlobalPhysicalPosition.TOP_RIGHT
				});

				self.limparCampos();
			}
		}
		else if (self.modo === Modo.mdEdicao)
		{
			if (self.formUsuario.alterado)
			{
			}

			if (self.formEndereco.alterado)
			{
			}

			if (self.formCredenciais.alterado)
			{
			}

			if (self.formFoto.alterado)
			{
			}

			/*sucesso = await self.taxistasCtrl.alterarTaxista(self.taxista, novoTaxista);
			if (sucesso)
			{
				self.toastSrv.success("Taxista alterado com sucesso!", "Taxistas", {
					destroyByClick: true,
					duration: 0,
					position: NbGlobalPhysicalPosition.TOP_RIGHT
				});
			}*/
		}

		if (sucesso)
		{
			self.taxistasCtrl.atualizar();
		}
	}

	async cancelarEdicao()
	{
		const self = this;
		if (!self.podeCancelar) return; // sanity check

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Taxistas',
					prompt: 'Cancelar alterações?'
				},
			})
			.onClose.toPromise().then(result =>
			{
				self.limparCampos();
			});
	}

	private limparCampos()
	{
		const self = this;
		self.formUsuario.form.reset();
		self.formEndereco.form.reset();
		self.formCredenciais.form.reset();
		self.formFoto.form.reset();
	}
}
