import { EntityExpression } from './internal';
export class LiteralExpression extends EntityExpression {
	constructor(id) {
		super(id);
		this.$typename = 'LiteralExpression';
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
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		console.log('LiteralExpression: copy method should be implemented by concrete subclass');
		return null;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		return result;
	}
}
//# sourceMappingURL=LiteralExpression.js.map
