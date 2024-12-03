import { FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export declare abstract class LiteralExpression extends EntityExpression implements FreExpressionNode {
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): LiteralExpression;
	match(toBeMatched: Partial<LiteralExpression>): boolean;
}
//# sourceMappingURL=LiteralExpression.d.ts.map
