import * as fs from 'fs';
import * as path from 'path';
import { PathCreator } from './PathCreator.js';


/**
 * Identical to /src/lib/sidebar/TocContents, but included here to avoid Node.js errors
 */
class TocContents {
	constructor(name: string, path: string, content: TocContents[]) {
		this.name = name;
		this.path = path;
		this.content = content;
	}

	name: string;
	path?: string;
	content?: TocContents[];
}

export class SidebarFiller {
	/**
	 * Reads the file structure under 'contentFolder' and generates a nav array in
	 * file 'outputFile'.
	 */

	generateAllTocs(contentFolder: string, outputFile: string) {
		if (!fs.existsSync(contentFolder)) {
			console.error(this, "cannot find folder '" + contentFolder + "'");
			return null;
		}
		const allTocs: TocContents[] = [];
		// get all folders in the content: these are the categories
		const files: string[] = fs.readdirSync(contentFolder).sort();
		for (const file of files) {
			const folderPath: string = path.join(contentFolder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// found a category: create a TocContent entry
				const name: string = this.createName(path.parse(path.relative(contentFolder, folderPath)).name);

				const toc: TocContents = new TocContents(name, '/' + PathCreator.createFilePath(contentFolder, folderPath), [])
				// add all subfolders to the result
				toc.content.push(...this.readSubcategories(folderPath, contentFolder));
				// add the category to allTocs
				allTocs.push(toc);
			}
		}
		// write allTocs to an output file
		this.writeOutput(allTocs, outputFile);
	}

	private writeOutput(tocs: TocContents[], outputFile: string) {
		// create the string for each toc
		const tocStr: string[] = [];
		for (const toc of tocs) {
			const categoryName: string = PathCreator.getFolderName(toc.path) + 'Toc';
			tocStr.push(`export const ${categoryName}: TocContents = ${this.tocToString(toc, 1)};`)
		}
		// start template
		const navContent: string = `import type { TocContents } from '$lib/sidebar/TocContents';
		${ tocStr.map(str => str).join('\n') }`;
		// end template

		// console.log(navContent)
		try {
			fs.writeFileSync(outputFile, navContent);
		} catch (e) {
			console.log(e, e.stack);
		}
	}
	/**
	 *
	 * @private
	 * @param folder
	 * @param ignore
	 */

	private readFolder(folder: string, ignore: string, level: number): TocContents[] {
		// console.log(`readFolder folder ${folder}`)
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		const content: TocContents[] = [];
		// get content of the folder and sort the names alphabetically
		const files = fs.readdirSync(folder).sort();
		for (const file of files) {
			const folderPath: string = path.join(folder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// add all subfolders to the result
				content.push(...this.readFolder(folderPath, ignore, 1));
			} else if (file === '+page.md' && level !== 0) {
				// console.log("found route: " + '/' + PathCreator.createFilePath(ignore, folderPath))
				const name: string = this.createName(path.parse(path.relative(ignore, folder)).name);
				const toc: TocContents = new TocContents(name, '/' + PathCreator.createFilePath(ignore, folder), [])
				content.push(toc);
			}
		}
		return content;
	}

	private readSubcategories(folder: string, ignore: string): TocContents[] {
		// console.log(`readSubcategory folder ${folder}`)
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		const content: TocContents[] = [];
		// get content of the folder and sort the names alphabetically
		const files = fs.readdirSync(folder).sort();
		for (const file of files) {
			const folderPath: string = path.join(folder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) { // ignore files, we only need routes to dirs
				// Found subcategory: create a TocContent entry
				// console.log("Found subcategory: " + '/' + PathCreator.createFilePath(ignore, folderPath))
				const name: string = this.createName(path.parse(path.relative(ignore, folderPath)).name);
				const toc: TocContents = new TocContents(name, '/' + PathCreator.createFilePath(ignore, folderPath), [])
				// add all subfolders to the result
				toc.content.push(...this.readFolder(folderPath, ignore, 0));
				content.push(toc);
			}
		}
		return content;
	}

	/**
	 * Finds the name to be shown in the navigation tree based on the file name
	 * @private
	 * @param folderName
	 */
	private createName(folderName: string) {
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

	/**
	 * Creates the string for the nav tree to be included in the template
	 * @param result
	 * @param indent
	 * @private
	 */
	private tocToString(result: TocContents, indent: number): string {
		if (indent > 10) return '';
		if (result !== null) {
			let prefix: string = '\n';
			for (let i = 0; i < indent; i++) {
				prefix = prefix + '   ';
			}
			let contentStr: string = '';
			if (result.content.length > 0) {
				contentStr = ',' + prefix + '  content: [';
				for (const tree of result.content) {
					contentStr = contentStr.concat(this.tocToString(tree, indent + 1) + ",");
				}
				contentStr = contentStr + prefix + ' ]';
			}
			return `${prefix}{ name: '${result.name}', path: '${result.path}'${contentStr}}`;
		}
		return '';
	}
}


