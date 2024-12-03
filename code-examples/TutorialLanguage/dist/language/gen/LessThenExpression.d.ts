import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { ComparisonExpression, EntityExpression } from './internal';
export declare class LessThenExpression extends ComparisonExpression implements FreBinaryExpression {
	static create(data: Partial<LessThenExpression>): LessThenExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): LessThenExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=LessThenExpression.d.ts.map
