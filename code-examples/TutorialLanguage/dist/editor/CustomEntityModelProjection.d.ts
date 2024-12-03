import { FreNode, Box, FreProjection, FreTableDefinition } from '@freon4dsl/core';
export declare class CustomEntityModelProjection implements FreProjection {
	name: string;
	nodeTypeToBoxMethod: Map<string, (node: FreNode) => Box>;
	nodeTypeToTableDefinition: Map<string, () => FreTableDefinition>;
}
//# sourceMappingURL=CustomEntityModelProjection.d.ts.map
