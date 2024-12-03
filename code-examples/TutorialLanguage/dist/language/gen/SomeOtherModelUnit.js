import { MobxModelElementImpl, observableprim, observablepart, FreUtils } from '@freon4dsl/core';
import { Entity } from './internal';
export class SomeOtherModelUnit extends MobxModelElementImpl {
	static create(data) {
		const result = new SomeOtherModelUnit(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.somePart) {
			result.somePart = data.somePart;
		} else {
			result.somePart = Entity.create({});
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.fileExtension = '';
		this.$typename = 'SomeOtherModelUnit';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observablepart(this, 'somePart');
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
		return true;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new SomeOtherModelUnit();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.somePart) {
			result.somePart = this.somePart.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.somePart) {
			result = result && this.somePart.match(toBeMatched.somePart);
		}
		return result;
	}
}
//# sourceMappingURL=SomeOtherModelUnit.js.map
