# The Five Definition Files

A Freon language definition can have five parts:

1. [The language structure](/Developing_a_Language/Default_Level), or abstract syntax tree (AST) is defined in files with extension `.ast`.
2. [The concrete syntax](/Developing_a_Language/Definition_Level/Editor_Definition) of the language (CST), or editor definition, is defined in files with extension `.edit`.
3. [The scoping](/Developing_a_Language/Definition_Level/Scoper_Definition) is defined in files with extension `.scope`.
4. [The typing](/Developing_a_Language/Definition_Level/Typer_Definition) is defined in files with extension `.type`.
5. [The validation](/Developing_a_Language/Definition_Level/Validator_Definition) is defined in files with extension `.valid`.

And yes, you can use multiple files to define one of the parts. For instance, Freon will combine
multiple .ast files into one AST definition, and multiple .scope files into one scope definition.

## Step-by-step Creation of the Language

There is no need to write all the five definition files right from the start. The only one that is
mandatory is the language structure (.ast). Freon will generate defaults for all the other elements.
This is what we call the Default Level of the [three levels of customization](/Intro/Three_Levels_of_Customization).
