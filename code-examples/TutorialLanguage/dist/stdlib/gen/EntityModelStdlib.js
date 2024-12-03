import { FreLanguage } from '@freon4dsl/core';
import { AttributeType, MockEnumeration } from '../../language/gen';
import { freonConfiguration } from '../../config/FreonConfiguration';
import { ListUtil } from '../../utils/gen/ListUtil';
export class EntityModelStdlib {
	static getInstance() {
		if (this.stdlib === undefined || this.stdlib === null) {
			this.stdlib = new EntityModelStdlib();
		}
		return this.stdlib;
	}
	constructor() {
		this.elements = [];
		this.elements.push(AttributeType.String);
		this.elements.push(AttributeType.Integer);
		this.elements.push(AttributeType.Boolean);
		this.elements.push(AttributeType.ANY);
		this.elements.push(MockEnumeration.EnumValue1);
		this.elements.push(MockEnumeration.EnumValue2);
		this.elements.push(MockEnumeration.EnumValue3);
		for (const lib of freonConfiguration.customStdLibs) {
			ListUtil.addAllIfNotPresent(this.elements, lib.elements);
		}
	}
	find(name, metatype) {
		if (!!name) {
			const possibles = this.elements.filter((elem) => elem.name === name);
			if (possibles.length !== 0) {
				if (metatype) {
					for (const elem of possibles) {
						if (FreLanguage.getInstance().metaConformsToType(elem, metatype)) {
							return elem;
						}
					}
				} else {
					return possibles[0];
				}
			}
		}
		return null;
	}
}
//# sourceMappingURL=EntityModelStdlib.js.map
