import { MobxModelElementImpl, FreNamedNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { Entity } from './internal';
export declare class AttributeWithEntityType extends MobxModelElementImpl implements FreNamedNode {
	static create(data: Partial<AttributeWithEntityType>): AttributeWithEntityType;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	declaredType: FreNodeReference<Entity>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): AttributeWithEntityType;
	match(toBeMatched: Partial<AttributeWithEntityType>): boolean;
	get $declaredType(): Entity;
}
//# sourceMappingURL=AttributeWithEntityType.d.ts.map
