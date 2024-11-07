import { writable } from 'svelte/store';

// info about Freon
export const versionNumber = '1.0';

export const menuShown = writable<boolean>(false);
export const popoverElem = writable<HTMLDivElement>(undefined);
