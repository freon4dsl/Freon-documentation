import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : '/Freon-documentation',
		}
	}
};

export default config;
