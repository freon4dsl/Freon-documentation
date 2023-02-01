import {writable} from 'svelte/store';

// info about Freon/ProjectIt
export const versionNumber = "0.5.0";

export const miniWindow = writable<boolean>(false);

export const leftPanelVisible = writable<boolean>(false);

// a global ==> hack instead of using svg for projectit logo
export const darkMode = writable<boolean>(false);
