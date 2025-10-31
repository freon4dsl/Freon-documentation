---
title: Interpretation Terminology
description: Key terms and definitions used in Freon’s interpreter framework, covering evaluation, runtime objects, contexts, and the Expressions DSL example.
tags: interpretation, terminology, interpreter, evaluation, runtime, context, AST, Freon, DSL development
---

# Interpretation Terminology

This section defines the essential terms used in Freon’s **interpreter framework**.  
It explains the main concepts related to **evaluation**, **runtime handling**, and the **Expressions DSL** example.

---

## Core Interpretation Concepts

- **Interpreter Framework** — Freon’s subsystem that enables the evaluation of DSL models directly from their Abstract Syntax Tree (AST).
- **Interpreter** — A mechanism that traverses and evaluates the AST to compute values or perform actions based on model structure.
- **Evaluation** — The process of computing the value associated with an AST node.
- **Evaluation Function** — A generated or user-defined method that determines the meaning or output of a specific AST node.
- **Interpreter Context** — A runtime data structure that stores variable bindings, constants, and references during evaluation, allowing nested evaluations to access local and parent scopes.
- **Runtime Object (`RtObject`)** — The base class for all runtime results produced by interpretation, ensuring a clear separation between model and runtime layers.
- **Freon Interpreter Framework** — The generated structure that provides default evaluation stubs and context management for DSLs built with Freon.

---

## Meta-Level Concepts

- **M2 Level** — The *language definition* level, describing available concepts in `.ast` files.
- **M1 Level** — The *model level*, containing user-created instances of language concepts (edited in the Freon editor).
- **M0 Level** — The *runtime level*, representing values or results from executing or interpreting M1 models.
- **Meta Levels** — The conceptual separation of model definition (M2), model instance (M1), and runtime execution (M0).

---

## Expression and Function Concepts

- **Expressions DSL** — A sample domain-specific language used to demonstrate Freon’s interpreter functionality.
- **ExpressionUnit** — The model unit containing function definitions and expressions in the Expressions DSL.
- **Numeric Expression** — A basic language construct representing a numerical computation such as addition, subtraction, multiplication, or division.
- **Binary Expression** — An expression with a left and right operand, evaluated recursively.
- **Operator Priority** — Determines the evaluation order of binary expressions within the projectional editor.
- **Function** — A concept representing a definable computation with a body, parameters, and a declared type.
- **Function Call Expression** — An expression that calls a function and provides argument values for its parameters.
- **Parameter Reference (`ParameterRef`)** — A reference to a parameter within an expression or function body, resolved through the interpreter context.

---

## Runtime Object Library

- **Runtime Object Library** — A collection of classes used for representing evaluated runtime values.
- **`RtNumber`** — Represents numeric values at runtime.
- **`RtString`** — Represents string values.
- **`RtBoolean`** — Represents boolean values.
- **`RtArray`** — Represents arrays of runtime objects.
- **`RtError`** — Represents runtime errors encountered during interpretation.
- **Domain-Specific Runtime Class** — A subclass of `RtObject` that models domain-specific runtime behavior.

---

## Execution and Context Handling

- **Context Hierarchy** — A system of parent and child contexts enabling nested evaluations and variable scoping.
- **Function Context** — A child context created when evaluating a function, containing argument-to-parameter bindings.
- **Parameter Lookup** — The process by which the interpreter retrieves a parameter’s current value from the active context.
- **Trace Output** — The display in the Freon editor showing step-by-step evaluation results during interpretation.
- **Selected Node Evaluation** — The behavior where the interpreter evaluates whichever AST node is currently selected in the editor.

---

## Generated Files and Structure

- **`<<LanguageName>>InterpreterBase`** — The generated base class providing one evaluation stub per language concept.
- **`<<LanguageName>>Interpreter.ts`** — The user-editable subclass where language engineers implement specific evaluation logic.
- **Generated Interpreter Files** — The collection of TypeScript files produced by Freon’s code generation step, forming the structure for the DSL interpreter.
- **Evaluation Override** — The act of redefining a generated evaluation function to perform actual interpretation logic.

---

## Conceptual Principles

- **AST-Based Interpretation** — Evaluation performed directly on the AST, without parsing or lexing steps, thanks to Freon’s projectional editor.
- **Projectional Editor Advantage** — Eliminates the need for a lexer or parser since the AST is always available.
- **Model–Runtime Separation** — Ensures that evaluation results (`RtObjects`) remain distinct from model instances (`Expression`, `Function`, etc.).
- **Contextual Evaluation** — The principle that every node’s meaning depends on its context (available bindings and parent scopes).
- **Partial Interpretation** — Occurs when evaluation cannot be completed because required context or values are missing.

---
