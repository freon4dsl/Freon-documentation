import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'mdsvex';
import { remarkExtractHeaders } from './remark-extract-headers.js';
import { categoryLayoutContent, pageContent } from './PageLayoutContent.js';
import { PathCreator } from './PathCreator.js';
import { CategoryInfoType, TocContentsType } from './TocContentsType.js';


const storeContent: string =
	`import { writable, type Writable } from 'svelte/store';
	import type { Section } from '$lib/section/SectionType';

	export const mySections: Writable<Section[]> = writable<Section[]>([]);`;

export class Md2Svelte {
	allTocs: TocContentsType[];
	allCategories: CategoryInfoType[];

	constructor(allCategories: CategoryInfoType[], allTocs: TocContentsType[]) {
		this.allCategories = allCategories;
		this.allTocs = allTocs;
	}

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
		// find the level by counting the number of file separators in the folder name
		const level: number = (folder.match(new RegExp("\\" + path.sep, "g")) || []).length;
		if (level === 2) {
			// Create and write the layout including a category sidebar
			const outputPath: string = PathCreator.createFilePath(ignore, folder);
			const layoutPath: string = outputPath + path.sep + '+layout.svelte';
			const categoryName: string = PathCreator.getTocName(ignore, folder);
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
		// For each file, create a Svelte file containing the content from the markdown,
		// and a page content (nav) on the side.
		const markdown: string = fs.readFileSync(filepath, 'utf8');
		const transformed_code = await compile(markdown, {
			extensions: ['.md'],
			smartypants: true,
			remarkPlugins: [remarkExtractHeaders]
		});
		// find the path of the svelte file that should be created
		let outputPath: string = PathCreator.createFilePath(ignore, filepath);
		// find the folder where the svelte file should be created
		const routeName: string = path.dirname(outputPath);

		// create the script part of the svelte file
		const scriptPart: string = this.createScriptPart(transformed_code.data.headers, ignore, routeName);
		let fileContent: string;

		if (scriptPart.length > 0) { // There is something to add
			const htmlPart: string = this.changeHtags(transformed_code.code);
			fileContent = this.combineScriptAndCode(scriptPart, htmlPart);
			// Create and write the SectionStore.ts file
			const storePath: string = routeName + path.sep + "SectionStore.ts"
			fs.writeFileSync(outputFolder + path.sep + storePath, storeContent);
			if (routeName !== '.') { // Do not overwrite the site layout file
				const level: number = (filepath.match(/\\/g) || []).length;
				if (level !== 3) { // level 3 indicates a category, do not create another +layout.svelte
					// Create and write the page layout including a page nav
					const layoutPath: string = routeName + path.sep + '+page.svelte';
					fs.writeFileSync(outputFolder + path.sep + layoutPath, pageContent);
				}
			}
			// change name from '+page.svelte' to 'PageContent.svelte'
			outputPath = routeName + path.sep + 'PageContent.svelte';
		} else {
			fileContent = transformed_code.code;
		}

		PathCreator.createDirIfNotExisting(routeName, outputFolder);
		fs.writeFileSync(outputFolder + path.sep + outputPath, fileContent);
	}

	/**
	 * Adds additional content to the <script> part of the svelte file.
	 *
	 * If there is a script in the Markdown, the start tag is removed, the new script is added in front of the
	 * script content, and a PrevNextSection is added directly after the closing </script> tag.
	 *
	 * If there is no script part in the markdown, the additional script is added before the content.
	 * In both cases a PrevNextSection is added after the content.
	 * @param script
	 * @param code
	 */
	combineScriptAndCode(script: string, code: string): string {
		let innerHtml: string = code.replace(/<script>/, '');

		if (code.includes('</script>')) {
			innerHtml = innerHtml.replace(/<script>/, "</script>\n\n<PrevNextSection {prevLink} {nextLink} />\n" )
			return script + innerHtml + "\n\n<PrevNextSection {prevLink} {nextLink} />";
		} else {
			return script + '\n\t</script>\n<PrevNextSection {prevLink} {nextLink} />' + innerHtml + "\n\n<PrevNextSection {prevLink} {nextLink} />";
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

	createScriptPart(headers: unknown, ignore: string, filepath: string): string {
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
               * Thanks to: https://slavbasharov.com/blog/adding-click-to-copy-code-markdown-blog
               */
              onMount(() => {
                  const codeBlocks = document.querySelectorAll("pre");
                  codeBlocks.forEach((block) => {
                      const copyPrompt = document.createElement("div");
                      copyPrompt.className = "copy-prompt";
                      const copyPromptText = document.createElement("p");
                      copyPromptText.innerHTML = "👆 Click to copy";
                      copyPromptText.className = 'copy-prompt-p';
                      const copyIcon = document.createElement("img");
                      copyIcon.src = "/icons/copy-icon.svg";
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
		// todo add the right links here
		let next: string = '/';
		let prev: string = '/';
		// find filepath in allTocs

		// find the first entry in the path and get the toc for this category
		const pathItems: string[] = filepath.split(path.sep);
		const ww: TocContentsType = this.allTocs.find(xx => xx.name === pathItems[0]);

		// make the filepath the same for both types of path.sep, to be able to compare with the toc
		filepath = filepath.replace(new RegExp('\\' + path.sep, 'g'),  '/');
		// console.log("------------- Searching for " + '/' + filepath);

		if (ww !== undefined) {
			// loop over the toc
			let loopPrev: string = ww.path;
			let found: boolean = false;
			ww.content.forEach(xx => {
				if (found) {
					next = xx.path;
					found = false;
				}
				if (xx.path === '/' + filepath) {
					prev = loopPrev;
					found = true;
				}
				loopPrev = xx.path;
			});
			console.log(`prev: ${prev}, this: ${'/' + filepath} next: ${next}`);
		}

		result += `   
		import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
		
		let prevLink= '${prev}';
    let nextLink='${next}';
    `
		return result;
	}
}
