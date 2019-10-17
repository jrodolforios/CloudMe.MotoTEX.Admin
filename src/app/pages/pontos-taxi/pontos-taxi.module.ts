import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PontosTaxiComponent } from './pontos-taxi.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbLayoutModule, NbTooltipModule, NbAlertModule, NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbSpinnerModule } from '@nebular/theme';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { PontosTaxiRoutingModule } from './pontos-taxi-routing.module';
import { FormIdentificacaoComponent } from './form-identificacao/form-identificacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		PontosTaxiComponent,
		FormIdentificacaoComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeModule,
		NbLayoutModule,
		NbTooltipModule,
		CommonViewsModule,
		NbAlertModule,
		PontosTaxiRoutingModule,
		NbCardModule,
		NbListModule,
		NbInputModule,
		NbIconModule,
		NbActionsModule,
		NbSpinnerModule,
	]
})
export class PontosTaxiModule { }
