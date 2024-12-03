import {
	AFTER_BINARY_OPERATOR,
	BEFORE_BINARY_OPERATOR,
	FreCreateBinaryExpressionAction,
	FreCustomAction,
	LEFT_MOST,
	RIGHT_MOST
} from '@freon4dsl/core';
import {
	MultiplyExpression,
	PlusExpression,
	DivideExpression,
	AndExpression,
	OrExpression,
	LessThenExpression,
	GreaterThenExpression,
	EqualsExpression
} from '../../language/gen';
export const BINARY_EXPRESSION_CREATORS = [
	FreCreateBinaryExpressionAction.create({
		trigger: '*',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new MultiplyExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: '+',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new PlusExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: '/',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new DivideExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: 'AndExpression',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new AndExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: 'or',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new OrExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: '<',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new LessThenExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: 'GreaterThenExpression',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new GreaterThenExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: 'EqualsExpression',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new EqualsExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	})
];
export const CUSTOM_ACTIONS = [
	FreCustomAction.create({
		trigger: 'baseEntity',
		activeInBoxRoles: ['optional-baseEntity'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'Entity-baseEntity-referencebox'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'AbsExpression-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'AttributeRef-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'VariableRef-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'StringLiteralExpression-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'NumberLiteralExpression-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'BooleanLiteralExpression-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'FunctionCallExpression-appliedfeature'
	}),
	FreCustomAction.create({
		trigger: 'appliedfeature',
		activeInBoxRoles: ['optional-appliedfeature'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'IfExpression-appliedfeature'
	})
];
//# sourceMappingURL=EntityModelDefaultActions.js.map
