import { MobxModelElementImpl, FreNode, FreParseLocation } from '@freon4dsl/core';
export declare class Text3 extends MobxModelElementImpl implements FreNode {
	static create(data: Partial<Text3>): Text3;
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
	copy(): Text3;
	match(toBeMatched: Partial<Text3>): boolean;
}
//# sourceMappingURL=Text3.d.ts.map
