import * as fs from 'fs';
import * as path from 'path';
import { PathCreator } from './PathCreator.js';
export class LinkChecker {
    constructor() {
        this._correctRoutes = [];
        this.totalErrors = 0;
        this.totalWarnings = 0;
        this.result = [];
        this.logFileOnly = false;
        this.searchDir = '.';
    }
    check(searchDir, logFile, logFileOnly) {
        this._correctRoutes = [];
        this.totalErrors = 0;
        this.totalWarnings = 0;
        this.result = [];
        this.logFileOnly = logFileOnly;
        this.searchDir = searchDir;
        this.getRoutes(searchDir, searchDir);
        this.checkFolder(searchDir);
        this.addToResult(`Total errors: ${this.totalErrors}, total warnings: ${this.totalWarnings}.`);
        fs.writeFileSync(logFile, this.result.map((line) => line).join('\n'));
    }
    get correctRoutes() {
        return this._correctRoutes;
    }
    get hasErrors() {
        return this.totalErrors !== 0;
    }
    addToResult(line) {
        this.result.push(line);
        if (!this.logFileOnly) {
            console.log(line);
        }
    }
    checkFile(filepath) {
        const content = fs.readFileSync(filepath, 'utf8');
        const splitted = content.split('\n');
        const errors = [];
        const warnings = [];
        for (let i = 0; i < splitted.length; i++) {
            let line = splitted[i].trim();
            if (line.includes('](')) {
                line = line.replace(/[a-zA-Z0-9 .,*/:()-_'"`]*\[/, '[');
                line = line.replace(/\)[a-zA-Z0-9 .,*/:()-_'"`]*$/, ')');
                let link = line.replace(/\[[a-zA-Z0-9 .,*/:()-_'"`]*]/, '');
                link = link.replace(/\(/, '');
                link = link.replace(/\)/, '');
                link = link.replace(/#[a-zA-Z0-9-_]*/, '');
                if (!this._correctRoutes.includes(link)) {
                    errors.push(`${link}, on line ${i + 1}`);
                }
                else if (!link.startsWith('/')) {
                    warnings.push(`${line}, on line ${i + 1}`);
                }
            }
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
    checkFolder(folder) {
        if (!fs.existsSync(folder)) {
            console.error(this, "cannot find folder '" + folder + "'");
            return null;
        }
        if (!fs.lstatSync(folder).isDirectory()) {
            console.error(this, "'" + folder + "' is not a folder");
            return null;
        }
        const files = fs.readdirSync(folder);
        for (const file of files) {
            const filepath = path.join(folder, file);
            const stat = fs.lstatSync(filepath);
            if (!stat.isDirectory()) {
                if (path.extname(filepath) === '.md' || path.extname(filepath) === '.svelte') {
                    this.checkFile(filepath);
                }
            }
            else {
                this.checkFolder(filepath);
            }
        }
    }
    getRoutes(folder, ignore) {
        if (!fs.existsSync(folder)) {
            console.error(this, "cannot find folder '" + folder + "'");
            return null;
        }
        if (!fs.lstatSync(folder).isDirectory()) {
            console.error(this, "'" + folder + "' is not a folder");
            return null;
        }
        const files = fs.readdirSync(folder);
        for (const file of files) {
            const filepath = path.join(folder, file);
            const stat = fs.lstatSync(filepath);
            if (stat.isDirectory()) {
                this._correctRoutes.push('/' + PathCreator.createFilePath(ignore, filepath));
                this.getRoutes(filepath, ignore);
            }
        }
    }
}
//# sourceMappingURL=LinkChecker.js.map