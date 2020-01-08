import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { FotoSummary } from '../../../../api/to_de_taxi/models';
import { UUID } from 'angular2-uuid';
import { DomSanitizer } from '@angular/platform-browser';
import { VeiculoSummaryExt } from '../veiculos.service';

@Component({
	template:
`
<img [src]="imgSrc" height="50"/>
<label class="image-upload-container btn btn-bwm">
teste
  <span>Select Image</span>
  <input #imageInput
         type="file"
         accept="image/*"
         (change)="processFile(imageInput)">
</label>
`
})

export class FotoEditorComponent extends DefaultEditor implements OnInit, AfterViewInit {

	veic: any = null;
	veicExt: VeiculoSummaryExt = null;
	imgSrc: any = null;

	constructor(private sanitizer: DomSanitizer) { super(); }

	ngOnInit()
	{
	}

	ngAfterViewInit(): void
	{
		const self = this;

		self.veic = self.cell.getRow().getData();
		if (!self.veic.veicExt)
		{
			self.veic.veicExt = new VeiculoSummaryExt(/*self.veic*/);
		}
		self.veicExt = self.veic.veicExt;
	}

	processFile(imageInput: any)
	{
		const self = this;

		const file: File = imageInput.files[0];
		const reader = new FileReader();

		self.veicExt.arquivoFoto = file;

		const listenAsURL = (event: any) => {
			self.imgSrc = event.target.result;
			self.veicExt.novaFotoSummaryRef.dados = btoa(event.target.result);
			self.veicExt.novaFotoSummaryRef.nomeArquivo = file.name;
			self.veicExt.novaFotoSummaryRef.nome = file.name;
		};

		reader.addEventListener('load', listenAsURL);
		reader.readAsDataURL(file);
	}
}
