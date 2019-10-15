import { Component, OnInit, Input } from '@angular/core';
import { FotoSummary } from '../../../../api/to_de_taxi/models';
import { FotoService } from '../../../../api/to_de_taxi/services';
import { FormGroup } from '@angular/forms';
import { BusyStack } from '../../../@core/utils/busy_stack';

@Component({
	selector: 'ngx-form-foto',
	templateUrl: './form-foto.component.html',
	styleUrls: ['./form-foto.component.scss']
})
export class FormFotoComponent implements OnInit {

	imgSrc: any = null;

	// dados de apresentacao
	dadosFoto: any = null;
	nomeFoto: string = '';
	nomeArquivoFoto: string = '';

	busyStackFoto = new BusyStack();

	// dados originais
	private _foto: FotoSummary = null;

	form: FormGroup = new FormGroup(
	{
	});

	@Input() desabilitarControles: boolean = true;
	@Input() alturaImagem: string = '200px';

	@Input()
	set foto(value: FotoSummary)
	{
		const self = this;

		self._foto = value;
		self.carregarFoto();
	}

	get foto(): FotoSummary
	{
		return this._foto;
	}

	alterado: boolean = false;

	constructor(private fotoSrv: FotoService) { }

	ngOnInit()
	{
	}

	private async carregarFoto()
	{
		const self = this;
		self.busyStackFoto.push();

		if (!self._foto)
		{
			self.nomeFoto = '';
			self.nomeArquivoFoto = '';
			self.dadosFoto = null;
			self.imgSrc = '/assets/images/foto_padrao.png';
		}
		else
		{
			if (!self._foto.dados) // dados ainda não carregados
			{
				if (self._foto.id)
				{
					// obtém do servidor
					await self.fotoSrv.ApiV1FotoByIdGet(self._foto.id).toPromise().then(resp =>
					{
						if (resp && resp.success)
						{
							self._foto.dados = resp.data.dados;
							self._foto.nome = resp.data.nome;
							self._foto.nomeArquivo = resp.data.nomeArquivo;
						}
					});
				}
				else
				{
					return;
				}
			}

			self.nomeFoto = self._foto.nome;
			self.nomeArquivoFoto = self._foto.nomeArquivo;
			self.dadosFoto = self._foto.dados;
			self.imgSrc = atob(self.dadosFoto);
		}

		self.busyStackFoto.pop();
	}

	processFile(imageInput: any)
	{
		const self = this;

		const file: File = imageInput.files[0];
		const reader = new FileReader();

		const listenAsURL = (event: any) => {
			self.imgSrc = event.target.result;
			self.dadosFoto = btoa(event.target.result);
			self.nomeArquivoFoto = file.name;
			self.nomeFoto = file.name;
			self.alterado = true;
		};

		reader.addEventListener('load', listenAsURL);
		reader.readAsDataURL(file);
	}

	public obterAlteracoes(): FotoSummary
	{
		const self = this;
		if (!self._foto)
		{
			return null;
		}

		if (!self.alterado)
		{
			return self._foto;
		}

		return {
			id: self._foto.id,
			dados: self.dadosFoto,
			nome: self.nomeFoto,
			nomeArquivo: self.nomeArquivoFoto
		};
	}

	public redefinir()
	{
		const self = this;
		self.foto = self._foto;
	}
}
