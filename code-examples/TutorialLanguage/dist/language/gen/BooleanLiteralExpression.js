import { observableprim } from '@freon4dsl/core';
import { LiteralExpression } from './internal';
export class BooleanLiteralExpression extends LiteralExpression {
	static create(data) {
		const result = new BooleanLiteralExpression(data.$id);
		if (!!data.value) {
			result.value = data.value;
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
		this.$typename = 'BooleanLiteralExpression';
		observableprim(this, 'value');
		this.value = '';
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
		const result = new BooleanLiteralExpression();
		if (!!this.value) {
			result.value = this.value;
		}
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.value !== null && toBeMatched.value !== undefined && toBeMatched.value.length > 0) {
			result = result && this.value === toBeMatched.value;
		}
		return result;
	}
}
//# sourceMappingURL=BooleanLiteralExpression.js.map
