import { Injectable } from '@angular/core';
import { UsuarioSummary } from '../api/to_de_taxi/models';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { NbToastrService } from '@nebular/theme';
import { CatalogosService } from './catalogos/catalogos.service';
import { UsuarioService } from '../api/to_de_taxi/services';
import { Router } from '@angular/router';

@Injectable()
export class GlobaisService
{
	itemCarregamento: string = '';

	usuario = new BehaviorSubject<UsuarioSummary>(null);

	constructor(
		private oauthService: OAuthService,
		// private toastSrv: NbToastrService,
		private usuarioSrv: UsuarioService,
		private catalogosSrv: CatalogosService,
		private router: Router)
	{
	}

	async carregarPerfilUsuario()
	{
		const self = this;

		await self.oauthService.loadUserProfile().then(async profile =>
		{
			const idUsr =  profile['sub'];
			if (idUsr)
			{
				await self.usuarioSrv.ApiV1UsuarioByIdGet(idUsr).toPromise().then(resultado =>
				{
					if (resultado && resultado.success)
					{
						self.usuario.next(resultado.data);
					}
				}).catch(() => {});
			}

			//self.catalogosSrv.carregar();
		});
	}

	async iniciarCatalogos()
	{
		const self = this;
		self.itemCarregamento = 'Taxistas';
		await self.catalogosSrv.taxistas.getAll();
		self.catalogosSrv.taxistas.startTrackingChanges();

		self.itemCarregamento = 'Passageiros';
		await self.catalogosSrv.passageiros.getAll();
		self.catalogosSrv.passageiros.startTrackingChanges();

		self.itemCarregamento = 'Fotos';
		self.catalogosSrv.fotos.startTrackingChanges();

		self.itemCarregamento = 'Pontos de táxi';
		await self.catalogosSrv.pontosTaxi.getAll();
		self.catalogosSrv.pontosTaxi.startTrackingChanges();

		self.itemCarregamento = 'Veículos';
		await self.catalogosSrv.veiculos.getAll();
		self.catalogosSrv.veiculos.startTrackingChanges();

		self.itemCarregamento = 'Cores de veículos';
		await self.catalogosSrv.cores.getAll();
		self.catalogosSrv.cores.startTrackingChanges();

		self.itemCarregamento = 'Veículos/Taxistas';
		await self.catalogosSrv.veiculosTaxistas.getAll();
		self.catalogosSrv.veiculosTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Tarifas';
		await self.catalogosSrv.tarifas.getAll();
		self.catalogosSrv.tarifas.startTrackingChanges();

		self.itemCarregamento = 'Faixas de desconto';
		await self.catalogosSrv.faixasDesconto.getAll();
		self.catalogosSrv.faixasDesconto.startTrackingChanges();

		self.itemCarregamento = 'Faixas de desconto/Taxistas';
		await self.catalogosSrv.faixasDescontoTaxistas.getAll();
		self.catalogosSrv.faixasDescontoTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Forma de pagamento';
		await self.catalogosSrv.formasPagamento.getAll();
		self.catalogosSrv.formasPagamento.startTrackingChanges();

		self.itemCarregamento = 'Formas de pagamento/Taxistas';
		await self.catalogosSrv.formasPagamentoTaxistas.getAll();
		self.catalogosSrv.formasPagamentoTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Localizações';
		await self.catalogosSrv.localizacoes.getAll();
		self.catalogosSrv.localizacoes.startTrackingChanges();
	}

	async encerrarCatalogos()
	{
		const self = this;

		self.catalogosSrv.taxistas.stopTrackingChanges();
		self.catalogosSrv.passageiros.stopTrackingChanges();
		self.catalogosSrv.fotos.stopTrackingChanges();
		self.catalogosSrv.pontosTaxi.stopTrackingChanges();
		self.catalogosSrv.veiculos.stopTrackingChanges();
		self.catalogosSrv.cores.stopTrackingChanges();
		self.catalogosSrv.veiculosTaxistas.stopTrackingChanges();
		self.catalogosSrv.tarifas.stopTrackingChanges();
		self.catalogosSrv.faixasDesconto.stopTrackingChanges();
		self.catalogosSrv.faixasDescontoTaxistas.stopTrackingChanges();
		self.catalogosSrv.formasPagamento.stopTrackingChanges();
		self.catalogosSrv.formasPagamentoTaxistas.stopTrackingChanges();
		self.catalogosSrv.localizacoes.stopTrackingChanges();
	}
}
