import { InterpreterContext, MainInterpreter, RtError } from '@freon4dsl/core';
import { EntityModelInterpreterInit } from './gen/EntityModelInterpreterInit';
const getPropertyFunction = (node) => {
	const index = node.freOwnerDescriptor().propertyIndex;
	return node.freOwnerDescriptor().propertyName + (index !== undefined ? '[' + index + ']' : '');
};
const getConceptFunction = (node) => {
	if (node === undefined) {
		return '';
	}
	return node.freLanguageConcept();
};
export class MainEntityModelInterpreter {
	constructor() {
		if (MainEntityModelInterpreter.main === null) {
			MainEntityModelInterpreter.main = MainInterpreter.instance(EntityModelInterpreterInit, getConceptFunction, getPropertyFunction);
		}
	}
	setTracing(value) {
		MainEntityModelInterpreter.main.setTracing(value);
	}
	getTrace() {
		return MainEntityModelInterpreter.main.getTrace();
	}
	evaluate(node) {
		MainEntityModelInterpreter.main.reset();
		try {
			return MainEntityModelInterpreter.main.evaluate(node, InterpreterContext.EMPTY_CONTEXT);
		} catch (e) {
			return new RtError(e.message);
		}
	}
}
MainEntityModelInterpreter.main = null;
//# sourceMappingURL=MainEntityModelInterpreter.js.map
