import { Component } from '@angular/core';
import { NewsService } from '../../layout/news.service';

@Component({
	selector: 'ngx-listagem-taxistas',
	templateUrl: './listagem.component.html',
	styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {

	firstCard = {
		news: [],
		placeholders: [],
		loading: false,
		pageToLoadNext: 1,
	};
	secondCard = {
		news: [],
		placeholders: [],
		loading: false,
		pageToLoadNext: 1,
	};
	pageSize = 10;

	constructor(private newsService: NewsService) {}

	loadNext(cardData)
	{
		if (cardData.loading) { return; }

		cardData.loading = true;
		cardData.placeholders = new Array(this.pageSize);
		this.newsService.load(cardData.pageToLoadNext, this.pageSize).subscribe(nextNews => {
			cardData.placeholders = [];
			cardData.news.push(...nextNews);
			cardData.loading = false;
			cardData.pageToLoadNext++;
		});
	}
}
