import { FreNamedNode, FreStdlib } from '@freon4dsl/core';
export declare class EntityModelStdlib implements FreStdlib {
	private static stdlib;
	static getInstance(): FreStdlib;
	elements: FreNamedNode[];
	private constructor();
	find(name: string, metatype?: string): FreNamedNode;
}
//# sourceMappingURL=EntityModelStdlib.d.ts.map
