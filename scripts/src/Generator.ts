import { LinkChecker } from './LinkChecker.js';
import { Md2Svelte } from './Md2Svelte.js';
import { navTreeFiller } from './NavTreeFiller.js';

const contentFolder: string = '../docu-content';
const siteNavFile: string = "../src/lib/tree/TreeView.svelte";
const outputFolder: string = '../src/routes';

export class Generator {
	generate() {
		console.log('Starting generation');
		// Check all references to other markdown files and gather the correct routes to these files in one sweep
		const linkChecker: LinkChecker = new LinkChecker();
		linkChecker.check(contentFolder, './Link_Check.txt', true);
		// if (linkChecker.hasErrors) {
		// 	console.log('Errors in references, see "./scripts/Link_Check.txt"');
		// 	return;
		// }
		// References ok, continue

		console.log('Links ok');
		// Walk over the folder with all the markdown files.
		const svelteCreator = new Md2Svelte();
		svelteCreator.generate(contentFolder, outputFolder);

		// console.log("Generating site-nav")
		// new navTreeFiller().generateNavTree(contentFolder, siteNavFile);
	}
}

new Generator().generate();
