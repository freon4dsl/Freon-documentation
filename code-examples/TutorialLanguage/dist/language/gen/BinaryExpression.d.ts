import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { EntityExpression } from './internal';
export declare abstract class BinaryExpression extends EntityExpression implements FreBinaryExpression {
	readonly $typename: string;
	parseLocation: FreParseLocation;
	left: EntityExpression;
	right: EntityExpression;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): BinaryExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=BinaryExpression.d.ts.map
