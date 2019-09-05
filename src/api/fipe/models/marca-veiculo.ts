import { ModeloVeiculo } from './modelo-veiculo';

export interface MarcaVeiculo
{
	codigo?: string;
	nome?: string;
	modelos?: ModeloVeiculo[];
}
