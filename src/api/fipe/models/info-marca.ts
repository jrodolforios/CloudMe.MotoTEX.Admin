import { AnoModelo } from './ano-modelo';
import { ModeloVeiculo } from './modelo-veiculo';

export interface InfoMarca
{
	anos?: AnoModelo[];
	modelos?: ModeloVeiculo[];
}
