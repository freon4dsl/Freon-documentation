// --- Types
import type { Snippet } from 'svelte';

export type SiteData = {
	site: {
		title?: string;
		description?: string;
		tags?: string[];
		image?: string;
	};
};

export type CategoryData = SiteData & {
	category: {
		title?: string;
		description?: string;
		tags?: string[];
	};
};

export type PageData = CategoryData & {
	page: {
		title?: string;
		description?: string;
		publishedTime?: string; // ISO 8601
		modifiedTime?: string; // ISO 8601
		tags?: string[];
	};
};

// For +page.svelte
export interface PageProps {
	data: PageData;
}

// For section/category +layout.svelte
export interface CategoryProps {
	data: CategoryData;
	children: Snippet;
}

// For root/site +layout.svelte
export interface SiteProps {
	data: SiteData;
	children: Snippet;
}
