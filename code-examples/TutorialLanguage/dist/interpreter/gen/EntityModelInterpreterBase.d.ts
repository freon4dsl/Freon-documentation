import { InterpreterContext, RtObject } from '@freon4dsl/core';
import {
	Entity,
	AttributeType,
	MockEnumeration,
	AbsExpression,
	MultiplyExpression,
	EntityFunction,
	AttributeWithLimitedType,
	Text,
	Text2,
	Text3,
	Text4,
	AttributeWithEntityType,
	Variable,
	EntityExpression,
	AppliedFeature,
	AttributeRef,
	VariableRef,
	LiteralExpression,
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
	IfExpression,
	SomeOtherModelUnit,
	EntityModelUnit
} from '../../language/gen';
export declare class EntityModelInterpreterBase {
	constructor();
	evalEntity(node: Entity, ctx: InterpreterContext): RtObject;
	evalAttributeType(node: AttributeType, ctx: InterpreterContext): RtObject;
	evalMockEnumeration(node: MockEnumeration, ctx: InterpreterContext): RtObject;
	evalAbsExpression(node: AbsExpression, ctx: InterpreterContext): RtObject;
	evalMultiplyExpression(node: MultiplyExpression, ctx: InterpreterContext): RtObject;
	evalEntityFunction(node: EntityFunction, ctx: InterpreterContext): RtObject;
	evalAttributeWithLimitedType(node: AttributeWithLimitedType, ctx: InterpreterContext): RtObject;
	evalText(node: Text, ctx: InterpreterContext): RtObject;
	evalText2(node: Text2, ctx: InterpreterContext): RtObject;
	evalText3(node: Text3, ctx: InterpreterContext): RtObject;
	evalText4(node: Text4, ctx: InterpreterContext): RtObject;
	evalAttributeWithEntityType(node: AttributeWithEntityType, ctx: InterpreterContext): RtObject;
	evalVariable(node: Variable, ctx: InterpreterContext): RtObject;
	evalEntityExpression(node: EntityExpression, ctx: InterpreterContext): RtObject;
	evalAppliedFeature(node: AppliedFeature, ctx: InterpreterContext): RtObject;
	evalAttributeRef(node: AttributeRef, ctx: InterpreterContext): RtObject;
	evalVariableRef(node: VariableRef, ctx: InterpreterContext): RtObject;
	evalLiteralExpression(node: LiteralExpression, ctx: InterpreterContext): RtObject;
	evalStringLiteralExpression(node: StringLiteralExpression, ctx: InterpreterContext): RtObject;
	evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject;
	evalBooleanLiteralExpression(node: BooleanLiteralExpression, ctx: InterpreterContext): RtObject;
	evalBinaryExpression(node: BinaryExpression, ctx: InterpreterContext): RtObject;
	evalPlusExpression(node: PlusExpression, ctx: InterpreterContext): RtObject;
	evalDivideExpression(node: DivideExpression, ctx: InterpreterContext): RtObject;
	evalAndExpression(node: AndExpression, ctx: InterpreterContext): RtObject;
	evalOrExpression(node: OrExpression, ctx: InterpreterContext): RtObject;
	evalComparisonExpression(node: ComparisonExpression, ctx: InterpreterContext): RtObject;
	evalLessThenExpression(node: LessThenExpression, ctx: InterpreterContext): RtObject;
	evalGreaterThenExpression(node: GreaterThenExpression, ctx: InterpreterContext): RtObject;
	evalEqualsExpression(node: EqualsExpression, ctx: InterpreterContext): RtObject;
	evalFunctionCallExpression(node: FunctionCallExpression, ctx: InterpreterContext): RtObject;
	evalIfExpression(node: IfExpression, ctx: InterpreterContext): RtObject;
	evalSomeOtherModelUnit(node: SomeOtherModelUnit, ctx: InterpreterContext): RtObject;
	evalEntityModelUnit(node: EntityModelUnit, ctx: InterpreterContext): RtObject;
}
//# sourceMappingURL=EntityModelInterpreterBase.d.ts.map
