---
title: Terminology
description: Key terms and definitions used across Freon’s typing, validation, and generation system. This section provides quick explanations of important Freon concepts and command-line terminology.
tags: terminology, glossary, typing, validation, language definition, Freon, metamodel, DSL development
---

# Terminology

This section provides definitions of important terms used in Freon’s documentation.  
It focuses on the concepts introduced in the **Typing**, **Type Provider**, and **Validator** pages.

---

## Core Concepts

- **Typing** — Determines which elements are valid in specific locations within a model or Abstract Syntax Tree (AST).
- **Validation** — Defines the rules that must hold in a language beyond syntax level, ensuring consistency and correctness of the model.
- **Scoping, Typing, and Validation** — The three main components of Freon’s semantic analysis framework.

---

## Type Provider (Typer)

- **Type Provider (Typer)** — A definition (`.type`) file that specifies typing rules for a language.
- **Typed Metamodel** — A metamodel that enforces type correctness through explicit type definitions.
- **Type Concept** — A specialized concept that represents a type in the language and implements `FreType`.
- **Type Concept Definition** — A simplified concept definition restricted to other type concepts or limited references.
- **isType Rule** — Declares which AST concepts are recognized as types.
- **hasType Rule** — Identifies which AST concepts or interfaces have an associated type.
- **Inference Rule** — Defines how to determine the type of a term, e.g. `infertype self.declaredType;`.
- **Type Equality and Conformance Rules** — Rules describing when types are equal (`equalsto`) or when one type conforms to another (`conformsto`).
- **Limited Concept** — A predefined enumeration-like concept whose instances can be used in typer rules.
- **FreType Interface** — The common interface implemented by all type concepts in Freon.
- **Anytype Rule** — A general conformance rule that applies to all concepts.
- **Type Comparison** — Type concept instances cannot be compared by identity; comparison must use `equalsto` or `conformsto`.

---

## Validator

- **Validator Definition** — A `.valid` file containing the validation rules applied to models built by the user.
- **Validation Rules** — Constraints ensuring that the model follows domain-specific semantics rather than just syntax.
- **Simple Value Rule** — Restricts a property to specific values or numeric ranges.
- **List Rule** — Ensures lists are not empty (`notEmpty`) and contain unique elements (`isunique`).
- **Valid Identifier Rule** — Checks whether identifiers follow TypeScript’s identifier rules (`validIdentifier`).
- **Type Check Rule** — Verifies that two elements have compatible or identical types (`typecheck equalsType` or `typecheck conformsTo`).
- **Custom Message Rule** — Allows custom error messages and severity levels (`message`, `severity`).
- **Default Validation Rules** — Automatically enforced checks, such as required properties, valid references, and non-empty lists.
- **Severity Levels** — Possible values: `error`, `warning`, `hint`, `improvement`, `todo`, and `info`.

---

## Command Reference

- **freon type-it** — Generates typing code from `.type` definition files.
- **freon validate-it** — Generates validation code from `.valid` definition files.
- **freon all** — Generates all dependent components in the correct order, ensuring compilable and consistent output.

---

