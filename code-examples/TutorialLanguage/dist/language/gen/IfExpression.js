import { observablepart } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export class IfExpression extends EntityExpression {
	static create(data) {
		const result = new IfExpression(data.$id);
		if (!!data.condition) {
			result.condition = data.condition;
		}
		if (!!data.whenTrue) {
			result.whenTrue = data.whenTrue;
		}
		if (!!data.whenFalse) {
			result.whenFalse = data.whenFalse;
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
		this.$typename = 'IfExpression';
		observablepart(this, 'condition');
		observablepart(this, 'whenTrue');
		observablepart(this, 'whenFalse');
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
		return false;
	}
	copy() {
		const result = new IfExpression();
		if (!!this.condition) {
			result.condition = this.condition.copy();
		}
		if (!!this.whenTrue) {
			result.whenTrue = this.whenTrue.copy();
		}
		if (!!this.whenFalse) {
			result.whenFalse = this.whenFalse.copy();
		}
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.condition) {
			result = result && this.condition.match(toBeMatched.condition);
		}
		if (result && !!toBeMatched.whenTrue) {
			result = result && this.whenTrue.match(toBeMatched.whenTrue);
		}
		if (result && !!toBeMatched.whenFalse) {
			result = result && this.whenFalse.match(toBeMatched.whenFalse);
		}
		return result;
	}
}
//# sourceMappingURL=IfExpression.js.map
