import {
	EqualsExpression,
	GreaterThenExpression,
	LessThenExpression,
	ComparisonExpression,
	OrExpression,
	AndExpression,
	DivideExpression,
	PlusExpression,
	BooleanLiteralExpression,
	NumberLiteralExpression,
	StringLiteralExpression,
	MultiplyExpression,
	IfExpression,
	FunctionCallExpression,
	BinaryExpression,
	LiteralExpression,
	VariableRef,
	AttributeRef,
	AbsExpression,
	AppliedFeature,
	EntityExpression,
	Variable,
	AttributeWithEntityType,
	Text4,
	Text3,
	Text2,
	Text,
	AttributeWithLimitedType,
	EntityFunction,
	MockEnumeration,
	AttributeType,
	Entity,
	SomeOtherModelUnit,
	EntityModelUnit,
	EntityModel
} from '../../language/gen';
import { FreLogger } from '@freon4dsl/core';
const LOGGER = new FreLogger('EntityModelWalker');
export class EntityModelWalker {
	constructor() {
		this.myWorkers = [];
	}
	walk(modelelement, includeChildren) {
		if (this.myWorkers.length > 0) {
			if (modelelement instanceof EqualsExpression) {
				return this.walkEqualsExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof GreaterThenExpression) {
				return this.walkGreaterThenExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof LessThenExpression) {
				return this.walkLessThenExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof ComparisonExpression) {
				return this.walkComparisonExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof OrExpression) {
				return this.walkOrExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof AndExpression) {
				return this.walkAndExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof DivideExpression) {
				return this.walkDivideExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof PlusExpression) {
				return this.walkPlusExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof BooleanLiteralExpression) {
				return this.walkBooleanLiteralExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof NumberLiteralExpression) {
				return this.walkNumberLiteralExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof StringLiteralExpression) {
				return this.walkStringLiteralExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof MultiplyExpression) {
				return this.walkMultiplyExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof IfExpression) {
				return this.walkIfExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof FunctionCallExpression) {
				return this.walkFunctionCallExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof BinaryExpression) {
				return this.walkBinaryExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof LiteralExpression) {
				return this.walkLiteralExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof VariableRef) {
				return this.walkVariableRef(modelelement, includeChildren);
			}
			if (modelelement instanceof AttributeRef) {
				return this.walkAttributeRef(modelelement, includeChildren);
			}
			if (modelelement instanceof AbsExpression) {
				return this.walkAbsExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof AppliedFeature) {
				return this.walkAppliedFeature(modelelement, includeChildren);
			}
			if (modelelement instanceof EntityExpression) {
				return this.walkEntityExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof Variable) {
				return this.walkVariable(modelelement, includeChildren);
			}
			if (modelelement instanceof AttributeWithEntityType) {
				return this.walkAttributeWithEntityType(modelelement, includeChildren);
			}
			if (modelelement instanceof Text4) {
				return this.walkText4(modelelement, includeChildren);
			}
			if (modelelement instanceof Text3) {
				return this.walkText3(modelelement, includeChildren);
			}
			if (modelelement instanceof Text2) {
				return this.walkText2(modelelement, includeChildren);
			}
			if (modelelement instanceof Text) {
				return this.walkText(modelelement, includeChildren);
			}
			if (modelelement instanceof AttributeWithLimitedType) {
				return this.walkAttributeWithLimitedType(modelelement, includeChildren);
			}
			if (modelelement instanceof EntityFunction) {
				return this.walkEntityFunction(modelelement, includeChildren);
			}
			if (modelelement instanceof MockEnumeration) {
				return this.walkMockEnumeration(modelelement, includeChildren);
			}
			if (modelelement instanceof AttributeType) {
				return this.walkAttributeType(modelelement, includeChildren);
			}
			if (modelelement instanceof Entity) {
				return this.walkEntity(modelelement, includeChildren);
			}
			if (modelelement instanceof SomeOtherModelUnit) {
				return this.walkSomeOtherModelUnit(modelelement, includeChildren);
			}
			if (modelelement instanceof EntityModelUnit) {
				return this.walkEntityModelUnit(modelelement, includeChildren);
			}
			if (modelelement instanceof EntityModel) {
				return this.walkEntityModel(modelelement, includeChildren);
			}
		} else {
			LOGGER.error('No worker found.');
		}
	}
	walkEqualsExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEqualsExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEqualsExpression(modelelement);
			}
		}
	}
	walkGreaterThenExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeGreaterThenExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterGreaterThenExpression(modelelement);
			}
		}
	}
	walkLessThenExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeLessThenExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterLessThenExpression(modelelement);
			}
		}
	}
	walkComparisonExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeComparisonExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterComparisonExpression(modelelement);
			}
		}
	}
	walkOrExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeOrExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterOrExpression(modelelement);
			}
		}
	}
	walkAndExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAndExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAndExpression(modelelement);
			}
		}
	}
	walkDivideExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeDivideExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterDivideExpression(modelelement);
			}
		}
	}
	walkPlusExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePlusExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPlusExpression(modelelement);
			}
		}
	}
	walkBooleanLiteralExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeBooleanLiteralExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterBooleanLiteralExpression(modelelement);
			}
		}
	}
	walkNumberLiteralExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeNumberLiteralExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterNumberLiteralExpression(modelelement);
			}
		}
	}
	walkStringLiteralExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeStringLiteralExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterStringLiteralExpression(modelelement);
			}
		}
	}
	walkMultiplyExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeMultiplyExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterMultiplyExpression(modelelement);
			}
		}
	}
	walkIfExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeIfExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.condition)) {
			this.walk(modelelement.condition, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.whenTrue)) {
			this.walk(modelelement.whenTrue, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.whenFalse)) {
			this.walk(modelelement.whenFalse, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterIfExpression(modelelement);
			}
		}
	}
	walkFunctionCallExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeFunctionCallExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterFunctionCallExpression(modelelement);
			}
		}
	}
	walkBinaryExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeBinaryExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterBinaryExpression(modelelement);
			}
		}
	}
	walkLiteralExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeLiteralExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterLiteralExpression(modelelement);
			}
		}
	}
	walkVariableRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeVariableRef(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterVariableRef(modelelement);
			}
		}
	}
	walkAttributeRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAttributeRef(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAttributeRef(modelelement);
			}
		}
	}
	walkAbsExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAbsExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.expr)) {
			this.walk(modelelement.expr, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAbsExpression(modelelement);
			}
		}
	}
	walkAppliedFeature(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAppliedFeature(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAppliedFeature(modelelement);
			}
		}
	}
	walkEntityExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntityExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.appliedfeature)) {
			this.walk(modelelement.appliedfeature, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntityExpression(modelelement);
			}
		}
	}
	walkVariable(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeVariable(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterVariable(modelelement);
			}
		}
	}
	walkAttributeWithEntityType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAttributeWithEntityType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAttributeWithEntityType(modelelement);
			}
		}
	}
	walkText4(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText4(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText4(modelelement);
			}
		}
	}
	walkText3(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText3(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText3(modelelement);
			}
		}
	}
	walkText2(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText2(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText2(modelelement);
			}
		}
	}
	walkText(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText(modelelement);
			}
		}
	}
	walkAttributeWithLimitedType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAttributeWithLimitedType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAttributeWithLimitedType(modelelement);
			}
		}
	}
	walkEntityFunction(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntityFunction(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.expression)) {
			this.walk(modelelement.expression, includeChildren);
		}
		modelelement.parameters.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntityFunction(modelelement);
			}
		}
	}
	walkMockEnumeration(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeMockEnumeration(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterMockEnumeration(modelelement);
			}
		}
	}
	walkAttributeType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAttributeType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAttributeType(modelelement);
			}
		}
	}
	walkEntity(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntity(modelelement);
			}
		}
		modelelement.attributes.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		modelelement.entAttributes.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		modelelement.functions.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		modelelement.int_attrs.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		modelelement.int_functions.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntity(modelelement);
			}
		}
	}
	walkSomeOtherModelUnit(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeSomeOtherModelUnit(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.somePart)) {
			this.walk(modelelement.somePart, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterSomeOtherModelUnit(modelelement);
			}
		}
	}
	walkEntityModelUnit(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntityModelUnit(modelelement);
			}
		}
		modelelement.functions.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		modelelement.entities.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntityModelUnit(modelelement);
			}
		}
	}
	walkEntityModel(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntityModel(modelelement);
			}
		}
		modelelement.units.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		if (!(includeChildren === undefined) && includeChildren(modelelement.extraUnit)) {
			this.walk(modelelement.extraUnit, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntityModel(modelelement);
			}
		}
	}
}
//# sourceMappingURL=EntityModelWalker.js.map
