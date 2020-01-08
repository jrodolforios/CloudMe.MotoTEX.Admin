import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
	{
		path: 'pages',
		canActivate: [AuthGuard],
		loadChildren: () => import('./pages/pages.module')
			.then(m => m.PagesModule),
	},
	{
		path: 'load_resources',
		loadChildren: () => import('./pages/carregamento/carregamento.module')
			.then(m => m.CarregamentoModule),
	},
	{
		path: 'nao_autorizado',
		loadChildren: () => import('./pages/nao-autorizado/nao-autorizado.module')
			.then(m => m.NaoAutorizadoModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module')
			.then(m => m.AuthModule),
	},
	{ path: '', redirectTo: 'pages', pathMatch: 'full' },
	{ path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
	useHash: false,
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
