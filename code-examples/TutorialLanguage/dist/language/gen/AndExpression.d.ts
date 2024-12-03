import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { BinaryExpression, EntityExpression } from './internal';
export declare class AndExpression extends BinaryExpression implements FreBinaryExpression {
	static create(data: Partial<AndExpression>): AndExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): AndExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=AndExpression.d.ts.map
