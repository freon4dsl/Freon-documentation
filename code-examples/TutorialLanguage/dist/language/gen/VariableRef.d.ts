import { FreExpressionNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { EntityExpression, Variable } from './internal';
export declare class VariableRef extends EntityExpression implements FreExpressionNode {
	static create(data: Partial<VariableRef>): VariableRef;
	readonly $typename: string;
	parseLocation: FreParseLocation;
	variable: FreNodeReference<Variable>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): VariableRef;
	match(toBeMatched: Partial<VariableRef>): boolean;
	get $variable(): Variable;
}
//# sourceMappingURL=VariableRef.d.ts.map
