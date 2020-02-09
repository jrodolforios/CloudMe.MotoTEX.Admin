import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalizacaoSummary, TaxistaSummary, PassageiroSummary, EmergenciaSummary, SolicitacaoCorridaSummary, FaixaAtivacaoSummary } from '../../../api/to_de_taxi/models';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { HubWrapper } from '../../@core/data/hubs/hub-wrapper';
import { OAuthService } from 'angular-oauth2-oidc';
import { NbToastrService } from '@nebular/theme';
import { SolicitacaoCorridaService, FaixaAtivacaoService, LocalizacaoService } from '../../../api/to_de_taxi/services';
import { CatalogChanges } from '../../catalogos/catalog';

enum StatusMonitoramentoSolicitacaoCorrida
{
	Indefinido      = 0,
	Ativacao        = 1,
	Disponibilidade = 2,
	Eleicao         = 3,
	Encerramento    = 4
}

enum AcaoTaxistaSolicitacaoCorrida
{
	Indefinido = 0,
	Ignorada   = 1,
	Aceita     = 2,
	Recusada   = 3
}

enum SituacaoSolicitacaoCorrida
{
	Indefinido  = 0,
	EmAvaliacao = 1,
	Aceita      = 2,
	Rejeitada   = 3,
	NaoAtendida = 4
}

interface CoordenadaGeografica
{
	latitude: number;
	longitude: number;
}

interface Circulo
{
	origem: CoordenadaGeografica;
	radius: number;

	fillColor: string;
	fillOpacity: number;
}

interface Linha
{
	inicio: CoordenadaGeografica;
	fim: CoordenadaGeografica;

	strokeColor: string;
	strokeWeight: number;
	strokeOpacity: number;
}

interface ConexaoSolicitacaoTaxista
{
	info_solicitacao: InfoSolicitacaoCorrida;
	taxista: TaxistaSummary;
	linha: Linha;
}

interface InfoSolicitacaoCorrida
{
	idSolicitacao: string;
	passageiro: PassageiroSummary;
	faixaAtual: Circulo;
	conexoes_taxistas: ConexaoSolicitacaoTaxista[];

	origem: CoordenadaGeografica;
	destino: CoordenadaGeografica;

	statusAtual: StatusMonitoramentoSolicitacaoCorrida;
	situacaoAtual: SituacaoSolicitacaoCorrida;

	carregada: boolean;
}

