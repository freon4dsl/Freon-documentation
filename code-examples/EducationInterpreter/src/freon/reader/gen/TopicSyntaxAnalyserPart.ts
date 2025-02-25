// Generated by the Freon Language Generator.
import { net } from "net.akehurst.language-agl-processor";
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import {
    Topic,
    Theory,
    Line,
    Question,
    GradeScore,
    QuestionReference,
    NrOfCorrectAnswers,
    NumberLiteralExpression,
    Video,
    WorkSheet,
    ExamplePage,
    InDepthMaterial,
    SiteGroup,
    Page,
    NumberConcept,
    Grade,
    ScoreExpression,
    AndExpression,
    OrExpression,
    LessOrEqualsExpression,
    GreaterOrEqualsExpression,
    LessThenExpression,
    GreaterThenExpression,
    EqualsExpression,
} from "../../language/gen/index.js";
import { EducationSyntaxAnalyser } from "./EducationSyntaxAnalyser.js";
import { FreNodeReference } from "@freon4dsl/core";

export class TopicSyntaxAnalyserPart {
    mainAnalyser: EducationSyntaxAnalyser;

    constructor(mainAnalyser: EducationSyntaxAnalyser) {
        this.mainAnalyser = mainAnalyser;
    }

    /**
     * Method to transform branches that match the following rule:
     * Topic = 'SiteGroup:' __fre_reference
     *	 'Topic:' identifier
     *	 'Topic' 'description:' stringLiteral
     *	 'Pages:'
     *	 Page* ;
     * @param branch
     * @private
     */
    public transformTopic(branch: SPPTBranch): Topic {
        // console.log('transformTopic called: ' + branch.name);
        let __main: FreNodeReference<SiteGroup>;
        let __name: string;
        let __description: string;
        let __pages: Page[];
        const children = this.mainAnalyser.getChildren(branch);
        __main = this.mainAnalyser.freNodeRef<SiteGroup>(children[1], "SiteGroup"); // RHSRefEntry
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]); // RHSPrimEntry
        __description = this.mainAnalyser.transformSharedPackedParseTreeNode(children[6]); // RHSPrimEntry
        // RHSPartListEntry
        if (children[8].name !== "Page") {
            __pages = this.mainAnalyser.transformSharedPackedParseTreeList<Page>(children[8]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __pages = [];
            for (const child of children) {
                __pages.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return Topic.create({
            main: __main,
            name: __name,
            description: __description,
            pages: __pages,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * Theory = '----------------------------------------------------'
     *	 'Theory' identifier
     *	 Line*
     *	 'Questions:' Question* 'Score' GradeScore* ;
     * @param branch
     * @private
     */
    public transformTheory(branch: SPPTBranch): Theory {
        // console.log('transformTheory called: ' + branch.name);
        let __name: string;
        let __content: Line[];
        let __questions: Question[];
        let __grading: GradeScore[];
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        // RHSPartListEntry
        if (children[3].name !== "Line") {
            __content = this.mainAnalyser.transformSharedPackedParseTreeList<Line>(children[3]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __content = [];
            for (const child of children) {
                __content.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[5].name !== "Question") {
            __questions = this.mainAnalyser.transformSharedPackedParseTreeList<Question>(children[5]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __questions = [];
            for (const child of children) {
                __questions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[7].name !== "GradeScore") {
            __grading = this.mainAnalyser.transformSharedPackedParseTreeList<GradeScore>(children[7]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __grading = [];
            for (const child of children) {
                __grading.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return Theory.create({
            name: __name,
            content: __content,
            questions: __questions,
            grading: __grading,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * Line = stringLiteral ;
     * @param branch
     * @private
     */
    public transformLine(branch: SPPTBranch): Line {
        // console.log('transformLine called: ' + branch.name);
        let __content: string;
        const children = this.mainAnalyser.getChildren(branch);
        __content = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]); // RHSPrimEntry

        return Line.create({
            content: __content,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * Question = identifier
     *	 stringLiteral
     *	 'Correct' 'Answer:' NumberConcept ;
     * @param branch
     * @private
     */
    public transformQuestion(branch: SPPTBranch): Question {
        // console.log('transformQuestion called: ' + branch.name);
        let __name: string;
        let __content: string;
        let __correctAnswer: NumberConcept;
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]); // RHSPrimEntry
        __content = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]); // RHSPrimEntry
        __correctAnswer = this.mainAnalyser.transformSharedPackedParseTreeNode(children[4]); // RHSPartEntry

        return Question.create({
            name: __name,
            content: __content,
            correctAnswer: __correctAnswer,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * GradeScore = Grade ':' ScoreExpression ;
     * @param branch
     * @private
     */
    public transformGradeScore(branch: SPPTBranch): GradeScore {
        // console.log('transformGradeScore called: ' + branch.name);
        let __grade: FreNodeReference<Grade>;
        let __expr: ScoreExpression;
        const children = this.mainAnalyser.getChildren(branch);
        __grade = this.mainAnalyser.freNodeRef<Grade>(children[0], "Grade"); // RHSLimitedRefEntry
        __expr = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPartEntry

        return GradeScore.create({
            grade: __grade,
            expr: __expr,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * QuestionReference = 'Answer' 'to' __fre_reference 'is' 'correct' ;
     * @param branch
     * @private
     */
    public transformQuestionReference(branch: SPPTBranch): QuestionReference {
        // console.log('transformQuestionReference called: ' + branch.name);
        let __question: FreNodeReference<Question>;
        const children = this.mainAnalyser.getChildren(branch);
        __question = this.mainAnalyser.freNodeRef<Question>(children[2], "Question"); // RHSRefEntry

        return QuestionReference.create({
            question: __question,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * NrOfCorrectAnswers = 'Number' 'Of' 'Correct' 'Answers' ;
     * @param branch
     * @private
     */
    public transformNrOfCorrectAnswers(branch: SPPTBranch): NrOfCorrectAnswers {
        // console.log('transformNrOfCorrectAnswers called: ' + branch.name);

        const children = this.mainAnalyser.getChildren(branch);
        return NrOfCorrectAnswers.create({
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * NumberLiteralExpression = numberLiteral ;
     * @param branch
     * @private
     */
    public transformNumberLiteralExpression(branch: SPPTBranch): NumberLiteralExpression {
        // console.log('transformNumberLiteralExpression called: ' + branch.name);
        let __value: number;
        const children = this.mainAnalyser.getChildren(branch);
        __value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]); // RHSPrimEntry

        return NumberLiteralExpression.create({
            value: __value,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * Video = '----------------------------------------------------'
     *	 'Video' identifier
     *	 'Maybe' 'this' 'video' 'will' 'help' 'you' 'understand.'
     *	 stringLiteral
     *	 'Questions:' Question* 'Score' GradeScore* ;
     * @param branch
     * @private
     */
    public transformVideo(branch: SPPTBranch): Video {
        // console.log('transformVideo called: ' + branch.name);
        let __name: string;
        let __url: string;
        let __questions: Question[];
        let __grading: GradeScore[];
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        __url = this.mainAnalyser.transformSharedPackedParseTreeNode(children[10]); // RHSPrimEntry
        // RHSPartListEntry
        if (children[12].name !== "Question") {
            __questions = this.mainAnalyser.transformSharedPackedParseTreeList<Question>(children[12]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __questions = [];
            for (const child of children) {
                __questions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[14].name !== "GradeScore") {
            __grading = this.mainAnalyser.transformSharedPackedParseTreeList<GradeScore>(children[14]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __grading = [];
            for (const child of children) {
                __grading.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return Video.create({
            name: __name,
            url: __url,
            questions: __questions,
            grading: __grading,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * WorkSheet = '----------------------------------------------------'
     *	 'Worksheet' identifier
     *	 'See' 'if' 'you' 'can' 'answer' 'the' 'following' 'questions.'
     *	 'Questions:' Question* 'Score' GradeScore* ;
     * @param branch
     * @private
     */
    public transformWorkSheet(branch: SPPTBranch): WorkSheet {
        // console.log('transformWorkSheet called: ' + branch.name);
        let __name: string;
        let __questions: Question[];
        let __grading: GradeScore[];
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        // RHSPartListEntry
        if (children[12].name !== "Question") {
            __questions = this.mainAnalyser.transformSharedPackedParseTreeList<Question>(children[12]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __questions = [];
            for (const child of children) {
                __questions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[14].name !== "GradeScore") {
            __grading = this.mainAnalyser.transformSharedPackedParseTreeList<GradeScore>(children[14]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __grading = [];
            for (const child of children) {
                __grading.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return WorkSheet.create({
            name: __name,
            questions: __questions,
            grading: __grading,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * ExamplePage = '----------------------------------------------------'
     *	 'Example' identifier
     *	 Line*
     *	 'Now,' 'please,' 'answer' 'the' 'following' 'questions.'
     *	 'Questions:' Question* 'Score' GradeScore* ;
     * @param branch
     * @private
     */
    public transformExamplePage(branch: SPPTBranch): ExamplePage {
        // console.log('transformExamplePage called: ' + branch.name);
        let __name: string;
        let __content: Line[];
        let __questions: Question[];
        let __grading: GradeScore[];
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        // RHSPartListEntry
        if (children[3].name !== "Line") {
            __content = this.mainAnalyser.transformSharedPackedParseTreeList<Line>(children[3]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __content = [];
            for (const child of children) {
                __content.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[11].name !== "Question") {
            __questions = this.mainAnalyser.transformSharedPackedParseTreeList<Question>(children[11]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __questions = [];
            for (const child of children) {
                __questions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[13].name !== "GradeScore") {
            __grading = this.mainAnalyser.transformSharedPackedParseTreeList<GradeScore>(children[13]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __grading = [];
            for (const child of children) {
                __grading.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return ExamplePage.create({
            name: __name,
            content: __content,
            questions: __questions,
            grading: __grading,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * InDepthMaterial = '----------------------------------------------------'
     *	 'InDepthMaterial' identifier
     *	 Line*
     *	 'Test' 'your' 'understanding' 'by' 'answering' 'the' 'following' 'questions.'
     *	 'Questions:' Question* 'Score' GradeScore* ;
     * @param branch
     * @private
     */
    public transformInDepthMaterial(branch: SPPTBranch): InDepthMaterial {
        // console.log('transformInDepthMaterial called: ' + branch.name);
        let __name: string;
        let __content: Line[];
        let __questions: Question[];
        let __grading: GradeScore[];
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        // RHSPartListEntry
        if (children[3].name !== "Line") {
            __content = this.mainAnalyser.transformSharedPackedParseTreeList<Line>(children[3]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __content = [];
            for (const child of children) {
                __content.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[13].name !== "Question") {
            __questions = this.mainAnalyser.transformSharedPackedParseTreeList<Question>(children[13]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __questions = [];
            for (const child of children) {
                __questions.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        } // RHSPartListEntry
        if (children[15].name !== "GradeScore") {
            __grading = this.mainAnalyser.transformSharedPackedParseTreeList<GradeScore>(children[15]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __grading = [];
            for (const child of children) {
                __grading.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return InDepthMaterial.create({
            name: __name,
            content: __content,
            questions: __questions,
            grading: __grading,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * Page = Theory
     *    | WorkSheet
     *    | ExamplePage
     *    | InDepthMaterial
     *    | Video  ;
     * @param branch
     * @private
     */
    public transformPage(branch: SPPTBranch): Page {
        // console.log('transformPage called: ' + branch.name);
        return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
    }

    /**
     * Method to transform branches that match the following rule:
     * ScoreExpression = QuestionReference
     *    | NrOfCorrectAnswers
     *    | NumberLiteralExpression
     *    | __fre_binary_ScoreExpression ;
     * @param branch
     * @private
     */
    public transformScoreExpression(branch: SPPTBranch): ScoreExpression {
        // console.log('transformScoreExpression called: ' + branch.name);
        return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
    }

    /**
     * Generic method to transform binary expressions, which are parsed
     * according to these rules:
     * __fre_binary_ScoreExpression = [ScoreExpression / __fre_binary_operator]2+ ;
     * leaf __fre_binary_operator = 'and' | 'or' | '<=' | '>=' | '==' | '<' | '>' ;
     *
     * In this method we build a crooked tree, which in a later phase needs to be balanced
     * according to the priorities of the operators.
     * @param branch
     * @private
     */
    public transform__fre_binary_ScoreExpression(branch: SPPTBranch): ScoreExpression {
        // console.log('transform__fre_binary_ScoreExpression called: ' + branch.name);
        const children = branch.nonSkipChildren.toArray();
        let index = 0;
        let first = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
        while (index < children.length) {
            let operator = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
            let second = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
            let combined: ScoreExpression = null;
            switch (operator) {
                case "and": {
                    combined = AndExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
                    break;
                }
                case "or": {
                    combined = OrExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
                    break;
                }
                case "<=": {
                    combined = LessOrEqualsExpression.create({
                        left: first,
                        right: second,
                        parseLocation: this.mainAnalyser.location(branch),
                    });
                    break;
                }
                case ">=": {
                    combined = GreaterOrEqualsExpression.create({
                        left: first,
                        right: second,
                        parseLocation: this.mainAnalyser.location(branch),
                    });
                    break;
                }
                case "<": {
                    combined = LessThenExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
                    break;
                }
                case ">": {
                    combined = GreaterThenExpression.create({
                        left: first,
                        right: second,
                        parseLocation: this.mainAnalyser.location(branch),
                    });
                    break;
                }
                case "==": {
                    combined = EqualsExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
                    break;
                }
                default: {
                    combined = null;
                }
            }
            first = combined;
        }
        return first;
    }
}
