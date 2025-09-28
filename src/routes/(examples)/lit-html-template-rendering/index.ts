import { html } from 'lit-html';

// lit VS Code extensions do not support syntax highlighting inside a Svelte file.
export const hello = (name: string) => html`<span>Hello, ${name}!</span>`;
