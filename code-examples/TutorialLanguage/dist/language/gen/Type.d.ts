import { FreNodeReference } from '@freon4dsl/core';
import { AttributeWithLimitedType, EntityFunction, Entity, BaseType } from './internal';
export interface Type extends BaseType {
	simpleprop: string;
	int_attrs: AttributeWithLimitedType[];
	int_functions: EntityFunction[];
	baseInterface: FreNodeReference<Entity>;
	copy(): Type;
}
//# sourceMappingURL=Type.d.ts.map
