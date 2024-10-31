import * as fs from 'fs';
import * as path from 'path';

export class LinkChecker {
	private _correctRoutes: string[] = [];
	private totalErrors: number = 0;
	private totalWarnings: number = 0;
	private result: string[] = [];
	private logFileOnly: boolean = false;
	private searchDir: string = '.';

	check(searchDir: string, logFile: string, logFileOnly: boolean) {
		// initialize
		this._correctRoutes = [];
		this.totalErrors = 0;
		this.totalWarnings = 0;
		this.result = [];
		this.logFileOnly = logFileOnly;
		this.searchDir = searchDir;
		// get the correct routes
		this.getRoutes(searchDir);
		// check all files
		this.checkFolder(searchDir);
		// show the results
		this.addToResult(`Total errors: ${this.totalErrors}, total warnings: ${this.totalWarnings}.`);
		fs.writeFileSync(logFile, this.result.map((line) => line).join('\n'));
	}

	get correctRoutes(): string[] {
		return this._correctRoutes;
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

	private checkFile(filepath: string) {
		const content: string = fs.readFileSync(filepath, 'utf8');
		const splitted: string[] = content.split('\n'); // will split every line break

		const errors: string[] = [];
		const warnings: string[] = [];
		for (let i = 0; i < splitted.length; i++) {
			let line = splitted[i].trim();
			// check the links
			if (line.includes('](')) {
				// remove the chars before the link
				line = line.replace(/[a-zA-Z0-9 .,*/:()-_'"`]*\[/, '[');
				// remove the chars behind the link until end of line
				// TODO the following line removes too much when round brackets are used within the angular brackets
				line = line.replace(/\)[a-zA-Z0-9 .,*/:()-_'"`]*$/, ')');
				// remember 'line' for the error message, thus use new variable from here on
				// remove the part between the angular brackets
				let link: string = line.replace(/\[[a-zA-Z0-9 .,*/:()-_'"`]*]/, '');
				// remove the surrounding round brackets
				link = link.replace(/\(/, '');
				link = link.replace(/\)/, '');
				// remove any reference to an anchor
				link = link.replace(/#[a-zA-Z0-9-_]*/, '');
				// now check the link against the available routes
				if (!this._correctRoutes.includes(link)) {
					errors.push(`${link}, on line ${i + 1}`);
				} else if (!link.startsWith('/')) {
					// always link relative to "/"
					warnings.push(`${line}, on line ${i + 1}`);
				}
			}
			// checks TODOs
			if (line.includes('TODO')) {
				warnings.push(`TODO remaining on line ${i + 1}`);
			}
		}
		if (errors.length > 0) {
			this.addToResult(`Found ${errors.length} incorrect link(s) in file ${path.relative(this.searchDir, filepath)}:`);
			for (let i = 0; i < errors.length; i++) {
				this.addToResult('\t' + errors[i]);
			}
			this.totalErrors += errors.length;
		}
		if (warnings.length > 0) {
			this.addToResult(`Found ${warnings.length} warnings in file ${path.relative(this.searchDir, filepath)}:`);
			for (let i = 0; i < warnings.length; i++) {
				this.addToResult('\t' + warnings[i]);
			}
			this.totalWarnings += warnings.length;
		}
	}

	private checkFolder(folder: string) {
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
					this.checkFile(filepath);
				}
			} else {
				// do all subFolders
				this.checkFolder(filepath);
			}
		}
	}

	private getRoutes(folder: string) {
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
				// if file is called index, ignore it, because the containing folder is already a correct route
				if (path.basename(filepath, '.md') !== 'index' && path.basename(filepath, '.svelte') !== 'index') {
					// if file does not have extension .md or .svelte, ignore it
					if (path.extname(filepath) === '.md' || path.extname(filepath) === '.svelte') {
						this.addRoute(filepath);
					}
				}
			} else {
				// do all subFolders
				this.addRoute(filepath);
				this.getRoutes(filepath);
			}
		}
	}

	private addRoute(filepath: string) {
		// remove the extensions
		let newFilepath: string;
		if (path.extname(filepath) === '.md') {
			newFilepath = path.join(path.dirname(filepath), path.basename(filepath, '.md'));
		} else if (path.extname(filepath) === '.svelte') {
			newFilepath = path.join(path.dirname(filepath), path.basename(filepath, '.svelte'));
		} else {
			newFilepath = filepath;
		}
		// add the "/" prefix, replace all "\" by "/" and add to the list of correct routes
		this._correctRoutes.push('/' + path.relative(this.searchDir, newFilepath).replace(/\\/g, '/'));
		// check whether the index number is present
		const unstripped = path.basename(filepath);
		if (!unstripped.startsWith('+')) {
			const stripped = unstripped.replace(/^[0-9][0-9][0-9]/, '');
			if (unstripped === stripped && !unstripped.startsWith('__')) {
				this.addToResult(`File or folder ${filepath} does not yet adhere to the number convention.`);
				this.totalWarnings += 1;
			}
		}
	}
}
