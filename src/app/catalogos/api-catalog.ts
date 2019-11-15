import { Catalog } from './catalog';
import { BusyStack } from '../@core/utils/busy_stack';
import * as signalR from '@aspnet/signalr';
import { OAuthService } from 'angular-oauth2-oidc';

export class ApiResponse<T>
{
	data?: T;
	success?: boolean;
	notifications?: Array<Notification>;
}

export function processResponse<T>(
	resp: ApiResponse<T>,
	resolve: (value?: T | PromiseLike<T>) => void,
	reject: (reason?: any) => void): void
{
	if (resp)
	{
		if (resp.success)
		{
			resolve(resp.data);
		}
		else
		{
			reject(resp.notifications);
		}
	}
	else
	{
		reject('Erro desconhecido');
	}
}

export interface CatalogApiInterface<T>
{
	get(id: string): Promise<T>;
	getAll(): Promise<T[]>;
	post(item: T): Promise<string>;
	put(item: T): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}

const baseEndpointUrl: string = 'https://api.todetaxi.com.br/notifications';
// baseEndpointUrl = 'http://localhost:5002/notifications';

export class ApiCatalog<T> extends Catalog<T>
{
	apiInterface: CatalogApiInterface<T> = null;
	private hubConnection: signalR.HubConnection = null;

	entryTrackEndpoint = '';
	entryTag = '';

	private intentionalTrackingStop = false;
	private _oauthService: OAuthService = null;

	constructor(oauthService: OAuthService, apiInterface: CatalogApiInterface<T>, entry_track_endpoint: string, entry_tag: string)
	{
		super();

		const self = this;
		self._oauthService = oauthService;
		self.apiInterface = apiInterface;
		self.entryTrackEndpoint = entry_track_endpoint;
		self.entryTag = entry_tag;
	}

	private startHubConnection()
	{
		const self = this;

		self.hubConnection
			.start()
			.then(() =>
			{
				console.info(`Catálogo[${self.entryTag}]: Connection started`);
				self.addHubListeners();
			})
			.catch(err =>
			{
				console.error(`Catálogo[${self.entryTag}]: Error while starting connection: ${err}`);
				self.reconnectToHub();
			});
	}

	private reconnectToHub()
	{
		const self = this;
		setTimeout(function ()
		{
			self.startHubConnection();
		},
		5000);
	}

	private addHubListeners()
	{
		const self = this;

		self.hubConnection.on('inserted', (entry_tag, summary: T) =>
		{
			if (entry_tag === self.entryTag)
			{
				self.add([summary], true);
			}
		});

		self.hubConnection.on('updated', (entry_tag, summary: T) =>
		{
			if (entry_tag === self.entryTag)
			{
				self.update([summary], true);
			}
		});

		self.hubConnection.on('deleted', (entry_tag, id: string) =>
		{
			if (entry_tag === self.entryTag)
			{
				const item = self.findItem(id);
				if (item)
				{
					self.remove([item], true);
				}
			}
		});
	}

	startTrackingChanges()
	{
		const self = this;
		self.intentionalTrackingStop = false;

		self.hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(`${baseEndpointUrl}/${self.entryTrackEndpoint}`, { accessTokenFactory: () => self._oauthService.getAccessToken() })
			.build();

		Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

		self.hubConnection.onclose(() =>
		{
			if (!self.intentionalTrackingStop)
			{
				self.reconnectToHub();
			}
		});

		self.startHubConnection();

	}

	stopTrackingChanges()
	{
		const self = this;
		self.intentionalTrackingStop = true;

		self.hubConnection
			.stop()
			.then(() => console.info(`Catálogo[${self.entryTag}]: Connection stopped`))
			.catch(err => console.error(`Catálogo[${self.entryTag}]: Error while stopping connection: ${err}`));
	}

	async get(id: string): Promise<T>
	{
		const self = this;
		return new Promise(async (resolve, reject) =>
		{
			await self.apiInterface.get(id).then(result =>
			{
				const item = self.findItem(id);
				if (!item)
				{
					self.add([result]);
				}
				else
				{
					self.update([result]);
				}

				resolve(result);
			})
			.catch(reason =>
			{
				reject(reason);
			});
		});
	}

	async getAll(): Promise<T[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.apiInterface.getAll().then(new_items =>
			{
				self.load(new_items);
				resolve(new_items);
			})
			.catch(reason =>
			{
				reject(reason);
			});
		});
	}

	async post(item: T): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.apiInterface.post(item).then(async id =>
			{
				await self.get(id); // obtém do server o objeto criado
				resolve(id ? true : false);
			})
			.catch(reason =>
			{
				reject(reason);
			});
		});
	}

	async put(item: T): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.apiInterface.put(item).then(async result =>
			{
				await self.get(item['id']); // obtém do server as alterações realizadas
				resolve(result);
			})
			.catch(reason =>
			{
				reject(reason);
			});

		});
	}

	async delete(id: string): Promise<boolean>
	{
		const self = this;

		const item = self.findItem(id);
		if (!item)
		{
			return false;
		}

		return new Promise(async (resolve, reject) =>
		{
			await self.apiInterface.delete(id).then(result =>
			{
				self.remove([item]);
				resolve(result);
			})
			.catch(reason =>
			{
				reject(reason);
			});
		});
	}
}
