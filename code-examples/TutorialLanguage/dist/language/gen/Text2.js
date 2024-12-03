import { MobxModelElementImpl, FreUtils } from '@freon4dsl/core';
export class Text2 extends MobxModelElementImpl {
	static create(data) {
		const result = new Text2(data.$id);
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Text2';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
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
		const result = new Text2();
		return result;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}
//# sourceMappingURL=Text2.js.map
