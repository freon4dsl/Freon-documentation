import { FreError, FreWriter } from '@freon4dsl/core';
import {
	Entity,
	EntityFunction,
	AttributeWithLimitedType,
	AttributeWithEntityType,
	Variable,
	AttributeRef,
	VariableRef,
	FunctionCallExpression
} from '../../language/gen';
import { EntityModelDefaultWorker } from '../../utils/gen';
import { EntityModelCheckerInterface } from './EntityModelValidator';
export declare class EntityModelReferenceChecker extends EntityModelDefaultWorker implements EntityModelCheckerInterface {
	myWriter: FreWriter;
	errorList: FreError[];
	private refSeparator;
	execBeforeEntity(modelelement: Entity): boolean;
	execBeforeEntityFunction(modelelement: EntityFunction): boolean;
	execBeforeAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean;
	execBeforeAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean;
	execBeforeVariable(modelelement: Variable): boolean;
	execBeforeAttributeRef(modelelement: AttributeRef): boolean;
	execBeforeVariableRef(modelelement: VariableRef): boolean;
	execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean;
	private makeErrorMessage;
}
//# sourceMappingURL=EntityModelReferenceChecker.d.ts.map
