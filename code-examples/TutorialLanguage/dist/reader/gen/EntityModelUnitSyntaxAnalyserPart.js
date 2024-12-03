import { EntityModelUnit } from '../../language/gen';
export class EntityModelUnitSyntaxAnalyserPart {
	constructor(mainAnalyser) {
		this.mainAnalyser = mainAnalyser;
	}
	transformEntityModelUnit(branch) {
		let __name;
		let __functions;
		let __entities;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		if (children[4].name !== 'EntityFunction') {
			__functions = this.mainAnalyser.transformSharedPackedParseTreeList(children[4]);
		} else {
			__functions = [];
			for (const child of children) {
				__functions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		if (children[6].name !== 'Entity') {
			__entities = this.mainAnalyser.transformSharedPackedParseTreeList(children[6]);
		} else {
			__entities = [];
			for (const child of children) {
				__entities.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		return EntityModelUnit.create({
			name: __name,
			functions: __functions,
			entities: __entities,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
}
//# sourceMappingURL=EntityModelUnitSyntaxAnalyserPart.js.map
