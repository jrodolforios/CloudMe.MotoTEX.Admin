import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxistasComponent } from './taxistas.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TaxistasRoutingModule } from './taxistas-routing.module';
import { ListagemComponent } from './listagem/listagem.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { ItemListagemComponent } from './listagem/item-listagem/item-listagem.component';
import { NewsService } from '../layout/news.service';

@NgModule({
	declarations: [
		TaxistasComponent,
		ListagemComponent,
		ItemListagemComponent,
		DetalhesComponent
	],
	imports: [
		CommonModule,
		ThemeModule,
		TaxistasRoutingModule,
		NbCardModule,
		NbListModule,
		NbInputModule,
		NbIconModule,
		NbActionsModule
	],
	providers: [
		NewsService,
	],
})
export class TaxistasModule { }
