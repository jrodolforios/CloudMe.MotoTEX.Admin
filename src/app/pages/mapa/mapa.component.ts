import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalizacaoSummary, TaxistaSummary, PassageiroSummary, EmergenciaSummary } from '../../../api/to_de_taxi/models';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { HubWrapper } from '../../@core/data/hubs/hub-wrapper';
import { OAuthService } from 'angular-oauth2-oidc';
import { NbToastrService } from '@nebular/theme';

interface LocalizacaoTaxista
{
	taxista: TaxistaSummary;
	localizacao: LocalizacaoSummary;
}

interface LocalizacaoPassageiro
{
	passageiro: PassageiroSummary;
	localizacao: LocalizacaoSummary;
}

@Component({
	selector: 'ngx-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, OnDestroy {

	lat: number = -17.8588;
	lng: number = -41.509;
	zoom = 15;

	localizacaoChangeSub: Subscription = null;

	taxistas: LocalizacaoTaxista[] = [];
	passageiros: LocalizacaoPassageiro[] = [];

	hubLocalizacaoTaxistas: HubWrapper = null;
	hubLocalizacaoPassageiros: HubWrapper = null;

	constructor(
		private catalogosSrv: CatalogosService,
		private oauthService: OAuthService,
		private toastSrv: NbToastrService)
	{
		const self = this;
		self.hubLocalizacaoTaxistas = new HubWrapper('https://api.mototex.cloudme.com.br/notifications/localizacao_taxista', () => self.oauthService.getAccessToken());
		self.hubLocalizacaoPassageiros = new HubWrapper('https://api.mototex.cloudme.com.br/notifications/localizacao_passageiro', () => self.oauthService.getAccessToken());
		// self.hubLocalizacaoTaxistas = new HubWrapper('http://localhost:5002/notifications/localizacao_taxista', () => self.oauthService.getAccessToken());
		// self.hubLocalizacaoPassageiros = new HubWrapper('http://localhost:5002/notifications/localizacao_passageiro', () => self.oauthService.getAccessToken());
	}

	private adicionarLocalizacao(localizacao: LocalizacaoSummary)
	{
		const self = this;

		if (localizacao.idUsuario)
		{
			const taxista = self.catalogosSrv.taxistas.items.find(tx =>
			{
				return tx.ativo && tx.usuario.id === localizacao.idUsuario;
			});

			if (taxista)
			{
				const locTx: LocalizacaoTaxista =
				{
					localizacao,
					taxista
				};

				self.taxistas.push(locTx);
			}
			else
			{
				const passageiro = self.catalogosSrv.passageiros.items.find(psg =>
				{
					return psg.ativo && psg.usuario.id === localizacao.idUsuario;
				});

				if (passageiro)
				{
					if (!passageiro.ativo)
					{
						return;
					}

					const locPsg: LocalizacaoPassageiro =
					{
						localizacao,
						passageiro
					};

					self.passageiros.push(locPsg);
				}
			}
		}
	}

	ngOnInit()
	{
		const self = this;
		self.catalogosSrv.localizacoes.items.forEach(localizacao =>
		{
			self.adicionarLocalizacao(localizacao);
		});

		self.localizacaoChangeSub = self.catalogosSrv.localizacoes.changesSubject.subscribe(changes =>
		{
			let taxistasChanged = false;
			let passageirosChanged = false;

			// itens adicionados
			changes.addedItems.forEach(localizacao =>
			{
				const tpUsr = self.adicionarLocalizacao(localizacao);
			});

			// itens atualizados
			changes.updatedItems.forEach(localizacao =>
			{
				if (localizacao.idUsuario)
				{
					const locTaxista = self.taxistas.find(locTx => locTx.localizacao.id === localizacao.id);
					if (locTaxista)
					{
						taxistasChanged = true;
					}
					else
					{
						const locPassageiro = self.passageiros.find(locPsg => locPsg.localizacao.id === localizacao.id);
						if (locPassageiro)
						{
							passageirosChanged = true;
						}
					}
				}
			});

			// itens removidos
			changes.removedItems.forEach(localizacao =>
			{
				if (localizacao.idUsuario)
				{
					const locTaxista = self.taxistas.find(locTx => locTx.localizacao.id === localizacao.id);
					if (locTaxista)
					{
						self.taxistas.splice(self.taxistas.indexOf(locTaxista), 1);
						taxistasChanged = true;
					}
					else
					{
						const locPassageiro = self.passageiros.find(locPsg => locPsg.localizacao.id === localizacao.id);
						if (locPassageiro)
						{
							self.passageiros.splice(self.passageiros.indexOf(locPassageiro), 1);
							passageirosChanged = true;
						}
					}
				}
			});
		});

		self.hubLocalizacaoTaxistas.connect().then(() =>
		{
			self.hubLocalizacaoTaxistas.hubConnection.on('EnviarLocalizacao', () =>
			{
				//self.toastSrv.info('Servidor solicitou localização de taxistas', 'Mapas');
			});
		});

		self.hubLocalizacaoPassageiros.connect().then(() =>
		{
			self.hubLocalizacaoPassageiros.hubConnection.on('EnviarLocalizacao', () =>
			{
				//self.toastSrv.info('Servidor solicitou localização de passageiros', 'Mapas');
			});

			self.hubLocalizacaoTaxistas.hubConnection.on('panico', (emergencia: EmergenciaSummary) =>
			{
				self.toastSrv.danger(`Solicitação de pânico do taxista ${emergencia.idTaxista}`);
			});
		});
	}

	ngOnDestroy()
	{
		const self = this;
		self.localizacaoChangeSub.unsubscribe();
		self.hubLocalizacaoTaxistas.disconnect();
		self.hubLocalizacaoPassageiros.disconnect();
	}
}
