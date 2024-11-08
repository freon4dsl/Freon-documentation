import * as fs from 'fs';
import * as path from 'path';
import { PathCreator } from './PathCreator.js';

/**
 * Identical to /src/lib/sidebar/TocContentsType, but included here to avoid Node.js errors
 */
class TocContentsType {
	constructor(name: string, path: string, content: TocContentsType[]) {
		this.name = name;
		this.path = path;
		this.content = content;
	}

	name: string;
	path?: string;
	content?: TocContentsType[];
}

/**
 * Identical to /src/lib/sidebar/CategoryInfoType, except here the toc is a string, not a TocContentsType
 */
class CategoryInfoType {
	constructor(name: string, path: string, toc: string) {
		this.name = name;
		this.path = path;
		this.toc = toc;
	}

	name: string;
	path: string;
	toc: string;
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
		const allTocs: TocContentsType[] = [];
		const allCategories: CategoryInfoType[] = [];
		// get all folders in the content: these are the categories
		const files: string[] = fs.readdirSync(contentFolder).sort();
		for (const file of files) {
			const folderPath: string = path.join(contentFolder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// found a category: create a TocContent entry
				const name: string = this.createName(path.parse(path.relative(contentFolder, folderPath)).name);
				const _path: string = '/' + PathCreator.createFilePath(contentFolder, folderPath);
				const toc: TocContentsType = new TocContentsType(name, _path, [])
				// add all subfolders to the result
				toc.content.push(...this.readSubcategories(folderPath, contentFolder));
				// add the category to allTocs
				allTocs.push(toc);
				// also create a categoryInfo entry
				allCategories.push({name: name, path: _path, toc: PathCreator.getTocName(toc.path)})
			}
		}
		// write allTocs to an output file
		this.writeOutput(allTocs, allCategories, outputFile);
	}

	private writeOutput(tocs: TocContentsType[], allCategories: CategoryInfoType[], outputFile: string) {
		// create the string for each toc
		const tocStr: string[] = [];
		for (const toc of tocs) {
			const categoryName: string = PathCreator.getTocName(toc.path);
			tocStr.push(`export const ${categoryName}: TocContentsType = ${this.tocToString(toc, 1)};`)
		}
		// start template
		const navContent: string = `import { type CategoryInfoType, type TocContentsType } from '$lib/sidebar/TocContentsType';
		
${ tocStr.map(str => str).join('\n') }
		
export const allCategories: CategoryInfoType[] = [
	${allCategories.map(cat => `{name: '${cat.name}', path: '${cat.path}', toc: ${cat.toc}}`).join(',\n\t\t')}
];
`;
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
	 * @param level
	 */

	private readFolder(folder: string, ignore: string, level: number): TocContentsType[] {
		// console.log(`readFolder folder ${folder}`)
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		const content: TocContentsType[] = [];
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
				const toc: TocContentsType = new TocContentsType(name, '/' + PathCreator.createFilePath(ignore, folder), [])
				content.push(toc);
			}
		}
		return content;
	}

	private readSubcategories(folder: string, ignore: string): TocContentsType[] {
		// console.log(`readSubcategory folder ${folder}`)
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		const content: TocContentsType[] = [];
		// get content of the folder and sort the names alphabetically
		const files = fs.readdirSync(folder).sort();
		for (const file of files) {
			const folderPath: string = path.join(folder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) { // ignore files, we only need routes to dirs
				// Found subcategory: create a TocContent entry
				// console.log("Found subcategory: " + '/' + PathCreator.createFilePath(ignore, folderPath))
				const name: string = this.createName(path.parse(path.relative(ignore, folderPath)).name);
				const toc: TocContentsType = new TocContentsType(name, '/' + PathCreator.createFilePath(ignore, folderPath), [])
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
	private tocToString(result: TocContentsType, indent: number): string {
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


