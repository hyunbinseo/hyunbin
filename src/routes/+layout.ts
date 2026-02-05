import { GITHUB_PROFILE_URL } from '$lib/constants';

export const prerender = true;

export const load = ({ route }) => ({
	url: {
		source: new URL(GITHUB_PROFILE_URL + '/hyunbin/tree/main/src/routes' + route.id).toString(),
	},
});
