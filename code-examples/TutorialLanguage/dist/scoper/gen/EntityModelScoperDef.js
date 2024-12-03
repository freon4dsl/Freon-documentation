import { FreLanguage } from '@freon4dsl/core';
import { freonConfiguration } from '../../config/FreonConfiguration';
import { EntityModelScoper } from './EntityModelScoper';
export function initializeScopers(rootScoper) {
	for (const p of freonConfiguration.customScopers) {
		rootScoper.appendScoper(p);
	}
	rootScoper.appendScoper(new EntityModelScoper());
}
export function initializeScoperDef(rootScoper) {
	FreLanguage.getInstance().classifier('EntityModelUnit').isNamespace = true;
	FreLanguage.getInstance().classifier('Entity').isNamespace = true;
	FreLanguage.getInstance().classifier('EntityFunction').isNamespace = true;
	initializeScopers(rootScoper);
}
//# sourceMappingURL=EntityModelScoperDef.js.map
