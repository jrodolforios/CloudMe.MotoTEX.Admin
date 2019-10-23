import { Component, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VeiculoSummary, FotoSummary } from '../../../../api/to_de_taxi/models';
import { FotoService } from '../../../../api/to_de_taxi/services';
import { VeiculoSummaryExt } from '../veiculos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	template:
`
	<img [src]="imgSrc" height="50"/>
`,
})
export class FotoViewComponent implements AfterViewInit{

	imgSrc: any = null;

	@Input() value: any;
	@Input() rowData: any;

	veicExt: VeiculoSummaryExt = null;

	constructor(private fotoSrv: FotoService, private sanitizer: DomSanitizer){}

	async ngAfterViewInit()
	{
		const self = this;

		if (!self.rowData.veicExt)
		{
			self.rowData.veicExt = new VeiculoSummaryExt(/*self.rowData*/);
		}
		self.veicExt = self.rowData.veicExt;

		if (!self.veicExt.fotoSummaryRef.dados) // dados ainda não carregados
		{
			if (self.rowData.idFoto)
			{
				// obtém do servidor
				await self.fotoSrv.ApiV1FotoByIdGet(self.rowData.idFoto).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.veicExt.fotoSummaryRef = resp.data;
					}
				});
			}
			else
			{
				return;
			}
		}
		self.imgSrc = atob(self.veicExt.fotoSummaryRef.dados);
	}
}
