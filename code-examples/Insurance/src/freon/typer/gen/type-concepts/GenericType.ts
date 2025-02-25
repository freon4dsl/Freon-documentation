// Generated by the Freon Language Generator.
import { FreUtils, FreWriter, FreParseLocation, FreType, FreNode } from "@freon4dsl/core";
import { GenericKind } from "../../../language/gen/index.js";

/**
 * Class GenericType is the implementation of the type concept with the same name in the typer definition file.
 */
export class GenericType implements FreType {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<GenericType>): GenericType {
        const result = new GenericType(data.$id);
        if (!!data.base) {
            result.base = data.base;
        }
        if (!!data.kind) {
            result.kind = data.kind;
        } else {
            result.kind = GenericKind.create({});
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "GenericType"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed

    base: FreType; // implementation of part 'base'
    kind: GenericKind; // implementation of part 'kind'

    constructor(id?: string) {
        if (!!id) {
            this.$id = id;
        } else {
            this.$id = FreUtils.ID(); // uuid.v4();
        }
    }
    /**
     * A convenience method that copies this instance into a new object.
     */
    copy(): GenericType {
        const result = new GenericType();
        if (!!this.base) {
            result.base = this.base.copy();
        }
        if (!!this.kind) {
            result.kind = this.kind.copy();
        }
        return result;
    }

    toFreString(writer: FreWriter): string {
        // take into account indentation
        return `GenericType [
    base: ${this.base?.toFreString(writer)},
	kind: ${writer.writeToString(this.kind)}
]`;
    }

    toAstElement(): FreNode {
        return null;
    }
}
