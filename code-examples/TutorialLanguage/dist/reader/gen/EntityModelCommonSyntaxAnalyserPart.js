import {
	Entity,
	AttributeWithLimitedType,
	AttributeWithEntityType,
	EntityFunction,
	AbsExpression,
	AttributeRef,
	VariableRef,
	StringLiteralExpression,
	NumberLiteralExpression,
	BooleanLiteralExpression,
	FunctionCallExpression,
	IfExpression,
	Variable,
	AttributeType,
	MultiplyExpression,
	PlusExpression,
	DivideExpression,
	AndExpression,
	OrExpression,
	LessThenExpression,
	GreaterThenExpression,
	EqualsExpression
} from '../../language/gen';
export class EntityModelCommonSyntaxAnalyserPart {
	constructor(mainAnalyser) {
		this.mainAnalyser = mainAnalyser;
	}
	transformEntity(branch) {
		let __name;
		let __isCompany;
		let __baseInterface_attr;
		let __simpleprop;
		let __attributes;
		let __entAttributes;
		let __functions;
		let __int_attrs;
		let __int_functions;
		let __baseEntity;
		let __baseInterface;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__isCompany = this.mainAnalyser.transformSharedPackedParseTreeNode(children[4]);
		__baseInterface_attr = this.mainAnalyser.transformSharedPackedParseTreeNode(children[6]);
		__simpleprop = this.mainAnalyser.transformSharedPackedParseTreeNode(children[8]);
		if (children[10].name !== 'AttributeWithLimitedType') {
			__attributes = this.mainAnalyser.transformSharedPackedParseTreeList(children[10]);
		} else {
			__attributes = [];
			for (const child of children) {
				__attributes.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		if (children[12].name !== 'AttributeWithEntityType') {
			__entAttributes = this.mainAnalyser.transformSharedPackedParseTreeList(children[12]);
		} else {
			__entAttributes = [];
			for (const child of children) {
				__entAttributes.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		if (children[14].name !== 'EntityFunction') {
			__functions = this.mainAnalyser.transformSharedPackedParseTreeList(children[14]);
		} else {
			__functions = [];
			for (const child of children) {
				__functions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		if (children[16].name !== 'AttributeWithLimitedType') {
			__int_attrs = this.mainAnalyser.transformSharedPackedParseTreeList(children[16]);
		} else {
			__int_attrs = [];
			for (const child of children) {
				__int_attrs.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		if (children[18].name !== 'EntityFunction') {
			__int_functions = this.mainAnalyser.transformSharedPackedParseTreeList(children[18]);
		} else {
			__int_functions = [];
			for (const child of children) {
				__int_functions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		if (!children[19].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[19]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__baseEntity = this.mainAnalyser.freNodeRef(_propItem[1], 'Entity');
		}
		__baseInterface = this.mainAnalyser.freNodeRef(children[21], 'Entity');
		return Entity.create({
			name: __name,
			isCompany: __isCompany,
			baseInterface_attr: __baseInterface_attr,
			simpleprop: __simpleprop,
			attributes: __attributes,
			entAttributes: __entAttributes,
			functions: __functions,
			int_attrs: __int_attrs,
			int_functions: __int_functions,
			baseEntity: __baseEntity,
			baseInterface: __baseInterface,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformAttributeWithLimitedType(branch) {
		let __name;
		let __declaredType;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__declaredType = this.mainAnalyser.freNodeRef(children[4], 'AttributeType');
		return AttributeWithLimitedType.create({
			name: __name,
			declaredType: __declaredType,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformAttributeWithEntityType(branch) {
		let __name;
		let __declaredType;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__declaredType = this.mainAnalyser.freNodeRef(children[4], 'Entity');
		return AttributeWithEntityType.create({
			name: __name,
			declaredType: __declaredType,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformEntityFunction(branch) {
		let __name;
		let __aliases;
		let __expression;
		let __parameters;
		let __declaredType;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__aliases = this.mainAnalyser.transformSharedPackedParseTreeList(children[4]);
		__expression = this.mainAnalyser.transformSharedPackedParseTreeNode(children[6]);
		if (children[8].name !== 'Variable') {
			__parameters = this.mainAnalyser.transformSharedPackedParseTreeList(children[8]);
		} else {
			__parameters = [];
			for (const child of children) {
				__parameters.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		__declaredType = this.mainAnalyser.freNodeRef(children[10], 'Type');
		return EntityFunction.create({
			name: __name,
			aliases: __aliases,
			expression: __expression,
			parameters: __parameters,
			declaredType: __declaredType,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformAbsExpression(branch) {
		let __expr;
		let __appliedfeature;
		const children = this.mainAnalyser.getChildren(branch);
		__expr = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]);
		if (!children[4].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[4]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		return AbsExpression.create({
			expr: __expr,
			appliedfeature: __appliedfeature,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformAttributeRef(branch) {
		let __appliedfeature;
		let __attribute;
		const children = this.mainAnalyser.getChildren(branch);
		if (!children[2].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[2]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		__attribute = this.mainAnalyser.freNodeRef(children[4], 'AttributeWithEntityType');
		return AttributeRef.create({
			appliedfeature: __appliedfeature,
			attribute: __attribute,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformVariableRef(branch) {
		let __appliedfeature;
		let __variable;
		const children = this.mainAnalyser.getChildren(branch);
		if (!children[2].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[2]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		__variable = this.mainAnalyser.freNodeRef(children[4], 'Variable');
		return VariableRef.create({
			appliedfeature: __appliedfeature,
			variable: __variable,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformStringLiteralExpression(branch) {
		let __value;
		let __appliedfeature;
		const children = this.mainAnalyser.getChildren(branch);
		__value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]);
		if (!children[4].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[4]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		return StringLiteralExpression.create({
			value: __value,
			appliedfeature: __appliedfeature,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformNumberLiteralExpression(branch) {
		let __value;
		let __appliedfeature;
		const children = this.mainAnalyser.getChildren(branch);
		__value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]);
		if (!children[4].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[4]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		return NumberLiteralExpression.create({
			value: __value,
			appliedfeature: __appliedfeature,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformBooleanLiteralExpression(branch) {
		let __value;
		let __appliedfeature;
		const children = this.mainAnalyser.getChildren(branch);
		__value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]);
		if (!children[4].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[4]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		return BooleanLiteralExpression.create({
			value: __value,
			appliedfeature: __appliedfeature,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformFunctionCallExpression(branch) {
		let __appliedfeature;
		let __functionDefinition;
		const children = this.mainAnalyser.getChildren(branch);
		if (!children[2].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[2]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		__functionDefinition = this.mainAnalyser.freNodeRef(children[4], 'EntityFunction');
		return FunctionCallExpression.create({
			appliedfeature: __appliedfeature,
			functionDefinition: __functionDefinition,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformIfExpression(branch) {
		let __condition;
		let __whenTrue;
		let __whenFalse;
		let __appliedfeature;
		const children = this.mainAnalyser.getChildren(branch);
		__condition = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]);
		__whenTrue = this.mainAnalyser.transformSharedPackedParseTreeNode(children[5]);
		__whenFalse = this.mainAnalyser.transformSharedPackedParseTreeNode(children[7]);
		if (!children[8].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[8]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__appliedfeature = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		return IfExpression.create({
			condition: __condition,
			whenTrue: __whenTrue,
			whenFalse: __whenFalse,
			appliedfeature: __appliedfeature,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformVariable(branch) {
		let __name;
		let __declaredType;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__declaredType = this.mainAnalyser.freNodeRef(children[4], 'Entity');
		return Variable.create({
			name: __name,
			declaredType: __declaredType,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformEntityExpression(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transformAppliedFeature(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transformLiteralExpression(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transform__fre_binary_EntityExpression(branch) {
		const children = branch.nonSkipChildren.toArray();
		let index = 0;
		let first = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
		while (index < children.length) {
			let operator = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
			let second = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
			let combined = null;
			switch (operator) {
				case '*': {
					combined = MultiplyExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case '+': {
					combined = PlusExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case '/': {
					combined = DivideExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case 'AndExpression': {
					combined = AndExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case 'or': {
					combined = OrExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case '<': {
					combined = LessThenExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case 'GreaterThenExpression': {
					combined = GreaterThenExpression.create({
						left: first,
						right: second,
						parseLocation: this.mainAnalyser.location(branch)
					});
					break;
				}
				case 'EqualsExpression': {
					combined = EqualsExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				default: {
					combined = null;
				}
			}
			first = combined;
		}
		return first;
	}
	transformAttributeType(branch) {
		const choice = branch.nonSkipMatchedText;
		if (choice === 'String') {
			return AttributeType.String;
		} else if (choice === 'Integer') {
			return AttributeType.Integer;
		} else if (choice === 'Boolean') {
			return AttributeType.Boolean;
		} else if (choice === 'ANY') {
			return AttributeType.ANY;
		} else {
			return null;
		}
	}
}
//# sourceMappingURL=EntityModelCommonSyntaxAnalyserPart.js.map
