<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Customization

From the five parts of the language definition, Freon generates a work environment
containing an editor, a scope provider or scoper, a type provider or typer, a validator,
a standard library, and some utilities like a parser/deparser.
These separate components are called **fre-tools**.
In other parts of the documentation you can find how to fine-tune the generated fre-tools, using the
file in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3) 
(i.e. the folder were you keep your definition files).
(See for instance [Defining_an_editor](/Documentation/Defining_an_Editor).)
In this part we describe how to make further customizations to the toolset by writing some TypeScript code.

## Stacked Architecture

Customization is possible because of our **stacked architecture**.
This architecture makes it possible to create your language,
and customize it step-by-step in an agile fashion.
We follow the following philosophy:
The design philosophy that we follow in Freon can best be described by the following quote from
the well-known graphical user interface designer Alan Kay.

> _Simple things should be simple, complex things should be possible._
> (<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)
> 

(Read our [Background](/Background) to understand why we have chosen this architecture.)
Supporting this we use the following levels of customization.

1. The default level, which is always present.
2. The definition level, where the fre-tools are being generated based on the input form the definition files (e.g. a `.scope` file).
3. The customization level, where handwritten TypeScript code can be added, or used to replace parts of the generated code.

It is our aim to provide approximately 80% of the required functionality of the work environment at the first two levels.

<Figure 
imageName={'documentation/layered-architecture2.png'} 
caption={'The Stacked Architecture'}
figureNumber={1}
/>

Freon combines the definitions for each tool, together with the customized TypeScript code into one application, 
where the third level precedes the second, and the second level precedes the first.
For instance, the generated editor will per [**concept**](/Documentation/Creating_the_Metamodel/Language_Structure#concept) in the language:

1. use the _hand-made projection_ from the Customization level, when this is present. If not, the editor will
2. use the _projection generated from the editor definition_ from the Freon definition Level, when this definition is present.
   Finally, when no definition is present, the editor will
3. use the _default projection_ from the default level, the one generated when no `.edit` definition file is present.

<Figure
imageName={'documentation/fall-through.png'}
caption={'Projection Lookup for an AST Node'}
figureNumber={2}
/>

This stacking allows the language engineer to start quickly with a working (but somewhat rough) language environment
and to refine the toolset piece by piece on either the second or the third level. For this purpose,
the [Command Line Interface](/Documentation/Overview/Getting_Started#the-command-line-interface-8) includes separate commands
for generating the different fre-tools.

## Customizability of the Fre-tools 

This table gives an overview of the fre-tools, and shows how you can adjust them to your needs.

| Workbench Part                 | Has Default | Level 2 Definition |                                         Level 3 Definition                                         |
| :----------------------------- |:-----------:|:------------------:|:--------------------------------------------------------------------------------------------------:|
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
| web application                |     yes     |   none available   |                                     can be changed or replaced                                     |

If you are missing a specific tool or feature, please let us know through info AT freon4dsl.dev.

## Adding A Fre-tool

As a convenience, Freon generates templates for
your customization in the files `~/frecode/editor/CustomYourLanguageNameProjection.ts`, `~/frecode/editor/CustomYourLanguageNameActions.ts`, etc.
(where `YourLanguageName` is a placeholder for the name of the language as defined in your .ast file). You can use
these files to add your own special elements.

The custom files can be renamed and/or
put it in another location, or you can create your own set of custom projection files.
In that case, you need to adjust the file `~/frecode/config/FreonConfiguration`.

```ts
// DocuProject/src/config/FreonConfiguration.ts

// Generated by the Freon Language Generator.
import { FreProjection, FreCombinedActions, FreTyper, FreStdlib, FreScoper } from "@freon4dsl/core";
import { CustomInsuranceModelActions, CustomInsuranceModelProjection } from "../editor/index.js";
import { CustomInsuranceModelScoper } from "../scoper/index.js";
import { CustomInsuranceModelTyperPart } from "../typer/CustomInsuranceModelTyperPart.js";
import { CustomInsuranceModelValidator } from "../validator/index.js";
import { CustomInsuranceModelStdlib } from "../stdlib/CustomInsuranceModelStdlib.js";
import { InsuranceModelCheckerInterface } from "../validator/gen/index.js";

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

All fre-tools can be _completely replaced_ at the 3rd level, thereby completely
disregarding the default and definition levels.
This is done by implementing their respective [interfaces](/Documentation/Under_the_Hood/FreTool_Interfaces).

For the parser and unparser this is currently the only way to customize.
More information on the interfaces can be found here:

- [FreScoper](/Documentation/Under_the_Hood/FreTool_Interfaces#frescoper-3)
- [FreTyper](/Documentation/Under_the_Hood/FreTool_Interfaces#fretyper-5)
- [FreValidator](/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4)
- [FreReader](/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6)
- [FreWriter](/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7)
- [FreStdlib](/Documentation/Under_the_Hood/FreTool_Interfaces#frestdlib-8)
