import {writable} from 'svelte/store';

// info about Freon
export const versionNumber = "0.5.0";

export const miniWindow = writable<boolean>(false);

export const leftPanelVisible = writable<boolean>(false);
