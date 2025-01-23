# LionWeb Connection

## LionWeb
The LionWeb initiative (see [LionWeb @ Github](https://github.com/LionWeb-io)) aims to make language engineering
tools iteroperable on the web.
LionWeb does this by specifying
- how language definitions and models can be interchanged in a well-defined JSON format.
- a server protocol for storing and retrieving models in a repository.

Next to the specification LionWeb also provides implementations of supporting software in languages like TypeScript,
Java, Kotlin, C#.
Thhese packages support a wide range of functionality like:
- (de)serialization between in-memory models and JSON format
- model diff
- model validation
- -etc.

- There also is a `lionweb-repository` package that implements a LionWeb server using the LionWeb protocol.


## Freon and LionWeb
The LionWeb idea of interoperability  fits perfectly with the basic principles of Freon, to be _open_ and _extensible_.

Freon uses LionWeb in various ways:
- Store models in LionWeb JSON format on the server, allowing other tools to access the models.
- Optionally convert the Freon language definition (the .ast files) to a LionWeb language definition
in LionWeb JSON format. 
- Optionally use the LionWeb server protocol to store models in the lionweb-repository.
  This option is still experimental, as we need to do more testing.
 
This allows other tools access not only to the models, but also to the languages that are defined in Freon.
It also means that there is no lock-in when using Freon.

Both the languages and models created with Freon care fully accessible anywhere else.





