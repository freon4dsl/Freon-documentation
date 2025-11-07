import type { SiteData } from '$lib/metadataTypes/MetaTypes';
import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';

export const prerender = true;

export const ssr = true;

export const load: LayoutLoad = async (): Promise<SiteData> => {
	return {
		site: {
			title: 'Freon — The Language Workbench for Domain-Specific Languages',
			description: `Freon is a modern language workbench that lets you design and generate domain-specific languages (DSLs) with a built-in web-based projectional editor — all powered by TypeScript and Svelte.`,
			tags: ['language workbench', 'DSL', 'domain-specific languages', 'projectional editing', 'TypeScript', 'Svelte', 'code generation'],
			image: '/freon-logo.png'
		}
	};
};

// todo make sure the metadata at the highest level is in order
