import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassageirosComponent } from './passageiros.component';

const routes: Routes = [
	{
		path: '',
		component: PassageirosComponent,
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
export class TaxistasRoutingModule {
}

