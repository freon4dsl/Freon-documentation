import { observablepart } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export class BinaryExpression extends EntityExpression {
	constructor(id) {
		super(id);
		this.$typename = 'BinaryExpression';
		observablepart(this, 'left');
		observablepart(this, 'right');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return true;
	}
	copy() {
		console.log('BinaryExpression: copy method should be implemented by concrete subclass');
		return null;
	}
	frePriority() {
		return -1;
	}
	freLeft() {
		return this.left;
	}
	freRight() {
		return this.right;
	}
	freSetLeft(value) {
		this.left = value;
	}
	freSetRight(value) {
		this.right = value;
	}
}
//# sourceMappingURL=BinaryExpression.js.map
