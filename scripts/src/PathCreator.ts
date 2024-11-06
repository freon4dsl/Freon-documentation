import path from 'path';

export class PathCreator {

	static createFilePath(ignore: string, file: string): string {
		// ignore the start of the path if it is equal to 'ignore'
		let pathStr: string = path.relative(ignore, file);
		// remove the numbering
		pathStr = pathStr.replace(/[0-9]+_/g, '');
		// change the extension to .svelte
		if (path.extname(pathStr) === '.md') {
			const basename = path.basename(pathStr, path.extname(pathStr));
			return path.join(path.dirname(pathStr), basename + '.svelte');
		}
		// note: there is no need to replace "\" by "/" for svelteKit, but it is easier to generate - no escapes necessary
		pathStr = pathStr.replace(/\\/g, '/');
		return pathStr;
	}

	static createFolderPath(ignore: string, file: string): string {
		// ignore the start of the path if it is equal to 'ignore'
		let pathStr: string = path.relative(ignore, file);
		// remove the numbering
		pathStr = pathStr.replace(/[0-9]+_/g, '');
		// note: there is no need to replace "\" by "/" for svelteKit, but it is easier to generate - no escapes necessary
		pathStr = pathStr.replace(/\\/g, '/');
		return pathStr;
	}

	static getFolderName(filepath: string) {
		let pathStr: string = path.basename(filepath);
		// remove the numbering
		pathStr = pathStr.replace(/[0-9]+_/g, '');
		// remove any spaces
		pathStr = pathStr.replace(/ /g, '');
		if (pathStr.length > 0) {
			return pathStr[0].toLowerCase() + pathStr.substring(1);
		} else {
			return pathStr;
		}
	}
}
