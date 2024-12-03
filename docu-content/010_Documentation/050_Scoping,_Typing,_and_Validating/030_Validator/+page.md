# Validator

Validation is all about the rules that hold in your language. These rules are not the rules
of the concrete syntax, but instead they provide an extra check of the model/AST.

The **validator** definition provides the constraints or rules that should be true in the models build by your users. 
Any part of the validator
definition must be included in a file with the extension `.valid`. All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3)
(i.e. the folder were you keep your definition files) are combined into one validator definition.

Currently, there are four types of validation rules.

## Simple Value Rules

Given a [simple property](/Documentation/Creating_the_Metamodel/Defining_Properties#simple-properties-2), 
its value can be limited to certain values.

```ts
// DocuProject/src/defs/validator-extras.valid#L3-L6

EntityAttribute {
    self.numVal >= 12;       // in .ast file: "numVal: number;"
    self.numVal <= 30;
}
```

## List Rules

Given a list property, a **not-empty rule** can be stated. The list complies with the rule if it is not empty.

An **is-unique rule** is another rule that can be stated for a list property. The list
complies when the value of the property is unique within the list.

```ts
// DocuProject/src/defs/validator-docu.valid#L3-L7

InsuranceProduct {
    notEmpty self.parts;
    isunique name in self.parts;
    isunique name in self.helpers;
}
```

## Valid Identifier Rules

Given a simple property of type _identifier_, a **valid-identifier-rule** can be given. The property complies with the
rule if it is a valid identifier according to the TypeScript definition.

For a _valid-identifier-rule_ the `validIdentifier` keyword is used followed by an optional simple property. When the
property is present, this property is checked. When the property is not present, Freon assumes that the
concept has a simple property named ‘`name`’ of type ‘`identifier`’, and it will check this property.

```ts
// DocuProject/src/defs/validator-docu.valid#L27-L32

}
CalcFunction {
    // typecheck conformsTo (self.body, self.declaredType);
    isunique name in self.parameters;
    validIdentifier
    {
```

## Type Check Rules

Given the rules in the typer definition, rules can be stated to ensure type compliance.
To indicate a **type checking rule** the keyword `typecheck` is used, followed by either `equalsType` or `conformsTo`.
The first demands that the types of the two properties given are equal. The second demands that the type of the first
conforms to the type of the second.

In type checking rules it is possible to use predefined instances of a limited concept.

```ts
// DocuProject/src/defs/validator-docu.valid#L10-L12

MinusExpression  {
    typecheck equalsType( self.left, self.right );
}
```

## Custom Messages

The generated error messages can be changed into custom ones. Similar to the editor definition,
properties can be used in the error message using the syntax `${propName}`.

[//]: # (todo add text about severity)

```ts
// DocuProject/src/defs/validator-docu.valid#L28-L36

CalcFunction {
    // typecheck conformsTo (self.body, self.declaredType);
    isunique name in self.parameters;
    validIdentifier
    {
        message: "El nombre '${self.name}' no es un identificador correcto.",
        severity: error
    };
}
```

# The Default Validation Rules

There are just a few default validation rules:

- Non-optional properties must be set.
- Non-optional lists must include one element.
- Names of model units should be valid identifiers.
- Any reference must be present.
