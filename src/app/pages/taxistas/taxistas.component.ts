import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TaxistasControllerService, TaxistaExt } from './taxistas-controller.service';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription, Subject, EMPTY } from 'rxjs';
import { ValidatorFn, FormGroup, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { FotoService } from '../../../api/to_de_taxi/services';
import { EnderecoService } from '../../../api/viacep/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export const conferirSenhaValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
{
	const senha = control.get('senha');
	const conferirSenha = control.get('conferirSenha');
	return senha && conferirSenha && senha.value !== conferirSenha.value ? { 'senhasDiferentes': true } : null;
};

enum Modo
{
	mdEdicao,
	mdCriacao,
	mdVisualizacao
}

@Component({
	selector: 'ngx-taxistas',
	templateUrl: './taxistas.component.html',
	styleUrls: ['./taxistas.component.scss']
})
export class TaxistasComponent implements OnInit, AfterViewInit, OnDestroy
{
	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;

	modo: Modo = Modo.mdVisualizacao;

	taxista: TaxistaExt = null;
	taxistas: TaxistaExt[] = [];
	taxistasSub: Subscription;

	cepAlterado = new Subject<string>();
	private cepAlteradoSub: Subscription;

	taxistaSelSub: Subscription;
	busyStackCriarSub: Subscription = null;
	busyStackAlterarSub: Subscription = null;
	busyStackAtualizarSub: Subscription = null;
	busyStackRemoverSub: Subscription = null;

	imgSrc: any = null;

	formInformacoesPessoais: FormGroup = new FormGroup(
	{
		'nome': new FormControl('', [Validators.required]),
		'rg': new FormControl('', [Validators.required]),
		'cpf': new FormControl('', [Validators.required]),
		'email': new FormControl('', [Validators.required]),
		'telefone': new FormControl('', [Validators.required]),
	}, { validators: conferirSenhaValidator });

	formEndereco: FormGroup = new FormGroup(
	{
		'cep': new FormControl('', [Validators.required]),
		'logradouro': new FormControl('', [Validators.required]),
		'numero': new FormControl('', [Validators.required]),
		'complemento': new FormControl(''),
		'bairro': new FormControl('', [Validators.required]),
		'localidade': new FormControl('', [Validators.required]),
		'uf': new FormControl('', [Validators.required])
	});

	formCredenciais: FormGroup = new FormGroup(
	{
		'login': new FormControl('', [Validators.required]),
		'senha': new FormControl('', [Validators.required]),
		'conferirSenha': new FormControl('', [Validators.required])
	}, { validators: conferirSenhaValidator });

	get nome() { return this.formInformacoesPessoais.get('nome'); }
	get rg() { return this.formInformacoesPessoais.get('rg'); }
	get cpf() { return this.formInformacoesPessoais.get('cpf'); }
	get email() { return this.formInformacoesPessoais.get('email'); }
	get telefone() { return this.formInformacoesPessoais.get('telefone'); }

	get cep() { return this.formEndereco.get('cep'); }
	get logradouro() { return this.formEndereco.get('logradouro'); }
	get numero() { return this.formEndereco.get('numero'); }
	get complemento() { return this.formEndereco.get('complemento'); }
	get bairro() { return this.formEndereco.get('bairro'); }
	get localidade() { return this.formEndereco.get('localidade'); }
	get uf() { return this.formEndereco.get('uf'); }

	get login() { return this.formCredenciais.get('login'); }
	get senha() { return this.formCredenciais.get('senha'); }
	get conferirSenha() { return this.formCredenciais.get('conferirSenha'); }

	get alterado(): boolean
	{
		const self = this;

		if (!self.taxista) return false;
		else if (self.nome.value !== self.taxista.usuario.nome) return true;
		else if (self.rg.value !== self.taxista.rg) return true;
		else if (self.cpf.value !== self.taxista.cpf) return true;
		else if (self.login.value !== self.taxista.usuario.login) return true;
		else if (self.senha.value !== self.taxista.usuario.senha) return true;
		else if (self.email.value !== self.taxista.usuario.email) return true;
		else if (self.telefone.value !== self.taxista.usuario.telefone) return true;
		else if (self.cep.value !== self.taxista.endereco.cep) return true;
		else if (self.logradouro.value !== self.taxista.endereco.logradouro) return true;
		else if (self.numero.value !== self.taxista.endereco.numero) return true;
		else if (self.complemento.value !== self.taxista.endereco.complemento) return true;
		else if (self.bairro.value !== self.taxista.endereco.bairro) return true;
		else if (self.localidade.value !== self.taxista.endereco.localidade) return true;
		else if (self.uf.value !== self.taxista.endereco.uf) return true;

		//if (self.taxista.fotoSummary.nome !== self.taxista.fotoSummary.nome) return true;
		//if (self.taxista.fotoSummary.nomeArquivo !== self.taxista.fotoSummary.nomeArquivo) return true;
		//if (self.taxista.idPontoTaxi !== self.taxista.idPontoTaxi) return true;
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
		self.cepAlteradoSub = self.cepAlterado.pipe(
			debounceTime(1000),
			distinctUntilChanged(),
			switchMap(term =>
			{
				self.obterEndereco(term);
				return EMPTY;
			})
		).subscribe();
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.taxistasSub.unsubscribe();
		self.cepAlteradoSub.unsubscribe();
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
			/*if (self.alterado)
			{
				let descartar = false;

				await self.dialogSrv.open(ConfirmDialogComponent)
					.onClose.toPromise().then(result =>
					{
						descartar = result;
					});

				if (!descartar)
				{
					return;
				}
			}*/

			self.taxista = tax_sel;
			self.limparCampos();
			this.visualizar();
		});
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
		return self.modo !== Modo.mdEdicao && self.taxista !== null;
	}

	get podeConfirmar(): boolean
	{
		const self = this;
		return (self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao) && self.alterado && self.formInformacoesPessoais.valid;
	}

	get podeCancelar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao;
	}

	private async obterEndereco(cep: string)
	{
		const self = this;
		await self.enderecoSrv.Get(cep).toPromise().then(endereco => 
		{
			self.formEndereco.patchValue(endereco);
		});
	}

	private async visualizar()
	{
		const self = this;

		self.modo = Modo.mdVisualizacao;

		if (!self.taxista) return;

		self.formInformacoesPessoais.patchValue(
		{
			nome: self.taxista.usuario.nome,
			rg: self.taxista.rg,
			cpf: self.taxista.cpf,
			email: self.taxista.usuario.email,
			telefone: self.taxista.usuario.telefone,
		});

		self.formEndereco.patchValue(
		{
			cep: self.taxista.endereco.cep,
			logradouro: self.taxista.endereco.logradouro,
			numero: self.taxista.endereco.numero,
			complemento: self.taxista.endereco.complemento,
			bairro: self.taxista.endereco.bairro,
			localidade: self.taxista.endereco.localidade,
			uf: self.taxista.endereco.uf
		});

		self.formCredenciais.patchValue(
		{
			login: self.taxista.usuario.login,
			senha: self.taxista.usuario.senha,
			conferirSenha: self.taxista.usuario.confirmarSenha
		});

		if (self.taxista.idFoto && !self.taxista.fotoSummary.dados)
		{
			// obtém foto do servidor
			await self.fotoSrv.ApiV1FotoByIdGet(self.taxista.idFoto).toPromise().then(resp =>
			{
				if (resp.success)
				{
					self.taxista.fotoSummary.id = resp.data.id;
					self.taxista.fotoSummary.nome = resp.data.nome;
					self.taxista.fotoSummary.nomeArquivo = resp.data.nomeArquivo;
					self.taxista.fotoSummary.dados = resp.data.dados;
					self.imgSrc = atob(self.taxista.fotoSummary.dados);
				}
			});
		}
	}

	public editar()
	{
		const self = this;
		if (!self.podeEditar) return; // sanity check

		self.modo = Modo.mdEdicao;
	}

	public criar()
	{
		const self = this;
		if (!self.podeCriar) return; // sanity check

		self.taxista = self.taxistasCtrl.instanciarTaxista();
		self.visualizar();

		self.modo = Modo.mdCriacao;
	}

	public async confirmarEdicao()
	{
		const self = this;
		if (!self.podeConfirmar) return; // sanity check

		const novoTaxista = self.taxistasCtrl.instanciarTaxista();

		novoTaxista.usuario.nome = self.nome.value;
		novoTaxista.endereco.cep = self.cep.value;
		novoTaxista.endereco.logradouro = self.logradouro.value;
		novoTaxista.endereco.numero = self.numero.value;
		novoTaxista.endereco.complemento = self.complemento.value;
		novoTaxista.endereco.bairro = self.bairro.value;
		novoTaxista.endereco.localidade = self.localidade.value;
		novoTaxista.endereco.uf = self.uf.value;
		novoTaxista.rg = self.rg.value;
		novoTaxista.cpf = self.cpf.value;
		novoTaxista.usuario.email = self.email.value;
		novoTaxista.usuario.telefone = self.telefone.value;
		novoTaxista.usuario.login = self.login.value;
		novoTaxista.usuario.senha = self.senha.value;
		novoTaxista.usuario.confirmarSenha = self.conferirSenha.value;

		let sucesso = false;
		switch (self.modo)
		{
			case Modo.mdCriacao:
				sucesso = await self.taxistasCtrl.criarTaxista(novoTaxista);
				if (sucesso)
				{
					self.toastSrv.success("Taxista criado com sucesso!", "Taxistas", {
						destroyByClick: true,
						duration: 0,
						position: NbGlobalPhysicalPosition.TOP_RIGHT
					});

					self.limparCampos();
				}
				break;
			case Modo.mdEdicao:
				sucesso = await self.taxistasCtrl.alterarTaxista(self.taxista, novoTaxista);
				if (sucesso)
				{
					self.toastSrv.success("Taxista alterado com sucesso!", "Taxistas", {
						destroyByClick: true,
						duration: 0,
						position: NbGlobalPhysicalPosition.TOP_RIGHT
					});
				}
				break;
			default:
				break;
		}

		if (sucesso)
		{
			self.taxistasCtrl.atualizar();
		}
		//self.visualizar();
	}

	public cancelarEdicao()
	{
		const self = this;
		if (!self.podeCancelar) return; // sanity check

		self.visualizar();
	}

	private limparCampos()
	{
		const self = this;
		self.formInformacoesPessoais.reset();
		self.formEndereco.reset();
		self.formCredenciais.reset();
	}

	processFile(imageInput: any)
	{
		const self = this;

		const file: File = imageInput.files[0];
		const reader = new FileReader();

		self.taxista.arquivoFoto = file;

		const listenAsURL = (event: any) => {
			self.imgSrc = event.target.result;
			self.taxista.fotoSummary.dados = btoa(event.target.result);
			self.taxista.fotoSummary.nomeArquivo = file.name;
			self.taxista.fotoSummary.nome = file.name;
		};

		reader.addEventListener('load', listenAsURL);
		reader.readAsDataURL(file);
	}
}
