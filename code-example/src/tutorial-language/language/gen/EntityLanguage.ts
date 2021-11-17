// Generated by the ProjectIt Language Generator.
import { Language, Model, ModelUnit, Property, Concept, Interface } from "@projectit/core";

import {
    EntityModel,
    SomeOtherModelUnit,
    EntityModelUnit,
    Entity,
    AttributeType,
    MockEnumeration,
    AbsExpression,
    MultiplyExpression,
    EntityFunction,
    AttributeWithLimitedType,
    Text,
    AttributeWithEntityType,
    Variable,
    EntityExpression,
    AppliedFeature,
    AttributeRef,
    VariableRef,
    LiteralExpression,
    StringLiteralExpression,
    NumberLiteralExpression,
    BooleanLiteralExpression,
    BinaryExpression,
    PlusExpression,
    DivideExpression,
    AndExpression,
    OrExpression,
    ComparisonExpression,
    LessThenExpression,
    GreaterThenExpression,
    EqualsExpression,
    FunctionCallExpression,
    IfExpression,
    PiElementReference
} from "./internal";

/**
 * Creates an in-memory representation of structure of the language metamodel, used in e.g. the (de)serializer.
 */
export function initializeLanguage() {
    Language.getInstance().addModel(describeEntityModel());
    Language.getInstance().addUnit(describeSomeOtherModelUnit());
    Language.getInstance().addUnit(describeEntityModelUnit());
    Language.getInstance().addConcept(describeEntity());
    Language.getInstance().addConcept(describeAttributeType());
    Language.getInstance().addConcept(describeMockEnumeration());
    Language.getInstance().addConcept(describeAbsExpression());
    Language.getInstance().addConcept(describeMultiplyExpression());
    Language.getInstance().addConcept(describeEntityFunction());
    Language.getInstance().addConcept(describeAttributeWithLimitedType());
    Language.getInstance().addConcept(describeText());
    Language.getInstance().addConcept(describeAttributeWithEntityType());
    Language.getInstance().addConcept(describeVariable());
    Language.getInstance().addConcept(describeEntityExpression());
    Language.getInstance().addConcept(describeAppliedFeature());
    Language.getInstance().addConcept(describeAttributeRef());
    Language.getInstance().addConcept(describeVariableRef());
    Language.getInstance().addConcept(describeLiteralExpression());
    Language.getInstance().addConcept(describeStringLiteralExpression());
    Language.getInstance().addConcept(describeNumberLiteralExpression());
    Language.getInstance().addConcept(describeBooleanLiteralExpression());
    Language.getInstance().addConcept(describeBinaryExpression());
    Language.getInstance().addConcept(describePlusExpression());
    Language.getInstance().addConcept(describeDivideExpression());
    Language.getInstance().addConcept(describeAndExpression());
    Language.getInstance().addConcept(describeOrExpression());
    Language.getInstance().addConcept(describeComparisonExpression());
    Language.getInstance().addConcept(describeLessThenExpression());
    Language.getInstance().addConcept(describeGreaterThenExpression());
    Language.getInstance().addConcept(describeEqualsExpression());
    Language.getInstance().addConcept(describeFunctionCallExpression());
    Language.getInstance().addConcept(describeIfExpression());
    Language.getInstance().addInterface(describeBaseType());
    Language.getInstance().addInterface(describeType());
    Language.getInstance().addReferenceCreator((name: string, type: string) => {
        return !!name ? PiElementReference.create(name, type) : null;
    });
}

