import { Subject, BehaviorSubject } from 'rxjs';

export class CatalogChanges<T>
{
	addedItems: T[] = [];
	removedItems: T[] = [];
	updatedItems: T[] = [];
	oldItems: T[] = []; // apenas para updates
}

export class Catalog<T>
{
	items: T[] = [];
	// itemsSubject = new BehaviorSubject<T[]>([]);

	private currentChanges = new CatalogChanges<T>();
	changesSubject = new Subject<CatalogChanges<T>>();

	private notifyChanges()
	{
		const self = this;

		if (self.hasChanges)
		{
			self.changesSubject.next(self.currentChanges);
			self.resetChanges();
		}
	}

	get hasChanges(): boolean
	{
		const self = this;
		return (
			self.currentChanges.addedItems.length > 0 ||
			self.currentChanges.updatedItems.length > 0 ||
			self.currentChanges.removedItems.length > 0);
	}

	private resetChanges()
	{
		const self = this;
		self.currentChanges.addedItems = [];
		self.currentChanges.removedItems = [];
		self.currentChanges.updatedItems = [];
		self.currentChanges.oldItems = [];
	}

	private applyChanges()
	{
		const self = this;
		if (self.hasChanges)
		{
			self.items.push(...self.currentChanges.addedItems);

			self.currentChanges.removedItems.forEach(removed_item => {
				self.items.splice(self.items.indexOf(removed_item), 1);
			});

			self.currentChanges.updatedItems.forEach(updated_item => {
				let tgtIdx = -1;
				const target = self.items.find((item, index) =>
				{
					if (item['id'] === updated_item['id'])
					{
						tgtIdx = index;
						return true;
					}
					return false;
				});

				if (target)
				{
					// mescla os objetos
					Object.assign(target, target, updated_item);
				}
			});

			// self.itemsSubject.next(self.items);

			self.notifyChanges();
		}
	}

	private itemAdded(item: T): boolean
	{
		return this.currentChanges.addedItems.find(element =>
		{
			return element['id'] === item['id'];
		}) !== undefined;
	}

	private itemUpdated(item: T): boolean
	{
		return this.currentChanges.updatedItems.find(element =>
		{
			return element['id'] === item['id'];
		}) !== undefined;
	}

	private itemRemoved(item: T): boolean
	{
		return this.currentChanges.removedItems.find(element =>
		{
			return element['id'] === item['id'];
		}) !== undefined;
	}

	add(items: T[], apply: boolean = true)
	{
		const self = this;

		items.forEach(item =>
		{
			if (!item) return;
			if (self.findItem(item['id']))
			{
				// item já catalogado... marca para atualização
				self.update([item], false);
			}
			else
			{
				// item ainda não catalogado
				if (!self.itemAdded(item))
				{
					self.currentChanges.addedItems.push(item);
				}
			}
		});

		if (apply)
		{
			self.applyChanges();
		}
	}

	remove(items: T[], apply: boolean = true)
	{
		const self = this;

		items.forEach(item =>
		{
			if (!item) return;

			if (self.findItem(item['id']))
			{
				// item catalogado
				if (!self.itemRemoved(item))
				{
					self.currentChanges.removedItems.push(item);
				}
			}
		});

		if (apply)
		{
			self.applyChanges();
		}
	}

	update(items: T[], apply: boolean = true)
	{
		const self = this;

		items.forEach(item =>
		{
			if (item && !self.itemUpdated(item))
			{
				self.currentChanges.updatedItems.push(item);
			}
		});

		if (apply)
		{
			self.applyChanges();
		}
	}

	findItem(id: string): T
	{
		return this.items.find((element, index, obj) =>
		{
			return element['id'] === id;
		});
	}

	load(items: T[])
	{
		const self = this;
		self.items = [...items];
		// self.itemsSubject.next(self.items);
		self.resetChanges();
	}
}
