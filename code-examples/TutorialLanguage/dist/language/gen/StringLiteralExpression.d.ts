import { FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { LiteralExpression } from './internal';
export declare class StringLiteralExpression extends LiteralExpression implements FreExpressionNode {
	static create(data: Partial<StringLiteralExpression>): StringLiteralExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	value: string;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): StringLiteralExpression;
	match(toBeMatched: Partial<StringLiteralExpression>): boolean;
}
//# sourceMappingURL=StringLiteralExpression.d.ts.map
