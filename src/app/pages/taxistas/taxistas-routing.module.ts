import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxistasComponent } from './taxistas.component';

const routes: Routes = [
	{
		path: '',
		component: TaxistasComponent,
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

