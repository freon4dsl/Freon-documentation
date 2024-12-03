import { MobxModelElementImpl, FreNamedNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { Type, AttributeWithLimitedType, AttributeWithEntityType, EntityFunction } from './internal';
export declare class Entity extends MobxModelElementImpl implements FreNamedNode, Type {
	static create(data: Partial<Entity>): Entity;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	isCompany: boolean;
	name: string;
	baseInterface_attr: number;
	simpleprop: string;
	attributes: AttributeWithLimitedType[];
	entAttributes: AttributeWithEntityType[];
	functions: EntityFunction[];
	int_attrs: AttributeWithLimitedType[];
	int_functions: EntityFunction[];
	baseEntity: FreNodeReference<Entity>;
	baseInterface: FreNodeReference<Entity>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): Entity;
	match(toBeMatched: Partial<Entity>): boolean;
	get $baseEntity(): Entity;
}
//# sourceMappingURL=Entity.d.ts.map
