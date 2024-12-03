import { MobxModelElementImpl, FreNamedNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { EntityExpression, Variable, Type } from './internal';
export declare class EntityFunction extends MobxModelElementImpl implements FreNamedNode {
	static create(data: Partial<EntityFunction>): EntityFunction;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	aliases: string[];
	expression: EntityExpression;
	parameters: Variable[];
	declaredType: FreNodeReference<Type>;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): EntityFunction;
	match(toBeMatched: Partial<EntityFunction>): boolean;
	get $declaredType(): Type;
}
//# sourceMappingURL=EntityFunction.d.ts.map
