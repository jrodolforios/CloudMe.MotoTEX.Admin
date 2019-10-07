import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TaxistasControllerService, TaxistaExt } from './taxistas-controller.service';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { FotoService, UsuarioService, TaxistaService, EnderecoService } from '../../../api/to_de_taxi/services';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { FormCredenciaisComponent } from '../../common-views/forms/form-credenciais/form-credenciais.component';
import { FormFotoComponent } from '../../common-views/forms/form-foto/form-foto.component';
import { FormUsuarioComponent } from '../../common-views/forms/form-usuario/form-usuario.component';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';
import { TaxistaSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';

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

	taxistaSelecionado = new BehaviorSubject<TaxistaExt>(null);

	// indicação de carregamento de dados da API em background
	busyStackAtualizar = new BusyStack();
	busyStackDelete = new BusyStack();
	busyStackCriar = new BusyStack();
	busyStackAlterar = new BusyStack();

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

	get registroAlterado(): boolean
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
		private dialogSrv: NbDialogService,
		private usuarioSrv: UsuarioService,
		private taxistaSrv: TaxistaService,
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

		self.atualizar();

		const atualizarRemoverCallback = () =>
		{
			if (self.cardListagem)
			{
				self.cardListagem.toggleRefresh(
					self.busyStackAtualizar.busy.value > 0 &&
					self.busyStackDelete.busy.value > 0);
			}
		};

		const criarAlterarCallback = () =>
		{
			if (self.cardDetalhes)
			{
				self.cardDetalhes.toggleRefresh(
					self.busyStackAtualizar.busy.value > 0 &&
					self.busyStackDelete.busy.value > 0);
			}
		};

		self.busyStackAtualizarSub = self.busyStackAtualizar.busy.subscribe(atualizarRemoverCallback);
		self.busyStackRemoverSub = self.busyStackDelete.busy.subscribe(atualizarRemoverCallback);
		self.busyStackCriarSub = self.busyStackCriar.busy.subscribe(criarAlterarCallback);
		self.busyStackAlterarSub = self.busyStackAlterar.busy.subscribe(criarAlterarCallback);

		self.taxistaSelSub = self.taxistaSelecionado.subscribe(async tax_sel =>
		{
			if (self.taxista !== tax_sel)
			{
				self.limparCampos();
				self.taxista = tax_sel;
			}
		});
	}

	async setModo(value: Modo): Promise<boolean>
	{
		const self = this;
		if (self._modo !== value)
		{
			if (self.registroAlterado)
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
		}
		return true;
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
		return self.modo === Modo.mdVisualizacao && self.taxista !== null && self.taxista.id.length > 0;
	}

	get podeConfirmar(): boolean
	{
		const self = this;
		return (self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao) && self.registroAlterado && self.formUsuario.form.valid;
	}

	get podeCancelar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao;
	}

	public instanciarTaxista(sumario?: TaxistaSummary): TaxistaExt
	{
		let taxista: TaxistaExt;
		if (sumario)
		{
			taxista =
			{
				id: sumario.id,
				usuario: sumario.usuario,
				endereco: sumario.endereco,
				idPontoTaxi: sumario.idPontoTaxi,
				idLocalizacaoAtual: sumario.idLocalizacaoAtual,
				idFoto: sumario.idFoto,
				fotoSummary:
				{
					id: null,
					dados: null,
					nome: '',
					nomeArquivo: ''
				},
			};
		}
		else
		{
			taxista =
			{
				id: undefined,
				usuario:
				{
					id: undefined,
					nome: '',
					rg: '',
					cpf: '',
					email: '',
					telefone: '',
					credenciais:
					{
						login: '',
						senha: '',
						confirmarSenha: '',
						senhaAnterior: ''
					}
				},
				endereco:
				{
					id: undefined,
					cep: '',
					logradouro: '',
					numero: '',
					complemento: '',
					bairro: '',
					localidade: '',
					uf: ''
				},
				idLocalizacaoAtual: undefined,
				idPontoTaxi: undefined,
				idFoto: undefined,
				fotoSummary:
				{
					id: null,
					dados: null,
					nome: '',
					nomeArquivo: ''
				}
			};
		}

		return taxista;
	}

	private criarSumario(taxista: TaxistaExt): TaxistaSummary
	{
		const summary: TaxistaSummary = {
			id: taxista.id,
			usuario:
			{
				id: taxista.usuario.id,
				nome: taxista.usuario.nome,
				cpf: taxista.usuario.cpf,
				rg: taxista.usuario.rg,
				email: taxista.usuario.email,
				telefone: taxista.usuario.telefone,
				credenciais:
				{
					login: taxista.usuario.credenciais.login,
					senha: taxista.usuario.credenciais.senha,
					confirmarSenha: taxista.usuario.credenciais.confirmarSenha,
					senhaAnterior: taxista.usuario.credenciais.senhaAnterior
				}
			},
			endereco:
			{
				id: taxista.endereco.id,
				cep: taxista.endereco.cep,
				logradouro: taxista.endereco.logradouro,
				numero: taxista.endereco.numero,
				complemento: taxista.endereco.complemento,
				bairro: taxista.endereco.bairro,
				localidade: taxista.endereco.localidade,
				uf: taxista.endereco.uf
			},
			idFoto: taxista.idFoto,
			idPontoTaxi: taxista.idPontoTaxi
		};

		return summary;
	}

	public async atualizar()
	{
		const self = this;
		await self.obterTaxistas();

		let taxistaSel = self.taxistaSelecionado.value;

		if (taxistaSel && !self.taxistas.find(tx => tx.id === taxistaSel.id))
		{
			taxistaSel = null;
		}

		if (!taxistaSel)
		{
			self.taxistaSelecionado.next(self.taxistas.length > 0 ? self.taxistas[0] : null);
		}
	}

	private async obterTaxistas()
	{
		const self = this;

		self.busyStackAtualizar.push();

		const novos_taxistas: TaxistaExt[] = [];

		// obtém informações de acesso dos usuários
		await self.taxistaSrv.ApiV1TaxistaGet().toPromise().then(async resp => {
			if (resp && resp.success)
			{
				resp.data.forEach(taxista_sum => {
					novos_taxistas.push(self.instanciarTaxista(taxista_sum));
				});
			}
		});

		self.taxistas = novos_taxistas;

		self.busyStackAtualizar.pop();
	}

	selecionar(taxista: TaxistaExt)
	{
		this.taxistaSelecionado.next(taxista);
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

	async editar(taxista: TaxistaExt)
	{
		const self = this;
		if (!self.podeEditar) return; // sanity check

		await self.setModo(Modo.mdEdicao).then(result =>
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
			self.busyStackDelete.push();

			//await self.removerFoto(taxista.fotoSummary);

			await self.taxistaSrv.ApiV1TaxistaByIdDelete(taxista.id).toPromise().then(resp =>
			{
				if (resp && resp.success)
				{
					self.toastSrv.success('Registro removido com sucesso!', 'Taxistas');
					self.atualizar();
				}
			});

			self.busyStackDelete.pop();
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
				self.selecionar(self.instanciarTaxista());
			}
		});
	}

	public async confirmarEdicao()
	{
		const self = this;
		if (!self.podeConfirmar) return; // sanity check

		if (self.modo === Modo.mdCriacao)
		{
			const novoTaxista = self.instanciarTaxista();
			novoTaxista.usuario = self.formUsuario.obterAlteracoes();
			novoTaxista.endereco = self.formEndereco.obterAlteracoes();
			novoTaxista.usuario.credenciais = self.formCredenciais.obterAlteracoes();
			novoTaxista.fotoSummary = self.formFoto.obterAlteracoes();

			self.busyStackCriar.push();

			// cria o registro do taxista
			await self.taxistaSrv.ApiV1TaxistaPost(novoTaxista).toPromise().then(async resp =>
			{
				if (resp && resp.success)
				{
					novoTaxista.id = resp.data;
					self.toastSrv.success('Registro criado com sucesso!', 'Taxistas');

					//await self.enviarFoto(novo_taxista.fotoSummary);
					//result = true;
				}
			});

			self.busyStackCriar.pop();
		}
		else if (self.modo === Modo.mdEdicao)
		{
			if (self.formUsuario.alterado)
			{
				self.usuarioSrv.ApiV1UsuarioPut(self.formUsuario.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Informações pessoais alteradas com sucesso!', 'Taxistas');
					}
				});
			}

			if (self.formEndereco.alterado)
			{
				self.enderecoSrv.ApiV1EnderecoPut(self.formEndereco.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Endereço alterado com sucesso!', 'Taxistas');
					}
				});
			}

			if (self.formCredenciais.alterado)
			{
				self.usuarioSrv.ApiV1UsuarioAlteraSenhaByIdPost({
					id: self.taxista.usuario.id,
					credenciais: self.formCredenciais.obterAlteracoes()
				}).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Credenciais alteradas com sucesso!', 'Taxistas');
					}
				});
			}

			if (self.formFoto.alterado)
			{
				self.fotoSrv.ApiV1FotoPut(self.formFoto.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Foto alterada com sucesso!', 'Taxistas');
					}
				});
			}
		}

		self.atualizar();
		self.setModo(Modo.mdVisualizacao);
	}

	async cancelarEdicao()
	{
		const self = this;
		if (!self.podeCancelar) return; // sanity check

		let cancelar = true;

		if (self.registroAlterado)
		{
			await self.dialogSrv.open(
				ConfirmDialogComponent,
				{
					context:
					{
						title: 'Taxistas',
						prompt: 'Cancelar alterações?'
					},
				})
				.onClose.toPromise().then(async result =>
				{
					cancelar = result;
				});
		}

		if (cancelar)
		{
			await self.setModo(Modo.mdVisualizacao);
		}
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
