import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';

const routes: Routes = [{
	path: '',
	component: PagesComponent,
	children: [
		{
			path: 'configuracoes',
			loadChildren: () => import('./configuracoes/configuracoes.module')
				.then(m => m.ConfiguracoesModule),
		},
		{
			path: 'taxistas',
			loadChildren: () => import('./taxistas/taxistas.module')
				.then(m => m.TaxistasModule),
		},
		{
			path: 'veiculos',
			loadChildren: () => import('./veiculos/veiculos.module')
				.then(m => m.VeiculosModule),
		},
		{
			path: 'pontos-taxi',
			loadChildren: () => import('./pontos-taxi/pontos-taxi.module')
				.then(m => m.PontosTaxiModule),
		},
		{
			path: 'passageiros',
			loadChildren: () => import('./passageiros/passageiros.module')
				.then(m => m.PassageirosModule),
		},
		{
			path: 'mapa',
			loadChildren: () => import('./mapa/mapa.module')
				.then(m => m.MapaModule),
		},
		{
			path: 'dashboard',
			component: ECommerceComponent,
		},
		{
			path: '',
			redirectTo: 'dashboard',
			pathMatch: 'full',
		}
	],
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {
}
