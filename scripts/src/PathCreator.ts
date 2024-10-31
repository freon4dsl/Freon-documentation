import path from 'path';

export class PathCreator {

	static createPath(ignore: string, file: string): string {
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
}
