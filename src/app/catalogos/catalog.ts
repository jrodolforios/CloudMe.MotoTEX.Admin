import { Subject, BehaviorSubject } from 'rxjs';

export class CatalogChanges<T>
{
	addedItems: T[] = [];
	removedItems: T[] = [];
	updatedItems: T[] = [];
}

export class Catalog<T>
{
	items: T[] = [];
	itemsSubject = new BehaviorSubject<T[]>([]);

	private currentChanges = new CatalogChanges<T>();
	changesSubject = new Subject<CatalogChanges<T>>();

	private notifyChanges()
	{
		const self = this;

		if (self.hasChanges)
		{
			self.changesSubject.next(self.currentChanges);

			self.applyChanges();
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
				const target = self.items.find(item => item['id'] === updated_item['id']);
				if (target)
				{
					Object.assign(target, updated_item);
				}
			});

			self.itemsSubject.next(self.items);

			self.resetChanges();
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

	add(items: T[], notify: boolean = true)
	{
		const self = this;

		items.forEach(item =>
		{
			if (item && !self.itemAdded(item))
			{
				self.currentChanges.addedItems.push(item);
			}
		});

		if (notify)
		{
			self.notifyChanges();
		}
	}

	remove(items: T[], notify: boolean = true)
	{
		const self = this;

		items.forEach(item =>
		{
			if (item && !self.itemRemoved(item))
			{
				self.currentChanges.removedItems.push(item);
			}
		});

		if (notify)
		{
			self.notifyChanges();
		}
	}

	update(items: T[], notify: boolean = true)
	{
		const self = this;

		items.forEach(item =>
		{
			if (item && !self.itemUpdated(item))
			{
				self.currentChanges.updatedItems.push(item);
			}
		});

		if (notify)
		{
			self.notifyChanges();
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
		self.itemsSubject.next(self.items);
		self.resetChanges();
	}
}
