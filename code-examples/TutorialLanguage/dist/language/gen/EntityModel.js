import { MobxModelElementImpl, observablepart, observablepartlist, FreLanguage, FreUtils, matchElementList } from '@freon4dsl/core';
import { EntityModelUnit, SomeOtherModelUnit } from './internal';
export class EntityModel extends MobxModelElementImpl {
	static create(data) {
		const result = new EntityModel(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.units) {
			data.units.forEach((x) => result.units.push(x));
		}
		if (!!data.extraUnit) {
			result.extraUnit = data.extraUnit;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'EntityModel';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observablepartlist(this, 'units');
		observablepart(this, 'extraUnit');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return true;
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
		const result = new EntityModel();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.units) {
			this.units.forEach((x) => result.units.push(x.copy()));
		}
		if (!!this.extraUnit) {
			result.extraUnit = this.extraUnit.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.units) {
			result = result && matchElementList(this.units, toBeMatched.units);
		}
		if (result && !!toBeMatched.extraUnit) {
			result = result && this.extraUnit.match(toBeMatched.extraUnit);
		}
		return result;
	}
	findUnit(name, metatype) {
		let result = null;
		const checkType = metatype !== undefined;
		result = this.getUnits().find(
			(mod) => mod.name === name && (checkType ? FreLanguage.getInstance().metaConformsToType(mod, metatype) : true)
		);
		if (!!result) {
			return result;
		}
		return null;
	}
	replaceUnit(oldUnit, newUnit) {
		if (oldUnit.freLanguageConcept() !== newUnit.freLanguageConcept()) {
			return false;
		}
		if (oldUnit.freOwnerDescriptor().owner !== this) {
			return false;
		}
		if (oldUnit.freLanguageConcept() === 'EntityModelUnit' && oldUnit.freOwnerDescriptor().propertyName === 'units') {
			const index = this.units.indexOf(oldUnit);
			this.units.splice(index, 1, newUnit);
		} else if (oldUnit.freLanguageConcept() === 'SomeOtherModelUnit' && oldUnit.freOwnerDescriptor().propertyName === 'extraUnit') {
			this.extraUnit = newUnit;
		} else {
			return false;
		}
		return true;
	}
	addUnit(newUnit) {
		if (!!newUnit) {
			const myMetatype = newUnit.freLanguageConcept();
			switch (myMetatype) {
				case 'EntityModelUnit': {
					this.units.push(newUnit);
					return true;
				}
				case 'SomeOtherModelUnit': {
					this.extraUnit = newUnit;
					return true;
				}
			}
		}
		return false;
	}
	removeUnit(oldUnit) {
		if (!!oldUnit) {
			const myMetatype = oldUnit.freLanguageConcept();
			switch (myMetatype) {
				case 'EntityModelUnit': {
					this.units.splice(this.units.indexOf(oldUnit), 1);
					return true;
				}
				case 'SomeOtherModelUnit': {
					this.extraUnit = null;
					return true;
				}
			}
		}
		return false;
	}
	newUnit(typename) {
		switch (typename) {
			case 'EntityModelUnit': {
				const unit = EntityModelUnit.create({});
				this.units.push(unit);
				return unit;
			}
			case 'SomeOtherModelUnit': {
				const unit = SomeOtherModelUnit.create({});
				this.extraUnit = unit;
				return unit;
			}
		}
		return null;
	}
	getUnits() {
		let result = [];
		result = result.concat(this.units);
		if (!!this.extraUnit) {
			result.push(this.extraUnit);
		}
		return result;
	}
	getUnitsForType(type) {
		switch (type) {
			case 'EntityModelUnit': {
				return this.units;
			}
			case 'SomeOtherModelUnit': {
				let result = [];
				result.push(this.extraUnit);
				return result;
			}
		}
		return [];
	}
}
//# sourceMappingURL=EntityModel.js.map
