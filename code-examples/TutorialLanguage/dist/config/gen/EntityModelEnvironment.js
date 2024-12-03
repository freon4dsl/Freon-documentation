import { FreEditor, FreCompositeTyper, FreScoperComposite, FreLanguageEnvironment, FreProjectionHandler } from '@freon4dsl/core';
import { EntityModelActions, initializeEditorDef, initializeProjections } from '../../editor/gen';
import { initializeScoperDef } from '../../scoper/gen';
import { initializeTypers } from '../../typer/gen';
import { EntityModelValidator } from '../../validator/gen';
import { EntityModelModelUnitWriter } from '../../writer/gen/EntityModelModelUnitWriter';
import { EntityModelModelUnitReader } from '../../reader/gen';
import { MainEntityModelInterpreter } from '../../interpreter/MainEntityModelInterpreter';
import { EntityModel, initializeLanguage } from '../../language/gen';
export class EntityModelEnvironment {
	static getInstance() {
		if (this.environment === undefined || this.environment === null) {
			this.environment = new EntityModelEnvironment();
			FreLanguageEnvironment.setInstance(this.environment);
		}
		return this.environment;
	}
	constructor() {
		this.scoper = new FreScoperComposite('main');
		this.typer = new FreCompositeTyper('main');
		this.validator = new EntityModelValidator();
		this.writer = new EntityModelModelUnitWriter();
		this.reader = new EntityModelModelUnitReader();
		this.interpreter = new MainEntityModelInterpreter();
		this.languageName = 'EntityModel';
		this.fileExtensions = new Map([
			['EntityModelUnit', 'ent'],
			['SomeOtherModelUnit', 'som']
		]);
		const actions = new EntityModelActions();
		const myComposite = new FreProjectionHandler();
		this.editor = new FreEditor(myComposite, this, actions);
		initializeLanguage();
		initializeProjections(myComposite);
		initializeEditorDef();
		initializeScoperDef(this.scoper);
		initializeTypers(this.typer);
	}
	newModel(modelName) {
		const model = new EntityModel();
		model.name = modelName;
		return model;
	}
}
//# sourceMappingURL=EntityModelEnvironment.js.map
