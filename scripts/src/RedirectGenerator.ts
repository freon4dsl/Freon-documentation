import fs from 'fs';
import path from 'path';
import { PathCreator } from './PathCreator.js';

export class RedirectGenerator {
	generate(contentFolder: string, outputFolder: string) {
		if (!fs.existsSync(contentFolder)) {
			console.error(this, "cannot find folder '" + contentFolder + "'");
			return null;
		}
		// get all folders in the content: these are the categories
		const files: string[] = fs.readdirSync(contentFolder).sort();
		for (const file of files) {
			const folderPath: string = path.join(contentFolder, file);
			const stat = fs.lstatSync(folderPath);
			if (stat.isDirectory()) {
				// todo what if there is an ordinary +page.md file in this folder?
				// found a category: create a Redirect file
				const categoryName: string = PathCreator.getFolderName(file);
				let outputPath: string = outputFolder + path.sep + categoryName;
				outputPath = outputPath + path.sep + '+page.server.ts';
				PathCreator.createDirIfNotExisting(categoryName, outputFolder);
				fs.writeFileSync(outputPath, this.makeFileContent(categoryName));
			}
		}
	}

	makeFileContent(categoryName: string): string {
		return `import { redirect } from '@sveltejs/kit';

export function load() {
  throw redirect(302, '/${categoryName}/Overview');
}`
	}
}
