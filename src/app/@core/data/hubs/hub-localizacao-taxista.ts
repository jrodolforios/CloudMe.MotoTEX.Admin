import { HubWrapper } from './hub-wrapper';
import { OAuthService } from 'angular-oauth2-oidc';

export class HubLocalizacaoTaxista extends HubWrapper
{
	constructor(private oauthService: OAuthService)
	{
		super('https://api.todetaxi.com.br/notifications/localizacao_taxista', () => oauthService.getAccessToken());
	}
}
