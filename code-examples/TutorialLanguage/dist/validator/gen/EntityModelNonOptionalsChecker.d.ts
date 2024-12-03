import { FreError, FreWriter } from '@freon4dsl/core';
import {
	EntityModel,
	SomeOtherModelUnit,
	EntityModelUnit,
	Entity,
	AttributeType,
	MockEnumeration,
	AbsExpression,
	MultiplyExpression,
	EntityFunction,
	AttributeWithLimitedType,
	AttributeWithEntityType,
	Variable,
	AttributeRef,
	VariableRef,
	StringLiteralExpression,
	NumberLiteralExpression,
	BooleanLiteralExpression,
	BinaryExpression,
	PlusExpression,
	DivideExpression,
	AndExpression,
	OrExpression,
	ComparisonExpression,
	LessThenExpression,
	GreaterThenExpression,
	EqualsExpression,
	FunctionCallExpression,
	IfExpression
} from '../../language/gen';
import { EntityModelDefaultWorker } from '../../utils/gen';
import { EntityModelCheckerInterface } from './EntityModelValidator';
export declare class EntityModelNonOptionalsChecker extends EntityModelDefaultWorker implements EntityModelCheckerInterface {
	myWriter: FreWriter;
	errorList: FreError[];
	execBeforeEntityModel(modelelement: EntityModel): boolean;
	execBeforeSomeOtherModelUnit(modelelement: SomeOtherModelUnit): boolean;
	execBeforeEntityModelUnit(modelelement: EntityModelUnit): boolean;
	execBeforeEntity(modelelement: Entity): boolean;
	execBeforeAttributeType(modelelement: AttributeType): boolean;
	execBeforeMockEnumeration(modelelement: MockEnumeration): boolean;
	execBeforeAbsExpression(modelelement: AbsExpression): boolean;
	execBeforeMultiplyExpression(modelelement: MultiplyExpression): boolean;
	execBeforeEntityFunction(modelelement: EntityFunction): boolean;
	execBeforeAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean;
	execBeforeAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean;
	execBeforeVariable(modelelement: Variable): boolean;
	execBeforeAttributeRef(modelelement: AttributeRef): boolean;
	execBeforeVariableRef(modelelement: VariableRef): boolean;
	execBeforeStringLiteralExpression(modelelement: StringLiteralExpression): boolean;
	execBeforeNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean;
	execBeforeBooleanLiteralExpression(modelelement: BooleanLiteralExpression): boolean;
	execBeforeBinaryExpression(modelelement: BinaryExpression): boolean;
	execBeforePlusExpression(modelelement: PlusExpression): boolean;
	execBeforeDivideExpression(modelelement: DivideExpression): boolean;
	execBeforeAndExpression(modelelement: AndExpression): boolean;
	execBeforeOrExpression(modelelement: OrExpression): boolean;
	execBeforeComparisonExpression(modelelement: ComparisonExpression): boolean;
	execBeforeLessThenExpression(modelelement: LessThenExpression): boolean;
	execBeforeGreaterThenExpression(modelelement: GreaterThenExpression): boolean;
	execBeforeEqualsExpression(modelelement: EqualsExpression): boolean;
	execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean;
	execBeforeIfExpression(modelelement: IfExpression): boolean;
}
//# sourceMappingURL=EntityModelNonOptionalsChecker.d.ts.map
