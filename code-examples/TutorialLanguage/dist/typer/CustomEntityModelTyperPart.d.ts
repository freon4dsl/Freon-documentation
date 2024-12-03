import { FreNode, FreType, FreTyper } from '@freon4dsl/core';
export declare class CustomEntityModelTyperPart implements FreTyper {
	mainTyper: FreTyper;
	isType(modelelement: FreNode): boolean | null;
	inferType(modelelement: FreNode): FreType | null;
	equals(type1: FreType, type2: FreType): boolean | null;
	conforms(type1: FreType, type2: FreType): boolean | null;
	conformsList(typelist1: FreType[], typelist2: FreType[]): boolean | null;
	commonSuper(typelist: FreType[]): FreType | null;
	getSuperTypes(type: FreType): FreType[] | null;
}
//# sourceMappingURL=CustomEntityModelTyperPart.d.ts.map
