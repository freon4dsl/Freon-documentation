import { MobxModelElementImpl, FreNamedNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { Entity } from './internal';
export declare class Variable extends MobxModelElementImpl implements FreNamedNode {
	static create(data: Partial<Variable>): Variable;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	declaredType: FreNodeReference<Entity>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): Variable;
	match(toBeMatched: Partial<Variable>): boolean;
	get $declaredType(): Entity;
}
//# sourceMappingURL=Variable.d.ts.map
