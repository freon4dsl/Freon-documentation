# LionWeb Connection

## LionWeb
The LionWeb initiative (see [LionWeb @ Github](https://github.com/LionWeb-io)) aims to make language engineering
tools interoperable on the web.
LionWeb does this by specifying
- how language definitions and models can be interchanged in a well-defined JSON format.
- a server protocol for storing and retrieving models in a repository.

Next to the specification, LionWeb also provides implementations of supporting software in languages like TypeScript, JavaScript,
Java, Kotlin, C#.
These packages support a wide range of functionality like:
- (de)serialization between in-memory models and JSON format
- model diff
- model validation
- -etc.

- There also is a `lionweb-repository` package that implements a LionWeb server
  for model storage using the LionWeb server protocol.


## Freon and LionWeb
The LionWeb idea of interoperability fits perfectly with the basic principles of Freon, to be _open_ and _extensible_.

Freon uses LionWeb in various ways as described in the secions below.

The use of LionWeb allows other tools access not only to the models, but also to the languages that are defined in Freon.
It also means that there is no lock-in when using Freon.
Both the languages and models created with Freon are fully accessible anywhere else.

### Store models in LionWeb Format
Freon stores models in LionWeb JSON format on the server, allowing other tools to access the models.

### Using the LionWeb Repository
Optionally use the LionWeb server protocol to store models in the lionweb-repository.
This option is still in beta, as we want to do more testing.

- To run the lionweb-repository see the [github page](https://github.com/LionWeb-io/lionweb-repository).
Once the lionweb-repository is running, the following two lines in `starter.ts`

```ts
import { ServerCommunication } from "@freon4dsl/core";
WebappConfigurator.getInstance().setServerCommunication(ServerCommunication.getInstance());

```
need to be changed to:

```ts
import { LionWebRepositoryCommunication } from "@freon4dsl/core"
WebappConfigurator.getInstance().setServerCommunication(LionWebRepositoryCommunication.getInstance());
```

### Convert Freon Language Definition to LionWeb
- Optionally convert the Freon language definition (the .ast files) to a LionWeb language definition
  in LionWeb JSON format. 
- This is done by the following command:
```bash
- freon lionweb-it -d src/defs -o src/freon
```
This will create a file `src/freon/lionweb/<LanguageName>.json` containing the LionWeb
definition for `<langaugeName>`.
Note that this is a beta feature.
