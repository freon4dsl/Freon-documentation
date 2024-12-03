import { FreBinaryExpression, FreParseLocation } from '@freon4dsl/core';
import { BinaryExpression, EntityExpression } from './internal';
export declare class OrExpression extends BinaryExpression implements FreBinaryExpression {
	static create(data: Partial<OrExpression>): OrExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): OrExpression;
	frePriority(): number;
	freLeft(): EntityExpression;
	freRight(): EntityExpression;
	freSetLeft(value: EntityExpression): void;
	freSetRight(value: EntityExpression): void;
}
//# sourceMappingURL=OrExpression.d.ts.map
