import { net } from 'net.akehurst.language-agl-processor';
import SyntaxAnalyser = net.akehurst.language.api.syntaxAnalyser.SyntaxAnalyser;
import SharedPackedParseTree = net.akehurst.language.api.sppt.SharedPackedParseTree;
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import SPPTNode = net.akehurst.language.api.sppt.SPPTNode;
import { FreNamedNode, FreParseLocation, FreNodeReference } from '@freon4dsl/core';
export declare class EntityModelSyntaxAnalyser implements SyntaxAnalyser {
	sourceName: string;
	locationMap: any;
	private _unit_SomeOtherModelUnit_analyser;
	private _unit_EntityModelUnit_analyser;
	private _unit_common_analyser;
	clear(): void;
	transform<T>(sppt: SharedPackedParseTree): T;
	transformSharedPackedParseTreeNode(node: SPPTNode): any;
	private transformSharedPackedParseTreeLeaf;
	private transformSharedPackedParseTreeBranch;
	getChildren(branch: SPPTBranch): any;
	getGroup(branch: SPPTBranch): any;
	transform__fre_reference(branch: SPPTBranch): any;
	freNodeRef<T extends FreNamedNode>(branch: SPPTBranch, typeName: string): FreNodeReference<T>;
	transformSharedPackedParseTreeList<T>(branch: SPPTBranch, separator?: string): T[];
	transformSharedPackedParseTreeRefList<T extends FreNamedNode>(
		branch: SPPTBranch,
		typeName: string,
		separator?: string
	): FreNodeReference<T>[];
	location(branch: SPPTBranch): FreParseLocation;
}
//# sourceMappingURL=EntityModelSyntaxAnalyser.d.ts.map