function describeEntityModel(): Model {
    const model = {
        typeName: "EntityModel",
        constructor: () => {
            return new EntityModel();
        },
        properties: new Map<string, Property>()
    };
    model.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    model.properties.set("units", {
        name: "units",
        type: "EntityModelUnit",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    model.properties.set("extraUnit", {
        name: "extraUnit",
        type: "SomeOtherModelUnit",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return model;
}

function describeSomeOtherModelUnit(): ModelUnit {
    const modelunit = {
        typeName: "SomeOtherModelUnit",
        fileExtension: "som",
        constructor: () => {
            return new SomeOtherModelUnit();
        },
        properties: new Map<string, Property>()
    };
    modelunit.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: true,
        propertyType: "primitive"
    });
    modelunit.properties.set("somePart", {
        name: "somePart",
        type: "Entity",
        isList: false,
        isPublic: true,
        propertyType: "part"
    });

    return modelunit;
}

function describeEntityModelUnit(): ModelUnit {
    const modelunit = {
        typeName: "EntityModelUnit",
        fileExtension: "ent",
        constructor: () => {
            return new EntityModelUnit();
        },
        properties: new Map<string, Property>()
    };
    modelunit.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: true,
        propertyType: "primitive"
    });
    modelunit.properties.set("functions", {
        name: "functions",
        type: "EntityFunction",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    modelunit.properties.set("entities", {
        name: "entities",
        type: "Entity",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });

    return modelunit;
}

function describeEntity(): Concept {
    const concept = {
        typeName: "Entity",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new Entity();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("isCompany", {
        name: "isCompany",
        type: "boolean",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("simpleprop", {
        name: "simpleprop",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("baseInterface_attr", {
        name: "baseInterface_attr",
        type: "number",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("attributes", {
        name: "attributes",
        type: "AttributeWithLimitedType",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("entAttributes", {
        name: "entAttributes",
        type: "AttributeWithEntityType",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("functions", {
        name: "functions",
        type: "EntityFunction",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("int_attrs", {
        name: "int_attrs",
        type: "AttributeWithLimitedType",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("int_functions", {
        name: "int_functions",
        type: "EntityFunction",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("baseEntity", {
        name: "baseEntity",
        type: "Entity",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    concept.properties.set("baseInterface", {
        name: "baseInterface",
        type: "Entity",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeAttributeType(): Concept {
    const concept = {
        typeName: "AttributeType",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new AttributeType();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("extra", {
        name: "extra",
        type: "number",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("baseInterface_attr", {
        name: "baseInterface_attr",
        type: "number",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });

    return concept;
}

function describeMockEnumeration(): Concept {
    const concept = {
        typeName: "MockEnumeration",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new MockEnumeration();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });

    return concept;
}

function describeAbsExpression(): Concept {
    const concept = {
        typeName: "AbsExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new AbsExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "EntityExpression",
        subConceptNames: []
    };

    concept.properties.set("expr", {
        name: "expr",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeMultiplyExpression(): Concept {
    const concept = {
        typeName: "MultiplyExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new MultiplyExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "BinaryExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeEntityFunction(): Concept {
    const concept = {
        typeName: "EntityFunction",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new EntityFunction();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("aliases", {
        name: "aliases",
        type: "string",
        isList: true,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("expression", {
        name: "expression",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("parameters", {
        name: "parameters",
        type: "Variable",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("declaredType", {
        name: "declaredType",
        type: "Type",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeAttributeWithLimitedType(): Concept {
    const concept = {
        typeName: "AttributeWithLimitedType",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new AttributeWithLimitedType();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });

    concept.properties.set("declaredType", {
        name: "declaredType",
        type: "AttributeType",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeText(): Concept {
    const concept = {
        typeName: "Text",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new Text();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };

    return concept;
}

function describeAttributeWithEntityType(): Concept {
    const concept = {
        typeName: "AttributeWithEntityType",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new AttributeWithEntityType();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });

    concept.properties.set("declaredType", {
        name: "declaredType",
        type: "Entity",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeVariable(): Concept {
    const concept = {
        typeName: "Variable",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new Variable();
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: []
    };
    concept.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });

    concept.properties.set("declaredType", {
        name: "declaredType",
        type: "Entity",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeEntityExpression(): Concept {
    const concept = {
        typeName: "EntityExpression",
        isAbstract: true,
        isPublic: false,
        constructor: () => {
            return null;
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: [
            "AbsExpression",
            "MultiplyExpression",
            "VariableRef",
            "LiteralExpression",
            "StringLiteralExpression",
            "NumberLiteralExpression",
            "BooleanLiteralExpression",
            "BinaryExpression",
            "PlusExpression",
            "DivideExpression",
            "AndExpression",
            "OrExpression",
            "ComparisonExpression",
            "LessThenExpression",
            "GreaterThenExpression",
            "EqualsExpression",
            "FunctionCallExpression",
            "IfExpression"
        ]
    };

    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeAppliedFeature(): Concept {
    const concept = {
        typeName: "AppliedFeature",
        isAbstract: true,
        isPublic: false,
        constructor: () => {
            return null;
        },
        properties: new Map<string, Property>(),
        baseName: null,
        subConceptNames: ["AttributeRef"]
    };

    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeAttributeRef(): Concept {
    const concept = {
        typeName: "AttributeRef",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new AttributeRef();
        },
        properties: new Map<string, Property>(),
        baseName: "AppliedFeature",
        subConceptNames: []
    };

    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("attribute", {
        name: "attribute",
        type: "AttributeWithEntityType",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeVariableRef(): Concept {
    const concept = {
        typeName: "VariableRef",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new VariableRef();
        },
        properties: new Map<string, Property>(),
        baseName: "EntityExpression",
        subConceptNames: []
    };

    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("variable", {
        name: "variable",
        type: "Variable",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeLiteralExpression(): Concept {
    const concept = {
        typeName: "LiteralExpression",
        isAbstract: true,
        isPublic: false,
        constructor: () => {
            return null;
        },
        properties: new Map<string, Property>(),
        baseName: "EntityExpression",
        subConceptNames: ["StringLiteralExpression", "NumberLiteralExpression", "BooleanLiteralExpression"]
    };

    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeStringLiteralExpression(): Concept {
    const concept = {
        typeName: "StringLiteralExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new StringLiteralExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "LiteralExpression",
        subConceptNames: []
    };
    concept.properties.set("value", {
        name: "value",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeNumberLiteralExpression(): Concept {
    const concept = {
        typeName: "NumberLiteralExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new NumberLiteralExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "LiteralExpression",
        subConceptNames: []
    };
    concept.properties.set("value", {
        name: "value",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeBooleanLiteralExpression(): Concept {
    const concept = {
        typeName: "BooleanLiteralExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new BooleanLiteralExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "LiteralExpression",
        subConceptNames: []
    };
    concept.properties.set("value", {
        name: "value",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeBinaryExpression(): Concept {
    const concept = {
        typeName: "BinaryExpression",
        isAbstract: true,
        isPublic: false,
        constructor: () => {
            return null;
        },
        properties: new Map<string, Property>(),
        baseName: "EntityExpression",
        subConceptNames: [
            "MultiplyExpression",
            "PlusExpression",
            "DivideExpression",
            "AndExpression",
            "OrExpression",
            "ComparisonExpression",
            "LessThenExpression",
            "GreaterThenExpression",
            "EqualsExpression"
        ]
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describePlusExpression(): Concept {
    const concept = {
        typeName: "PlusExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new PlusExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "BinaryExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeDivideExpression(): Concept {
    const concept = {
        typeName: "DivideExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new DivideExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "BinaryExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeAndExpression(): Concept {
    const concept = {
        typeName: "AndExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new AndExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "BinaryExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeOrExpression(): Concept {
    const concept = {
        typeName: "OrExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new OrExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "BinaryExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeComparisonExpression(): Concept {
    const concept = {
        typeName: "ComparisonExpression",
        isAbstract: true,
        isPublic: false,
        constructor: () => {
            return null;
        },
        properties: new Map<string, Property>(),
        baseName: "BinaryExpression",
        subConceptNames: ["LessThenExpression", "GreaterThenExpression", "EqualsExpression"]
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeLessThenExpression(): Concept {
    const concept = {
        typeName: "LessThenExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new LessThenExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "ComparisonExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeGreaterThenExpression(): Concept {
    const concept = {
        typeName: "GreaterThenExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new GreaterThenExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "ComparisonExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeEqualsExpression(): Concept {
    const concept = {
        typeName: "EqualsExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new EqualsExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "ComparisonExpression",
        subConceptNames: []
    };

    concept.properties.set("left", {
        name: "left",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("right", {
        name: "right",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeFunctionCallExpression(): Concept {
    const concept = {
        typeName: "FunctionCallExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new FunctionCallExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "EntityExpression",
        subConceptNames: []
    };

    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("functionDefinition", {
        name: "functionDefinition",
        type: "EntityFunction",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return concept;
}

function describeIfExpression(): Concept {
    const concept = {
        typeName: "IfExpression",
        isAbstract: false,
        isPublic: false,
        constructor: () => {
            return new IfExpression();
        },
        properties: new Map<string, Property>(),
        baseName: "EntityExpression",
        subConceptNames: []
    };

    concept.properties.set("condition", {
        name: "condition",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("whenTrue", {
        name: "whenTrue",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("whenFalse", {
        name: "whenFalse",
        type: "EntityExpression",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });
    concept.properties.set("appliedfeature", {
        name: "appliedfeature",
        type: "AppliedFeature",
        isList: false,
        isPublic: false,
        propertyType: "part"
    });

    return concept;
}

function describeBaseType(): Interface {
    const intface = {
        typeName: "BaseType",
        isPublic: false,
        properties: new Map<string, Property>(),
        subConceptNames: ["Entity", "AttributeType"]
    };
    intface.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    intface.properties.set("baseInterface_attr", {
        name: "baseInterface_attr",
        type: "number",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });

    return intface;
}

function describeType(): Interface {
    const intface = {
        typeName: "Type",
        isPublic: false,
        properties: new Map<string, Property>(),
        subConceptNames: ["Entity"]
    };
    intface.properties.set("simpleprop", {
        name: "simpleprop",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    intface.properties.set("name", {
        name: "name",
        type: "string",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    intface.properties.set("baseInterface_attr", {
        name: "baseInterface_attr",
        type: "number",
        isList: false,
        isPublic: false,
        propertyType: "primitive"
    });
    intface.properties.set("int_attrs", {
        name: "int_attrs",
        type: "AttributeWithLimitedType",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    intface.properties.set("int_functions", {
        name: "int_functions",
        type: "EntityFunction",
        isList: true,
        isPublic: false,
        propertyType: "part"
    });
    intface.properties.set("baseInterface", {
        name: "baseInterface",
        type: "Entity",
        isList: false,
        isPublic: false,
        propertyType: "reference"
    });
    return intface;
}