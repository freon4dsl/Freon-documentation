import { MobxModelElementImpl, FreNode, FreParseLocation } from '@freon4dsl/core';
export declare class Text extends MobxModelElementImpl implements FreNode {
	static create(data: Partial<Text>): Text;
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
	copy(): Text;
	match(toBeMatched: Partial<Text>): boolean;
}
//# sourceMappingURL=Text.d.ts.map
