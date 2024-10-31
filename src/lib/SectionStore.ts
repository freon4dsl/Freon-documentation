import { writable, type Writable } from 'svelte/store';

export type Section = {
	title: string;
	visible: boolean;
	ref: string;
};

export let mySections: Writable<Section[]> = writable<Section[]>([]);
