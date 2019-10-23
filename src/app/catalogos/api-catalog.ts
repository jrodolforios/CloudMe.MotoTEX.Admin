import { Catalog } from './catalog';
import { BusyStack } from '../@core/utils/busy_stack';

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

	constructor(apiInterface: CatalogApiInterface<T>)
	{
		super();
		this.apiInterface = apiInterface;
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
				resolve(true);
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
