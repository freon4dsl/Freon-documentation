import { MobxModelElementImpl, observableprim, observablepart, observablepartlist, FreUtils, matchElementList } from '@freon4dsl/core';
export class Entity extends MobxModelElementImpl {
	static create(data) {
		const result = new Entity(data.$id);
		if (!!data.isCompany) {
			result.isCompany = data.isCompany;
		}
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.baseInterface_attr) {
			result.baseInterface_attr = data.baseInterface_attr;
		}
		if (!!data.simpleprop) {
			result.simpleprop = data.simpleprop;
		}
		if (!!data.attributes) {
			data.attributes.forEach((x) => result.attributes.push(x));
		}
		if (!!data.entAttributes) {
			data.entAttributes.forEach((x) => result.entAttributes.push(x));
		}
		if (!!data.functions) {
			data.functions.forEach((x) => result.functions.push(x));
		}
		if (!!data.int_attrs) {
			data.int_attrs.forEach((x) => result.int_attrs.push(x));
		}
		if (!!data.int_functions) {
			data.int_functions.forEach((x) => result.int_functions.push(x));
		}
		if (!!data.baseEntity) {
			result.baseEntity = data.baseEntity;
		}
		if (!!data.baseInterface) {
			result.baseInterface = data.baseInterface;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Entity';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'isCompany');
		this.isCompany = false;
		observableprim(this, 'name');
		this.name = '';
		observableprim(this, 'baseInterface_attr');
		this.baseInterface_attr = 0;
		observableprim(this, 'simpleprop');
		this.simpleprop = '';
		observablepartlist(this, 'attributes');
		observablepartlist(this, 'entAttributes');
		observablepartlist(this, 'functions');
		observablepartlist(this, 'int_attrs');
		observablepartlist(this, 'int_functions');
		observablepart(this, 'baseEntity');
		observablepart(this, 'baseInterface');
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
		const result = new Entity();
		if (!!this.isCompany) {
			result.isCompany = this.isCompany;
		}
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.baseInterface_attr) {
			result.baseInterface_attr = this.baseInterface_attr;
		}
		if (!!this.simpleprop) {
			result.simpleprop = this.simpleprop;
		}
		if (!!this.attributes) {
			this.attributes.forEach((x) => result.attributes.push(x.copy()));
		}
		if (!!this.entAttributes) {
			this.entAttributes.forEach((x) => result.entAttributes.push(x.copy()));
		}
		if (!!this.functions) {
			this.functions.forEach((x) => result.functions.push(x.copy()));
		}
		if (!!this.int_attrs) {
			this.int_attrs.forEach((x) => result.int_attrs.push(x.copy()));
		}
		if (!!this.int_functions) {
			this.int_functions.forEach((x) => result.int_functions.push(x.copy()));
		}
		if (!!this.baseEntity) {
			result.baseEntity = this.baseEntity.copy();
		}
		if (!!this.baseInterface) {
			result.baseInterface = this.baseInterface.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.isCompany !== null && toBeMatched.isCompany !== undefined) {
			result = result && this.isCompany === toBeMatched.isCompany;
		}
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && toBeMatched.baseInterface_attr !== null && toBeMatched.baseInterface_attr !== undefined) {
			result = result && this.baseInterface_attr === toBeMatched.baseInterface_attr;
		}
		if (result && toBeMatched.simpleprop !== null && toBeMatched.simpleprop !== undefined && toBeMatched.simpleprop.length > 0) {
			result = result && this.simpleprop === toBeMatched.simpleprop;
		}
		if (result && !!toBeMatched.attributes) {
			result = result && matchElementList(this.attributes, toBeMatched.attributes);
		}
		if (result && !!toBeMatched.entAttributes) {
			result = result && matchElementList(this.entAttributes, toBeMatched.entAttributes);
		}
		if (result && !!toBeMatched.functions) {
			result = result && matchElementList(this.functions, toBeMatched.functions);
		}
		if (result && !!toBeMatched.int_attrs) {
			result = result && matchElementList(this.int_attrs, toBeMatched.int_attrs);
		}
		if (result && !!toBeMatched.int_functions) {
			result = result && matchElementList(this.int_functions, toBeMatched.int_functions);
		}
		if (result && !!toBeMatched.baseEntity) {
			result = result && this.baseEntity.match(toBeMatched.baseEntity);
		}
		if (result && !!toBeMatched.baseInterface) {
			result = result && this.baseInterface.match(toBeMatched.baseInterface);
		}
		return result;
	}
	get $baseEntity() {
		if (!!this.baseEntity) {
			return this.baseEntity.referred;
		}
		return null;
	}
}
//# sourceMappingURL=Entity.js.map
