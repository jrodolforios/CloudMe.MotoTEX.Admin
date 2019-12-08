import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { GlobaisService } from '../../../globais.service';
import { UsuarioSummary } from '../../../../api/to_de_taxi/models';
import { LayoutService } from '../../../@core/utils/layout.service';

@Component({
	selector: 'ngx-header',
	styleUrls: ['./header.component.scss'],
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

	private destroy$: Subject<void> = new Subject<void>();
	userPictureOnly: boolean = false;

	private usuarioSub: Subscription;
	usuario: UsuarioSummary = null;

	themes = [
		{
			value: 'default',
			name: 'Light',
		},
		{
			value: 'dark',
			name: 'Dark',
		},
		{
			value: 'cosmic',
			name: 'Cosmic',
		},
		{
			value: 'corporate',
			name: 'Corporate',
		},
	];

	currentTheme = 'default';

	userMenu = [ { title: 'Sair' } ];

	constructor(
		private sidebarService: NbSidebarService,
		private menuService: NbMenuService,
		private themeService: NbThemeService,
		private layoutService: LayoutService,
		private breakpointService: NbMediaBreakpointsService,
		private oauthService: OAuthService,
		private globaisSrv: GlobaisService
		) {
	}

	ngOnInit()
	{
		const self = this;

		self.currentTheme = self.themeService.currentTheme;

		const { xl } = self.breakpointService.getBreakpointsMap();
		self.themeService.onMediaQueryChange()
			.pipe(
				map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
				takeUntil(self.destroy$),
			)
			.subscribe((isLessThanXl: boolean) => self.userPictureOnly = isLessThanXl);

		self.themeService.onThemeChange()
			.pipe(
				map(({ name }) => name),
				takeUntil(self.destroy$),
			)
			.subscribe(themeName => self.currentTheme = themeName);

		self.menuService.onItemClick().pipe(filter(({ tag }) => tag === 'menu-sair')).subscribe(async item =>
		{
			//await self.authService.logout('oauth2_todetaxi');
			await self.globaisSrv.encerrarCatalogos();
			self.oauthService.logOut();
		});

		self.usuarioSub = self.globaisSrv.usuario.subscribe(novo_usr =>
		{
			self.usuario = novo_usr;
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		this.usuarioSub.unsubscribe();
	}

	changeTheme(themeName: string) {
		this.themeService.changeTheme(themeName);
	}

	toggleSidebar(): boolean {
		this.sidebarService.toggle(true, 'menu-sidebar');
		this.layoutService.changeLayoutSize();

		return false;
	}

	navigateHome() {
		this.menuService.navigateHome();
		return false;
	}
}
