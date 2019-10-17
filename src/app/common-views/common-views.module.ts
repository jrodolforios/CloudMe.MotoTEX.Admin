import { NgModule } from '@angular/core';
import { BaseCardComponent } from './base-card/base-card.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SeletorItemComponent } from './seletor-items/seletor-items.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbCardModule, NbSpinnerModule, NbIconModule, NbListModule, NbButtonModule, NbToastrModule } from '@nebular/theme';
import { FormEnderecoComponent } from './forms/form-endereco/form-endereco.component';
import { FormFotoComponent } from './forms/form-foto/form-foto.component';
import { FormCredenciaisComponent } from './forms/form-credenciais/form-credenciais.component';
import { FormUsuarioComponent } from './forms/form-usuario/form-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgxMaskModule } from 'ngx-mask';
import { SendMessageComponent } from './send-message/send-message.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';

const COMMON_VIEWS_COMPS = [
	BaseCardComponent,
	ConfirmDialogComponent,
	SeletorItemComponent,
	FormEnderecoComponent,
	FormFotoComponent,
	FormCredenciaisComponent,
	FormUsuarioComponent,
	SendMessageComponent,
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
		NbToastrModule,
		ShowHidePasswordModule
	],
	declarations: [
		...COMMON_VIEWS_COMPS,
		MasterDetailComponent,
	],
	exports: [
		...COMMON_VIEWS_COMPS
	],
	entryComponents: [
		ConfirmDialogComponent,
		SendMessageComponent
	]
})
export class CommonViewsModule {
}
