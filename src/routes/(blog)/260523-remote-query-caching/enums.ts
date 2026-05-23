export const categories = ['laptop', 'tablet', 'desktop'] as const;

export const products = [
	'imac',
	'ipad-pro',
	'mac-mini',
	'macbook-pro',
	'surface-book',
	'surface-go',
	'surface-pro',
] as const;

type Category = (typeof categories)[number];
type Product = (typeof products)[number];

export const data: Record<Category, [Product, ...Product[]]> = {
	laptop: ['surface-pro', 'surface-book', 'macbook-pro'],
	tablet: ['surface-pro', 'surface-go', 'ipad-pro'],
	desktop: ['mac-mini', 'imac'],
};
