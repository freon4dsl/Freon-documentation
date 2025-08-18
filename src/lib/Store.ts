import { type Writable, writable } from 'svelte/store';

// info about Freon
export const versionNumber: string = '2.0.0-beta.2';

export const popoverElem: Writable<HTMLDivElement> = writable<HTMLDivElement>(undefined);

export const darkMode: Writable<boolean> = writable<boolean>(false);
