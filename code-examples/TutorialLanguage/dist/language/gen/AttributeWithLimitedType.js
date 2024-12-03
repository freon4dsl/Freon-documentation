import { MobxModelElementImpl, observableprim, observablepart, FreUtils } from '@freon4dsl/core';
export class AttributeWithLimitedType extends MobxModelElementImpl {
	static create(data) {
		const result = new AttributeWithLimitedType(data.$id);
		if (!!data.name) {
			result.name = data.name;
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
		this.$typename = 'AttributeWithLimitedType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
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
		const result = new AttributeWithLimitedType();
		if (!!this.name) {
			result.name = this.name;
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
//# sourceMappingURL=AttributeWithLimitedType.js.map
