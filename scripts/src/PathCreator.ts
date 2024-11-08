import path from 'path';
import fs from 'fs';

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
		return pathStr.replace(/ /g, '');
	}

	static getTocName(filepath: string) {
		let pathStr: string = this.getFolderName(filepath);
		if (pathStr.length > 0) {
			pathStr = pathStr[0].toLowerCase() + pathStr.substring(1);
		}
		return pathStr + 'Toc';
	}

	static createDirIfNotExisting(dir: string, outputFolder: string) {
		const parts = dir.split(path.sep);
		let current = outputFolder;
		for (const part of parts) {
			current = current + '/' + part;
			if (!fs.existsSync(current)) {
				fs.mkdirSync(current);
			}
		}
	}
}
