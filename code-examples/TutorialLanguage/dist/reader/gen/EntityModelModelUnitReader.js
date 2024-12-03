import agl from 'net.akehurst.language-agl-processor';
var Agl = agl.net.akehurst.language.agl.processor.Agl;
var AutomatonKind_api = agl.net.akehurst.language.api.processor.AutomatonKind_api;
import { EntityModelGrammarStr } from './EntityModelGrammar';
import { EntityModelSyntaxAnalyser } from './EntityModelSyntaxAnalyser';
import { EntityModelSemanticAnalyser } from './EntityModelSemanticAnalyser';
export class EntityModelModelUnitReader {
	constructor() {
		this.analyser = new EntityModelSyntaxAnalyser();
		this.parser = Agl.processorFromString(EntityModelGrammarStr, this.analyser, null, null);
	}
	readFromString(sentence, metatype, model, sourceName) {
		this.analyser.sourceName = sourceName;
		let startRule = '';
		if (metatype === 'SomeOtherModelUnit') {
			startRule = 'SomeOtherModelUnit';
		} else if (metatype === 'EntityModelUnit') {
			startRule = 'EntityModelUnit';
		}
		let unit = null;
		if (this.parser) {
			try {
				let asm;
				if (startRule.length > 0) {
					asm = this.parser.processForGoal(null, startRule, sentence, AutomatonKind_api.LOOKAHEAD_1);
				} else {
					asm = this.parser.process(null, sentence, AutomatonKind_api.LOOKAHEAD_1);
				}
				unit = asm;
			} catch (e) {
				let mess = e.message.replace('Could not match goal,', 'Parse error in ' + sourceName + ':');
				if (!!mess && mess.length > 0) {
					console.log(mess);
					throw new Error(mess);
				} else {
					throw e;
				}
			}
			if (!!model) {
				try {
					if (model.getUnits().filter((existing) => existing.name === unit.name).length > 0) {
						throw new Error(`Unit named '${unit.name}' already exists.`);
					} else {
						model.addUnit(unit);
						const semAnalyser = new EntityModelSemanticAnalyser();
						semAnalyser.correct(unit);
					}
				} catch (e) {
					console.log(e.message);
					throw e;
				}
			}
		} else {
			throw new Error(`No parser for ${metatype} available: grammar incorrect.`);
		}
		return unit;
	}
}
//# sourceMappingURL=EntityModelModelUnitReader.js.map
