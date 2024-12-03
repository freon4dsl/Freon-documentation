import { observablepart } from '@freon4dsl/core';
import { AppliedFeature } from './internal';
export class AttributeRef extends AppliedFeature {
	static create(data) {
		const result = new AttributeRef(data.$id);
		if (!!data.appliedfeature) {
			result.appliedfeature = data.appliedfeature;
		}
		if (!!data.attribute) {
			result.attribute = data.attribute;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'AttributeRef';
		observablepart(this, 'attribute');
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
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new AttributeRef();
		if (!!this.appliedfeature) {
			result.appliedfeature = this.appliedfeature.copy();
		}
		if (!!this.attribute) {
			result.attribute = this.attribute.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.attribute) {
			result = result && this.attribute.match(toBeMatched.attribute);
		}
		return result;
	}
	get $attribute() {
		if (!!this.attribute) {
			return this.attribute.referred;
		}
		return null;
	}
}
//# sourceMappingURL=AttributeRef.js.map
