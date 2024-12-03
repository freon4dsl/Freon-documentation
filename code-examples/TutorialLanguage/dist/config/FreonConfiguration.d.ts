import { FreProjection, FreCombinedActions, FreTyper, FreStdlib, FreScoper } from '@freon4dsl/core';
import { EntityModelCheckerInterface } from '../validator/gen';
declare class FreonConfiguration {
	customProjection: FreProjection[];
	customActions: FreCombinedActions[];
	customValidations: EntityModelCheckerInterface[];
	customScopers: FreScoper[];
	customTypers: FreTyper[];
	customStdLibs: FreStdlib[];
}
export declare const freonConfiguration: FreonConfiguration;
export {};
//# sourceMappingURL=FreonConfiguration.d.ts.map
