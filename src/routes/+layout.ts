import type { SiteData } from '$lib/metadataTypes/MetaTypes';
import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';

export const prerender = true;

export const ssr = true;

export const load: LayoutLoad = async (): Promise<SiteData> => {
	return {
		site: {
			title: 'Freon',
			description:
				'The Freon Language Workbench is a tool that creates domain specific languages, including a web-based projectional editor',
			tags: ['DSL', 'TypeScript', 'forms', 'projectional editing', 'Svelte'],
			image: '/freon-logo.png'
		}
	};
};

// todo make sure the metadata at the highest level is in order
