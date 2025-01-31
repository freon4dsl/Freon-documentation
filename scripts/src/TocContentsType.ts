export class TocContentsType {
	constructor(name: string, path: string, content: TocContentsType[]) {
		this.name = name;
		this.path = path;
		this.content = content;
	}

	name: string;
	path?: string;
	content?: TocContentsType[];
}

export class CategoryInfoType {
	constructor(name: string, path: string, toc: TocContentsType) {
		this.name = name;
		this.path = path;
		this.toc = toc;
	}

	name: string;
	path: string;
	toc: TocContentsType;
}
