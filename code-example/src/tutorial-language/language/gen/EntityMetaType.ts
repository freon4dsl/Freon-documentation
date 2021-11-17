// Generated by the ProjectIt Language Generator.
/**
 * Type EntityMetaType is a union of the metatype, represented by a name, of all concepts
 * and interfaces that are defined for language Demo.
 */
export type EntityMetaType =
    | "AbsExpression"
    | "AndExpression"
    | "AppliedFeature"
    | "AttributeRef"
    | "AttributeType"
    | "AttributeWithEntityType"
    | "AttributeWithLimitedType"
    | "BaseType"
    | "BinaryExpression"
    | "BooleanLiteralExpression"
    | "ComparisonExpression"
    | "DivideExpression"
    | "Entity"
    | "EntityExpression"
    | "EntityFunction"
    | "EntityModel"
    | "EntityModelUnit"
    | "EqualsExpression"
    | "FunctionCallExpression"
    | "GreaterThenExpression"
    | "IfExpression"
    | "LessThenExpression"
    | "LiteralExpression"
    | "MockEnumeration"
    | "MultiplyExpression"
    | "NumberLiteralExpression"
    | "OrExpression"
    | "PlusExpression"
    | "SomeOtherModelUnit"
    | "StringLiteralExpression"
    | "Text"
    | "Type"
    | "Variable"
    | "VariableRef";

/**
 * Type MODELUNIT combines the metatype of all possible modelunits of language Entity
 */
export type ModelUnitMetaType = "SomeOtherModelUnit" | "EntityModelUnit";