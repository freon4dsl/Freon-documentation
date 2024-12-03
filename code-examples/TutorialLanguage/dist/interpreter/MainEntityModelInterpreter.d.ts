import { FreInterpreter, InterpreterTracer, RtObject } from '@freon4dsl/core';
export declare class MainEntityModelInterpreter implements FreInterpreter {
	private static main;
	constructor();
	setTracing(value: boolean): void;
	getTrace(): InterpreterTracer;
	evaluate(node: Object): RtObject;
}
//# sourceMappingURL=MainEntityModelInterpreter.d.ts.map
