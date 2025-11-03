# Freon Tutorial – Glossary (Core Terms)

## A–C

**Abstract concept** — A concept that cannot be instantiated directly; other concepts inherit from it.  
**AST (Abstract Syntax Tree)** — The internal structure representing models built in a Freon DSL.  
**Binary expression** — An expression with a left and right operand, such as `a AND b` or `x > 3`.  
**Boolean type** — A primitive type with two values: true or false.  
**Comparison expression** — A binary expression that compares two values using `=`, `<`, `>`, `<=`, `>=`.  
**Concept** — The primary building block of a Freon metamodel, similar to a class in UML.  
**Context / Namespace** — A defined scope determining which names are visible in a certain part of a model.

## D–F

**DSL (Domain-Specific Language)** — A modeling language focused on a narrow problem domain, designed with Freon.  
**Editor definition (.edit)** — A file describing how concepts and their properties are projected in the Freon editor.  
**Expression** — A construct that produces a value; e.g. arithmetic or logical formulas used for grading.  
**Flow** — A model unit describing how pages are connected or navigated in the educational DSL.  
**Freon** — A language workbench for building projectional editors and tooling for DSLs.

## G–L

**GradeScore** — A concept representing a grading rule composed of a grade and an expression.  
**Grading expression** — A logical or numerical formula defining how a grade is determined.  
**Language unit (Modelunit)** — A partition of the model that can be edited separately (e.g., `Topic`, `Flow`, `Test`).  
**Limited concept** — A concept with a fixed list of instances, similar to an enumeration.

## M–P

**Metamodel** — The structure that defines the syntax and semantics of a DSL in Freon.  
**Modelunit** — A top-level structure dividing a language model into parts that can reference each other.  
**Namespace addition** — A rule allowing one namespace to import names from another (e.g., from a related page).  
**NrOfCorrectAnswers** — A built-in expression that counts the number of correct answers on a page.  
**Page** — An abstract concept in the educational DSL representing one web page of learning content.  
**Projection** — The visible representation of a concept in the editor; controls layout, formatting, and literal text.  
**Projectional editor** — An editor that directly manipulates the AST, ensuring models are always syntactically valid.

## Q–S

**QuestionReference** — An expression referring to a specific question in a page.  
**Reference** — A property linking one concept to another (similar to associations in UML).  
**Reference shortcut** — A shortcut allowing automatic creation of reference nodes without double selection.  
**Scope (.scope)** — A file that defines namespaces and visibility rules for model elements.  
**Scoping** — The mechanism that determines which names or elements are visible in a certain context.  
**ScoreExpression** — The base concept for all grading expressions in the tutorial DSL.  
**SimpleNumber** — A numeric expression representing a literal number value.  
**Step** — A test
