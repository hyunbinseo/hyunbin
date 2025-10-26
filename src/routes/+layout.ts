import { PUBLIC_GITHUB } from '$env/static/public';

export const prerender = true;

export const load = ({ route }) => ({
	url: { source: new URL(PUBLIC_GITHUB + '/hyunbin/tree/main/src/routes' + route.id).toString() },
});
