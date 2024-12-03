import { FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { LiteralExpression } from './internal';
export declare class BooleanLiteralExpression extends LiteralExpression implements FreExpressionNode {
	static create(data: Partial<BooleanLiteralExpression>): BooleanLiteralExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	value: string;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): BooleanLiteralExpression;
	match(toBeMatched: Partial<BooleanLiteralExpression>): boolean;
}
//# sourceMappingURL=BooleanLiteralExpression.d.ts.map
