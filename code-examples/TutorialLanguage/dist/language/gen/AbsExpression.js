import { observablepart } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export class AbsExpression extends EntityExpression {
	static create(data) {
		const result = new AbsExpression(data.$id);
		if (!!data.expr) {
			result.expr = data.expr;
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
		this.$typename = 'AbsExpression';
		observablepart(this, 'expr');
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
		const result = new AbsExpression();
		if (!!this.expr) {
			result.expr = this.expr.copy();
		}
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.expr) {
			result = result && this.expr.match(toBeMatched.expr);
		}
		return result;
	}
}
//# sourceMappingURL=AbsExpression.js.map
