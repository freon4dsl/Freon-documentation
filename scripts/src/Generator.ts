import { LinkChecker } from './LinkChecker.js';
import { Md2Svelte } from './Md2Svelte.js';
import { SidebarFiller } from './SidebarFiller.js';
import { RedirectGenerator } from './RedirectGenerator.js';

const contentFolder: string = '../docu-content';
const siteNavFile: string = "../src/lib/sidebar/SidebarContent.ts";
const outputFolder: string = '../src/routes';

export class Generator {
	generate() {
		console.log('Starting generation, checking links ...');
		// Check all references to other markdown files and gather the correct routes to these files in one sweep
		const linkChecker: LinkChecker = new LinkChecker();
		linkChecker.check(contentFolder, './Link_Check.txt', true);
		if (linkChecker.hasErrors) {
			console.log('Errors in references, see "./scripts/Link_Check.txt"');
			// return;
		}

		// Run SideBarFiller first. The info is used in Md2Svelte for setting the previous next links.
		console.log("Svelte pages ok, generating site-nav ...")
		const filler = new SidebarFiller();
		filler.generateAllTocs(contentFolder, siteNavFile);

		console.log('Continuing, generating svelte pages ...');
		// Walk over the folder with all the markdown files.
		const svelteCreator = new Md2Svelte(filler.allCategories, filler.allTocs);
		svelteCreator.generate(contentFolder, outputFolder);


		console.log("Side-nav pages ok, generating redirect typescript files ...")
		new RedirectGenerator().generate(contentFolder, outputFolder);
	}
}

new Generator().generate();
