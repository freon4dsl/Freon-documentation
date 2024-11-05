import { writable } from 'svelte/store';

// info about Freon
export const versionNumber = '1.0';

export const MAX_WIDTH_SMALL_VIEWPORT = 1008;
export const miniWindow = writable<boolean>(false);

export const menuShown = writable<boolean>(false);
