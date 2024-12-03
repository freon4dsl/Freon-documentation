export const EntityModelGrammarStr = `
namespace EntityModelLanguage
grammar EntityModelGrammar {

// rules for "SomeOtherModelUnit"
SomeOtherModelUnit = 'SomeOtherModelUnit' identifier '\{'
	 'somePart' Entity
	 '}' ;

// rules for "EntityModelUnit"
EntityModelUnit = 'EntityModelUnit' identifier '\{'
	 'functions'
	 EntityFunction*
	 'entities'
	 Entity*
	 '}' ;

// common rules
Entity = 'Entity' identifier '\{'
	 'isCompany' booleanLiteral
	 'baseInterface_attr' numberLiteral
	 'simpleprop' stringLiteral
	 'attributes'
	 AttributeWithLimitedType*
	 'entAttributes'
	 AttributeWithEntityType*
	 'functions'
	 EntityFunction*
	 'int_attrs'
	 AttributeWithLimitedType*
	 'int_functions'
	 EntityFunction*
	 ( 'baseEntity' __fre_reference )?
	 'baseInterface' __fre_reference
	 '}' ;

AttributeWithLimitedType = 'AttributeWithLimitedType' identifier '\{'
	 'declaredType' AttributeType
	 '}' ;

AttributeWithEntityType = 'AttributeWithEntityType' identifier '\{'
	 'declaredType' __fre_reference
	 '}' ;

EntityFunction = 'EntityFunction' identifier '\{'
	 'aliases'
	 stringLiteral*
	 'expression' EntityExpression
	 'parameters'
	 Variable*
	 'declaredType' __fre_reference
	 '}' ;

AbsExpression = 'AbsExpression' '\{'
	 'expr' EntityExpression
	 ( 'appliedfeature' AppliedFeature )?
	 '}' ;

AttributeRef = 'AttributeRef' '\{'
	 ( 'appliedfeature' AppliedFeature )?
	 'attribute' __fre_reference
	 '}' ;

VariableRef = 'VariableRef' '\{'
	 ( 'appliedfeature' AppliedFeature )?
	 'variable' __fre_reference
	 '}' ;

StringLiteralExpression = 'StringLiteralExpression' '\{'
	 'value' stringLiteral
	 ( 'appliedfeature' AppliedFeature )?
	 '}' ;

NumberLiteralExpression = 'NumberLiteralExpression' '\{'
	 'value' stringLiteral
	 ( 'appliedfeature' AppliedFeature )?
	 '}' ;

BooleanLiteralExpression = 'BooleanLiteralExpression' '\{'
	 'value' stringLiteral
	 ( 'appliedfeature' AppliedFeature )?
	 '}' ;

FunctionCallExpression = 'FunctionCallExpression' '\{'
	 ( 'appliedfeature' AppliedFeature )?
	 'functionDefinition' __fre_reference
	 '}' ;

IfExpression = 'IfExpression' '\{'
	 'condition' EntityExpression
	 'whenTrue' EntityExpression
	 'whenFalse' EntityExpression
	 ( 'appliedfeature' AppliedFeature )?
	 '}' ;

Variable = 'Variable' identifier '\{'
	 'declaredType' __fre_reference
	 '}' ;

EntityExpression = AbsExpression 
    | VariableRef 
    | LiteralExpression 
    | FunctionCallExpression 
    | IfExpression 
    | __fre_binary_EntityExpression ;

AppliedFeature = AttributeRef  ;

LiteralExpression = StringLiteralExpression 
    | NumberLiteralExpression 
    | BooleanLiteralExpression  ;

__fre_binary_EntityExpression = [EntityExpression / __fre_binary_operator]2+ ;
leaf __fre_binary_operator = 'GreaterThenExpression' | 'EqualsExpression' | 'AndExpression' | 'or' | '*' | '+' | '/' | '<' ;

AttributeType = 'String'
	| 'Integer'
	| 'Boolean'
	| 'ANY' ;

__fre_reference = [ identifier / '.' ]+ ;

// white space and comments
skip WHITE_SPACE = "\\s+" ;
skip SINGLE_LINE_COMMENT = "//[^\\r\\n]*" ;
skip MULTI_LINE_COMMENT = "/\\*[^*]*\\*+(?:[^*/][^*]*\\*+)*/" ;

// the predefined basic types
leaf identifier          = "[a-zA-Z_][a-zA-Z0-9_]*" ;
/* see https://stackoverflow.com/questions/37032620/regex-for-matching-a-string-literal-in-java */
leaf stringLiteral       = '"' "[^\\"\\\\]*(\\\\.[^\\"\\\\]*)*" '"' ;
leaf numberLiteral       = "[0-9]+";
leaf booleanLiteral      = 'false' | 'true';

}`;
//# sourceMappingURL=EntityModelGrammar.js.map
