import { FreExpressionNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { EntityExpression, EntityFunction } from './internal';
export declare class FunctionCallExpression extends EntityExpression implements FreExpressionNode {
	static create(data: Partial<FunctionCallExpression>): FunctionCallExpression;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	functionDefinition: FreNodeReference<EntityFunction>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): FunctionCallExpression;
	match(toBeMatched: Partial<FunctionCallExpression>): boolean;
	get $functionDefinition(): EntityFunction;
}
//# sourceMappingURL=FunctionCallExpression.d.ts.map
