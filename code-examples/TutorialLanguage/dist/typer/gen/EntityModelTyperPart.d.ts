import { FreTyper, FreCompositeTyper, FreType, FreNode } from '@freon4dsl/core';
export declare class EntityModelTyperPart implements FreTyper {
	mainTyper: FreCompositeTyper;
	isType(modelelement: FreNode): boolean | null;
	inferType(modelelement: FreNode): FreType | null;
	equals(type1: FreType, type2: FreType): boolean | null;
	conforms(type1: FreType, type2: FreType): boolean | null;
	conformsList(typelist1: FreType[], typelist2: FreType[]): boolean | null;
	commonSuper(typelist: FreType[]): FreType | null;
	getSuperTypes(type: FreType): FreType[];
	private typeOf;
	private getElemFromAstType;
}
//# sourceMappingURL=EntityModelTyperPart.d.ts.map
