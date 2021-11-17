






# Overview of the Generated Pi-tools and Their Customizability

ProjectIt generates an integrated set of tools that support the language that you are creating.
As described in (/010_Intro/050_Three_Levels_of_Customization[Three :Levels to Customize ProjectIt] these
tools can be customized.

This page gives an overview of these tools, and shows how you can adjust them to your needs.
See (/040_Second_level/tutorials-intro#def-files[The Five Definition Files] for an explanation of the level 2
definitions.

[cols="30,20,20,30",options="header", stripes=even]
|===
| Workbench Part | has Default | level 2 definition | level 3 definition
| language structure | no | .ast | no
| projectional editor | yes | .edit | yes
| scope provider | yes | .scope | not yet
| validator | yes | .valid | yes
| type provider | yes | .type | not yet
| standard library | yes | .ast | not yet
| parser | yes | .edit | yes (using <a href="https://pegjs.org/[pegjs, target="_blank">)
| unparser | yes | .edit | not yet
| json exporter/importer | yes | .ast | no
| visitor pattern implementation | yes | .ast | can be extended
| web application | yes | none | can be changed or replaced
|===

If you are using ProjectIt, and are missing a specific tool or feature, please let us know through info AT projectit.org.


