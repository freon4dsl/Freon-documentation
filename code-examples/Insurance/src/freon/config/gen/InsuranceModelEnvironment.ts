// Generated by the Freon Language Generator.
import {
    FreEditor,
    FreEnvironment,
    FreReader,
    FreCompositeTyper,
    FreValidator,
    FreStdlib,
    FreWriter,
    FreInterpreter,
    FreScoperComposite,
    FreLanguageEnvironment,
    FreProjectionHandler,
} from "@freon4dsl/core";
import { InsuranceModelActions, initializeEditorDef, initializeProjections } from "../../editor/gen/index.js";
import { initializeScoperDef } from "../../scoper/gen/index.js";
import { initializeTypers } from "../../typer/gen/index.js";
import { InsuranceModelValidator } from "../../validator/gen/index.js";
import { InsuranceModelStdlib } from "../../stdlib/gen/InsuranceModelStdlib.js";
import { InsuranceModelModelUnitWriter } from "../../writer/gen/InsuranceModelModelUnitWriter.js";
import { InsuranceModelModelUnitReader } from "../../reader/gen/InsuranceModelModelUnitReader.js";
import { MainInsuranceModelInterpreter } from "../../interpreter/MainInsuranceModelInterpreter.js";
import { InsuranceModel, Part, initializeLanguage } from "../../language/gen/index.js";

/**
 * Class InsuranceModelEnvironment provides the link between all parts of the language environment.
 * It holds the currently used editor, scoper, typer, etc, thus providing an entry point for
 * for instance, the editor to find the right scoper, or for the validator to find the typer
 * to use.
 * This class uses the singleton pattern to ensure that only one instance of the class is present.
 */
export class InsuranceModelEnvironment implements FreEnvironment {
    private static environment: FreEnvironment; // the only instance of this class

    /**
     * This method implements the singleton pattern
     */
    public static getInstance(): FreEnvironment {
        if (this.environment === undefined || this.environment === null) {
            this.environment = new InsuranceModelEnvironment();
            FreLanguageEnvironment.setInstance(this.environment);
        }
        return this.environment;
    }

    /**
     * A private constructor, as demanded by the singleton pattern.
     */
    private constructor() {
        const actions = new InsuranceModelActions();
        const myComposite = new FreProjectionHandler();
        this.editor = new FreEditor(myComposite, this, actions);
        initializeLanguage();
        initializeProjections(myComposite);
        initializeEditorDef();
        initializeScoperDef(this.scoper);
        initializeTypers(this.typer);
        this.projectionHandler = myComposite;
    }

    /**
     * Returns a new model with name 'modelName'.
     *
     * @param modelName
     */
    newModel(modelName: string): InsuranceModel {
        const model = new InsuranceModel();
        model.name = modelName;
        return model;
    }

    // the parts of the language environment
    editor: FreEditor;
    scoper: FreScoperComposite = new FreScoperComposite("main");
    typer: FreCompositeTyper = new FreCompositeTyper("main");
    validator: FreValidator = new InsuranceModelValidator();
    writer: FreWriter = new InsuranceModelModelUnitWriter();
    reader: FreReader = new InsuranceModelModelUnitReader();
    interpreter: FreInterpreter = new MainInsuranceModelInterpreter();
    projectionHandler: FreProjectionHandler;
    languageName: string = "InsuranceModel";
    fileExtensions: Map<string, string> = new Map([
        ["Part", "base"],
        ["Product", "prod"],
    ]);
}
