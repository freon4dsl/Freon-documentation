// Generated by the Freon Language Generator.
import {
    AndExpression,
    BinaryExpression,
    ComparisonExpression,
    Education,
    EqualsExpression,
    ExamplePage,
    Flow,
    FlowRule,
    Fraction,
    Grade,
    GradeList,
    GradeScore,
    GreaterOrEqualsExpression,
    GreaterThenExpression,
    InDepthMaterial,
    LessOrEqualsExpression,
    LessThenExpression,
    Line,
    NrOfCorrectAnswers,
    NumberConcept,
    NumberLiteralExpression,
    OrExpression,
    Page,
    PageTransition,
    Question,
    QuestionReference,
    Scenario,
    ScoreExpression,
    SimpleNumber,
    Step,
    Test,
    Theory,
    Topic,
    Video,
    WorkSheet,
} from "../../language/gen/index.js";
import { EducationWorker } from "./EducationWorker.js";

/**
 * Class EducationDefaultWorker is part of the implementation of the visitor pattern on models.
 * It implements the interface EducationWorker with empty methods, and can thus be used as
 * base to any class that needs to traverse the model tree.
 * Class EducationWalker implements the traversal of the model tree. This class implements
 * the actual visiting of each node in the tree.
 */
export class EducationDefaultWorker implements EducationWorker {
    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeEducation(modelelement: Education): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterEducation(modelelement: Education): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeFlow(modelelement: Flow): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterFlow(modelelement: Flow): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTopic(modelelement: Topic): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTopic(modelelement: Topic): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTest(modelelement: Test): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTest(modelelement: Test): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeFlowRule(modelelement: FlowRule): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterFlowRule(modelelement: FlowRule): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePageTransition(modelelement: PageTransition): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPageTransition(modelelement: PageTransition): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGrade(modelelement: Grade): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGrade(modelelement: Grade): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGradeList(modelelement: GradeList): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGradeList(modelelement: GradeList): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGradeScore(modelelement: GradeScore): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGradeScore(modelelement: GradeScore): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeScoreExpression(modelelement: ScoreExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterScoreExpression(modelelement: ScoreExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeQuestionReference(modelelement: QuestionReference): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterQuestionReference(modelelement: QuestionReference): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNrOfCorrectAnswers(modelelement: NrOfCorrectAnswers): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNrOfCorrectAnswers(modelelement: NrOfCorrectAnswers): boolean {
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
    public execBeforeLessOrEqualsExpression(modelelement: LessOrEqualsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterLessOrEqualsExpression(modelelement: LessOrEqualsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGreaterOrEqualsExpression(modelelement: GreaterOrEqualsExpression): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGreaterOrEqualsExpression(modelelement: GreaterOrEqualsExpression): boolean {
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
    public execBeforePage(modelelement: Page): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPage(modelelement: Page): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTheory(modelelement: Theory): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTheory(modelelement: Theory): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeLine(modelelement: Line): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterLine(modelelement: Line): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeVideo(modelelement: Video): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterVideo(modelelement: Video): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeWorkSheet(modelelement: WorkSheet): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterWorkSheet(modelelement: WorkSheet): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeExamplePage(modelelement: ExamplePage): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterExamplePage(modelelement: ExamplePage): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeInDepthMaterial(modelelement: InDepthMaterial): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterInDepthMaterial(modelelement: InDepthMaterial): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeQuestion(modelelement: Question): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterQuestion(modelelement: Question): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNumberConcept(modelelement: NumberConcept): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNumberConcept(modelelement: NumberConcept): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeSimpleNumber(modelelement: SimpleNumber): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterSimpleNumber(modelelement: SimpleNumber): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeFraction(modelelement: Fraction): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterFraction(modelelement: Fraction): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeScenario(modelelement: Scenario): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterScenario(modelelement: Scenario): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeStep(modelelement: Step): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterStep(modelelement: Step): boolean {
        return false;
    }
}
