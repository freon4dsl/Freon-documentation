// import * as fs from "fs";
// import * as path from "path";
import { LinkChecker } from './LinkChecker.js';

const contentFolder: string = "../docu-content";
// const siteNavFile: string = "../src/lib/tree/TreeView.svelte";
// const outputFolder: string = "../src/routes";

export class Generator {

	generate() {
		console.log("Starting generation")
		// Check all references to other markdown files and gather the correct routes to these files in one sweep
		const linkChecker: LinkChecker = new LinkChecker();
		linkChecker.check(contentFolder, "./Link_Check.txt", true);
		if (linkChecker.hasErrors) {
			return;
		}
		// References ok, continue
		console.log("YESSSSSSSSSSSS, continue")

		// For each route, create a folder in src/routes, and an entry in the site-nav-tree.
		const routes: string[] = linkChecker.correctRoutes;
		console.log(routes)

		// Walk over the folder with all the markdown files.
		// this.readFiles(contentFolder, contentFolder)
		// For each file, create a Svelte file containing the content from the markdown,
		// and a page content (nav) on the side.
	}

}

new Generator().generate();
