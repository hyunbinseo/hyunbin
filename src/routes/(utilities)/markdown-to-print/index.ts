export const TITLE = 'Markdown to Printable HTML';

export const templates = import.meta.glob<string>('./*.md', {
	import: 'default',
	query: '?raw',
});
