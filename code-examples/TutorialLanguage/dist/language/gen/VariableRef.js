import { observablepart } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export class VariableRef extends EntityExpression {
	static create(data) {
		const result = new VariableRef(data.$id);
		if (!!data.appliedfeature) {
			result.appliedfeature = data.appliedfeature;
		}
		if (!!data.variable) {
			result.variable = data.variable;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'VariableRef';
		observablepart(this, 'variable');
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
		const result = new VariableRef();
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		if (!!this.variable) {
			result.variable = this.variable.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.variable) {
			result = result && this.variable.match(toBeMatched.variable);
		}
		return result;
	}
	get $variable() {
		if (!!this.variable) {
			return this.variable.referred;
		}
		return null;
	}
}
//# sourceMappingURL=VariableRef.js.map
