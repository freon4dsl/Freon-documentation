import {
	AbsExpression,
	AndExpression,
	AppliedFeature,
	AttributeRef,
	AttributeType,
	AttributeWithEntityType,
	AttributeWithLimitedType,
	BinaryExpression,
	BooleanLiteralExpression,
	ComparisonExpression,
	DivideExpression,
	Entity,
	EntityExpression,
	EntityFunction,
	EntityModel,
	EntityModelUnit,
	EqualsExpression,
	FunctionCallExpression,
	GreaterThenExpression,
	IfExpression,
	LessThenExpression,
	LiteralExpression,
	MockEnumeration,
	MultiplyExpression,
	NumberLiteralExpression,
	OrExpression,
	PlusExpression,
	SomeOtherModelUnit,
	StringLiteralExpression,
	Text,
	Text2,
	Text3,
	Text4,
	Variable,
	VariableRef
} from '../../language/gen';
import { EntityModelWorker } from './EntityModelWorker';
export declare class EntityModelDefaultWorker implements EntityModelWorker {
	execBeforeEntityModel(modelelement: EntityModel): boolean;
	execAfterEntityModel(modelelement: EntityModel): boolean;
	execBeforeSomeOtherModelUnit(modelelement: SomeOtherModelUnit): boolean;
	execAfterSomeOtherModelUnit(modelelement: SomeOtherModelUnit): boolean;
	execBeforeEntityModelUnit(modelelement: EntityModelUnit): boolean;
	execAfterEntityModelUnit(modelelement: EntityModelUnit): boolean;
	execBeforeEntity(modelelement: Entity): boolean;
	execAfterEntity(modelelement: Entity): boolean;
	execBeforeAttributeType(modelelement: AttributeType): boolean;
	execAfterAttributeType(modelelement: AttributeType): boolean;
	execBeforeMockEnumeration(modelelement: MockEnumeration): boolean;
	execAfterMockEnumeration(modelelement: MockEnumeration): boolean;
	execBeforeAbsExpression(modelelement: AbsExpression): boolean;
	execAfterAbsExpression(modelelement: AbsExpression): boolean;
	execBeforeMultiplyExpression(modelelement: MultiplyExpression): boolean;
	execAfterMultiplyExpression(modelelement: MultiplyExpression): boolean;
	execBeforeEntityFunction(modelelement: EntityFunction): boolean;
	execAfterEntityFunction(modelelement: EntityFunction): boolean;
	execBeforeAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean;
	execAfterAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean;
	execBeforeText(modelelement: Text): boolean;
	execAfterText(modelelement: Text): boolean;
	execBeforeText2(modelelement: Text2): boolean;
	execAfterText2(modelelement: Text2): boolean;
	execBeforeText3(modelelement: Text3): boolean;
	execAfterText3(modelelement: Text3): boolean;
	execBeforeText4(modelelement: Text4): boolean;
	execAfterText4(modelelement: Text4): boolean;
	execBeforeAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean;
	execAfterAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean;
	execBeforeVariable(modelelement: Variable): boolean;
	execAfterVariable(modelelement: Variable): boolean;
	execBeforeEntityExpression(modelelement: EntityExpression): boolean;
	execAfterEntityExpression(modelelement: EntityExpression): boolean;
	execBeforeAppliedFeature(modelelement: AppliedFeature): boolean;
	execAfterAppliedFeature(modelelement: AppliedFeature): boolean;
	execBeforeAttributeRef(modelelement: AttributeRef): boolean;
	execAfterAttributeRef(modelelement: AttributeRef): boolean;
	execBeforeVariableRef(modelelement: VariableRef): boolean;
	execAfterVariableRef(modelelement: VariableRef): boolean;
	execBeforeLiteralExpression(modelelement: LiteralExpression): boolean;
	execAfterLiteralExpression(modelelement: LiteralExpression): boolean;
	execBeforeStringLiteralExpression(modelelement: StringLiteralExpression): boolean;
	execAfterStringLiteralExpression(modelelement: StringLiteralExpression): boolean;
	execBeforeNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean;
	execAfterNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean;
	execBeforeBooleanLiteralExpression(modelelement: BooleanLiteralExpression): boolean;
	execAfterBooleanLiteralExpression(modelelement: BooleanLiteralExpression): boolean;
	execBeforeBinaryExpression(modelelement: BinaryExpression): boolean;
	execAfterBinaryExpression(modelelement: BinaryExpression): boolean;
	execBeforePlusExpression(modelelement: PlusExpression): boolean;
	execAfterPlusExpression(modelelement: PlusExpression): boolean;
	execBeforeDivideExpression(modelelement: DivideExpression): boolean;
	execAfterDivideExpression(modelelement: DivideExpression): boolean;
	execBeforeAndExpression(modelelement: AndExpression): boolean;
	execAfterAndExpression(modelelement: AndExpression): boolean;
	execBeforeOrExpression(modelelement: OrExpression): boolean;
	execAfterOrExpression(modelelement: OrExpression): boolean;
	execBeforeComparisonExpression(modelelement: ComparisonExpression): boolean;
	execAfterComparisonExpression(modelelement: ComparisonExpression): boolean;
	execBeforeLessThenExpression(modelelement: LessThenExpression): boolean;
	execAfterLessThenExpression(modelelement: LessThenExpression): boolean;
	execBeforeGreaterThenExpression(modelelement: GreaterThenExpression): boolean;
	execAfterGreaterThenExpression(modelelement: GreaterThenExpression): boolean;
	execBeforeEqualsExpression(modelelement: EqualsExpression): boolean;
	execAfterEqualsExpression(modelelement: EqualsExpression): boolean;
	execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean;
	execAfterFunctionCallExpression(modelelement: FunctionCallExpression): boolean;
	execBeforeIfExpression(modelelement: IfExpression): boolean;
	execAfterIfExpression(modelelement: IfExpression): boolean;
}
//# sourceMappingURL=EntityModelDefaultWorker.d.ts.map
