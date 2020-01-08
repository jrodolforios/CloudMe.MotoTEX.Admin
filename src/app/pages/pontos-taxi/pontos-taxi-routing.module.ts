import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PontosTaxiComponent } from './pontos-taxi.component';

const routes: Routes = [
	{
		path: '',
		component: PontosTaxiComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	],
})
export class PontosTaxiRoutingModule {
}

