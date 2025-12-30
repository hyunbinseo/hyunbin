// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			lang: 'en' | 'ko';
			title: string | null;
			description?: string;
			icon?: false;
			footer?: false;
			noindex?: false;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
