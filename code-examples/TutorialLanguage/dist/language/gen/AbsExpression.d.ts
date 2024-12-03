import { FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export declare class AbsExpression extends EntityExpression implements FreExpressionNode {
	static create(data: Partial<AbsExpression>): AbsExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	expr: EntityExpression;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): AbsExpression;
	match(toBeMatched: Partial<AbsExpression>): boolean;
}
//# sourceMappingURL=AbsExpression.d.ts.map
