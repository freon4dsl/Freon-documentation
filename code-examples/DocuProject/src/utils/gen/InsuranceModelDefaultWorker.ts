// Generated by the Freon Language Generator.
import {
    AttributeRef,
    BaseProduct,
    BinaryExpression,
    BooleanLiteral,
    BooleanType,
    CalcFunction,
    Description,
    DivideExpression,
    DocuExpression,
    DocuType,
    Entity,
    EntityAttribute,
    EuroLiteral,
    EuroType,
    FunctionCallExpression,
    GenericKind,
    GenericLiteral,
    GenericTypeDecl,
    InsuranceModel,
    InsurancePart,
    InsurancePartRef,
    InsurancePartType,
    InsuranceProduct,
    InsuranceTheme,
    Literal,
    MinusExpression,
    MultiplyExpression,
    NumberLiteral,
    NumberType,
    Parameter,
    ParameterRef,
    Part,
    PayoutRef,
    PercentageLiteral,
    PercentageType,
    PlusExpression,
    PremiumDays,
    Product,
    RiskAdjustmentRef,
    RiskRef,
    Text,
    Text2,
    Text3,
    Text4,
    TypeRef,
} from "../../language/gen/index.js";
import { InsuranceModelWorker } from "./InsuranceModelWorker.js";

/**
 * Class InsuranceModelDefaultWorker is part of the implementation of the visitor pattern on models.
 * It implements the interface InsuranceModelWorker with empty methods, and can thus be used as
 * base to any class that needs to traverse the model tree.
 * Class InsuranceModelWalker implements the traversal of the model tree. This class implements
 * the actual visiting of each node in the tree.
 */
export class InsuranceModelDefaultWorker implements InsuranceModelWorker {
    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeInsuranceModel(modelelement: InsuranceModel): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInsuranceModel(modelelement: InsuranceModel): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePart(modelelement: Part): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPart(modelelement: Part): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeProduct(modelelement: Product): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterProduct(modelelement: Product): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeDocuExpression(modelelement: DocuExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterDocuExpression(modelelement: DocuExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeLiteral(modelelement: Literal): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterLiteral(modelelement: Literal): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEuroLiteral(modelelement: EuroLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEuroLiteral(modelelement: EuroLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNumberLiteral(modelelement: NumberLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNumberLiteral(modelelement: NumberLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePercentageLiteral(modelelement: PercentageLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPercentageLiteral(modelelement: PercentageLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeBooleanLiteral(modelelement: BooleanLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterBooleanLiteral(modelelement: BooleanLiteral): boolean {
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
    public execBeforeMinusExpression(modelelement: MinusExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterMinusExpression(modelelement: MinusExpression): boolean {
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
    public execBeforeInsurancePartRef(modelelement: InsurancePartRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInsurancePartRef(modelelement: InsurancePartRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeRiskAdjustmentRef(modelelement: RiskAdjustmentRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterRiskAdjustmentRef(modelelement: RiskAdjustmentRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeParameterRef(modelelement: ParameterRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterParameterRef(modelelement: ParameterRef): boolean {
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
    public execBeforeRiskRef(modelelement: RiskRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterRiskRef(modelelement: RiskRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePayoutRef(modelelement: PayoutRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPayoutRef(modelelement: PayoutRef): boolean {
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
    public execBeforeGenericKind(modelelement: GenericKind): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGenericKind(modelelement: GenericKind): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGenericTypeDecl(modelelement: GenericTypeDecl): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGenericTypeDecl(modelelement: GenericTypeDecl): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGenericLiteral(modelelement: GenericLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGenericLiteral(modelelement: GenericLiteral): boolean {
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
    public execBeforeEntityAttribute(modelelement: EntityAttribute): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEntityAttribute(modelelement: EntityAttribute): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeBaseProduct(modelelement: BaseProduct): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterBaseProduct(modelelement: BaseProduct): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeInsurancePart(modelelement: InsurancePart): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInsurancePart(modelelement: InsurancePart): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeInsuranceProduct(modelelement: InsuranceProduct): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInsuranceProduct(modelelement: InsuranceProduct): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeCalcFunction(modelelement: CalcFunction): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterCalcFunction(modelelement: CalcFunction): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeDescription(modelelement: Description): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterDescription(modelelement: Description): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeParameter(modelelement: Parameter): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterParameter(modelelement: Parameter): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeDocuType(modelelement: DocuType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterDocuType(modelelement: DocuType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeInsurancePartType(modelelement: InsurancePartType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInsurancePartType(modelelement: InsurancePartType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePercentageType(modelelement: PercentageType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPercentageType(modelelement: PercentageType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNumberType(modelelement: NumberType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNumberType(modelelement: NumberType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeBooleanType(modelelement: BooleanType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterBooleanType(modelelement: BooleanType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEuroType(modelelement: EuroType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEuroType(modelelement: EuroType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTypeRef(modelelement: TypeRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTypeRef(modelelement: TypeRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeInsuranceTheme(modelelement: InsuranceTheme): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInsuranceTheme(modelelement: InsuranceTheme): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePremiumDays(modelelement: PremiumDays): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPremiumDays(modelelement: PremiumDays): boolean {
        return false;
    }
}
