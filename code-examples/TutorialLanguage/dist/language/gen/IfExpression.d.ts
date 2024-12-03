import { FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export declare class IfExpression extends EntityExpression implements FreExpressionNode {
	static create(data: Partial<IfExpression>): IfExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	condition: EntityExpression;
	whenTrue: EntityExpression;
	whenFalse: EntityExpression;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): IfExpression;
	match(toBeMatched: Partial<IfExpression>): boolean;
}
//# sourceMappingURL=IfExpression.d.ts.map
