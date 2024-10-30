export declare class LinkChecker {
    private _correctRoutes;
    private totalErrors;
    private totalWarnings;
    private result;
    private logFileOnly;
    private searchDir;
    check(searchDir: string, logFile: string, logFileOnly: boolean): void;
    get correctRoutes(): string[];
    get hasErrors(): boolean;
    private addToResult;
    private checkFile;
    private checkFolder;
    private getRoutes;
    private addRoute;
}
//# sourceMappingURL=LinkChecker.d.ts.map