import { MobxModelElementImpl, FreNamedNode, FreParseLocation } from '@freon4dsl/core';
export declare class MockEnumeration extends MobxModelElementImpl implements FreNamedNode {
	static create(data: Partial<MockEnumeration>): MockEnumeration;
	static EnumValue1: MockEnumeration;
	static EnumValue2: MockEnumeration;
	static EnumValue3: MockEnumeration;
	static $freANY: MockEnumeration;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): MockEnumeration;
	match(toBeMatched: Partial<MockEnumeration>): boolean;
}
//# sourceMappingURL=MockEnumeration.d.ts.map
