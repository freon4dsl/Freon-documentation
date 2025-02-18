import { writable, type Writable } from 'svelte/store';
import type { Section } from '$lib/section/SectionType';

export const mySections: Writable<Section[]> = writable<Section[]>([]);
