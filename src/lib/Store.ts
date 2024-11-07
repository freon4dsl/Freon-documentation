import { writable } from 'svelte/store';
import { TocContents } from '$lib/sidebar/TocContents';
import { documentationToc } from '$lib/sidebar/SidebarContent';

// info about Freon
export const versionNumber = '1.0';

export const popoverElem = writable<HTMLDivElement>(undefined);
export const popoverCategoryElem = writable<HTMLDivElement>(undefined);
export const category = writable<TocContents>(documentationToc);
