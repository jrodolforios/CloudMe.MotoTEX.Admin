import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TarifasComponent } from './tarifas.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbInputModule, NbButtonModule, NbRadioModule } from '@nebular/theme';
import { TarifasRoutingModule } from './tarifas-routing.module';

@NgModule({
	declarations: [TarifasComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeModule,
		NbCardModule,
		NbInputModule,
		NbButtonModule,
		NbRadioModule,
		TarifasRoutingModule,
	],
})
export class TarifasModule { }
