import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaxistasComponent } from './taxistas.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TaxistasRoutingModule } from './taxistas-routing.module';
import { ListagemComponent } from './listagem/listagem.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';
import { ItemListagemComponent } from './listagem/item-listagem/item-listagem.component';
import { NewsService } from '../layout/news.service';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NgxMaskModule } from 'ngx-mask';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

@NgModule({
	declarations: [
		TaxistasComponent,
		//ListagemComponent,
		ItemListagemComponent,
		//DetalhesComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeModule,
		NgxMaskModule,
		CommonViewsModule,
		TaxistasRoutingModule,
		NbCardModule,
		NbListModule,
		NbInputModule,
		NbIconModule,
		NbActionsModule,
		NbSpinnerModule,
		ShowHidePasswordModule
	],
})
export class TaxistasModule { }
