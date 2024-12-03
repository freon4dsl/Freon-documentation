import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { BinaryExpression, EntityExpression } from './internal';
export declare abstract class ComparisonExpression extends BinaryExpression implements FreBinaryExpression {
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): ComparisonExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=ComparisonExpression.d.ts.map
