import { MobxModelElementImpl, FreNamedNode, FreParseLocation } from '@freon4dsl/core';
import { BaseType } from './internal';
export declare class AttributeType extends MobxModelElementImpl implements FreNamedNode, BaseType {
	static create(data: Partial<AttributeType>): AttributeType;
	static String: AttributeType;
	static Integer: AttributeType;
	static Boolean: AttributeType;
	static ANY: AttributeType;
	static $freANY: AttributeType;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	extra: number;
	baseInterface_attr: number;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): AttributeType;
	match(toBeMatched: Partial<AttributeType>): boolean;
}
//# sourceMappingURL=AttributeType.d.ts.map
