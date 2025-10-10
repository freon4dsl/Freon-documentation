import * as fs from 'fs';
import * as path from 'path';
import { remarkExtractHeaders } from './remark-extract-headers.js';
import { categoryLayoutContent, pageContent } from './PageLayoutContent.js';
import { PathCreator } from './PathCreator.js';
import { CategoryInfoType, TocContentsType } from './TocContentsType.js';
import { compile } from 'mdsvex';
import { setupFreon } from "./prism-freon.js"
import matter, { GrayMatterFile } from 'gray-matter';

// Setup the Freon language for code highlighting with Prism
setupFreon()

export class Md2Svelte {
	allPaths: string[];
	allCategories: CategoryInfoType[];

	constructor(allPaths: string[], allCategories: CategoryInfoType[]) {
		this.allPaths = allPaths;
		this.allCategories = allCategories;
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
		const level: number = (folder.match(new RegExp('\\' + path.sep, 'g')) || []).length;
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
			let foundMetaData: boolean = false;
			if (stat.isDirectory()) {
				// do it for the sub folders
				const subResult: boolean = this.transformFolder(folderPath, ignore, outputFolder);
				if (!subResult) {
					result = false;
				}
			} else {
				if (path.extname(folderPath) !== '.md') {
					console.log('Skipping non markdown file: ' + folderPath);
				} else {
					if (path.basename(folderPath) === 'categoryMeta.md') {
						foundMetaData = true;
						// Create and write the metadata in '+layout.ts'
						this.makeCategoryMetaData(folderPath, ignore, outputFolder);
					} else {
						this.transformFile(folderPath, ignore, outputFolder).then((r) => {
							return r;
						});
					}
				}
			}
			if (!foundMetaData && level === 2) {
				this.makeCategoryMetaData(folderPath, ignore, outputFolder, foundMetaData);
			}
		}
		return result;
	}

	private makeCategoryMetaData(inputFile: string, ignore: string, outputFolder: string, fileIsPresent: boolean = true) {
		let fileContent: string;
		if (fileIsPresent) {
			const markdown: string = fs.readFileSync(inputFile, 'utf8');
			// Extract the metadata from the markdown using the 'gray-matter' library
			const extracted: GrayMatterFile<string> = matter(markdown);

			const saveMetaData: { [p: string]: string } = extracted.data;
			Object.entries(extracted.data).forEach(([key, value]) => {
				if (key === 'tags') {
					const tagList: string[] = value.split(',').map(t => t.trim()).filter(Boolean);
					saveMetaData[key] = `[ ${tagList.map(tag => `"${tag}"`).join(', ')}] `;
				} else {
					saveMetaData[key] = this.ensureDoubleQuoted(value);
				}
			});
			fileContent = `import type { LayoutLoad } from './$types';
			import type { CategoryData } from '$lib/metadataTypes/MetaTypes';
			
			export const load: LayoutLoad = async ({ parent }): Promise<CategoryData> => {
				const { site } = await parent(); // parent() = SiteData
				return {
					site,
					category: {
							${Object.entries(saveMetaData)
				.map(([p, v]) => `${p}: ${v}`)
				.join(',\n')}
					}
				};
			};`
		} else {
			fileContent = `import type { LayoutLoad } from './$types';
			import type { CategoryData } from '$lib/metadataTypes/MetaTypes';
			
			export const load: LayoutLoad = async ({ parent }): Promise<CategoryData> => {
				const { site } = await parent(); // parent() = SiteData
				return {
					site,
					category: {
					}
				};
			};`
		}
		const routeName: string = path.dirname(PathCreator.createFilePath(ignore, inputFile));
		const pagePath: string = routeName + path.sep + '+layout.ts';
		fs.writeFileSync(outputFolder + path.sep + pagePath, fileContent);
	}

	private async transformFile(filepath: string, ignore: string, outputFolder: string) {
		// For each markdown file, create three Svelte/TS files:
		// 		+page.svelte: imports PageContent and adds an 'on this page' nav to the side,
		// 		PageContents.svelte: contains the content from the markdown,
		// 		+page.ts: contains the metadat extracted from the markdown.

		// Because embedme only works for known file types, we use the file type "```proto" in the markdown,
		// but replace it with "```freon" before transforming it to Svelte.
		// This way Prism sees the correct file type: freon.
		const markdown: string = fs.readFileSync(filepath, 'utf8').replaceAll('```proto', '```freon').replaceAll('```swift', '```svelte');
		// Extract the metadata from the markdown using the 'gray-matter' library
		const extracted: GrayMatterFile<string> = matter(markdown);
		// Find the folder where the files should be created
		const routeName: string = path.dirname(PathCreator.createFilePath(ignore, filepath));
		const level: number = (filepath.match(/\\/g) || []).length;

		await this.createPageSvelteFiles(extracted.content, routeName, level, ignore, outputFolder);
		await this.createPageTsFile(extracted.data, routeName, level, filepath, outputFolder);
	}

	private getPublishedTime(filePath: string) {
		return fs.statSync(filePath).birthtime.toISOString();
	}

	private getModifiedTime(filePath: string) {
		return fs.statSync(filePath).mtime.toISOString();
	}

	private ensureDoubleQuoted = (s: string): string => (/^(['"]).*\1$/.test(s) ? s : `"${s.replace(/"/g, '\\"')}"`);

	private async createPageTsFile(metaData: { [p: string]: string }, routeName: string, level: number, filePath: string, outputFolder: string) {
		const saveMetaData: { [p: string]: string } = metaData;
		Object.entries(metaData).forEach(([key, value]) => {
			if (key === 'tags') {
				const tagList: string[] = value.split(',').map(t => t.trim()).filter(Boolean);
				saveMetaData[key] = `[ ${tagList.map(tag => `"${tag}"`).join(', ')}] `;
			} else {
				saveMetaData[key] = this.ensureDoubleQuoted(value);
			}
		});

		// add the modified time
		saveMetaData['modifiedTime'] = `"${this.getModifiedTime(filePath)}"`;
		// add the published time
		saveMetaData['publishedTime'] = `"${this.getPublishedTime(filePath)}"`;
		const fileContent: string = `import type { PageLoad } from './$types';
import type { PageData } from '$lib/metadataTypes/MetaTypes';

export const load: PageLoad = async ({ parent }): Promise<PageData> => {
  const { site, category } = await parent(); // parent() = CategoryData

  return {
    site,
    category,
    page: {
			${Object.entries(saveMetaData)
			.map(([p, v]) => `${p}: ${v}`)
			.join(',\n')}
    }
  };
};`

		if (routeName !== '.') {
			// Do not overwrite the site +page.ts file
			if (level !== 3) {
				// level 3 indicates a category, do not create another +page.ts file
				// Create and write the page layout including a page nav
				const pagePath: string = routeName + path.sep + '+page.ts';
				fs.writeFileSync(outputFolder + path.sep + pagePath, fileContent);
			}
		}
	}

	private async createPageSvelteFiles(markdownContent: string, routeName: string, level: number, ignore: string, outputFolder: string) {
		// Transform the markdown to svelte
		// We also escape some chars in <code> blocks to avoid the svelte compiler complaining
		const transformed_code = await compile(markdownContent, {
			extensions: ['.md'],
			smartypants: true,
			remarkPlugins: [remarkExtractHeaders],
			highlight: {
				highlighter(code, lang) {
					// Runs only for fenced <code> blocks, inline blocks need to take care of their own
					// Escape characters that break HTML or Svelte parsing
					const escape = (s: string) =>
						s
							.replace(/&/g, '&amp;') // &
							.replace(/</g, '&lt;') // <
							.replace(/>/g, '&gt;') // >
							.replace(/{/g, '&#123;') // {
							.replace(/}/g, '&#125;'); // }

					const cls = lang ? `language-${lang}` : '';
					return `<pre class="${cls}"><code class="${cls}">${escape(code)}</code></pre>`;
				}
			}
		});

		// Create the script part of the PageContent.svelte
		const scriptPart: string = this.createScriptPart(ignore, routeName);
		let fileContent: string;

		PathCreator.createDirIfNotExisting(routeName, outputFolder);
		const htmlPart: string = this.changeHtags(transformed_code.code);
		if (scriptPart.length > 0) {
			// There is something to add
			fileContent = this.combineScriptAndCode(scriptPart, htmlPart);
		} else {
			console.log('FOUND ONE!!!!');
			fileContent = transformed_code.code;
		}
		if (routeName !== '.') {
			// Do not overwrite the site +page.svelte file
			if (level !== 3) {
				// level 3 indicates a category, do not create another +page.svelte file
				// Create and write the page layout including a page nav
				const pagePath: string = routeName + path.sep + '+page.svelte';
				fs.writeFileSync(outputFolder + path.sep + pagePath, pageContent(transformed_code.data.headers));
			}
		}

		const pageContentPath: string = routeName + path.sep + 'PageContent.svelte';
		fs.writeFileSync(outputFolder + path.sep + pageContentPath, fileContent);
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
		if (code.includes('</script>')) {
			// if there was a script section, remove the script start, and add the <<PrevNextSection> after the script end

			let innerHtml: string = code.replace(/<script>/, '');
			innerHtml = innerHtml.replace(/<\/script>/, '</script>\n\n<PrevNextSection {prevLink} {nextLink} />\n');
			return script + innerHtml + '\n\n<PrevNextSection {prevLink} {nextLink} />';
		} else {
			return script + '\n</script>\n<PrevNextSection {prevLink} {nextLink} />' + code + '\n\n<PrevNextSection {prevLink} {nextLink} />';
		}
	}

	/** Changes <h2> and <h1> tags to <SectionComponent> tags, with the right props
	 *
	 * @param code
	 */
	changeHtags(code: string): string {
		const result = code
			.replace(/<h2/g, '<SectionComponent tag="h2" ')
			.replace(/<h1/g, '<SectionComponent tag="h1" ')
			.replace(/"REMOVE\{([^}]+)\}REMOVE"/g, '{$1}')
			.replace(/'REMOVE\{([^}]+)\}REMOVE'/g, '{$1}')
			.replace(/<\/h2>/g, '</SectionComponent>')
			.replace(/<\/h1>/g, '</SectionComponent>');
		return result;
	}

	createScriptPart(ignore: string, filepath: string): string {
		// console.log('HEADERS: ' + JSON.stringify(headers))
		let result: string = `<script lang="ts">
							import SectionComponent from '$lib/section/SectionComponent.svelte';
							import copy from "copy-to-clipboard"; 
							import { onMount } from "svelte";
							import PrevNextSection from '$lib/prevNext/PrevNextSection.svelte';

							interface ComponentProps {
								setVisible: (id: string, v: boolean) => void;
							}
							let { setVisible }: ComponentProps = $props();
							
							const visibleById = $state<Record<string, boolean>>({});

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
											block.querySelector('.copy-prompt > p')?.addEventListener('click', () => {
												if (block.querySelector('code')?.textContent !== null && block.querySelector('code')?.textContent !== undefined) {
													copy(block.querySelector('code')!.textContent!);
												}
												if (block.querySelector('.copy-prompt > p')?.innerHTML !== null && block.querySelector('.copy-prompt > p')?.innerHTML !== undefined) {
													block.querySelector('.copy-prompt > p')!.innerHTML = 'Copied!';
													setTimeout(() => {
														block.querySelector('.copy-prompt > p')!.innerHTML = '👆 Click to copy';
													}, 1000);
												}
											});
                  });
              });`;
		let next: string = '';
		let prev: string = '';
		// find filepath in allPaths

		// make the filepath the same for both types of path.sep, to be able to compare with the toc
		filepath = filepath.replace(new RegExp('\\' + path.sep, 'g'), '/');
		filepath = '/' + filepath;

		this.allPaths.forEach((path: string, index: number) => {
			if (path === filepath) {
				if (index > 0) {
					let isCategory: boolean = false;
					this.allCategories.forEach((cat) => {
						if (this.allPaths[index - 1] === cat.path) {
							isCategory = true;
						}
					});
					if (isCategory) {
						// use a path before the category, because the category has a redirect script to its first route
						if (index - 1 > 0) {
							prev = this.allPaths[index - 2];
						}
					} else {
						prev = this.allPaths[index - 1];
					}
				}
				if (index + 1 < this.allPaths.length) {
					next = this.allPaths[index + 1];
				}
				// console.log(`==> found ${filepath} \n\tprev:${prev} \n\tnext${next}`)
			}
		});

		result += `
		let prevLink= '${prev}';
    let nextLink= '${next}';
    `;
		return result;
	}

	loopOverToc(toc: TocContentsType, searchPath: string, lastSeen: string): string {
		let result: string = '';
		let next: string = '/';
		let prev: string = lastSeen;
		let found: boolean = false;
		toc.content.forEach((cont) => {
			// console.log(`current: ${cont.path}, last seen ${lastSeen}`)
			if (found) {
				next = cont.path;
				found = false;
				result = `let prevLink= '${prev}';\nlet nextLink= '${next}';`;
			}
			if (cont.path === searchPath) {
				prev = lastSeen;
				found = true;
			} else if (searchPath.startsWith(cont.path)) {
				result = this.loopOverToc(cont, searchPath, cont.path);
			}
			lastSeen = cont.path;
		});
		if (found) {
			// it was the last, so make an entry with an empty next link
			result = `let prevLink= '${prev}';\nlet nextLink= '';`;
		}
		return result;
	}

}
