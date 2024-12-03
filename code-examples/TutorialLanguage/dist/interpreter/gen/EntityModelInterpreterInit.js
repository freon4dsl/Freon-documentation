import { EntityModelInterpreter } from '../EntityModelInterpreter';
export function EntityModelInterpreterInit(main) {
	const interpreter = new EntityModelInterpreter(main);
	main.registerFunction('Entity', interpreter.evalEntity);
	main.registerFunction('AttributeType', interpreter.evalAttributeType);
	main.registerFunction('MockEnumeration', interpreter.evalMockEnumeration);
	main.registerFunction('AbsExpression', interpreter.evalAbsExpression);
	main.registerFunction('MultiplyExpression', interpreter.evalMultiplyExpression);
	main.registerFunction('EntityFunction', interpreter.evalEntityFunction);
	main.registerFunction('AttributeWithLimitedType', interpreter.evalAttributeWithLimitedType);
	main.registerFunction('Text', interpreter.evalText);
	main.registerFunction('Text2', interpreter.evalText2);
	main.registerFunction('Text3', interpreter.evalText3);
	main.registerFunction('Text4', interpreter.evalText4);
	main.registerFunction('AttributeWithEntityType', interpreter.evalAttributeWithEntityType);
	main.registerFunction('Variable', interpreter.evalVariable);
	main.registerFunction('EntityExpression', interpreter.evalEntityExpression);
	main.registerFunction('AppliedFeature', interpreter.evalAppliedFeature);
	main.registerFunction('AttributeRef', interpreter.evalAttributeRef);
	main.registerFunction('VariableRef', interpreter.evalVariableRef);
	main.registerFunction('LiteralExpression', interpreter.evalLiteralExpression);
	main.registerFunction('StringLiteralExpression', interpreter.evalStringLiteralExpression);
	main.registerFunction('NumberLiteralExpression', interpreter.evalNumberLiteralExpression);
	main.registerFunction('BooleanLiteralExpression', interpreter.evalBooleanLiteralExpression);
	main.registerFunction('BinaryExpression', interpreter.evalBinaryExpression);
	main.registerFunction('PlusExpression', interpreter.evalPlusExpression);
	main.registerFunction('DivideExpression', interpreter.evalDivideExpression);
	main.registerFunction('AndExpression', interpreter.evalAndExpression);
	main.registerFunction('OrExpression', interpreter.evalOrExpression);
	main.registerFunction('ComparisonExpression', interpreter.evalComparisonExpression);
	main.registerFunction('LessThenExpression', interpreter.evalLessThenExpression);
	main.registerFunction('GreaterThenExpression', interpreter.evalGreaterThenExpression);
	main.registerFunction('EqualsExpression', interpreter.evalEqualsExpression);
	main.registerFunction('FunctionCallExpression', interpreter.evalFunctionCallExpression);
	main.registerFunction('IfExpression', interpreter.evalIfExpression);
	main.registerFunction('SomeOtherModelUnit', interpreter.evalSomeOtherModelUnit);
	main.registerFunction('EntityModelUnit', interpreter.evalEntityModelUnit);
}
//# sourceMappingURL=EntityModelInterpreterInit.js.map
