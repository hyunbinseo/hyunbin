export const handle = ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			const match = html.match(/<meta itemprop="lang" content="([a-z]{2})" ?\/?>/);
			return html.replace('%lang%', match?.[1] || '');
		},
	});
};
