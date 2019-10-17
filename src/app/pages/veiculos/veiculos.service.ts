import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VeiculoSummary, FotoSummary, MarcaVeiculo, ModeloVeiculo } from '../../../api/to_de_taxi/models';

export class VeiculoSummaryExt
{
	veicRef: VeiculoSummary;

	marcaRef = new BehaviorSubject<MarcaVeiculo>(null);
	modeloRef = new BehaviorSubject<ModeloVeiculo>(null);
	fotoSummaryRef: FotoSummary = {};
	novaFotoSummaryRef: FotoSummary = {};

	arquivoFoto: File = null;

	public constructor(veic: VeiculoSummary)
	{
		this.veicRef = veic;
	}
}

@Injectable({
	providedIn: 'root'
})
export class VeiculosService {

	public marcasVeiculos =  new BehaviorSubject<MarcaVeiculo[]>([]);
	constructor() { }
}
