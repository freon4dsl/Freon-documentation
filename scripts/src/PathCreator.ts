import path from 'path';
import fs from 'fs';

export class PathCreator {

	/**
	 * Gets a name for the route represented by filepath that is presentable to the reader.
	 * Example:
	 * ignore: "..\docu-content"
	 * filepath: "..\docu-content\030_Examples\030_Projection_Fragments",
	 * output: "Projection Fragments"
	 *
	 * @param ignore
	 * @param folder
	 */
	static createShowableName (ignore: string, folder: string): string {
		// console.log(`createShowableName: ignore ${ignore}, file ${folder}, result ${this._createName(path.parse(path.relative(ignore, folder)).name, false)}`)
		return this._createName(path.parse(path.relative(ignore, folder)).name)
	}

	/**
	 * Gets the route for 'folder'.
	 * Example:
	 * ignore "../docu-content",
	 * folder "..\docu-content\010_Documentation\100_Under_the_Hood\020_The_FreTool_Interfaces\070_FreWriter_Interface",
	 * result "Documentation/Under_the_Hood/The_FreTool_Interfaces/FreWriter_Interface"
	 *
	 * @param ignore
	 * @param folder
	 */
	static createFilePath(ignore: string, folder: string): string {
		if (ignore === null || ignore === undefined) {
			console.log(`ignore undefined, ${folder}`)
			return '';
		}
		if (folder === null || folder === undefined) {
			console.log(`folder undefined, ${ignore}`);
			return '';
		}
		// ignore the start of the path if it is equal to 'ignore'
		let pathStr: string = path.relative(ignore, folder);
		// remove the numbering
		pathStr = pathStr.replace(/[0-9]+_/g, '');
		// change the extension to .svelte
		if (path.extname(pathStr) === '.md') {
			const basename = path.basename(pathStr, path.extname(pathStr));
			return path.join(path.dirname(pathStr), basename + '.svelte');
		}
		// note: there is no need to replace "\" by "/" for svelteKit, but it is easier to generate - no escapes necessary
		pathStr = pathStr.replace(/\\/g, '/');
		// console.log(`createFilePath: ignore ${ignore}, file ${folder}, result ${pathStr}`)
		return pathStr;
	}

	/**
	 * Gets name of the variable used for a category in SidebarContents.ts based on 'folder'.
	 * Example:
	 * ignore "../docu-content",
	 * folder "..\docu-content\010_Documentation",
	 * result "documentationToc"
	 *
	 * @param ignore
	 * @param folder
	 */
	static getTocName(ignore: string, folder: string): string {
		const pathStr: string = this.createFilePath(ignore, folder);
		// console.log(`getTocName: ignore ${ignore} filepath ${folder}, result ${this.buildTocName(pathStr)}`)
		return this.buildTocName(pathStr);
	}

	/**
	 * Gets name of the variable used for a category in SidebarContents.ts based on 'tocPath',
	 * which is the path used in SidebarContents.ts.
	 * Example:
	 * tocPath "/Documentation",
	 * result "documentationToc"
	 *
	 * @param ignore
	 * @param folder
	 */
	static getTocNameFromTocPath(tocPath: string): string {
		// remove first '/', if any
		tocPath = tocPath.replace(/\//, '');
		// remove first '\', if any
		tocPath = tocPath.replace(/\\/, '');
		return this.buildTocName(tocPath);
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

	private static buildTocName(pathStr: string) {
		if (pathStr.length > 0) {
			pathStr = pathStr[0].toLowerCase() + pathStr.substring(1);
		}
		return pathStr + 'Toc';
	}

	/**
	 * Finds the name to be shown in the navigation sidebar based on the folder name
	 * @private
	 * @param folderName
	 * @private
	 */
	private static _createName(folderName: string) {
		let myName: string = folderName;
		if (!!folderName && folderName.length > 0) {
			// remove the numbering
			myName = myName.replace(/[0-9]+_/g, '');
				// replace all underscores and dashes by spaces
				myName = myName.replace(/[_\\-]/g, ' ');
			// start the name with an uppercase character
			myName = myName[0].toUpperCase() + myName.substring(1);
			// note: there is no need to replace "\" by "/" for svelteKit, but it is easier to generate - no escapes necessary
			myName = myName.replace(/\\/g, '/');
		}
		return myName;
	}
}
