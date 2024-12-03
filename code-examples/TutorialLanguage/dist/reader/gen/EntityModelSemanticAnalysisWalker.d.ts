import { VariableRef, FunctionCallExpression, AttributeRef } from '../../language/gen';
import { EntityModelWorker, EntityModelDefaultWorker } from '../../utils/gen';
import { FreNode } from '@freon4dsl/core';
export declare class EntityModelSemanticAnalysisWalker extends EntityModelDefaultWorker implements EntityModelWorker {
	changesToBeMade: Map<FreNode, FreNode>;
	constructor(changesToBeMade: Map<FreNode, FreNode>);
	execBeforeVariableRef(modelelement: VariableRef): boolean;
	execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean;
	execBeforeAttributeRef(modelelement: AttributeRef): boolean;
	private findReplacement;
}
//# sourceMappingURL=EntityModelSemanticAnalysisWalker.d.ts.map
