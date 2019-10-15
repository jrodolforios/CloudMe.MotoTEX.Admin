import { Component, OnInit, Input } from '@angular/core';
import { GrupoUsuarioSummary, UsuarioSummary } from '../../../api/to_de_taxi/models';
import { NbDialogRef } from '@nebular/theme';

@Component({
	selector: 'ngx-send-message',
	templateUrl: './send-message.component.html',
	styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

	constructor(protected ref: NbDialogRef<SendMessageComponent>) { }

	@Input()
	destinatario: UsuarioSummary | GrupoUsuarioSummary = null;

	ngOnInit()
	{
	}

	cancel()
	{
		this.ref.close();
	}

	submit(msg)
	{
		this.ref.close({
			dest: this.destinatario,
			msg
		});
	}
}
