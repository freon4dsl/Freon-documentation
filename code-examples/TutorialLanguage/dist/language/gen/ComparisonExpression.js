import { BinaryExpression } from './internal';
export class ComparisonExpression extends BinaryExpression {
	constructor(id) {
		super(id);
		this.$typename = 'ComparisonExpression';
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
		console.log('ComparisonExpression: copy method should be implemented by concrete subclass');
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
//# sourceMappingURL=ComparisonExpression.js.map
