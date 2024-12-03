// Generated by the Freon Language Generator.
import {
    MobxModelElementImpl,
    observableprim,
    observablepart,
    observablepartlist,
    FreModelUnit,
    FreParseLocation,
    FreNodeReference,
    FreUtils,
    matchElementList,
} from "@freon4dsl/core";
import { FlowRule, Topic } from "./internal.js";

/**
 * Class Flow is the implementation of the model unit with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export class Flow extends MobxModelElementImpl implements FreModelUnit {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<Flow>): Flow {
        const result = new Flow(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.rules) {
            data.rules.forEach((x) => result.rules.push(x));
        }
        if (!!data.topic) {
            result.topic = data.topic;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    fileExtension: string = "";
    readonly $typename: string = "Flow"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    rules: FlowRule[]; // implementation of part 'rules'
    topic: FreNodeReference<Topic>; // implementation of reference 'topic'

    constructor(id?: string) {
        super();
        if (!!id) {
            this.$id = id;
        } else {
            this.$id = FreUtils.ID(); // uuid.v4();
        }
        // Both 'observableprim' and 'observableprimlist' change the get and set of the attribute
        // such that the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observableprim(this, "name");
        this.name = "";

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepartlist(this, "rules");
        observablepart(this, "topic");
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    freLanguageConcept(): string {
        return this.$typename;
    }

    /**
     * Returns the unique identifier of this instance.
     */
    freId(): string {
        return this.$id;
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
        return true;
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
    copy(): Flow {
        const result = new Flow();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.rules) {
            this.rules.forEach((x) => result.rules.push(x.copy()));
        }
        if (!!this.topic) {
            result.topic = this.topic.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<Flow>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.rules) {
            result = result && matchElementList(this.rules, toBeMatched.rules);
        }
        if (result && !!toBeMatched.topic) {
            result = result && this.topic.match(toBeMatched.topic);
        }
        return result;
    }
}
