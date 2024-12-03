import { MobxModelElementImpl, observableprim, observablepartlist, FreUtils, matchElementList } from '@freon4dsl/core';
export class EntityModelUnit extends MobxModelElementImpl {
	static create(data) {
		const result = new EntityModelUnit(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.functions) {
			data.functions.forEach((x) => result.functions.push(x));
		}
		if (!!data.entities) {
			data.entities.forEach((x) => result.entities.push(x));
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.fileExtension = '';
		this.$typename = 'EntityModelUnit';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observablepartlist(this, 'functions');
		observablepartlist(this, 'entities');
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
		const result = new EntityModelUnit();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.functions) {
			this.functions.forEach((x) => result.functions.push(x.copy()));
		}
		if (!!this.entities) {
			this.entities.forEach((x) => result.entities.push(x.copy()));
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.functions) {
			result = result && matchElementList(this.functions, toBeMatched.functions);
		}
		if (result && !!toBeMatched.entities) {
			result = result && matchElementList(this.entities, toBeMatched.entities);
		}
		return result;
	}
}
//# sourceMappingURL=EntityModelUnit.js.map
