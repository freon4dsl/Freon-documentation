// Generated by the Freon Language Generator.
import {
    AndExpression,
    Answer,
    BinaryExpression,
    ComparisonExpression,
    Education,
    EqualsExpression,
    ExamplePage,
    Flow,
    FlowRule,
    Fraction,
    Grade,
    GradeScore,
    GreaterOrEqualsExpression,
    GreaterThenExpression,
    InDepthMaterial,
    LastStep,
    LessOrEqualsExpression,
    LessThenExpression,
    Line,
    NrOfCorrectAnswers,
    NumberConcept,
    NumberLiteralExpression,
    OrExpression,
    Page,
    PageTransition,
    PrimitiveType,
    Question,
    QuestionReference,
    Scenario,
    ScoreExpression,
    SimpleNumber,
    SiteGroup,
    Step,
    Test,
    TestFlow,
    Theory,
    Topic,
    Video,
    WorkSheet,
} from "../../language/gen/index.js";

/**
 * Interface EducationWorker implements the extended visitor pattern of instances of language Education.
 * Class EducationWalker implements the traversal of the model tree, classes that implement this interface
 * are responsible for the actual work being done on the nodes of the tree.
 * Every node is visited twice, once before the visit of its children, and once after this visit.
 */
export interface EducationWorker {
    execBeforeEducation(modelelement: Education): boolean;
    execAfterEducation(modelelement: Education): boolean;

    execBeforeFlow(modelelement: Flow): boolean;
    execAfterFlow(modelelement: Flow): boolean;

    execBeforeSiteGroup(modelelement: SiteGroup): boolean;
    execAfterSiteGroup(modelelement: SiteGroup): boolean;

    execBeforeTest(modelelement: Test): boolean;
    execAfterTest(modelelement: Test): boolean;

    execBeforeTopic(modelelement: Topic): boolean;
    execAfterTopic(modelelement: Topic): boolean;

    execBeforeFlowRule(modelelement: FlowRule): boolean;
    execAfterFlowRule(modelelement: FlowRule): boolean;

    execBeforePageTransition(modelelement: PageTransition): boolean;
    execAfterPageTransition(modelelement: PageTransition): boolean;

    execBeforeGrade(modelelement: Grade): boolean;
    execAfterGrade(modelelement: Grade): boolean;

    execBeforePrimitiveType(modelelement: PrimitiveType): boolean;
    execAfterPrimitiveType(modelelement: PrimitiveType): boolean;

    execBeforeGradeScore(modelelement: GradeScore): boolean;
    execAfterGradeScore(modelelement: GradeScore): boolean;

    execBeforeScoreExpression(modelelement: ScoreExpression): boolean;
    execAfterScoreExpression(modelelement: ScoreExpression): boolean;

    execBeforeQuestionReference(modelelement: QuestionReference): boolean;
    execAfterQuestionReference(modelelement: QuestionReference): boolean;

    execBeforeNrOfCorrectAnswers(modelelement: NrOfCorrectAnswers): boolean;
    execAfterNrOfCorrectAnswers(modelelement: NrOfCorrectAnswers): boolean;

    execBeforeNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean;
    execAfterNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean;

    execBeforeBinaryExpression(modelelement: BinaryExpression): boolean;
    execAfterBinaryExpression(modelelement: BinaryExpression): boolean;

    execBeforeAndExpression(modelelement: AndExpression): boolean;
    execAfterAndExpression(modelelement: AndExpression): boolean;

    execBeforeOrExpression(modelelement: OrExpression): boolean;
    execAfterOrExpression(modelelement: OrExpression): boolean;

    execBeforeComparisonExpression(modelelement: ComparisonExpression): boolean;
    execAfterComparisonExpression(modelelement: ComparisonExpression): boolean;

    execBeforeLessOrEqualsExpression(modelelement: LessOrEqualsExpression): boolean;
    execAfterLessOrEqualsExpression(modelelement: LessOrEqualsExpression): boolean;

    execBeforeGreaterOrEqualsExpression(modelelement: GreaterOrEqualsExpression): boolean;
    execAfterGreaterOrEqualsExpression(modelelement: GreaterOrEqualsExpression): boolean;

    execBeforeLessThenExpression(modelelement: LessThenExpression): boolean;
    execAfterLessThenExpression(modelelement: LessThenExpression): boolean;

    execBeforeGreaterThenExpression(modelelement: GreaterThenExpression): boolean;
    execAfterGreaterThenExpression(modelelement: GreaterThenExpression): boolean;

    execBeforeEqualsExpression(modelelement: EqualsExpression): boolean;
    execAfterEqualsExpression(modelelement: EqualsExpression): boolean;

    execBeforeScenario(modelelement: Scenario): boolean;
    execAfterScenario(modelelement: Scenario): boolean;

    execBeforeTestFlow(modelelement: TestFlow): boolean;
    execAfterTestFlow(modelelement: TestFlow): boolean;

    execBeforeStep(modelelement: Step): boolean;
    execAfterStep(modelelement: Step): boolean;

    execBeforeLastStep(modelelement: LastStep): boolean;
    execAfterLastStep(modelelement: LastStep): boolean;

    execBeforeAnswer(modelelement: Answer): boolean;
    execAfterAnswer(modelelement: Answer): boolean;

    execBeforePage(modelelement: Page): boolean;
    execAfterPage(modelelement: Page): boolean;

    execBeforeTheory(modelelement: Theory): boolean;
    execAfterTheory(modelelement: Theory): boolean;

    execBeforeLine(modelelement: Line): boolean;
    execAfterLine(modelelement: Line): boolean;

    execBeforeVideo(modelelement: Video): boolean;
    execAfterVideo(modelelement: Video): boolean;

    execBeforeWorkSheet(modelelement: WorkSheet): boolean;
    execAfterWorkSheet(modelelement: WorkSheet): boolean;

    execBeforeExamplePage(modelelement: ExamplePage): boolean;
    execAfterExamplePage(modelelement: ExamplePage): boolean;

    execBeforeInDepthMaterial(modelelement: InDepthMaterial): boolean;
    execAfterInDepthMaterial(modelelement: InDepthMaterial): boolean;

    execBeforeQuestion(modelelement: Question): boolean;
    execAfterQuestion(modelelement: Question): boolean;

    execBeforeNumberConcept(modelelement: NumberConcept): boolean;
    execAfterNumberConcept(modelelement: NumberConcept): boolean;

    execBeforeSimpleNumber(modelelement: SimpleNumber): boolean;
    execAfterSimpleNumber(modelelement: SimpleNumber): boolean;

    execBeforeFraction(modelelement: Fraction): boolean;
    execAfterFraction(modelelement: Fraction): boolean;
}
