import { type Writable, writable } from 'svelte/store';

// info about Freon
export const versionNumber: string = '1.0';

export const popoverElem: Writable<HTMLDivElement> = writable<HTMLDivElement>(undefined);

export const darkMode: Writable<boolean> = writable<boolean>(false);
