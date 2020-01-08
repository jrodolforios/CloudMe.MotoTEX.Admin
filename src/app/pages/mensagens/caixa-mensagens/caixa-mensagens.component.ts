import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { MensagemExt } from '../mensagens.component';
import { Pagination } from '../../../../api/to_de_taxi/models';
import { NgxUidService } from 'ngx-uid';

@Component({
	selector: 'ngx-caixa-mensagens',
	templateUrl: './caixa-mensagens.component.html',
	styleUrls: ['./caixa-mensagens.component.scss']
})
export class CaixaMensagensComponent implements OnInit {

	paginatorId: string = '';

	@Input() mensagens: MensagemExt[] = [];
	@Input() totalItems: number = 0;
	@Input() currentPage: number = 1;

	@Output() requestPage = new EventEmitter();
	@Output() itemsPerPageChange = new EventEmitter();
	@Output() messageOpened = new EventEmitter();

	@ContentChild('msg_summary', null) msg_summary: TemplateRef<any>;
	@ContentChild('msg_body', null) msg_body: TemplateRef<any>;

	_itemsPerPage: number = 10;
	set itemsPerPage(value: number)
	{
		const self = this;
		self._itemsPerPage = +value;
		self.itemsPerPageChange.emit(self._itemsPerPage);
	}
	get itemsPerPage(): number
	{
		return this._itemsPerPage;
	}

	constructor(private uidService: NgxUidService)
	{
		this.paginatorId = this.uidService.next();
	}


	ngOnInit() {
	}

	changePage(pageNumber: number)
	{
		const self = this;
		//self.currentPage = pageNumber;
		self.requestPage.emit(+pageNumber);
	}

	openMessage(message: MensagemExt)
	{
		const self = this;
		self.messageOpened.emit(message);
	}

	mensagemLida(mensagem: MensagemExt)
	{
		if (mensagem.dataLeitura)
		{
			return true;
		}

		return false;
	}
}
