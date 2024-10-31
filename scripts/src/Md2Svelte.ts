import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'mdsvex';
import { remarkExtractHeaders } from './remark-extract-headers.js';

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
		const htmlPart: string = this.changeH2s(transformed_code.code);
		const fileContent: string = this.combineScriptAndCode(scriptPart, htmlPart);

		const outputPath: string = this.createPath(ignore, filepath);
		this.createDirIfNotExisting(path.dirname(outputPath), outputFolder);
		fs.writeFileSync(outputFolder + path.sep + outputPath, fileContent);
	}

	/**
	 * combines the two script parts
	 * @param script
	 * @param code
	 */
	combineScriptAndCode(script: string, code: string): string {
		let innerHtml: string = code.replace(/<script>/, '');
		//     innerHtml = `<div class="main">
		//   <div class="column-left">
		//     ${innerHtml}
		//   </div>
		//
		//   <div class="column-right">
		//     <nav class="side-nav" >
		//       <ul>
		//         {#each $mySections as sec, index}
		//           <li>
		//             <a class:visible={index === current} class:nonvisible={index !== current} href={sec.ref}> {sec.title} </a>
		//           </li>
		//         {/each}
		//       </ul>
		//     </nav>
		//   </div>
		// </div>
		// `;

		if (code.includes('</script>')) {
			return script + innerHtml;
		} else {
			return script + '\n</script>' + innerHtml;
		}
	}

	/** Changes <h2> tags to <SectionComponent> tags, with the right props
	 *
	 * @param code
	 */
	changeH2s(code: string): string {
		let result = code.replace(/<h2/g, '<SectionComponent');
		result = result.replace(/visible=/g, 'bind:intersecting=');
		result = result.replace(/<\/h2>/g, '</SectionComponent>');
		return result;
	}

	createScriptPart(headers: unknown) {
		// console.log('HEADERS: ' + JSON.stringify(headers))
		// eslint-disable-next-line
		let headerInfo = [];
		const visibleSetters = [];
		if (Array.isArray(headers)) {
			headers.forEach((head, index) => {
				console.log('HEAD: ' + JSON.stringify(head.text));
				headerInfo.push(`{title: "${head.text}", visible: false, ref: '#${head.id}'}`);
				visibleSetters.push(`$: $mySections[${index}].visible = visible[${index}];`);
			});
		} else {
			console.log('NO ARRAY');
		}
		return `<script lang="ts">
		import SectionComponent from '$lib/SectionComponent.svelte';
    import {mySections} from '$lib/SectionStore.js';
		import type { Section } from '$lib/SectionStore.js';
    $mySections = [
                      ${headerInfo.map((hh) => `${hh}`).join(',\n')}
                  ]
	let visible: boolean[] = [];
	${visibleSetters.map((hh) => `${hh}`).join('\n')}
	
	$: current = getCurrent($mySections);

  function getCurrent(internalSections: Section[]): number {
    let previous = current;
    for (let i=0; i < internalSections.length; i++) {
      if (internalSections[i].visible) {
        return i;
      }
    }
    return previous;
  }
	`;
	}

	private createPath(ignore: string, file: string): string {
		// ignore the start of the path if it is equal to 'ignore'
		let pathStr: string = path.relative(ignore, file);
		// remove the numbering
		pathStr = pathStr.replace(/[0-9]*_/g, '');
		// change the extension to .svelte
		if (path.extname(pathStr) === '.md') {
			const basename = path.basename(pathStr, path.extname(pathStr));
			return path.join(path.dirname(pathStr), basename + '.svelte');
		}
		// note: there is no need to replace "\" by "/" for svelteKit, but it is easier to generate - no escapes necessary
		pathStr = pathStr.replace(/\\/g, '/');
		return pathStr;
	}

	private createDirIfNotExisting(dir: string, outputFolder: string) {
		const parts = dir.split(path.sep);
		let current = outputFolder;
		for (const part of parts) {
			current = current + '/' + part;
			if (!fs.existsSync(current)) {
				fs.mkdirSync(current);
			}
		}
	}
}
