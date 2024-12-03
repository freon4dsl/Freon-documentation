import { CustomEntityModelActions, CustomEntityModelProjection } from '../editor';
import { CustomEntityModelScoper } from '../scoper';
import { CustomEntityModelTyperPart } from '../typer';
import { CustomEntityModelValidator } from '../validator';
import { CustomEntityModelStdlib } from '../stdlib';
class FreonConfiguration {
	constructor() {
		this.customProjection = [new CustomEntityModelProjection()];
		this.customActions = [new CustomEntityModelActions()];
		this.customValidations = [new CustomEntityModelValidator()];
		this.customScopers = [new CustomEntityModelScoper()];
		this.customTypers = [new CustomEntityModelTyperPart()];
		this.customStdLibs = [new CustomEntityModelStdlib()];
	}
}
export const freonConfiguration = new FreonConfiguration();
//# sourceMappingURL=FreonConfiguration.js.map
