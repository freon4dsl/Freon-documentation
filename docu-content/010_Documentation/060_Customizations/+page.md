---
title: Customization
description: Learn how to customize the Freon-generated tools by extending or replacing parts of the language environment, including editors, scopers, typers, validators, and other fre-tools.
tags: customization, fre-tools, editor, typer, validator, scoper, Freon, DSL development, TypeScript, configuration
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Customization

From the five parts of a language definition, Freon generates a complete work environment containing an editor, 
scope provider (scoper), type provider (typer), validator, standard library, and utilities such as a parser and deparser.
These individual components are collectively referred to as **_fre-tools_**.
Other sections of this documentation describe how to fine-tune the generated fre-tools using the files in the [_defs_ folder](/Documentation/Overview/Getting_Started#creating-a-project-2) 
(i.e. the folder containing your definition files).
(See for instance [Defining_an_editor](/Documentation/Defining_an_Editor).)
In this section, we focus on deeper customizations implemented through TypeScript code.

## Stacked Architecture

Customization is made possible by Freon’s _stacked architecture_.
This architecture makes it possible to create your language,
and customize it step-by-step in an agile fashion.
Freon’s design philosophy can be summarized by the following quote from
the well-known graphical user interface designer Alan Kay:

> _Simple things should be simple, complex things should be possible._
> (<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)
> 

(Read our [Background](/Background) to understand why we have chosen this architecture.)
Freon supports three levels of customization.

1. The default level, which is always available.
2. The definition level, where the fre-tools are being generated based on the input from the definition files (e.g. a `.scope` file).
3. The customization level, where handwritten TypeScript code can be added or used to replace parts of the generated output.

Freon aims to provide around 80% of the required functionality of the work environment through the first two levels.

<Figure 
imageName={'documentation/layered-architecture2.png'} 
caption={'The Stacked Architecture'}
figureNumber={1}
/>

Freon combines the definitions for each tool, together with the customized TypeScript code into one application, 
where the third level precedes the second, and the second level precedes the first.
For example, the generated editor determines for each [**concept**](/Documentation/Creating_the_Metamodel/Language_Structure#concept-4) in the language which projection to use, in the following order:

1. use the _hand-written projection_ from the Customization level, when this is present. If not, the editor will
2. use the _projection generated from the .edit definition_ from the Freon definition Level, when this definition is present.
   Finally, when no definition is present, the editor will
3. fall back to the _default projection_, the one generated when no `.edit` definition file is present.

<Figure
imageName={'documentation/fall-through.png'}
caption={'Projection Lookup for an AST Node'}
figureNumber={2}
/>

This layered approach allows language engineers to start quickly with a working environment and 
refine it gradually at either the definition or customization level.
For this purpose,
the [Command Line Interface](/Documentation/Overview/Getting_Started#the-command-line-interface-9) includes separate commands
for generating the different fre-tools.

## Customizability of the Fre-Tools 

This table gives an overview of the fre-tools, and shows how you can adjust them to your needs.

| Workbench Component            | Has Default | Level 2 Definition |                                         Level 3 Definition                                         |
|:-------------------------------|:-----------:|:------------------:|:--------------------------------------------------------------------------------------------------:|
| language structure             |     no      |        .ast        |                                                 no                                                 |
| projectional editor            |     yes     |       .edit        |                                                yes                                                 |
| scope provider                 |     yes     |       .scope       |                                                yes                                                 |
| validator                      |     yes     |       .valid       |                                                yes                                                 |
| type provider                  |     yes     |       .type        |                                                yes                                                 |
| interpreter                    |     no      | none available yet |                                                yes                                                 |  
| standard library               |     yes     |        .ast        |                                              not yet                                               |
| parser                         |     yes     |       .edit        | yes (using <a href="https://github.com/dhakehurst/net.akehurst.language" target="_blank">AGL</a>) |
| unparser                       |     yes     |       .edit        |                                              not yet                                               |
| json exporter/importer         |     yes     |        .ast        |                                                 no                                                 |
| visitor pattern implementation |     yes     |        .ast        |                                          can be extended                                           |
| web app                        |     yes     |   none available   |                                     can be changed or replaced                                     |

If you are missing a specific tool or feature, please contact us at [info@openmodeling.nl](mailto:info@openmodeling.nl).


## Adding A Fre-tool

Freon automatically generates TypeScript templates to support your customizations. You can find these
in the files `~/freon/editor/CustomYourLanguageNameProjection.ts`, `~/freon/editor/CustomYourLanguageNameActions.ts`, etc.
(where `YourLanguageName` is a placeholder for the name of the language as defined in your .ast file). You can use
these files to add your own special elements.

The custom files can be renamed and/or
place them in another location, or you can create your own set of custom projection files.
In that case, you must update the configuration file `~/freon/config/FreonConfiguration`.

The following is an example of a generated configuration file that registers custom projections, actions, and other extensions.

```ts
// Insurance/src/freon/config/FreonConfiguration.ts

// Generated by the Freon Language Generator.
// TEMPLATE: ConfigurationTemplate.generate(...)

import { type FreProjection, type FreCombinedActions, type FreTyper, type FreStdlib, type FreScoper } from "@freon4dsl/core";

import { CustomInsuranceModelActions, CustomInsuranceModelProjection } from "../editor/index.js";
import { CustomInsuranceModelScoper } from "../scoper/index.js";
import { CustomInsuranceModelTyperPart } from "../typer/CustomInsuranceModelTyperPart.js";
import { CustomInsuranceModelValidator } from "../validator/index.js";
import { CustomInsuranceModelStdlib } from "../stdlib/CustomInsuranceModelStdlib.js";
import { type InsuranceModelCheckerInterface } from "../validator/gen/index.js";

/**
 * Class FreonConfiguration is the place where you can add all your customisations.
 * These will be used through the 'freonConfiguration' constant by any generated
 * part of your language environment.
 */
class FreonConfiguration {
    // add your custom editor projections here
    customProjection: FreProjection[] = [new CustomInsuranceModelProjection()];
    // add your custom editor actions here
    customActions: FreCombinedActions[] = [new CustomInsuranceModelActions()];
    // add your custom validations here
    customValidations: InsuranceModelCheckerInterface[] = [new CustomInsuranceModelValidator()];
    // add your custom scopers here
    customScopers: FreScoper[] = [new CustomInsuranceModelScoper()];
    // add your custom type-providers here
    customTypers: FreTyper[] = [new CustomInsuranceModelTyperPart()];
    // add extra predefined instances here
    customStdLibs: FreStdlib[] = [new CustomInsuranceModelStdlib()];
}

export const freonConfiguration = new FreonConfiguration();

```

## Replacing a Fre-tool

All fre-tools can be fully replaced at the third level, overriding both the default and definition levels.
This is done by implementing their respective [interfaces](/Documentation/Under_the_Hood/FreTool_Interfaces).

For the parser and unparser, replacement is currently the only supported form of customization.
More information on these interfaces can be found in the following documentation sections:

- [FreScoper](/Documentation/Under_the_Hood/FreTool_Interfaces#frescoper-3)
- [FreTyper](/Documentation/Under_the_Hood/FreTool_Interfaces#fretyper-5)
- [FreValidator](/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4)
- [FreReader](/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6)
- [FreWriter](/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7)
- [FreStdlib](/Documentation/Under_the_Hood/FreTool_Interfaces#frestdlib-8)
