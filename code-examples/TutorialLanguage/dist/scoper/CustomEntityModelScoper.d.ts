import { FreNode, FreNamedNode, FreScoper, FreScoperComposite } from '@freon4dsl/core';
export declare class CustomEntityModelScoper implements FreScoper {
	mainScoper: FreScoperComposite;
	resolvePathName(modelelement: FreNode, doNotSearch: string, pathname: string[], metatype?: string): FreNamedNode;
	isInScope(modelElement: FreNode, name: string, metatype?: string, excludeSurrounding?: boolean): boolean;
	getVisibleElements(modelelement: FreNode, metatype?: string, excludeSurrounding?: boolean): FreNamedNode[];
	getFromVisibleElements(modelelement: FreNode, name: string, metatype?: string, excludeSurrounding?: boolean): FreNamedNode;
	getVisibleNames(modelelement: FreNode, metatype?: string, excludeSurrounding?: boolean): string[];
	additionalNamespaces(element: FreNode): FreNode[];
}
//# sourceMappingURL=CustomEntityModelScoper.d.ts.map
