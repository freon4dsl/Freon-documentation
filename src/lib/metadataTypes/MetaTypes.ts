// --- Types
import type { Snippet } from 'svelte';

export interface PageProps {
	data: {
		category: CategoryMeta;
		site: SiteMeta;
		pageTitle?: string;
		description: string;
		publishedTime?: string;     // ISO 8601
		modifiedTime?: string;      // ISO 8601
		tags?: string[];
	};
}

export interface CategoryMeta {
	title: string;
	description: string;
	tags?: string[];
}

export interface CategoryProps {
	data: {
		site: SiteMeta;
		category: CategoryMeta;
		// Child pages may provide this (from their +page.ts)
		pageTitle?: string;
	};
	children: Snippet;
}

export interface SiteMeta {
	title: string;
	description: string;
	tags?: string[];
	image?: string;
}

export interface SiteProps {
	data: SiteMeta;
	children: Snippet;
}
