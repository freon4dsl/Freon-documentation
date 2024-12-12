# Freon Terminology

| Phrase                    | Description |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| abstract syntax tree      | An internal representation the model, a tree of nodes, each of which is an instance of a structural element of the language.                                     |
| action                    | Certain behaviour of the editor, for instance, the reaction to a key stroke.                                                                                     |
| AST                       | Abstract Syntax Tree                                                                                                                                             |
| ast file                  | File containing the definition of the metamodel of the language. The extension must be '.ast'.                                                                   |
| box                       | A TypeScript class that represents a rectangle on the editor screen.                                                                                             |
| box tree / box model      | A tree of boxes that represent the appearance of a model in the editor                                                                                           |
| concept                   | A structural element in the language.                                                                                                                            |
| concrete syntax tree      | A tree of elements that represent the appearance of a model. In Freon, it is equal to the box model.                                                             |
| conformsto                | A predefined function in the typer, which defines that a certain type conforms to another type. The function can also be used in the validator.                  |
| CST                       | Concrete Syntax Tree                                                                                                                                             |
| custom scoper             | A scoper that is written in TypeScript and either augments or replaces the Freon scoper.                                                                         |
| custom typer              | A typer that is written in TypeScript and either augments or replaces the Freon typer.                                                                           |
| edit file                 | File containing the definition of the editors, or projection sets of the language.  The extension must be '.edit'.                                               |
| editor                    | A loosely used term to refer to the runtime tool in the browser, or to a certain projection set.                                                                 |
| enumeration               | See limited concept.                                                                                                                                             |
| equalsto                  | A predefined function in the typer, which defines that a certain type is considered to be equal to another type. The function can also be used in the validator. |
| expression concept        | A structural element in the language that can be used as an expression.                                                                                          |
| external component        | A Svelte component that is added by the language engineer to the Freon projection(s).                                                                            |
| fragment                  | A part of a projection definition.                                                                                                                               |
| inference rule            | A built-in function in the typer definition that defines the type of a term.                                                                                     |
| interpreter               | A tool that takes the AST (the represeantation of the model) and calculates a value to be associated with certain terms in the model.                            |
| is-unique rule            | A built-in function in the validator definition that defines a check on whether all elements in a list are unique. (Making the list a strict set.)               |
| language engineer         | The person using Freon to create a DSL and the tools to use the DSL.                                                                                             |
| limited concept           | A structural element in the language, that can only have a limited number of predefined instances. A more extensive version of an enumeration.                   |
| metamodel                 | The definition of the structure of the language, i.e. which kind of elements are part of the language and how they relate.                                       |
| model                     | An instance of the language metamodel, like an object is an instance of a class. The model is what the user is interested in.                                    |
| model unit                | Part of a model that can be edited, or otherwise handled, separately from the rest of the model.                                                                 |
| named editor              | A projection set.                                                                                                                                                |
| named property projection | A single projection in a (named) projection set.                                                                                                                 |
| namespace                 | A structural element that is the container for a set of names of parts of the model.                                                                             |
| namespace addition        | A built-in function in the scoper definition that adds the set of names from one namespace to another namespace.                                                 |
| not-empty rule            | A built-in function in the validator definition that defines a check on whether a list is empty.                                                                 |
| precedence of projections | In a set of projections for the same concept, the priority of one projection sover the other.                                                                    |
| projection                | A definition of how a single structural element in the language should appear on the screen or in text.                                                          |
| projection set            | A named set of projection definitions, one per structural element in the language.                                                                               |
| scope provider            | A piece of code that is able to determine for each term in the model which names of other elements of the model are visible.                                     |
| scoper                    | The Freon name for scope provider.                                                                                                                               |
| scoper file               | File containing the definition of the scope provider for the language. The extension must be '.scope'.                                                           |
| symbol                    | The concrete syntax to be used for the operator in a binary expression. For instance the '+' in '4+5'.                                                           |
| term                      | Part of a model that can be associated with a type (using a typer), or with a value (using an interpreter).                                                      |
| trigger                   | The key stroke, or series of key strokes, that the user must enter to let the editor perform a certain function.                                                 |
| type checking rule        | A built-in function in the validator definition that defines a check on whether a term has a certain type.                                                       |
| type concept              | A concept that is not part of the AST, but is needed to provide the type of a term.                                                                              |
| type provider             | A piece of code that is able to determine for each term in the model which type to associate with that term.                                                     |
| typer                     | The Freon name for type provider.                                                                                                                                |
| typer file                | File containing the definition of the type provider for the language. The extension must be '.type'.                                                             |
| user                      | The person using the tools, i.e. editor, scoper, etc, to create models in a certain DSL.                                                                         |
| valid file                | File containing the definition of the validator for the language.  The extension must be '.valid'.                                                               |
| validator                 | A piece of code that is able to determine for each term in the model whether the term is correct or erroneous.                                                   |
| valid-identifier-rule     | A built-in function in the validator definition that defines a check on whether a string is a valid identifier.                                                  |
| where-clause              | A part of a typer definition that defines conditions for all properties of a concept. It is used in 'equalsto' and 'conformsto' definitions.                     |
