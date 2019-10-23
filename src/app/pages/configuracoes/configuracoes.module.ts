import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracoesComponent } from './configuracoes.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { FaixasDescontoComponent } from './faixas-desconto/faixas-desconto.component';
import { ValorEditorComponent } from './faixas-desconto/valor/valor-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NbCardModule, NbInputModule, NbButtonModule, NbRadioModule, NbSpinnerModule } from '@nebular/theme';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
	declarations: [
		ConfiguracoesComponent,
		TarifasComponent,
		FaixasDescontoComponent,
		ValorEditorComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeModule,
		CommonViewsModule,
		NgxMaskModule,
		NbCardModule,
		NbInputModule,
		NbButtonModule,
		NbRadioModule,
		Ng2SmartTableModule,
		ConfiguracoesRoutingModule,
		NbSpinnerModule,
		NgxCurrencyModule.forRoot({
			align: 'right',
			allowZero: true,
			precision: 2,
			prefix: 'R$ ',
			suffix: '',
			allowNegative: false,
			thousands: '.',
			decimal: ',',
			nullable: false
		})
	]
})
export class ConfiguracoesModule { }
