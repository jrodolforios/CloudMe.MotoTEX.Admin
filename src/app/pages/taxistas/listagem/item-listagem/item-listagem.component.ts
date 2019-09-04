import { Component, Input } from '@angular/core';

export class NewsPost
{
	title: string;
	link: string;
	creator: string;
	text: string;
}

@Component({
	selector: 'ngx-item-listagem',
	templateUrl: 'item-listagem.component.html',
})
export class ItemListagemComponent {

	@Input() post: NewsPost;
}
