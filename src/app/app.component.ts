/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { UsuarioService } from './auth/usuario.service';

@Component({
	selector: 'ngx-app',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

	constructor(
		private analytics: AnalyticsService,
		private iconLibraries: NbIconLibraries,
		private usuarioSrv: UsuarioService)
	{
		this.usuarioSrv.id_usuario.subscribe(id_usr => {
			//alert(`Novo usuario: ${id_usr}`);
		});

		this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
	}

	ngOnInit(): void
	{
		this.analytics.trackPageViews();
	}
}
