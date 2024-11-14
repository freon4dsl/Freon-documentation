import { TocContentsType } from '$lib/sidebar/TocContentsType';

export type SidebarContentType = {
	title: string;
	tocContent: TocContentsType;
	showDetails: boolean;
};
