// Generated by the Freon Language Generator.
import { observableprim, FreNode, FreParseLocation } from "@freon4dsl/core";
import { Page, GradeList } from "./internal.js";

/**
 * Class Video is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class Video extends Page implements FreNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<Video>): Video {
        const result = new Video(data.$id);
        if (!!data.url) {
            result.url = data.url;
        }
        if (!!data.name) {
            result.name = data.name;
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

    readonly $typename: string = "Video"; // holds the metatype in the form of a string

    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    url: string; // implementation of url

    constructor(id?: string) {
        super(id);
        // Both 'observableprim' and 'observableprimlist' change the get and set of the attribute
        // such that the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observableprim(this, "url");
        this.url = "";
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
    copy(): Video {
        const result = new Video();
        if (!!this.url) {
            result.url = this.url;
        }
        if (!!this.name) {
            result.name = this.name;
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
    public match(toBeMatched: Partial<Video>): boolean {
        let result: boolean = super.match(toBeMatched);
        if (result && toBeMatched.url !== null && toBeMatched.url !== undefined && toBeMatched.url.length > 0) {
            result = result && this.url === toBeMatched.url;
        }
        return result;
    }
}
