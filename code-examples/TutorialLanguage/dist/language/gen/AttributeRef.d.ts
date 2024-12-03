import { FreNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { AppliedFeature, AttributeWithEntityType } from './internal';
export declare class AttributeRef extends AppliedFeature implements FreNode {
	static create(data: Partial<AttributeRef>): AttributeRef;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	attribute: FreNodeReference<AttributeWithEntityType>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): AttributeRef;
	match(toBeMatched: Partial<AttributeRef>): boolean;
	get $attribute(): AttributeWithEntityType;
}
//# sourceMappingURL=AttributeRef.d.ts.map
