import { Catalog } from './catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { HubWrapper } from '../@core/data/hubs/hub-wrapper';

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

export class ApiCatalog<T> extends Catalog<T>
{
	apiInterface: CatalogApiInterface<T> = null;

	hub: HubWrapper = null;

	entryTrackEndpoint = '';
	entryTag = '';

	private _oauthService: OAuthService = null;

	constructor(oauthService: OAuthService, apiInterface: CatalogApiInterface<T>, hub: HubWrapper, entry_track_endpoint: string, entry_tag: string)
	{
		super();

		const self = this;
		self._oauthService = oauthService;
		self.apiInterface = apiInterface;
		self.entryTrackEndpoint = entry_track_endpoint;
		self.entryTag = entry_tag;
		self.hub = hub;

		//self.hub = new HubWrapper(`${baseEndpointUrl}/${self.entryTrackEndpoint}`, () => self._oauthService.getAccessToken());
	}

	startTrackingChanges()
	{
		const self = this;

		self.hub.hubConnection.on('inserted', (entry_tag, summary: T) =>
		{
			if (entry_tag === self.entryTag)
			{
				self.add([summary], true);
			}
		});

		self.hub.hubConnection.on('updated', (entry_tag, summary: T) =>
		{
			if (entry_tag === self.entryTag)
			{
				self.update([summary], true);
			}
		});

		self.hub.hubConnection.on('deleted', (entry_tag, id: string) =>
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
		console.info(`Cat??logo[${self.entryTag}]: Registered`);
	}

	stopTrackingChanges()
	{
		const self = this;

		self.hub.hubConnection.off('inserted');
		self.hub.hubConnection.off('updated');
		self.hub.hubConnection.off('deleted');
		console.info(`Cat??logo[${self.entryTag}]: Unregistered`);
	}

	async get(id: string): Promise<T>
	{
		const self = this;
		return new Promise(async (resolve, reject) =>
		{
			self.apiInterface.get(id).then(result =>
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
			self.apiInterface.getAll().then(new_items =>
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
			self.apiInterface.post(item).then(async id =>
			{
				await self.get(id); // obt??m do server o objeto criado
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
			self.apiInterface.put(item).then(async result =>
			{
				await self.get(item['id']); // obt??m do server as altera????es realizadas
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
			self.apiInterface.delete(id).then(result =>
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
