import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { BinaryExpression, EntityExpression } from './internal';
export declare class MultiplyExpression extends BinaryExpression implements FreBinaryExpression {
	static create(data: Partial<MultiplyExpression>): MultiplyExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): MultiplyExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=MultiplyExpression.d.ts.map
