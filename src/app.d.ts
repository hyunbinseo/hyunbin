// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			lang?: 'en';
			title: string;
			footer?: false;
			noindex?: false;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
