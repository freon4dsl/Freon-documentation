import * as fs from 'fs';
import * as path from 'path';
import { PathCreator } from './PathCreator.js';


/**
 * Identical to /src/lib/tree/NavTree, but included here to avoid Node.js errors
 */
class NavTree {
	constructor(name: string, path: string, content: NavTree[]) {
		this.name = name;
		this.path = path;
		this.content = content;
	}

	name: string;
	path: string;
	content?: NavTree[];
}

export class navTreeFiller {
	/**
	 * Reads the file structure under 'contentFolder' and generates a nav array in
	 * file 'outputFile'.
	 */
	generateNavTree(contentFolder: string, outputFile: string) {
		const myTree: NavTree = this.readFiles(contentFolder, contentFolder);
		if (!myTree) {
			console.log(`Could not read folder '${contentFolder}'`);
			return;
		}

		// start template
		const navContent: string = `<script lang="ts">
	import Tree from './Tree.svelte';
	import type { NavTree } from './NavTree.js';
	
	let root: NavTree[] = [${myTree.content.map((elem) => this.navTreeToString(elem, 2)).join('')}];
	</script>
	
	<div class='navigator'>
		<Tree content={root} expanded/>
	</div>
	
	<style>
		.navigator {
			position: relative;
			width: 100%;
			heigth: 100%;
			background: var(--theme-colors-bg_color);
		}
	</style>`;
		// end template

		try {
			fs.writeFileSync(outputFile, navContent);
		} catch (e) {
			console.log(e, e.stack);
		}
	}

	/**
	 *
	 * @param folder: the folder where the files are located
	 * @param ignore: the path up till the folder where the files are located
	 * @private
	 */
	private readFiles(folder: string, ignore: string): NavTree {
		if (!fs.existsSync(folder)) {
			console.error(this, "cannot find folder '" + folder + "'");
			return null;
		}
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}

		const content: NavTree[] = [];
		// get content of the folder and sort the names alphabetically
		const files = fs.readdirSync(folder).sort();
		for (const file of files) {
			const folderPath: string = path.join(folder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// add all subfolders to the result
				content.push(this.readFiles(folderPath, ignore));
			}
		}
		// create the name for a folder based on path relative from 'ignore'
		const startName: string = this.createName(path.parse(path.relative(ignore, folder)).name);
		// no need to replace "\" by "/" for svelteKit, but it is easier to generate - no escapes necessary
		return new NavTree(startName, '/' + PathCreator.createPath(ignore, folder), content);
	}

	/**
	 * Finds the name to be shown in the navigation tree based on the file name
	 * @param folderName: name of the file
	 * @private
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
	private navTreeToString(result: NavTree, indent: number): string {
		if (result !== null) {
			let prefix: string = '\n';
			for (let i = 0; i < indent; i++) {
				prefix = prefix + '   ';
			}
			let contentStr: string = '';
			if (result.content.length > 0) {
				contentStr = ',' + prefix + '  content: [';
				for (const tree of result.content) {
					contentStr = contentStr.concat(this.navTreeToString(tree, indent + 1));
				}
				contentStr = contentStr + prefix + '         ]';
			}
			return `${prefix}{ name: '${result.name}', path: '${result.path}'${contentStr}},`;
		}
		return '';
	}
}


