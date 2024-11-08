import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'mdsvex';
import { remarkExtractHeaders } from './remark-extract-headers.js';
import { categoryLayoutContent, pageContent } from './PageLayoutContent.js';
import { PathCreator } from './PathCreator.js';

const storeContent: string =
	`import { writable, type Writable } from 'svelte/store';
	import type { Section } from '$lib/SectionType';

	export const mySections: Writable<Section[]> = writable<Section[]>([]);`;

export class Md2Svelte {
	generate(contentFolder: string, outputFolder: string) {
		const result: boolean = this.transformFolder(contentFolder, contentFolder, outputFolder);
		if (!result) {
			console.log(`Could not read folder '${contentFolder}'`);
			return;
		}
	}

	/**
	 *
	 * @param folder the folder where the files are located
	 * @param ignore the path up till the contentFolder
	 * @param outputFolder the folder where the output will be generated
	 * @private
	 */
	private transformFolder(folder: string, ignore: string, outputFolder: string): boolean {
		if (!fs.existsSync(folder)) {
			console.error(this, "cannot find folder '" + folder + "'");
			return null;
		}
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		// make the category layouts and toc, if folder is at lowest level
		const level: number = (folder.match(/\\/g) || []).length;
		if (level === 2) {
			// Create and write the layout including a category sidebar
			const outputPath: string = PathCreator.createFolderPath(ignore, folder);
			const layoutPath: string = outputPath + path.sep + '+layout.svelte';
			const categoryName: string = PathCreator.getTocName(folder);
			PathCreator.createDirIfNotExisting(path.dirname(layoutPath), outputFolder);
			fs.writeFileSync(outputFolder + path.sep + layoutPath, categoryLayoutContent(categoryName));
		}

		// get content of the folder
		const fileNames: string[] = fs.readdirSync(folder);
		let result: boolean = true;
		for (const file of fileNames) {
			const folderPath: string = path.join(folder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// do it for the sub folders
				const subResult: boolean = this.transformFolder(folderPath, ignore, outputFolder);
				if (!subResult) {
					result = false;
				}
			} else {
				this.transformFile(folderPath, ignore, outputFolder).then((r) => {
					// create a site-nav entry
					return r;
				});
			}
		}
		return result;
	}

	private async transformFile(filepath: string, ignore: string, outputFolder: string) {
		// For each file, create a Svelte file containing the content from the markdown,
		// and a page content (nav) on the side.
		const markdown: string = fs.readFileSync(filepath, 'utf8');
		const transformed_code = await compile(markdown, {
			extensions: ['.md'],
			smartypants: true,
			remarkPlugins: [remarkExtractHeaders]
		});
		const scriptPart: string = this.createScriptPart(transformed_code.data.headers);
		let fileContent: string;
		if (scriptPart.length > 0) { // There are H2 headers on this page
			const htmlPart: string = this.changeHtags(transformed_code.code);
			fileContent = this.combineScriptAndCode(scriptPart, htmlPart);
		} else {
			fileContent = transformed_code.code;
		}
		let outputPath: string = PathCreator.createFilePath(ignore, filepath);
		// change name from '+page.md' to 'PageContent.svelte'
		outputPath = path.dirname(outputPath) + path.sep + 'PageContent.svelte';
		PathCreator.createDirIfNotExisting(path.dirname(outputPath), outputFolder);
		fs.writeFileSync(outputFolder + path.sep + outputPath, fileContent);

		if (scriptPart.length > 0) { // There are H2 headers on this page
			// Create and write the SectionStore.ts file
			const storePath: string = path.dirname(outputPath) + path.sep + "SectionStore.ts"
			fs.writeFileSync(outputFolder + path.sep + storePath, storeContent);
			if (path.dirname(outputPath) !== '.') { // Do not overwrite the site layout file
				const level: number = (filepath.match(/\\/g) || []).length;
				if (level !== 3) { // level 3 indicates a category, do not create another +layout.svelte
					// Create and write the page layout including a page nav
					const layoutPath: string = path.dirname(outputPath) + path.sep + '+page.svelte';
					fs.writeFileSync(outputFolder + path.sep + layoutPath, pageContent);
				}
			}
		}
	}

	/**
	 * combines the two script parts
	 * @param script
	 * @param code
	 */
	combineScriptAndCode(script: string, code: string): string {
		const innerHtml: string = code.replace(/<script>/, '');

		if (code.includes('</script>')) {
			return script + innerHtml;
		} else {
			return script + '\n</script>' + innerHtml;
		}
	}

	/** Changes <h2> and <h1> tags to <SectionComponent> tags, with the right props
	 *
	 * @param code
	 */
	changeHtags(code: string): string {
		let result = code.replace(/<h2/g, '<SectionComponent tag="h2" ');
		result = result.replace(/<h1/g, '<SectionComponent tag="h1" ');
		result = result.replace(/visible=/g, 'bind:intersecting=');
		result = result.replace(/<\/h2>/g, '</SectionComponent>');
		result = result.replace(/<\/h1>/g, '</SectionComponent>');
		return result;
	}

	createScriptPart(headers: unknown) {
		// console.log('HEADERS: ' + JSON.stringify(headers))
		// eslint-disable-next-line
		let headerInfo = [];
		const visibleSetters = [];
		if (Array.isArray(headers)) {
			headers.forEach((head, index) => {
				headerInfo.push(`{title: "${head.text}", visible: false, ref: '#${head.id}'}`);
				visibleSetters.push(`$: $mySections[${index}].visible = visible[${index}];`);
			});
		} else {
			console.log('NO ARRAY');
		}
		if (headerInfo.length > 0) {
			return `<script lang="ts">
							import SectionComponent from '$lib/SectionComponent.svelte';
							import {mySections} from './SectionStore.js';
							$mySections = [
																${headerInfo.map((hh) => `${hh}`).join(',\n')}
														]
						let visible: boolean[] = [];
						${visibleSetters.map((hh) => `${hh}`).join('\n')}
						`;
		} else {
			return '';
		}
	}


}
