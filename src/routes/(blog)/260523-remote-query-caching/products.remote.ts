import { query } from '$app/server';
import { picklist } from 'valibot';
import { categories, data, products } from './enums';

export const getProducts = query(picklist(categories), (category) => {
	return data[category];
});

export const getProduct = query.batch(picklist(products), async () => {
	return (id) => ({ id, calledAt: Date.now() });
});
