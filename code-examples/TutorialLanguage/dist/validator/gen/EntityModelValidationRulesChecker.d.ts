import { FreError, FreCompositeTyper, FreWriter } from '@freon4dsl/core';
import {
	Entity,
	AttributeType,
	AbsExpression,
	MultiplyExpression,
	EntityFunction,
	AttributeWithLimitedType,
	Variable,
	PlusExpression,
	DivideExpression,
	AndExpression,
	OrExpression,
	ComparisonExpression,
	IfExpression,
	EntityModelUnit
} from '../../language/gen';
import { EntityModelDefaultWorker } from '../../utils/gen';
import { EntityModelCheckerInterface } from './EntityModelValidator';
export declare class EntityModelValidationRulesChecker extends EntityModelDefaultWorker implements EntityModelCheckerInterface {
	myWriter: FreWriter;
	typer: FreCompositeTyper;
	errorList: FreError[];
	execBeforeAttributeType(modelelement: AttributeType): boolean;
	execBeforeEntityModelUnit(modelelement: EntityModelUnit): boolean;
	execBeforeEntity(modelelement: Entity): boolean;
	execBeforeAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean;
	execBeforeVariable(modelelement: Variable): boolean;
	execBeforeEntityFunction(modelelement: EntityFunction): boolean;
	execBeforeAbsExpression(modelelement: AbsExpression): boolean;
	execBeforeMultiplyExpression(modelelement: MultiplyExpression): boolean;
	execBeforePlusExpression(modelelement: PlusExpression): boolean;
	execBeforeDivideExpression(modelelement: DivideExpression): boolean;
	execBeforeAndExpression(modelelement: AndExpression): boolean;
	execBeforeOrExpression(modelelement: OrExpression): boolean;
	execBeforeComparisonExpression(modelelement: ComparisonExpression): boolean;
	execBeforeIfExpression(modelelement: IfExpression): boolean;
	private isValidName;
}
//# sourceMappingURL=EntityModelValidationRulesChecker.d.ts.map
