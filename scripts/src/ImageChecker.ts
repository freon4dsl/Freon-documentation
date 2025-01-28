import * as fs from 'fs';
import * as path from 'path';
import { PathCreator } from './PathCreator.js';

const imagesFolder: string = '../static/images';

export class ImageChecker {
	private _usedImagePaths: string[] = [];
	private _availableImagePaths: string[] = [];
	private totalErrors: number = 0;
	private totalWarnings: number = 0;
	private result: string[] = [];
	private logFileOnly: boolean = false;
	private count: number = 0;

	check(searchDir: string, logFile: string, logFileOnly: boolean) {
		// initialize
		this._usedImagePaths = [];
		this._availableImagePaths = [];
		this.totalErrors = 0;
		this.totalWarnings = 0;
		this.result = [];
		this.count = 0;
		this.logFileOnly = logFileOnly;
		// get the image paths from all files
		this.getPathsFromFolder(searchDir);
		// get all available images
		this.getStaticImagePaths(imagesFolder);
		// now check whether the two lists match
		this.checkImagePaths();
		// show the results
		this.addToResult(`Total errors: ${this.totalErrors}, total warnings: ${this.totalWarnings}.`);
		fs.writeFileSync(logFile, this.result.map((line) => line).join('\n'));
	}

	get hasErrors(): boolean {
		return this.totalErrors !== 0;
	}

	private addToResult(line: string) {
		this.result.push(line);
		if (!this.logFileOnly) {
			console.log(line);
		}
	}

	/**
	 * Adds all images used in a Svelte Figure component to '_usedImagePaths',
	 * assuming that an entry like 'imageName='documentation/mapping-example-stringliteral.svg'
	 * is on a separate line.
	 * @param filepath
	 * @private
	 */
	private getPathsFromFile(filepath: string) {
		const content: string = fs.readFileSync(filepath, 'utf8');
		const splitted: string[] = content.split('\n'); // will split every line break

		for (let i = 0; i < splitted.length; i++) {
			let line = splitted[i].trim();
			if (line.includes('<Figure')) {
				this.count++;
			}
			// check the links
			if (line.includes('imageName')) {
				// remove the quotes
				line = line.replace(/['"]/g, '');
				// remove any 'imageName={'
				line = line.replace(/imageName={/, '');
				// remove any '}'
				line = line.replace(/}/, '');
				// remove any 'imageName='
				line = line.replace(/imageName=/, '');
				// change the path separators
				line = line.replace(/\//g, path.sep);
				this._usedImagePaths.push(line);
			}
		}
	}

	private getPathsFromFolder(folder: string) {
		if (!fs.existsSync(folder)) {
			console.error(this, "cannot find folder '" + folder + "'");
			return null;
		}
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		// get content of the folder
		const files = fs.readdirSync(folder);
		for (const file of files) {
			const filepath = path.join(folder, file);
			const stat = fs.lstatSync(filepath);
			if (!stat.isDirectory()) {
				// if file does not have extension .md or .svelte, ignore it
				if (path.extname(filepath) === '.md' || path.extname(filepath) === '.svelte') {
					this.getPathsFromFile(filepath);
				}
			} else {
				// do all subFolders
				this.getPathsFromFolder(filepath);
			}
		}
	}

	/**
	 * Searches the 'static' folder for images.
	 * @private
	 */
	private getStaticImagePaths(folder: string) {
		if (!fs.existsSync(folder)) {
			console.error(this, "cannot find folder '" + folder + "'");
			return null;
		}
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}

		// get content of the folder and sort the names alphabetically
		const files = fs.readdirSync(folder);
		for (const file of files) {
			let filepath = path.join(folder, file);
			const stat = fs.lstatSync(filepath);
			if (stat.isDirectory()) {
				// do all subFolders
				this.getStaticImagePaths(filepath);
			} else {
				// ignore the start of the path if it is equal to 'imagesFolder'
				filepath = path.relative(imagesFolder, filepath);
				this._availableImagePaths.push(filepath);
			}
		}
	}

	private checkImagePaths() {
		const folder: string = imagesFolder;
		if (!fs.existsSync(folder)) {
			console.error(this, "cannot find folder '" + folder + "'");
			return null;
		}
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}

		// console.log(`Found ${this.count} requests.\nThey are:` + this._usedImagePaths.join('\n') + "\n\n")
		const errors: string[] = [];
		for (const usedPath of this._usedImagePaths) {
			if (!this._availableImagePaths.includes(usedPath)) {
				errors.push(`Not available: ${usedPath}.`)
			}
		}
		if (errors.length > 0) {
			this.addToResult(`Found ${errors.length} incorrect image requests:`);
			for (let i = 0; i < errors.length; i++) {
				this.addToResult('\t' + errors[i]);
			}
			this.totalErrors += errors.length;
		}
		const warnings: string[] = [];
		for (const unused of this._availableImagePaths) {
			if (!this._usedImagePaths.includes(unused)) {
				warnings.push(`Not used: ${unused}.`)
			}
		}
		if (warnings.length > 0) {
			this.addToResult(`Found ${warnings.length} unused images:`);
			for (let i = 0; i < warnings.length; i++) {
				this.addToResult('\t' + warnings[i]);
			}
			this.totalWarnings += warnings.length;
		}
	}
}
