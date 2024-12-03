import { FreReader, FreModelUnit } from '@freon4dsl/core';
import agl from 'net.akehurst.language-agl-processor';
import LanguageProcessor = agl.net.akehurst.language.api.processor.LanguageProcessor;
import { EntityModel } from '../../language/gen';
import { EntityModelSyntaxAnalyser } from './EntityModelSyntaxAnalyser';
export declare class EntityModelModelUnitReader implements FreReader {
	analyser: EntityModelSyntaxAnalyser;
	parser: LanguageProcessor;
	readFromString(sentence: string, metatype: string, model: EntityModel, sourceName?: string): FreModelUnit;
}
//# sourceMappingURL=EntityModelModelUnitReader.d.ts.map
