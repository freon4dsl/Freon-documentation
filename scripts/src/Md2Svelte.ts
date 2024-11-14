import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'mdsvex';
import { remarkExtractHeaders } from './remark-extract-headers.js';
import { categoryLayoutContent, pageContent } from './PageLayoutContent.js';
import { PathCreator } from './PathCreator.js';

const storeContent: string =
	`import { writable, type Writable } from 'svelte/store';
	import type { Section } from '$lib/section/SectionType';

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
					return r;
				});
			}
		}
		return result;
	}

	private async transformFile(filepath: string, ignore: string, outputFolder: string) {
		// todo remove the numbering from <a> tags
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

	createScriptPart(headers: unknown): string {
		// console.log('HEADERS: ' + JSON.stringify(headers))
		let result: string = '';
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
			result = `<script lang="ts">
							import SectionComponent from '$lib/section/SectionComponent.svelte';
							import {mySections} from './SectionStore.js';
							$mySections = [
																${headerInfo.map((hh) => `${hh}`).join(',\n')}
														]
						let visible: boolean[] = [];
						${visibleSetters.map((hh) => `${hh}`).join('\n')}
						`;
		} else {
			result = '';
		}
		result += `import copy from "copy-to-clipboard";
              import { onMount } from "svelte";
              
              /**
               * This function will go through all the 'pre' elements
               * on the page and add a copy button to them.
               */
              onMount(() => {
                  const codeBlocks = document.querySelectorAll("pre");
                  codeBlocks.forEach((block) => {
                      const copyPrompt = document.createElement("div");
                      copyPrompt.className = "copy-prompt";
                      const copyPromptText = document.createElement("p");
                      copyPromptText.innerHTML = "👆 Click here to copy";
                      copyPromptText.className = 'copy-prompt-p';
                      const copyIcon = document.createElement("img");
                      copyIcon.src = "/images/down-arrow.png";
                      copyIcon.className = "copy-prompt-img";
                      copyPrompt.appendChild(copyIcon);
                      copyPrompt.appendChild(copyPromptText);
                      block.appendChild(copyPrompt);
                      block.querySelector(".copy-prompt > p").addEventListener("click", (evt) => {
                          copy(block.querySelector("code").textContent);
                          block.querySelector(".copy-prompt > p").innerHTML = "Copied!";
                          setTimeout(() => {
                              block.querySelector(".copy-prompt > p").innerHTML = "👆 Click to copy";
                          }, 1000);
                      });
                  });
              });`;
		return result;
	}
}
