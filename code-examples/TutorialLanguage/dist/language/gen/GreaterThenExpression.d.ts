import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { ComparisonExpression, EntityExpression } from './internal';
export declare class GreaterThenExpression extends ComparisonExpression implements FreBinaryExpression {
	static create(data: Partial<GreaterThenExpression>): GreaterThenExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): GreaterThenExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=GreaterThenExpression.d.ts.map
