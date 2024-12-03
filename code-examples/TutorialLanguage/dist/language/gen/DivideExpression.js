import { BinaryExpression } from './internal';
export class DivideExpression extends BinaryExpression {
	static create(data) {
		const result = new DivideExpression(data.$id);
		if (!!data.left) {
			result.left = data.left;
		}
		if (!!data.right) {
			result.right = data.right;
		}
		if (!!data.appliedfeature) {
			result.appliedfeature = data.appliedfeature;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'DivideExpression';
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
		const result = new DivideExpression();
		if (!!this.left) {
			result.left = this.left.copy();
		}
		if (!!this.right) {
			result.right = this.right.copy();
		}
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		return result;
	}
	frePriority() {
		return 8;
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
//# sourceMappingURL=DivideExpression.js.map
