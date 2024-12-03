import { net } from 'net.akehurst.language-agl-processor';
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import {
	Entity,
	AttributeWithLimitedType,
	AttributeWithEntityType,
	EntityFunction,
	AbsExpression,
	AttributeRef,
	VariableRef,
	StringLiteralExpression,
	NumberLiteralExpression,
	BooleanLiteralExpression,
	FunctionCallExpression,
	IfExpression,
	Variable,
	AttributeType,
	EntityExpression,
	AppliedFeature,
	LiteralExpression
} from '../../language/gen';
import { EntityModelSyntaxAnalyser } from './EntityModelSyntaxAnalyser';
export declare class EntityModelCommonSyntaxAnalyserPart {
	mainAnalyser: EntityModelSyntaxAnalyser;
	constructor(mainAnalyser: EntityModelSyntaxAnalyser);
	transformEntity(branch: SPPTBranch): Entity;
	transformAttributeWithLimitedType(branch: SPPTBranch): AttributeWithLimitedType;
	transformAttributeWithEntityType(branch: SPPTBranch): AttributeWithEntityType;
	transformEntityFunction(branch: SPPTBranch): EntityFunction;
	transformAbsExpression(branch: SPPTBranch): AbsExpression;
	transformAttributeRef(branch: SPPTBranch): AttributeRef;
	transformVariableRef(branch: SPPTBranch): VariableRef;
	transformStringLiteralExpression(branch: SPPTBranch): StringLiteralExpression;
	transformNumberLiteralExpression(branch: SPPTBranch): NumberLiteralExpression;
	transformBooleanLiteralExpression(branch: SPPTBranch): BooleanLiteralExpression;
	transformFunctionCallExpression(branch: SPPTBranch): FunctionCallExpression;
	transformIfExpression(branch: SPPTBranch): IfExpression;
	transformVariable(branch: SPPTBranch): Variable;
	transformEntityExpression(branch: SPPTBranch): EntityExpression;
	transformAppliedFeature(branch: SPPTBranch): AppliedFeature;
	transformLiteralExpression(branch: SPPTBranch): LiteralExpression;
	transform__fre_binary_EntityExpression(branch: SPPTBranch): EntityExpression;
	transformAttributeType(branch: SPPTBranch): AttributeType;
}
//# sourceMappingURL=EntityModelCommonSyntaxAnalyserPart.d.ts.map
