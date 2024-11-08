import { writable } from 'svelte/store';
import { TocContentsType } from '$lib/sidebar/TocContentsType';
import { documentationToc } from '$lib/sidebar/SidebarContent';

// info about Freon
export const versionNumber = '1.0';

export const popoverElem = writable<HTMLDivElement>(undefined);
export const popoverCategoryElem = writable<HTMLDivElement>(undefined);
export const category = writable<TocContentsType>(documentationToc);
