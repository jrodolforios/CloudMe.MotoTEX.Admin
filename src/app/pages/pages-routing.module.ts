import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


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
			path: 'admins',
			loadChildren: () => import('./usuarios/usuarios.module')
				.then(m => m.UsuariosModule),
		},
		{
			path: 'mensagens',
			loadChildren: () => import('./mensagens/mensagens.module')
				.then(m => m.MensagensModule),
		},
		{
			path: 'mapa',
			loadChildren: () => import('./mapa/mapa.module')
				.then(m => m.MapaModule),
		},
		{
			path: 'dashboard',
			loadChildren: () => import('./dashboard/dashboard.module')
				.then(m => m.DashboardModule),
		},
		{
			path: 'faturamento',
			loadChildren: () => import('./faturamento/faturamento.module')
				.then(m => m.FaturamentoModule),
		},
		{
			path: 'faixas_ativacao',
			loadChildren: () => import('./faixas-ativacao/faixas-ativacao.module')
				.then(m => m.FaixasAtivacaoModule),
		},
		{
			path: 'contato',
			loadChildren: () => import('./solicitacao-contato/solicitacao-contato.module')
				.then(m => m.SolicitacaoContatoModule),
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
