---
title: Validator
description: Learn how Freon defines and enforces validation rules to ensure model consistency, including simple value checks, list rules, identifier validation, type checks, and custom error messages.
tags: validation, validator, rules, constraints, type checking, error messages, Freon, DSL development, metamodel
---

# Validator

[//]: # (TODO check what the default validations are)

Validation defines the rules that must hold in your language. These are not syntax rules 
but additional checks on the model or Abstract Syntax Tree (AST).

The **validator** definition provides the constraints or rules that should be true in the models built by your users. 
Any part of the validator
definition must be included in a file with the extension `.valid`. All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3)
(i.e. the folder containing your definition files) are combined into one validator definition.

Freon supports four types of validation rules.

## Simple Value Rules

A simple value rule defines constraints on the value of a single property. Given a [simple property](/Documentation/Creating_the_Metamodel/Defining_Properties#simple-properties-2),
its value can be restricted to a specified range or set of values.

```proto
// Insurance/src/defs/validator-extras.valid#L3-L6

EntityAttribute {
    self.numVal >= 12;       // in .ast file: "numVal: number;"
    self.numVal <= 30;
}
```

## List Rules

Given a list property, a **not-empty rule** can be stated. The rule is satisfied when the list 
contains at least one element.

An **is-unique rule** is another rule that can be stated for a list property. The rule is satisfied 
when the given property is unique within the list.

```proto
// Insurance/src/defs/validator-docu.valid#L3-L7

InsuranceProduct {
    notEmpty self.parts;
    in self.parts isunique name;
    in self.helpers isunique name;
}
```

## Valid Identifier Rules

Given a simple property of type `identifier`, a **valid-identifier-rule** can be given. The property complies with the
rule if it is a valid identifier according to the TypeScript definition.

For a _valid-identifier-rule_ the `validIdentifier` keyword is used followed by an optional simple property. When the
property is present, this property is checked. If the property is omitted, Freon assumes and checks a default simple property 
named `name` of type `identifier`.

```proto
// Insurance/src/defs/validator-docu.valid#L27-L32

}
CalcFunction {
    // typecheck conformsTo (self.body, self.declaredType);
    in self.parameters isunique name;
    validIdentifier
    {
```

## Type Check Rules

Based on the typing rules defined in the [typer](/Documentation/Typing_and_Validation/Type_Provider), rules can be stated to ensure type compliance.
To indicate a **type checking rule** the keyword `typecheck` is used, followed by either `equalsType` or `conformsTo`.
**`equalsType`** requires both properties to have identical types, while **`conformsTo`** allows the first to conform to the second.

In type checking rules it is possible to use predefined instances of a limited concept.

```proto
// Insurance/src/defs/validator-docu.valid#L10-L12

MinusExpression  {
    typecheck equalsType( self.left, self.right );
}
```

## Custom Messages

Generated error messages can be customized. Similar to the editor definition,
properties can be used in the error message using the syntax `${propName}`.
Optionally, a severity level can be specified. The possible values are "error", "warning", 
"hint", "improvement", "todo", and "info". If omitted, the severity defaults to "todo".

```proto
// Insurance/src/defs/validator-docu.valid#L28-L36

CalcFunction {
    // typecheck conformsTo (self.body, self.declaredType);
    in self.parameters isunique name;
    validIdentifier
    {
        message: "El nombre '${self.name}' no es un identificador correcto.",
        severity: error
    };
}
```

# Default Validation Rules

Freon automatically applies the following default validation rules:

- Non-optional properties must be set.
- Non-optional lists must contain at least one element.
- Names of model units must be valid identifiers.
- Any reference must resolve to an existing element.
