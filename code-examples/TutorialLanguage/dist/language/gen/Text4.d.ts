import { MobxModelElementImpl, FreNode, FreParseLocation } from '@freon4dsl/core';
export declare class Text4 extends MobxModelElementImpl implements FreNode {
	static create(data: Partial<Text4>): Text4;
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
	copy(): Text4;
	match(toBeMatched: Partial<Text4>): boolean;
}
//# sourceMappingURL=Text4.d.ts.map
