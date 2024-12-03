import { FreModelUnit, MobxModelElementImpl, FreModel, FreParseLocation } from '@freon4dsl/core';
import { EntityModelUnit, SomeOtherModelUnit } from './internal';
export declare class EntityModel extends MobxModelElementImpl implements FreModel {
	static create(data: Partial<EntityModel>): EntityModel;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	units: EntityModelUnit[];
	extraUnit: SomeOtherModelUnit;
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): EntityModel;
	match(toBeMatched: Partial<EntityModel>): boolean;
	findUnit(name: string, metatype?: string): FreModelUnit;
	replaceUnit(oldUnit: FreModelUnit, newUnit: FreModelUnit): boolean;
	addUnit(newUnit: FreModelUnit): boolean;
	removeUnit(oldUnit: FreModelUnit): boolean;
	newUnit(typename: string): FreModelUnit;
	getUnits(): FreModelUnit[];
	getUnitsForType(type: string): FreModelUnit[];
}
//# sourceMappingURL=EntityModel.d.ts.map
