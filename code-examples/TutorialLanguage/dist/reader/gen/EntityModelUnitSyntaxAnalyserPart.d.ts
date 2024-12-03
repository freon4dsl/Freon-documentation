import { net } from 'net.akehurst.language-agl-processor';
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import { EntityModelUnit } from '../../language/gen';
import { EntityModelSyntaxAnalyser } from './EntityModelSyntaxAnalyser';
export declare class EntityModelUnitSyntaxAnalyserPart {
	mainAnalyser: EntityModelSyntaxAnalyser;
	constructor(mainAnalyser: EntityModelSyntaxAnalyser);
	transformEntityModelUnit(branch: SPPTBranch): EntityModelUnit;
}
//# sourceMappingURL=EntityModelUnitSyntaxAnalyserPart.d.ts.map
