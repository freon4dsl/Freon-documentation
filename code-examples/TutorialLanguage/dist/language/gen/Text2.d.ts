import { MobxModelElementImpl, FreNode, FreParseLocation } from '@freon4dsl/core';
export declare class Text2 extends MobxModelElementImpl implements FreNode {
	static create(data: Partial<Text2>): Text2;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): Text2;
	match(toBeMatched: Partial<Text2>): boolean;
}
//# sourceMappingURL=Text2.d.ts.map
