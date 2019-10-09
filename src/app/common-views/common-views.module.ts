import { NgModule } from '@angular/core';
import { BaseCardComponent } from './base-card/base-card.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SeletorItemComponent } from './seletor-items/seletor-items.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbCardModule, NbSpinnerModule, NbIconModule, NbListModule, NbButtonModule } from '@nebular/theme';
import { FormEnderecoComponent } from './forms/form-endereco/form-endereco.component';
import { FormFotoComponent } from './forms/form-foto/form-foto.component';
import { FormCredenciaisComponent } from './forms/form-credenciais/form-credenciais.component';
import { FormUsuarioComponent } from './forms/form-usuario/form-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgxMaskModule } from 'ngx-mask';

const COMMON_VIEWS_COMPS = [
	BaseCardComponent,
	ConfirmDialogComponent,
	SeletorItemComponent,
	FormEnderecoComponent,
	FormFotoComponent,
	FormCredenciaisComponent,
	FormUsuarioComponent,
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeModule.forRoot(),
		NbCardModule,
		NbSpinnerModule,
		NbIconModule,
		NbListModule,
		NbButtonModule,
		NbIconModule,
		NgxMaskModule,
		ShowHidePasswordModule
	],
	declarations: [
		...COMMON_VIEWS_COMPS,
	],
	exports: [
		...COMMON_VIEWS_COMPS
	],
	entryComponents: [
		ConfirmDialogComponent
	]
})
export class CommonViewsModule {
}
