import { observablepart } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export class FunctionCallExpression extends EntityExpression {
	static create(data) {
		const result = new FunctionCallExpression(data.$id);
		if (!!data.appliedfeature) {
			result.appliedfeature = data.appliedfeature;
		}
		if (!!data.functionDefinition) {
			result.functionDefinition = data.functionDefinition;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'FunctionCallExpression';
		observablepart(this, 'functionDefinition');
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
		const result = new FunctionCallExpression();
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		if (!!this.functionDefinition) {
			result.functionDefinition = this.functionDefinition.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.functionDefinition) {
			result = result && this.functionDefinition.match(toBeMatched.functionDefinition);
		}
		return result;
	}
	get $functionDefinition() {
		if (!!this.functionDefinition) {
			return this.functionDefinition.referred;
		}
		return null;
	}
}
//# sourceMappingURL=FunctionCallExpression.js.map
