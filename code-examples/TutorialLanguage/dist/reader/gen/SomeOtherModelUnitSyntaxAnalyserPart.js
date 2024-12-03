import { SomeOtherModelUnit } from '../../language/gen';
export class SomeOtherModelUnitSyntaxAnalyserPart {
	constructor(mainAnalyser) {
		this.mainAnalyser = mainAnalyser;
	}
	transformSomeOtherModelUnit(branch) {
		let __name;
		let __somePart;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__somePart = this.mainAnalyser.transformSharedPackedParseTreeNode(children[4]);
		return SomeOtherModelUnit.create({
			name: __name,
			somePart: __somePart,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
}
//# sourceMappingURL=SomeOtherModelUnitSyntaxAnalyserPart.js.map
