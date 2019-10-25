import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'Início',
		icon: 'home-outline',
		link: '/pages/dashboard',
	},
	{
		title: 'CADASTROS',
		group: true,
	},
	{
		title: 'Taxistas',
		icon: 'people-outline',
		link: '/pages/taxistas',
	},
	{
		title: 'Pontos de taxi',
		icon: 'pin-outline',
		link: '/pages/pontos-taxi',
	},
	{
		title: 'Veículos',
		icon: 'car',
		link: '/pages/veiculos',
	},
	{
		title: 'Passageiros',
		icon: 'briefcase-outline',
		link: '/pages/passageiros',
	},
	{
		title: 'CONFIGURAÇÕES',
		group: true,
	},
	{
		title: 'Financeiro',
		icon: 'activity-outline',
		link: '/pages/configuracoes',
	},
];
