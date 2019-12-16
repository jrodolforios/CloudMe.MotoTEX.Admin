import { Component, OnInit, Input } from '@angular/core';
import { FotoSummary } from '../../../../api/to_de_taxi/models';
import { FotoService } from '../../../../api/to_de_taxi/services';
import { FormGroup } from '@angular/forms';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
	selector: 'ngx-form-foto',
	templateUrl: './form-foto.component.html',
	styleUrls: ['./form-foto.component.scss']
})
export class FormFotoComponent implements OnInit {

	// dados de apresentacao
	dadosFoto: any = null;
	nomeFoto: string = '';
	nomeArquivoFoto: string = '';
	public edit = false;

	busyStackFoto = new BusyStack();

	// dados originais
	private _foto: FotoSummary = null;

	form: FormGroup = new FormGroup(
		{
		});

	@Input() desabilitarControles: boolean = true;

	@Input()
	set foto(value: FotoSummary)
	{
		const self = this;

		self.form.reset();

		self._foto = value;
		self.carregarFoto();
		self.alterado = false;
	}

	get foto(): FotoSummary
	{
		return this._foto;
	}

	alterado: boolean = false;

	constructor(private fotoSrv: FotoService) { }

	ngOnInit() {}

	private async carregarFoto()
	{
		const self = this;
		self.busyStackFoto.push();

		if (!self._foto)
		{
			self.nomeFoto = '';
			self.nomeArquivoFoto = '';
			self.dadosFoto = null;
		}
		else
		{
			self.nomeFoto = self._foto.nome;
			self.nomeArquivoFoto = self._foto.nomeArquivo;
			self.dadosFoto = self._foto.dados;
			self.croppedImage = self._foto.dados;
		}

		self.busyStackFoto.pop();
	}

	imageChangedEvent: any = '';
	croppedImage: any = '';

	fileChangeEvent(event: any): void
	{
		this.imageChangedEvent = event;
		this.edit = true;
	}

	imageCropped(event: ImageCroppedEvent)
	{
		const self = this;

		self.croppedImage = event.base64;

		self.dadosFoto = btoa(self.croppedImage);
		self.nomeArquivoFoto = "foto_Taxista.png";
		self.nomeFoto = "foto_Taxista";
		self.alterado = true;
	}

	stopEdit()
	{
		this.edit = false;
		this.alterado = true;
	}

	imageLoaded() {
		// show cropper
	}
	cropperReady() {
		// cropper ready
	}
	loadImageFailed() {
		// show message
	}

	public obterAlteracoes(): FotoSummary {
		const self = this;
		self._foto =
		{
			id: self._foto ? self._foto.id : undefined,
			dados: self.dadosFoto,
			nome: self.nomeFoto,
			nomeArquivo: self.nomeArquivoFoto
		};

		return self._foto;
	}

	public redefinir(reset: Boolean = false)
	{
		const self = this;
		if (reset)
		{
			self._foto = {};
		}

		self.foto = self._foto;
		if (self._foto)
		{
			try
			{
				self.croppedImage = self._foto.dados ? atob(self._foto.dados) : undefined;
			}
			catch (err)
			{
				self.croppedImage = self._foto.dados ? self._foto.dados : undefined;
			}
		}
		else
		{
			self.croppedImage = undefined;
		}
	}
}
