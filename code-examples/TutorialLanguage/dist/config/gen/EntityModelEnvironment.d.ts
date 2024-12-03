import {
	FreEditor,
	FreEnvironment,
	FreReader,
	FreCompositeTyper,
	FreValidator,
	FreWriter,
	FreInterpreter,
	FreScoperComposite
} from '@freon4dsl/core';
import { EntityModel } from '../../language/gen';
export declare class EntityModelEnvironment implements FreEnvironment {
	private static environment;
	static getInstance(): FreEnvironment;
	private constructor();
	newModel(modelName: string): EntityModel;
	editor: FreEditor;
	scoper: FreScoperComposite;
	typer: FreCompositeTyper;
	validator: FreValidator;
	writer: FreWriter;
	reader: FreReader;
	interpreter: FreInterpreter;
	languageName: string;
	fileExtensions: Map<string, string>;
}
//# sourceMappingURL=EntityModelEnvironment.d.ts.map
