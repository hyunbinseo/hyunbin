import html from './index.html?raw';

export const prerender = true;

export const GET = () => new Response(html, { headers: { 'Content-Type': 'text/html' } });
