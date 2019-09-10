import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'base-card',
	templateUrl: './base-card.component.html',
	styleUrls: ['./base-card.component.scss']
})
export class BaseCardComponent implements OnInit {

	is_refreshing: boolean;
	@Input('enable_user_refresh') enable_user_refresh: boolean = true;
	@Output('doRefresh') doRefresh = new EventEmitter();

	constructor()
	{
		this.is_refreshing = false;
	}

	ngOnInit() {
	}

	onClickRefresh()
	{
		this.doRefresh.emit();
	}

	toggleRefresh(refresh: boolean)
	{
		this.is_refreshing = refresh;
	}
}
