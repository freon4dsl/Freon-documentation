import { FreParseLocation, FreNodeReference } from '@freon4dsl/core';
import { SomeOtherModelUnitSyntaxAnalyserPart, EntityModelUnitSyntaxAnalyserPart, EntityModelCommonSyntaxAnalyserPart } from '.';
export class EntityModelSyntaxAnalyser {
	constructor() {
		this.sourceName = '';
		this._unit_SomeOtherModelUnit_analyser = new SomeOtherModelUnitSyntaxAnalyserPart(this);
		this._unit_EntityModelUnit_analyser = new EntityModelUnitSyntaxAnalyserPart(this);
		this._unit_common_analyser = new EntityModelCommonSyntaxAnalyserPart(this);
	}
	clear() {
		throw new Error('Method not implemented.');
	}
	transform(sppt) {
		if (!!sppt.root) {
			return this.transformSharedPackedParseTreeNode(sppt.root);
		} else {
			return null;
		}
	}
	transformSharedPackedParseTreeNode(node) {
		if (!!node) {
			try {
				if (node.isLeaf) {
					return this.transformSharedPackedParseTreeLeaf(node);
				} else if (node.isBranch) {
					return this.transformSharedPackedParseTreeBranch(node);
				}
			} catch (e) {
				if (e.message.startsWith('Syntax error in ') || e.message.startsWith('Error in EntityModelSyntaxAnalyser')) {
					throw e;
				} else {
					throw new Error(
						`Syntax error in "${this.sourceName} (line: ${node.location.line}, column: ${node.location.column})": ${e.message}`
					);
				}
			}
		} else {
			return null;
		}
	}
	transformSharedPackedParseTreeLeaf(node) {
		let tmp = (node?.nonSkipMatchedText).trim();
		if (tmp.length > 0) {
			if (tmp.startsWith('"')) {
				tmp = tmp.slice(1, tmp.length - 1);
				return tmp;
			} else if (tmp == 'false') {
				return false;
			} else if (tmp == 'true') {
				return true;
			} else if (Number.isInteger(parseInt(tmp, 10))) {
				return parseInt(tmp, 10);
			} else {
				return tmp;
			}
		}
		return null;
	}
	transformSharedPackedParseTreeBranch(branch) {
		const brName = branch.name;
		if ('SomeOtherModelUnit' === brName) {
			return this._unit_SomeOtherModelUnit_analyser.transformSomeOtherModelUnit(branch);
		} else if ('EntityModelUnit' === brName) {
			return this._unit_EntityModelUnit_analyser.transformEntityModelUnit(branch);
		} else if ('Entity' === brName) {
			return this._unit_common_analyser.transformEntity(branch);
		} else if ('AttributeWithLimitedType' === brName) {
			return this._unit_common_analyser.transformAttributeWithLimitedType(branch);
		} else if ('AttributeWithEntityType' === brName) {
			return this._unit_common_analyser.transformAttributeWithEntityType(branch);
		} else if ('EntityFunction' === brName) {
			return this._unit_common_analyser.transformEntityFunction(branch);
		} else if ('AbsExpression' === brName) {
			return this._unit_common_analyser.transformAbsExpression(branch);
		} else if ('AttributeRef' === brName) {
			return this._unit_common_analyser.transformAttributeRef(branch);
		} else if ('VariableRef' === brName) {
			return this._unit_common_analyser.transformVariableRef(branch);
		} else if ('StringLiteralExpression' === brName) {
			return this._unit_common_analyser.transformStringLiteralExpression(branch);
		} else if ('NumberLiteralExpression' === brName) {
			return this._unit_common_analyser.transformNumberLiteralExpression(branch);
		} else if ('BooleanLiteralExpression' === brName) {
			return this._unit_common_analyser.transformBooleanLiteralExpression(branch);
		} else if ('FunctionCallExpression' === brName) {
			return this._unit_common_analyser.transformFunctionCallExpression(branch);
		} else if ('IfExpression' === brName) {
			return this._unit_common_analyser.transformIfExpression(branch);
		} else if ('Variable' === brName) {
			return this._unit_common_analyser.transformVariable(branch);
		} else if ('EntityExpression' === brName) {
			return this._unit_common_analyser.transformEntityExpression(branch);
		} else if ('AppliedFeature' === brName) {
			return this._unit_common_analyser.transformAppliedFeature(branch);
		} else if ('LiteralExpression' === brName) {
			return this._unit_common_analyser.transformLiteralExpression(branch);
		} else if ('__fre_binary_EntityExpression' === brName) {
			return this._unit_common_analyser.transform__fre_binary_EntityExpression(branch);
		} else if ('AttributeType' === brName) {
			return this._unit_common_analyser.transformAttributeType(branch);
		} else if ('__fre_reference' === brName) {
			return this.transform__fre_reference(branch);
		} else {
			throw new Error(`Error in EntityModelSyntaxAnalyser: ${brName} not handled for node '${branch?.matchedText}'`);
		}
	}
	getChildren(branch) {
		if (!!branch && !!branch.nonSkipChildren) {
			try {
				return branch.nonSkipChildren.toArray();
			} catch (e) {
				throw new Error(`Cannot follow branch: ${e.message} (${branch.matchedText.trimEnd()})`);
			}
		}
		return null;
	}
	getGroup(branch) {
		let group = branch;
		let stop = false;
		while (!stop) {
			let nextOne = null;
			try {
				nextOne = group.nonSkipChildren?.toArray()[0];
			} catch (e) {
				throw new Error(`Cannot follow group: ${e.message} (${group.matchedText})`);
			}
			if (!nextOne || (!nextOne.name.includes('multi') && !nextOne.name.includes('group'))) {
				stop = true;
			} else {
				group = nextOne;
			}
		}
		return group;
	}
	transform__fre_reference(branch) {
		if (branch.name.includes('multi') || branch.name.includes('List')) {
			return this.transformSharedPackedParseTreeList(branch, '.');
		} else {
			return this.transformSharedPackedParseTreeLeaf(branch);
		}
	}
	freNodeRef(branch, typeName) {
		let referred = this.transformSharedPackedParseTreeNode(branch);
		if (this.getChildren(branch)?.length > 1) {
			referred = this.transformSharedPackedParseTreeList(branch, '.');
		}
		if (referred === null || referred === undefined) {
			return null;
		} else if (typeof referred === 'string' && referred.length === 0) {
			return null;
		} else {
			return FreNodeReference.create(referred, typeName);
		}
	}
	transformSharedPackedParseTreeList(branch, separator) {
		let result = [];
		const children = this.getChildren(branch);
		if (!!children) {
			for (const child of children) {
				let element = this.transformSharedPackedParseTreeNode(child);
				if (element !== null && element !== undefined) {
					if (separator === null || separator === undefined) {
						result.push(element);
					} else {
						if (element !== separator) {
							result.push(element);
						}
					}
				}
			}
		}
		return result;
	}
	transformSharedPackedParseTreeRefList(branch, typeName, separator) {
		let result = [];
		const children = this.getChildren(branch);
		if (!!children) {
			for (const child of children) {
				let refName = this.transformSharedPackedParseTreeNode(child);
				if (refName !== null && refName !== undefined) {
					if (separator === null || separator === undefined) {
						result.push(FreNodeReference.create(refName, typeName));
					} else {
						if (refName !== separator) {
							result.push(FreNodeReference.create(refName, typeName));
						}
					}
				}
			}
		}
		return result;
	}
	location(branch) {
		return FreParseLocation.create({
			filename: this.sourceName,
			line: branch.location.line,
			column: branch.location.column
		});
	}
}
//# sourceMappingURL=EntityModelSyntaxAnalyser.js.map
