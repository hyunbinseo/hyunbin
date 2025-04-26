import { extractYaml } from '@std/front-matter';
import type { Root as HTMLRoot } from 'hast';
import type { Root as MarkdownRoot } from 'mdast';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import type { PageLoad } from './$types';
import image from './image.svg?raw';
import lorem from './lorem.md?raw';

export const ssr = false;

export const load = (async () => {
	const { body, attrs } = extractYaml<{ title: string }>(lorem);
	const { value } = await processor.process(body);
	return { ...attrs, html: value };
}) satisfies PageLoad;

const [, width, height] = image.match(/viewBox="\d+ \d+ (\d+) (\d+)"/)!;

const processor = unified()
	.use(remarkParse)
	.use(() => (tree: MarkdownRoot) => {
		visit(tree, 'heading', (hx) => {
			((hx.data ??= {}).hProperties ??= {}).dataM = true;
		});
	})
	.use(remarkRehype)
	.use(() => (tree: HTMLRoot) => {
		visit(tree, { type: 'element', tagName: 'img' }, (img) => {
			img.properties.dataM = true;
			img.properties.width = width;
			img.properties.height = height;
			img.properties.src = `data:image/svg+xml;utf8,${encodeURIComponent(image)}`;
		});
	})
	.use(rehypeStringify);
