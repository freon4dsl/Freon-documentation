import { AstType, FreLanguage, FreCommonSuperTypeUtil } from '@freon4dsl/core';
import { Entity, AttributeType } from '../../language/gen';
export class EntityModelTyperPart {
	isType(modelelement) {
		if (modelelement instanceof Entity) {
			return true;
		} else if (modelelement instanceof AttributeType) {
			return true;
		}
		return false;
	}
	inferType(modelelement) {
		if (!modelelement) {
			return null;
		}
		let result = null;
		if (FreLanguage.getInstance().metaConformsToType(modelelement, 'ComparisonExpression')) {
			result = AstType.create({ astElement: AttributeType.Boolean });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'OrExpression')) {
			result = AstType.create({ astElement: AttributeType.Boolean });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'AndExpression')) {
			result = AstType.create({ astElement: AttributeType.Boolean });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'DivideExpression')) {
			result = this.mainTyper.inferType(modelelement?.left);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'PlusExpression')) {
			result = this.mainTyper.inferType(modelelement?.left);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'MultiplyExpression')) {
			result = this.mainTyper.inferType(modelelement?.left);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'BooleanLiteralExpression')) {
			result = AstType.create({ astElement: AttributeType.Boolean });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'NumberLiteralExpression')) {
			result = AstType.create({ astElement: AttributeType.Integer });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'StringLiteralExpression')) {
			result = AstType.create({ astElement: AttributeType.String });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'AttributeRef')) {
			result = this.mainTyper.inferType(modelelement?.attribute?.referred?.declaredType?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'IfExpression')) {
			result = this.mainTyper.inferType(modelelement?.whenTrue);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'FunctionCallExpression')) {
			result = this.mainTyper.inferType(modelelement?.functionDefinition?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'VariableRef')) {
			result = this.mainTyper.inferType(modelelement?.variable?.referred?.declaredType?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'AbsExpression')) {
			result = this.mainTyper.inferType(modelelement?.expr);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'Variable')) {
			result = this.mainTyper.inferType(modelelement?.declaredType?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'EntityFunction')) {
			result = this.mainTyper.inferType(modelelement?.declaredType?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'AttributeWithLimitedType')) {
			result = this.mainTyper.inferType(modelelement?.declaredType?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'AttributeType')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'MockEnumeration')) {
			result = AstType.create({ astElement: modelelement });
		} else if (this.mainTyper.isType(modelelement)) {
			result = AstType.create({ astElement: modelelement });
		}
		return result;
	}
	equals(type1, type2) {
		if (!type1 || !type2) return false;
		if (type1.$typename === 'AstType') {
			return type1.astElement === type2.astElement;
		}
		return false;
	}
	conforms(type1, type2) {
		if (!type1 || !type2) return null;
		let result = false;
		if (this.equals(type1, type2)) {
			result = true;
		} else {
			this.getSuperTypes(type1).forEach((super1) => {
				if (this.equals(super1, type2)) {
					result = true;
				}
			});
		}
		return result;
	}
	conformsList(typelist1, typelist2) {
		if (typelist1.length !== typelist2.length) return false;
		let result = true;
		for (let index in typelist1) {
			result = this.conforms(typelist1[index], typelist2[index]);
			if (result == false) return result;
		}
		return result;
	}
	commonSuper(typelist) {
		const result = FreCommonSuperTypeUtil.commonSuperType(typelist, this.mainTyper);
		if (!!result && result.length > 0) {
			return result[0];
		}
		return null;
	}
	getSuperTypes(type) {
		if (!type) {
			return [];
		}
		let result = [];
		if (type.$typename === 'AstType') {
			const elem = type.astElement;
			if (FreLanguage.getInstance().metaConformsToType(elem, 'Entity')) {
			} else {
				return [];
			}
		}
		return result;
	}
	typeOf(myArg) {
		let result;
		if (Array.isArray(myArg)) {
			result = this.mainTyper.commonSuperType(myArg);
		} else {
			result = this.mainTyper.inferType(myArg);
		}
		return result;
	}
	getElemFromAstType(type, metatype) {
		if (type.$typename === 'AstType') {
			const astElement = type.astElement;
			if (FreLanguage.getInstance().metaConformsToType(astElement, metatype)) {
				return astElement;
			}
		}
		return null;
	}
}
//# sourceMappingURL=EntityModelTyperPart.js.map
