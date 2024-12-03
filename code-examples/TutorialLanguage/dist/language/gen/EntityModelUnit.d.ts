import { MobxModelElementImpl, FreModelUnit, FreParseLocation } from '@freon4dsl/core';
import { EntityFunction, Entity } from './internal';
export declare class EntityModelUnit extends MobxModelElementImpl implements FreModelUnit {
	static create(data: Partial<EntityModelUnit>): EntityModelUnit;
	fileExtension: string;
	readonly $typename: string;
	$id: string;
	parseLocation: FreParseLocation;
	name: string;
	functions: EntityFunction[];
	entities: Entity[];
	constructor(id?: string);
	freLanguageConcept(): string;
	freId(): string;
	freIsModel(): boolean;
	freIsUnit(): boolean;
	freIsExpression(): boolean;
	freIsBinaryExpression(): boolean;
	copy(): EntityModelUnit;
	match(toBeMatched: Partial<EntityModelUnit>): boolean;
}
//# sourceMappingURL=EntityModelUnit.d.ts.map
