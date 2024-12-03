import { MobxModelElementImpl, FreModelUnit, FreParseLocation } from '@freon4dsl/core';
import { Entity } from './internal';
export declare class SomeOtherModelUnit extends MobxModelElementImpl implements FreModelUnit {
	static create(data: Partial<SomeOtherModelUnit>): SomeOtherModelUnit;
	fileExtension: string;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	somePart: Entity;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): SomeOtherModelUnit;
	match(toBeMatched: Partial<SomeOtherModelUnit>): boolean;
}
//# sourceMappingURL=SomeOtherModelUnit.d.ts.map
