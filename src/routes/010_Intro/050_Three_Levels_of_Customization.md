<script>
    import Figure from "../../lib/figures/Figure.svelte";
    let imageName = 'layered-architecture2.png';
    let caption = 'The Stacked Architecture';
    let figureNumber = 1;
    let imageName2 = 'fall-through.png';
    let caption2 = 'Projection Lookup for an AST Node';
    let figureNumber2 = 2;
</script>

# Three Levels to Customize Freon

From the five parts of the language definition, Freon generates a work environment
containing an editor, a scope provider or scoper, a type provider or typer, a validator, 
a standard library, and some utilities like a parser/deparser.
All of these are separate components that are called **pi-tools**.

You, the language engineer, can fine-tune the generated pi-tools at several levels.
We call this manner of fine-tuning: a **stacked architecture**.
This three-level approach makes it possible to create your language,
and customize it step-by-step in an agile fashion.
(Read our [philosophy](/010_Intro/020_Our_Philosophy) to understand why we have chosen these levels.)

Keeping in mind that *Simple things should be simple, complex things should be possible* 
(<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay</a>),
we use the following levels of customization.

<Figure 
bind:imageName={imageName} 
bind:caption={caption}
bind:figureNumber={figureNumber}
/>

### Default Level
The *first or default level* (colored light-grey in the above figure), is based solely on the 
metamodel definition in the .ast file. Defaults are 
   generated for every part of the workbench. For instance, the default scoper simply finds 
   that every name in a model is visible everywhere. At this level you already have a 
   fully working environment for your language.  
   See how you can define the metamodel, or language structure in [Default Level](/030_Developing_a_Language/010_Default_Level).

### Definition Level
In the *second or definition level*  (colored medium grey in the above figure), the other definitions (in the `.edit`, `.scope`, `.valid`, and `.type` files), when present, 
   are taken into account. When, for instance, a definition for the editor is provided, 
   it is used to generate a more suitable concrete syntax in the editor, the parser, and the unparser.
   The concrete syntax could be more concise, using certain keywords etc. More on how to 
   utilize the second level can be found in [Definition Level](/030_Developing_a_Language/020_Definition_Level).

### API Level
The *third or API level* (colored black in the above figure), takes hand-coding in TypeScript, 
but produces a result that is extremely adjusted to your needs. More on how to make use of this 
level, e.g. how to use the core editor framework of Freon,
can be found in [API Level](/030_Developing_a_Language/030_API_Level).
   

## Combining the Three Levels into One Application

Freon combines definitions at each level into one application, where the third level precedes the second, and
the second level precedes the first.
For instance, the generated editor will per [**concept**](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#concept) in the language:

1. use the *hand-made projection* from the API level, when this is present. If not, the editor will
2. use the *projection generated from the editor definition* from the Freon definition Level, when this definition is present.
  Finally, when no definition is present, the editor will
3. use the *default projection* from the default level, the one generated when no `.edit` definition file is present.

This allows the language engineer to start quickly with a working (but somewhat rough) language environment
and piece by piece refine this on either the second or the third level.

<Figure
bind:imageName={imageName2}
bind:caption={caption2}
bind:figureNumber={figureNumber2}
/>

At the time of writing this approach is implemented for the editor, validator, and typer, in future this 
will also apply to the scoper, the parser, and the unparser.

# Overview of the Generated Pi-tools and Their Customizability

Freon generates an integrated set of tools that support the language that you are creating.
This table gives an overview of these tools, and shows how you can adjust them to your needs.
See [The Five Definition Files](/010_Intro/040_A_Language_in_Five_Parts) for an explanation of the parts 
of the language definition.

| Workbench Part | Has Default | Level 2 Definition | Level 3 Definition |
| :-------------- | :-----------: | :------------------: | :------------------: |
| language structure                | no  | .ast    | no |
| projectional editor               | yes | .edit   | yes |
| scope provider                    | yes | .scope  | not yet |
| validator                         | yes | .valid  | yes |
| type provider                     | yes | .type   | not yet |
| standard library                  | yes | .ast    | not yet |
| parser                            | yes | .edit   | yes (using (<a href="https://github.com/dhakehurst/net.akehurst.language" target="_blank">AGL</a>))  |
| unparser                          | yes | .edit   | not yet |
| json exporter/importer            | yes | .ast    | no |
| visitor pattern implementation    | yes | .ast    | can be extended |
| web application                   | yes | none available   | can be changed or replaced |

If you are using Freon, and are missing a specific tool or feature, please let us know through info AT projectit.org.

