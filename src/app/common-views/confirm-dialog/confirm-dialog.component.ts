import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
	selector: 'cotton-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

	@Input() prompt: string;
	@Input() title: string;

	constructor(protected ref: NbDialogRef<ConfirmDialogComponent>) { }

	onOk()
	{
		this.ref.close(true);
	}

	onCancel()
	{
		this.ref.close(false);
	}
}
