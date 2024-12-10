import { LinkChecker } from './LinkChecker.js';
import { Md2Svelte } from './Md2Svelte.js';
import { SidebarFiller } from './SidebarFiller.js';
import { RedirectGenerator } from './RedirectGenerator.js';
import { ImageChecker } from './ImageChecker.js';

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

		console.log('Checking images ...');
		// Check all references to image files
		const imageChecker: ImageChecker = new ImageChecker();
		imageChecker.check(contentFolder, './Image_Check.txt', true);
		if (imageChecker.hasErrors) {
			console.log('Errors in references, see "./scripts/Image_Check.txt"');
			// return;
		}

		// Run SideBarFiller first. The info is used in Md2Svelte for setting the previous next links.
		console.log("Generating site-nav ...")
		const filler = new SidebarFiller();
		filler.generateAllTocs(contentFolder, siteNavFile);

		console.log('Generating svelte pages ...');
		// Walk over the folder with all the markdown files.
		const svelteCreator = new Md2Svelte(filler.allPaths, filler.allCategories);
		svelteCreator.generate(contentFolder, outputFolder);

		console.log("Generating redirect typescript files ...")
		new RedirectGenerator().generate(contentFolder, outputFolder);
	}
}

new Generator().generate();
