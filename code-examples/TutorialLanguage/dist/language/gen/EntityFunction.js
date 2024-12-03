import {
	MobxModelElementImpl,
	observableprim,
	observableprimlist,
	observablepart,
	observablepartlist,
	FreUtils,
	matchPrimitiveList,
	matchElementList
} from '@freon4dsl/core';
export class EntityFunction extends MobxModelElementImpl {
	static create(data) {
		const result = new EntityFunction(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.aliases) {
			data.aliases.forEach((x) => result.aliases.push(x));
		}
		if (!!data.expression) {
			result.expression = data.expression;
		}
		if (!!data.parameters) {
			data.parameters.forEach((x) => result.parameters.push(x));
		}
		if (!!data.declaredType) {
			result.declaredType = data.declaredType;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'EntityFunction';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observableprimlist(this, 'aliases');
		observablepart(this, 'expression');
		observablepartlist(this, 'parameters');
		observablepart(this, 'declaredType');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new EntityFunction();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.aliases) {
			this.aliases.forEach((x) => result.aliases.push(x));
		}
		if (!!this.expression) {
			result.expression = this.expression.copy();
		}
		if (!!this.parameters) {
			this.parameters.forEach((x) => result.parameters.push(x.copy()));
		}
		if (!!this.declaredType) {
			result.declaredType = this.declaredType.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.aliases) {
			result = result && matchPrimitiveList(this.aliases, toBeMatched.aliases);
		}
		if (result && !!toBeMatched.expression) {
			result = result && this.expression.match(toBeMatched.expression);
		}
		if (result && !!toBeMatched.parameters) {
			result = result && matchElementList(this.parameters, toBeMatched.parameters);
		}
		if (result && !!toBeMatched.declaredType) {
			result = result && this.declaredType.match(toBeMatched.declaredType);
		}
		return result;
	}
	get $declaredType() {
		if (!!this.declaredType) {
			return this.declaredType.referred;
		}
		return null;
	}
}
//# sourceMappingURL=EntityFunction.js.map
