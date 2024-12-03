import { EntityModelTyperPart } from './EntityModelTyperPart';
import { freonConfiguration } from '../../config/FreonConfiguration';
export function initializeTypers(rootTyper) {
	for (const p of freonConfiguration.customTypers) {
		rootTyper.appendTyper(p);
	}
	rootTyper.appendTyper(new EntityModelTyperPart());
}
//# sourceMappingURL=EntityModelTyperDef.js.map
