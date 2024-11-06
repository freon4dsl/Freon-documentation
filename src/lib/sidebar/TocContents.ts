export class TocContents {
	constructor(name: string, path: string, content: TocContents[]) {
		this.name = name;
		this.path = path;
		this.content = content;
	}

	name: string;
	path?: string;
	content?: TocContents[];
}
