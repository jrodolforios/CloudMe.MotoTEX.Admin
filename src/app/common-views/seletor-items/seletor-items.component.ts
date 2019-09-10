import { Component, Input, OnInit, TemplateRef, EventEmitter, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
	selector: 'ngx-seletor-items',
	templateUrl: './seletor-items.component.html',
	styleUrls: ['./seletor-items.component.scss']
})
export class SeletorItemComponent implements OnInit, OnDestroy, OnChanges {

	itemsPesquisa: any[];

	filtro: string;

	@Input() title: string = "TITLE";
	@Input() selected_item: any;
	@Input() items: any[];
	@Input() onGetItemLabel: any;
	@Input() onGetItemHash: any;
	@Output() itemSelected = new EventEmitter<any>();

	loading = false;

	dialogRef: NbDialogRef<any>;

	constructor(private dialogService: NbDialogService){}

	ngOnInit()
	{
		const self = this;
		self.itemsPesquisa = Object.assign([], self.items);
	}

	ngOnDestroy(): void
	{
	}

	ngOnChanges(changes: SimpleChanges): void
	{
		const self = this;
		// tslint:disable-next-line: forin
		for (const propName in changes)
		{
			if (propName === 'items')
			{
				self.itemsPesquisa = Object.assign([], changes[propName].currentValue);
			}
		}
	}

	getItemLabel(item: any): string
	{
		return this.onGetItemLabel(item);
	}

	getItemHash(item: any): string
	{
		return this.onGetItemHash(item);
	}

	listarItems(lista_items: TemplateRef<any>)
	{
		this.dialogRef = this.dialogService.open(lista_items);
	}

	desassociar()
	{
		this.selected_item = null;
		this.itemSelected.emit(this.selected_item);
		this.fecharLista();
	}

	selectItem(item: any)
	{
		this.selected_item = item;
		this.itemSelected.emit(this.selected_item);
		this.fecharLista();
	}

	filterLabel(filter: string)
	{
		const self = this;

		self.itemsPesquisa = self.items.filter(cliente => {
			return cliente.nome.toUpperCase().includes(filter.toUpperCase());
		});
	}

	fecharLista()
	{
		if (this.dialogRef)
		{
			this.dialogRef.close();
		}
	}
}
