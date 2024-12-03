import { FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { LiteralExpression } from './internal';
export declare class NumberLiteralExpression extends LiteralExpression implements FreExpressionNode {
	static create(data: Partial<NumberLiteralExpression>): NumberLiteralExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	value: string;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): NumberLiteralExpression;
	match(toBeMatched: Partial<NumberLiteralExpression>): boolean;
}
//# sourceMappingURL=NumberLiteralExpression.d.ts.map
