// Generated by the Freon Language Generator.
import {
    AbsExpression,
    AndExpression,
    AppliedFeature,
    AttributeRef,
    AttributeType,
    AttributeWithEntityType,
    AttributeWithLimitedType,
    BinaryExpression,
    BooleanLiteralExpression,
    ComparisonExpression,
    DivideExpression,
    Entity,
    EntityExpression,
    EntityFunction,
    EntityModel,
    EntityModelUnit,
    EqualsExpression,
    FunctionCallExpression,
    GreaterThenExpression,
    IfExpression,
    LessThenExpression,
    LiteralExpression,
    MockEnumeration,
    MultiplyExpression,
    NumberLiteralExpression,
    OrExpression,
    PlusExpression,
    SomeOtherModelUnit,
    StringLiteralExpression,
    Text,
    Text2,
    Text3,
    Text4,
    Variable,
    VariableRef,
} from "../../language/gen/index.js";
import { EntityModelWorker } from "./EntityModelWorker.js";

/**
 * Class EntityModelDefaultWorker is part of the implementation of the visitor pattern on models.
 * It implements the interface EntityModelWorker with empty methods, and can thus be used as
 * base to any class that needs to traverse the model tree.
 * Class EntityModelWalker implements the traversal of the model tree. This class implements
 * the actual visiting of each node in the tree.
 */
export class EntityModelDefaultWorker implements EntityModelWorker {
    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEntityModel(modelelement: EntityModel): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEntityModel(modelelement: EntityModel): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeSomeOtherModelUnit(modelelement: SomeOtherModelUnit): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterSomeOtherModelUnit(modelelement: SomeOtherModelUnit): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEntityModelUnit(modelelement: EntityModelUnit): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEntityModelUnit(modelelement: EntityModelUnit): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEntity(modelelement: Entity): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEntity(modelelement: Entity): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAttributeType(modelelement: AttributeType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAttributeType(modelelement: AttributeType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeMockEnumeration(modelelement: MockEnumeration): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterMockEnumeration(modelelement: MockEnumeration): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAbsExpression(modelelement: AbsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAbsExpression(modelelement: AbsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeMultiplyExpression(modelelement: MultiplyExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterMultiplyExpression(modelelement: MultiplyExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEntityFunction(modelelement: EntityFunction): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEntityFunction(modelelement: EntityFunction): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeText(modelelement: Text): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterText(modelelement: Text): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeText2(modelelement: Text2): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterText2(modelelement: Text2): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeText3(modelelement: Text3): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterText3(modelelement: Text3): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeText4(modelelement: Text4): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterText4(modelelement: Text4): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeVariable(modelelement: Variable): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterVariable(modelelement: Variable): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEntityExpression(modelelement: EntityExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEntityExpression(modelelement: EntityExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAppliedFeature(modelelement: AppliedFeature): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAppliedFeature(modelelement: AppliedFeature): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAttributeRef(modelelement: AttributeRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAttributeRef(modelelement: AttributeRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeVariableRef(modelelement: VariableRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterVariableRef(modelelement: VariableRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeLiteralExpression(modelelement: LiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterLiteralExpression(modelelement: LiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeStringLiteralExpression(modelelement: StringLiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterStringLiteralExpression(modelelement: StringLiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeBooleanLiteralExpression(modelelement: BooleanLiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterBooleanLiteralExpression(modelelement: BooleanLiteralExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeBinaryExpression(modelelement: BinaryExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterBinaryExpression(modelelement: BinaryExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePlusExpression(modelelement: PlusExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPlusExpression(modelelement: PlusExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeDivideExpression(modelelement: DivideExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterDivideExpression(modelelement: DivideExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeAndExpression(modelelement: AndExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterAndExpression(modelelement: AndExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeOrExpression(modelelement: OrExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterOrExpression(modelelement: OrExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeComparisonExpression(modelelement: ComparisonExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterComparisonExpression(modelelement: ComparisonExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeLessThenExpression(modelelement: LessThenExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterLessThenExpression(modelelement: LessThenExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGreaterThenExpression(modelelement: GreaterThenExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGreaterThenExpression(modelelement: GreaterThenExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEqualsExpression(modelelement: EqualsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEqualsExpression(modelelement: EqualsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterFunctionCallExpression(modelelement: FunctionCallExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeIfExpression(modelelement: IfExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterIfExpression(modelelement: IfExpression): boolean {
        return false;
    }
}