@Component({
	selector: 'ngx-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, OnDestroy {

	lat: number = -17.5408586;
	lng: number = -39.7510053;
	zoom = 15;

	solicitacaoCorridaChangeSub: Subscription = null;
	taxistasChangeSub: Subscription = null;
	passageirosChangeSub: Subscription = null;

	taxistas: TaxistaSummary[] = [];
	passageiros: PassageiroSummary[] = [];
	faixasAtivacao: FaixaAtivacaoSummary[] = [];

	infoSolicitacoes: InfoSolicitacaoCorrida[] = [];

	//hubLocalizacaoTaxistas: HubWrapper = null;
	//hubLocalizacaoPassageiros: HubWrapper = null;
	hubNotificacoesAdmin: HubWrapper = null;

	constructor(
		private catalogosSrv: CatalogosService,
		private localizacaoSrv: LocalizacaoService,
		private oauthService: OAuthService,
		private faixaAtivacaoSrv: FaixaAtivacaoService,
		private toastSrv: NbToastrService,
		private solicitacoesCorridaSrv: SolicitacaoCorridaService)
	{
		const self = this;
		// self.hubLocalizacaoTaxistas = new HubWrapper('https://api.todetaxi.com.br/notifications/localizacao_taxista', () => self.oauthService.getAccessToken());
		// self.hubLocalizacaoPassageiros = new HubWrapper('https://api.todetaxi.com.br/notifications/localizacao_passageiro', () => self.oauthService.getAccessToken());
		//self.hubLocalizacaoTaxistas = new HubWrapper('http://localhost:5002/notifications/localizacao_taxista', () => self.oauthService.getAccessToken());
		//self.hubLocalizacaoPassageiros = new HubWrapper('http://localhost:5002/notifications/localizacao_passageiro', () => self.oauthService.getAccessToken());

		// self.hubNotificacoesAdmin = new HubWrapper('http://localhost:5002/notifications/admin', () => self.oauthService.getAccessToken());
		// self.hubNotificacoesAdmin = new HubWrapper('https://api.mototex.cloudme.com.br/notifications/admin', () => self.oauthService.getAccessToken());
		self.hubNotificacoesAdmin = new HubWrapper('https://api.mototex.cloudme.com.br/notifications/admin', () => self.oauthService.getAccessToken());
	}

	async ngOnInit()
	{
		const self = this;

		// obtém as faixas de ativação do sistema
		await self.faixaAtivacaoSrv.ApiV1FaixaAtivacaoByRadiusGet().toPromise().then(resultado =>
		{
			if (resultado && resultado.success)
			{
				self.faixasAtivacao = resultado.data;
			}
		}).catch(() => {});

		self.atualizarTaxistas();
		self.taxistasChangeSub = self.catalogosSrv.taxistas.changesSubject.subscribe(changes =>
		{
			self.atualizarTaxistas();
		});

		self.atualizarPassageiros();
		self.passageirosChangeSub = self.catalogosSrv.passageiros.changesSubject.subscribe(changes =>
		{
			self.atualizarPassageiros();
		});

		self.solicitacaoCorridaChangeSub = self.catalogosSrv.solicitacoesCorrida.changesSubject.subscribe(changes =>
		{
			self.processarSolicitacoes(changes);
		});

		self.solicitacoesCorridaSrv.ApiV1SolicitacaoCorridaRecuperarSolicitacoesAtivasPost().toPromise().then(resposta =>
		{
			if (resposta && resposta.success && resposta.data.length > 0)
			{
				self.catalogosSrv.solicitacoesCorrida.add(resposta.data);
			}
		}).catch(() => {});


		/*self.hubLocalizacaoTaxistas.connect().then(() =>
		{
			self.hubLocalizacaoTaxistas.hubConnection.on('EnviarLocalizacao', () =>
			{
				//self.toastSrv.info('Servidor solicitou localização de taxistas', 'Mapas');
			});
		});*/

		/*self.hubLocalizacaoPassageiros.connect().then(() =>
		{
			self.hubLocalizacaoPassageiros.hubConnection.on('EnviarLocalizacao', () =>
			{
				//self.toastSrv.info('Servidor solicitou localização de passageiros', 'Mapas');
			});

			self.hubLocalizacaoTaxistas.hubConnection.on('panico', (emergencia: EmergenciaSummary) =>
			{
				self.toastSrv.danger(`Solicitação de pânico do taxista ${emergencia.idTaxista}`);
			});
		});*/

		self.hubNotificacoesAdmin.connect().then(() =>
		{
			self.hubNotificacoesAdmin.hubConnection.on('sol_corr_ativacao_tx', async dados =>
			{
				// gera as conexões do taxista com a solicitação de corrida

				let solicitCorrida = self.catalogosSrv.solicitacoesCorrida.findItem(dados.sol_corr.id);
				if (!solicitCorrida)
				{
					solicitCorrida = dados.sol_corr;
					self.catalogosSrv.solicitacoesCorrida.add([dados.sol_corr]);
				}

				let infoSol = self.infoSolicitacoes.find(info => info.idSolicitacao === dados.sol_corr.id);

				if (!infoSol)
				{
					infoSol = await self.adicionarInfoSolicitacao(dados.sol_corr);
				}

				dados.taxistas.forEach(id_taxista =>
				{
					const taxista = self.catalogosSrv.taxistas.findItem(id_taxista);
					if (!taxista) return;

					const cnxTxSol: ConexaoSolicitacaoTaxista =
					{
						info_solicitacao: infoSol,
						taxista,
						linha:
						{
							inicio:
							{
								latitude: infoSol.origem.latitude,
								longitude: infoSol.origem.longitude
							} as CoordenadaGeografica,
							fim: taxista['localizacao'],
							strokeColor: 'yellow',
							strokeWeight: 2,
							strokeOpacity: 1
						} as Linha
					};

					infoSol.conexoes_taxistas.push(cnxTxSol);
				});
			});

			self.hubNotificacoesAdmin.hubConnection.on('sol_corr_acao_tx', dados =>
			{
				// procura a conexão do taxista com a solicitação e muda a cor da linha, dependendo da ação do taxista
				const infoSol = self.infoSolicitacoes.find(info =>
				{
					return info.idSolicitacao === dados.id_solicitacao;
				});

				if (infoSol)
				{
					const cnxTxSol = infoSol.conexoes_taxistas.find(cnx => cnx.taxista.id === dados.id_taxista);
					if (cnxTxSol)
					{
						switch (dados.acao_taxista) {
							case AcaoTaxistaSolicitacaoCorrida.Aceita:
								cnxTxSol.linha.strokeColor = 'green';
								cnxTxSol.linha.strokeWeight = 2;
								break;
							case AcaoTaxistaSolicitacaoCorrida.Recusada:
								cnxTxSol.linha.strokeColor = 'red';
								break;
							case AcaoTaxistaSolicitacaoCorrida.Ignorada:
								cnxTxSol.linha.strokeColor = 'white';
								cnxTxSol.linha.strokeOpacity = 0.4;
								break;
							default:
								break;
						}
					}
				}
			});

			self.hubNotificacoesAdmin.hubConnection.on('loc_tx', dados =>
			{
				const taxista = self.catalogosSrv.taxistas.findItem(dados.id);
				if (taxista)
				{
					taxista['localizacao'].latitude = dados.lat;
					taxista['localizacao'].longitude = dados.lgt;
					taxista['last_upd'] = +new Date;
				}
			});

			self.hubNotificacoesAdmin.hubConnection.on('loc_pass', dados =>
			{
				const passageiro = self.catalogosSrv.passageiros.findItem(dados.id);
				if (passageiro)
				{
					passageiro['localizacao'].latitude = dados.lat;
					passageiro['localizacao'].longitude = dados.lgt;
					passageiro['last_upd'] = +new Date;
				}

				//self.passageiros = self.catalogosSrv.passageiros.items;
			});
		});
	}

	atualizarTaxistas()
	{
		const self = this;

		self.taxistas = self.catalogosSrv.taxistas.items;
		self.taxistas.forEach(taxista =>
		{
			if (!taxista['localizacao'])
			{
				taxista['localizacao'] =
				{
					latitude: 0,
					longitude: 0
				};
			}
		});
}

	atualizarPassageiros()
	{
		const self = this;

		self.passageiros = self.catalogosSrv.passageiros.items;
		self.passageiros.forEach(passageiro =>
		{
			if (!passageiro['localizacao'])
			{
				passageiro['localizacao'] =
				{
					latitude: 0,
					longitude: 0
				};
			}
		});
}

	passageiroOnLine(passageiro: PassageiroSummary): boolean
	{
		if (!passageiro['last_upd']) return false;
		const delta = ((+new Date) - passageiro['last_upd']);
		return (delta < 10000);
	}

	taxistaOnLine(taxista: TaxistaSummary): boolean
	{
		if (!taxista['last_upd']) return false;
		const delta = ((+new Date) - taxista['last_upd']);
		return (delta < 10000);
	}

	ngOnDestroy()
	{
		const self = this;
		self.solicitacaoCorridaChangeSub.unsubscribe();
		//self.hubLocalizacaoTaxistas.disconnect();
		//self.hubLocalizacaoPassageiros.disconnect();
		self.hubNotificacoesAdmin.disconnect();
		self.taxistasChangeSub.unsubscribe();
		self.passageirosChangeSub.unsubscribe();
	}

	atualizarFaixaAtivacaoAtual(infoSolicitacao: InfoSolicitacaoCorrida, solicitacaoCorrida: SolicitacaoCorridaSummary)
	{
		const self = this;

		infoSolicitacao.faixaAtual.radius = self.faixasAtivacao[solicitacaoCorrida.idxFaixaBusca].raio;
		switch (solicitacaoCorrida.situacao) {
			case SituacaoSolicitacaoCorrida.Aceita:
				infoSolicitacao.faixaAtual.fillColor = 'green';
				break;
			case SituacaoSolicitacaoCorrida.NaoAtendida:
				infoSolicitacao.faixaAtual.fillColor = 'red';
				break;
			case SituacaoSolicitacaoCorrida.EmAvaliacao:
			default:
				infoSolicitacao.faixaAtual.fillColor = 'yellow';
				break;
		}

		infoSolicitacao.faixaAtual.origem.latitude = infoSolicitacao.origem.latitude;
		infoSolicitacao.faixaAtual.origem.longitude = infoSolicitacao.origem.longitude;
		infoSolicitacao.faixaAtual.fillOpacity = 0.1;
	}

	async adicionarInfoSolicitacao(solicitacaoCorrida: SolicitacaoCorridaSummary): Promise<InfoSolicitacaoCorrida>
	{
		const self = this;
		if (!solicitacaoCorrida) return null;

		const infoSol: InfoSolicitacaoCorrida =
		{
			idSolicitacao: solicitacaoCorrida.id,
			passageiro: self.catalogosSrv.passageiros.findItem(solicitacaoCorrida.idPassageiro),
			faixaAtual:
			{
				origem:
				{
					latitude: 0,
					longitude: 0
				},
				fillColor: 'white',
				radius: 0,
				fillOpacity: 0
			},
			conexoes_taxistas: [],
			statusAtual: solicitacaoCorrida.statusMonitoramento,
			situacaoAtual: solicitacaoCorrida.situacao,
			carregada: false,
			origem: {latitude: 0, longitude: 0},
			destino: {latitude: 0, longitude: 0}
		};

		self.infoSolicitacoes.push(infoSol);

		await self.localizacaoSrv.ApiV1LocalizacaoByIdGet(solicitacaoCorrida.idLocalizacaoOrigem).toPromise().then(resultado =>
		{
			if (resultado && resultado.success)
			{
				infoSol.origem.latitude = +resultado.data.latitude;
				infoSol.origem.longitude = +resultado.data.longitude;
			}
		});

		await self.localizacaoSrv.ApiV1LocalizacaoByIdGet(solicitacaoCorrida.idLocalizacaoDestino).toPromise().then(resultado =>
		{
			if (resultado && resultado.success)
			{
				infoSol.destino.latitude = +resultado.data.latitude;
				infoSol.destino.longitude = +resultado.data.longitude;
			}
		});

		self.atualizarFaixaAtivacaoAtual(infoSol, solicitacaoCorrida);

		infoSol.carregada = true;

		return infoSol;
	}

	async atualizarInfoSolicitacao(solicitacaoCorrida: SolicitacaoCorridaSummary)
	{
		const self = this;

		const infoSol = self.infoSolicitacoes.find(info => info.idSolicitacao === solicitacaoCorrida.id);
		if (!infoSol)
		{
			return;
		}

		infoSol.origem.latitude = +solicitacaoCorrida.latitudeOrigem;
		infoSol.origem.longitude = +solicitacaoCorrida.longitudeOrigem;
		infoSol.destino.latitude = +solicitacaoCorrida.latitudeDestino;
		infoSol.destino.longitude = +solicitacaoCorrida.longitudeDestino;

		self.atualizarFaixaAtivacaoAtual(infoSol, solicitacaoCorrida);

		if (solicitacaoCorrida.situacao === SituacaoSolicitacaoCorrida.Aceita ||
			solicitacaoCorrida.situacao === SituacaoSolicitacaoCorrida.NaoAtendida ||
			solicitacaoCorrida.situacao === SituacaoSolicitacaoCorrida.Rejeitada)
		{
			setTimeout(() => {
				self.catalogosSrv.solicitacoesCorrida.remove([solicitacaoCorrida]);
				self.infoSolicitacoes.splice(self.infoSolicitacoes.indexOf(infoSol), 1);
			}, 5000);
		}
	}

	processarSolicitacoes(changes: CatalogChanges<SolicitacaoCorridaSummary>)
	{
		const self = this;

		changes.addedItems.forEach(solCorr => {
			self.adicionarInfoSolicitacao(solCorr);
		});

		changes.updatedItems.forEach(solCorr => {
			self.atualizarInfoSolicitacao(solCorr);
		});
	}
}
