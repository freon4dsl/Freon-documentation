import * as fs from 'fs';
import * as path from 'path';
import { PathCreator } from './PathCreator.js';
import { CategoryInfoType, TocContentsType } from './TocContentsType.js';

export class SidebarFiller {
	private allTocs: TocContentsType[] = [];
	allCategories: CategoryInfoType[] = [];
	allPaths: string[] = []; /* keep track of all paths in order, to be able to add the previous and next links

	/**
	 * Reads the file structure under 'contentFolder' and generates a nav array in
	 * file 'outputFile'.
	 */

	generateAllTocs(contentFolder: string, outputFile: string) {
		if (!fs.existsSync(contentFolder)) {
			console.error(this, "cannot find folder '" + contentFolder + "'");
			return null;
		}
		this.allTocs = [];
		this.allCategories = [];
		// get all folders in the content: these are the categories
		const files: string[] = fs.readdirSync(contentFolder).sort();
		for (const file of files) {
			const folderPath: string = path.join(contentFolder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// found a category: create a TocContent entry
				const name: string = PathCreator.createShowableName(contentFolder, folderPath);
				const _path: string = '/' + PathCreator.createFilePath(contentFolder, folderPath);
				const toc: TocContentsType = new TocContentsType(name, _path, []);
				this.allPaths.push(toc.path);
				// add all subfolders to the result
				toc.content.push(...this.readSubcategories(folderPath, contentFolder));
				// add the category to allTocs
				this.allTocs.push(toc);
				// also create a categoryInfo entry
				// @ts-expect-error 'PathCreator.getTocName(toc.path)' results in a variable name that has the right type
				this.allCategories.push({name: name, path: _path, toc: PathCreator.getTocNameFromTocPath(toc.path)})
			}
		}
		// write allTocs to an output file
		this.writeOutput(contentFolder, this.allTocs, this.allCategories, outputFile);
	}

	private writeOutput(contentFolder: string, tocs: TocContentsType[], allCategories: CategoryInfoType[], outputFile: string) {
		// create the string for each toc
		const tocStr: string[] = [];
		for (const toc of tocs) {
			const categoryName: string = PathCreator.getTocNameFromTocPath(toc.path);
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
				const name: string = PathCreator.createShowableName(ignore, folder);
				const toc: TocContentsType = new TocContentsType(name, '/' + PathCreator.createFilePath(ignore, folder), []);
				this.allPaths.push(toc.path);
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
				const name: string = PathCreator.createShowableName(ignore, folderPath);
				const toc: TocContentsType = new TocContentsType(name, '/' + PathCreator.createFilePath(ignore, folderPath), []);
				this.allPaths.push(toc.path);
				// add all subfolders to the result
				toc.content.push(...this.readFolder(folderPath, ignore, 0));
				content.push(toc);
			}
		}
		return content;
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


