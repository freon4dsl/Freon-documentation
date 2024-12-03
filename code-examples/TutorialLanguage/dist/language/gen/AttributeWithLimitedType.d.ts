import { MobxModelElementImpl, FreNamedNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { AttributeType } from './internal';
export declare class AttributeWithLimitedType extends MobxModelElementImpl implements FreNamedNode {
	static create(data: Partial<AttributeWithLimitedType>): AttributeWithLimitedType;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	declaredType: FreNodeReference<AttributeType>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): AttributeWithLimitedType;
	match(toBeMatched: Partial<AttributeWithLimitedType>): boolean;
	get $declaredType(): AttributeType;
}
//# sourceMappingURL=AttributeWithLimitedType.d.ts.map
