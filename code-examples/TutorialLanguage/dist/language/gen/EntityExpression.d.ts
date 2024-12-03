import { MobxModelElementImpl, FreExpressionNode, FreParseLocation } from '@freon4dsl/core';
import { AppliedFeature } from './internal';
export declare abstract class EntityExpression extends MobxModelElementImpl implements FreExpressionNode {
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	appliedfeature: AppliedFeature;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): EntityExpression;
	match(toBeMatched: Partial<EntityExpression>): boolean;
}
//# sourceMappingURL=EntityExpression.d.ts.map
