'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					}
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v });
		  }
		: function (o, v) {
				o['default'] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdocToMd = void 0;
const fs = __importStar(require('fs'));
const path = __importStar(require('path'));
const previousSiteFolder = './version-0.1.0/pages';
const nextSiteFolder = './version-0.2.0/pages';
class AdocToMd {
	constructor() {
		this.numberOfFiles = 0;
	}
	generateAll() {
		this.createDirIfNotExisting(nextSiteFolder);
		this.transformFolder(previousSiteFolder);
		console.log(`Transformed ${this.numberOfFiles} files.`);
	}
	transformFolder(folder) {
		if (!fs.existsSync(folder)) {
			console.error(this, "cannot find folder '" + folder + "'");
			return null;
		}
		if (!fs.lstatSync(folder).isDirectory()) {
			console.error(this, "'" + folder + "' is not a folder");
			return null;
		}
		let newFolder = path.relative(previousSiteFolder, folder);
		newFolder = path.join(nextSiteFolder, newFolder);
		this.createDirIfNotExisting(newFolder);
		const files = fs.readdirSync(folder);
		for (const file of files) {
			const filepath = path.join(folder, file);
			const stat = fs.lstatSync(filepath);
			if (!stat.isDirectory()) {
				if (path.extname(filepath) === '.adoc') {
					this.transformFile(path.relative(previousSiteFolder, filepath));
				}
			} else {
				this.transformFolder(filepath);
			}
		}
	}
	transformFile(filepath) {
		let oldContents = fs.readFileSync(path.join(previousSiteFolder, filepath), {
			encoding: 'utf8'
		});
		let contents = oldContents.replace(/:page-title: [_a-zA-Z0-9 -]*/g, '');
		contents = contents.replace(/:page-nav_order: [0-9]*/g, '');
		contents = contents.replace(/:page-parent: [_a-zA-Z0-9 -]*/g, '');
		contents = contents.replace(/:imagesdir: [_a-zA-Z0-9 -\.\/]*/g, '');
		contents = contents.replace(/:src-dir: [_a-zA-Z0-9 -\.\/]*/g, '');
		contents = contents.replace(/:projectitdir: [_a-zA-Z0-9 -\.\/]*/g, '');
		contents = contents.replace(/:source-language: [_a-zA-Z0-9 ]*/g, '');
		contents = contents.replace(/:listing-caption: [_a-zA-Z0-9 -]*/g, '');
		contents = contents.replace(/:icons: [_a-zA-Z0-9 -\.\/]*/g, '');
		contents = contents.replace(/:page-has\*children: [_a-zA-Z0-9 -\.\/]*/g, '');
		contents = contents.replace(/:page-has\*toc: [_a-zA-Z0-9 -\.\/]*/g, '');
		contents = contents.replace(/\[\[[_a-zA-Z0-9 -]*\]\]/g, '');
		contents = contents.replace(/==== /g, '#### ');
		contents = contents.replace(/=== /g, '### ');
		contents = contents.replace(/== /g, '## ');
		contents = contents.replace(/= /g, '# ');
		contents = contents.replace(/----/g, '```ts');
		contents = contents.replace(/\*/g, '**');
		contents = contents.replace(/\*\* /g, '* ');
		contents = contents.replace(/\*\*\*\* /g, '\t* ');
		contents = contents.replace(/_/g, '*');
		contents = contents.replace(/include::/g, '// ');
		contents = contents.replace(/{src-dir}\//g, '');
		contents = contents.replace(/\[source\]/g, '');
		contents = contents.replace(/xref:version-0.1.0\/pages\/intro/g, '(/010_Intro');
		contents = contents.replace(/xref:..\/intro/g, '(/010_Intro');
		contents = contents.replace(/xref:version-0.1.0\/pages\/starting/g, '(/020_Getting_Started');
		contents = contents.replace(/xref:..\/starting/g, '(/020_Getting_Started');
		contents = contents.replace(/xref:version-0.1.0\/pages\/second-level/g, '(/040_Second_level');
		contents = contents.replace(/xref:..\/second-level/g, '(/040_Second_level');
		contents = contents.replace(/xref:version-0.1.0\/pages\/third-level/g, '(/050_Third_level');
		contents = contents.replace(/xref:..\/third-level/g, '(/050_Third_level');
		contents = contents.replace(/xref:version-0.1.0\/pages\/meta-documentation/g, '(/060_Under_the_Hood');
		contents = contents.replace(/xref:..\/meta-documentation/g, '(/060_Under_the_Hood');
		contents = contents.replace(/\.adoc/g, '');
		contents = contents.replace(/\[\#/g, "<figcaption id='");
		contents = contents.replace(/image::/, '(/images/');
		contents = contents.replace(/xref:https:/g, '<a href="https:');
		contents = contents.replace(/link:http/g, '<a href="http');
		contents = contents.replace(/window=\*blank]/g, 'target="_blank">');
		contents = contents.replace(/\/three-levels/g, '/050_Three_Levels_of_Customization');
		contents = contents.replace(/\/expressions/g, '/010_Projectional_Editing#expressions');
		let newFilepath = path.join(path.dirname(filepath), path.basename(filepath, '.adoc').concat('.md'));
		let pathName = path.join(nextSiteFolder, newFilepath);
		fs.writeFileSync(pathName, contents);
		this.numberOfFiles++;
	}
	createDirIfNotExisting(dir) {
		const parts = dir.split('/');
		let current = '.';
		for (const part of parts) {
			current = current + '/' + part;
			if (!fs.existsSync(current)) {
				console.log('creating folder: [' + dir + ']');
				fs.mkdirSync(current);
			}
		}
	}
}
exports.AdocToMd = AdocToMd;
new AdocToMd().generateAll();
//# sourceMappingURL=AdocToMd.js.map
