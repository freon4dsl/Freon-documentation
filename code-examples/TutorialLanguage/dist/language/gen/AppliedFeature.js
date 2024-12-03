import { MobxModelElementImpl, observablepart, FreUtils } from '@freon4dsl/core';
export class AppliedFeature extends MobxModelElementImpl {
	constructor(id) {
		super();
		this.$typename = 'AppliedFeature';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observablepart(this, 'appliedfeature');
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
		console.log('AppliedFeature: copy method should be implemented by concrete subclass');
		return null;
	}
	match(toBeMatched) {
		let result = true;
		if (result && !!toBeMatched.appliedfeature) {
			result = result && this.appliedfeature.match(toBeMatched.appliedfeature);
		}
		return result;
	}
}
//# sourceMappingURL=AppliedFeature.js.map
