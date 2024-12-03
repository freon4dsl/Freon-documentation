import { MobxModelElementImpl, observableprim, FreUtils } from '@freon4dsl/core';
export class MockEnumeration extends MobxModelElementImpl {
	static create(data) {
		const result = new MockEnumeration(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'MockEnumeration';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
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
		const result = new MockEnumeration();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
MockEnumeration.EnumValue1 = MockEnumeration.create({
	name: 'EnumValue1'
});
MockEnumeration.EnumValue2 = MockEnumeration.create({
	name: 'EnumValue2'
});
MockEnumeration.EnumValue3 = MockEnumeration.create({
	name: 'EnumValue3'
});
//# sourceMappingURL=MockEnumeration.js.map
