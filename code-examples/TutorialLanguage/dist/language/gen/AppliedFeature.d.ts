import { MobxModelElementImpl, FreNode, FreParseLocation } from '@freon4dsl/core';
export declare abstract class AppliedFeature extends MobxModelElementImpl implements FreNode {
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
	copy(): AppliedFeature;
	match(toBeMatched: Partial<AppliedFeature>): boolean;
}
//# sourceMappingURL=AppliedFeature.d.ts.map
