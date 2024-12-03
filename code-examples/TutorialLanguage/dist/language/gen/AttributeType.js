import { MobxModelElementImpl, observableprim, FreUtils } from '@freon4dsl/core';
export class AttributeType extends MobxModelElementImpl {
	static create(data) {
		const result = new AttributeType(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.extra) {
			result.extra = data.extra;
		}
		if (!!data.baseInterface_attr) {
			result.baseInterface_attr = data.baseInterface_attr;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'AttributeType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observableprim(this, 'extra');
		this.extra = 0;
		observableprim(this, 'baseInterface_attr');
		this.baseInterface_attr = 0;
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
		const result = new AttributeType();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.extra) {
			result.extra = this.extra;
		}
		if (!!this.baseInterface_attr) {
			result.baseInterface_attr = this.baseInterface_attr;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && toBeMatched.extra !== null && toBeMatched.extra !== undefined) {
			result = result && this.extra === toBeMatched.extra;
		}
		if (result && toBeMatched.baseInterface_attr !== null && toBeMatched.baseInterface_attr !== undefined) {
			result = result && this.baseInterface_attr === toBeMatched.baseInterface_attr;
		}
		return result;
	}
}
AttributeType.String = AttributeType.create({
	name: 'String',
	extra: 199
});
AttributeType.Integer = AttributeType.create({
	name: 'Integer',
	extra: 240261
});
AttributeType.Boolean = AttributeType.create({
	name: 'Boolean',
	extra: 5479
});
AttributeType.ANY = AttributeType.create({
	extra: 456,
	name: 'ANY'
});
//# sourceMappingURL=AttributeType.js.map
