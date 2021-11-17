// Generated by the ProjectIt Language Generator.
import { PiTyper } from "@projectit/core";
import { EntityEveryConcept, BaseType } from "../../language/gen";
import { projectitConfiguration } from "../../projectit/ProjectitConfiguration";
import { EntityTyperPart } from "./EntityTyperPart";

/**
 * Class EntityTyper implements the typer generated from, if present, the typer definition,
 * otherwise this class implements the default typer.
 */
export class EntityTyper implements PiTyper {
    /**
     * See interface
     */
    public equalsType(elem1: EntityEveryConcept, elem2: EntityEveryConcept): boolean {
        for (const typer of projectitConfiguration.customTypers) {
            let result: boolean = typer.equalsType(elem1, elem2);
            if (result !== null) {
                return result;
            }
        }
        // no result from custom typers => use the generated typer
        return new EntityTyperPart().equalsType(elem1, elem2);
    }

    /**
     * See interface
     */
    public inferType(modelelement: EntityEveryConcept): BaseType {
        for (const typer of projectitConfiguration.customTypers) {
            let result: BaseType = typer.inferType(modelelement) as BaseType;
            if (result !== null) {
                return result;
            }
        }
        // no result from custom typers => use the generated typer
        return new EntityTyperPart().inferType(modelelement);
    }

    /**
     * See interface
     */
    public conformsTo(elem1: BaseType, elem2: BaseType): boolean {
        for (const typer of projectitConfiguration.customTypers) {
            let result: boolean = typer.conformsTo(elem1, elem2);
            if (result !== null) {
                return result;
            }
        }
        // no result from custom typers => use the generated typer
        return new EntityTyperPart().conformsTo(elem1, elem2);
    }

    /**
     * See interface
     */
    public conformList(typelist1: BaseType[], typelist2: BaseType[]): boolean {
        for (const typer of projectitConfiguration.customTypers) {
            let result: boolean = typer.conformList(typelist1, typelist2);
            if (result !== null) {
                return result;
            }
        }
        // no result from custom typers => use the generated typer
        return new EntityTyperPart().conformList(typelist1, typelist2);
    }

    /**
     * See interface
     */
    public isType(elem: EntityEveryConcept): boolean {
        // entries for all types marked as @isType
        for (const typer of projectitConfiguration.customTypers) {
            let result: boolean = typer.isType(elem);
            if (result) {
                return result;
            }
        }
        // no result from custom typers => use the generated typer
        return new EntityTyperPart().isType(elem);
    }
}