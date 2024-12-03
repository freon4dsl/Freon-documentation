// Generated by the Freon Language Generator.
import { observablepartlist, FreNode, FreParseLocation, matchElementList } from "@freon4dsl/core";
import { Page, Line, GradeList } from "./internal.js";

/**
 * Class InDepthMaterial is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class InDepthMaterial extends Page implements FreNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<InDepthMaterial>): InDepthMaterial {
        const result = new InDepthMaterial(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.content) {
            data.content.forEach((x) => result.content.push(x));
        }
        if (!!data.questions) {
            data.questions.forEach((x) => result.questions.push(x));
        }
        if (!!data.grading) {
            result.grading = data.grading;
        } else {
            result.grading = GradeList.create({});
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "InDepthMaterial"; // holds the metatype in the form of a string

    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed

    content: Line[]; // implementation of part 'content'

    constructor(id?: string) {
        super(id);

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepartlist(this, "content");
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    freLanguageConcept(): string {
        return this.$typename;
    }

    /**
     * Returns true if this instance is a model concept.
     */
    freIsModel(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a model unit.
     */
    freIsUnit(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is an expression concept.
     */
    freIsExpression(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a binary expression concept.
     */
    freIsBinaryExpression(): boolean {
        return false;
    }
    /**
     * A convenience method that copies this instance into a new object.
     */
    copy(): InDepthMaterial {
        const result = new InDepthMaterial();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.content) {
            this.content.forEach((x) => result.content.push(x.copy()));
        }
        if (!!this.questions) {
            this.questions.forEach((x) => result.questions.push(x.copy()));
        }
        if (!!this.grading) {
            result.grading = this.grading.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<InDepthMaterial>): boolean {
        let result: boolean = super.match(toBeMatched);
        if (result && !!toBeMatched.content) {
            result = result && matchElementList(this.content, toBeMatched.content);
        }
        return result;
    }
}
