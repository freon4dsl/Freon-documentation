---
title: Getting Language Information
description: Learn how to access and display language-level information in a custom Freon-based web app. Initialize and use langInfo for projections, unit types, and the language name within your Svelte components.
tags: Freon, Svelte, Integration, core, core-svelte, LanguageEnvironment, langInfo, ProjectionHandler, WebappConfigurator, InMemoryModel, Flowbite, ViewMenu, ModelInfo, NavBar
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Getting Language Information

There are a couple of places where we would like to use information, not about the models, but about the language for which the editor was created.
We need the names of the available projections for use in the view menu, and we will use the names of the model unit types in the drawer that
shows the available units in the model. Just for fun, we would like to show the name of the language in the navbar.

Because the last is fairly simple, we start by making the change in the navbar.

## Language Name in the Navbar

To include information from the DSL we use a Svelte state variable called `langInfo`.

```ts
// IntegrationExample/webapp/src/lib/stores/LanguageInfo.svelte.ts

export interface LanguageInfo {
  // name of the language
  name: string;
  // names of all model unit types
  unitTypes: string[];
  // all known file extensions
  fileExtensions: string[];
  // all possible projections
  projectionNames: string[];
}

export const langInfo: LanguageInfo = $state({
  name: "FreLanguage ...",
  unitTypes: [] as string[],
  fileExtensions: [] as string[],
  projectionNames: [] as string[],
});

```

We use this state variable in the NavBar on line 26:

```html
// IntegrationExample/webapp/src/lib/main-app/NavBar.svelte#L24-L27

<NavBrand href="/">
	<img src="./freonlogo.svg" class="me-3 h-6 sm:h-9" alt="Freon Logo" />
	<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Freon for {langInfo.name}</span>
</NavBrand>
```

We would like to say: "that's it", but so far there is no information present in the state variable.

## Initialization of the State Variable

Before the start of the web app we need to initialize the `langInfo` state variable. We have chosen to do this
in a Svelte hook (see <a href="https://svelte.dev/docs/kit/hooks" target="_blank">SvelteKit Hooks</a>), because it needs to be done only once. We
use the `configureExternals` and `configureLoggers` functions from the DSL, as well as the `LanguageEnvironment`.

```ts
// IntegrationExample/webapp/src/hooks.client.ts

/*
 * This files contains all initialization that needs to be done ONCE at the startup of the Freon application
 */
import {
  configureExternals,
  configureLoggers,
  LanguageEnvironment,
} from "@freon4dsl/samples-education";
import { WebappConfigurator } from "$lib/language/WebappConfigurator.js";
import { ServerCommunication } from "@freon4dsl/core";

WebappConfigurator.getInstance().setEnvironment(
  LanguageEnvironment.getInstance(),
  ServerCommunication.getInstance(),
);
configureExternals();
configureLoggers();

```

As you can see we have created a file called `WebappConfigurator` to contain all code that deals with
the DSL and with the `@freon4dsl/core` package. Because we use the server that Freon provides (also as a convenience),
we can use an instance of `ServerCommunication` from `@freon4dsl/core`. In a production environment this
needs to be replaced with your own server implementation. Note that any server must implement
the `IServerCommunication` interface.

The `setEnvironment` function remembers the object that will perform the communication with the server, and
the language environment, for further use. For the core package to function properly, you also need to
create an instance of the class `InMemoryModel`, which also takes the language environment and the server
implementation as parameters. The `InMemoryModel` handles creation, saving, etc. of models and model units.

```ts
// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L45-L54

setEnvironment(
    editorEnvironment: FreEnvironment,
    serverCommunication: IServerCommunication,
): void {
    // LOGGER.log('setEnvironment')
    this.editorEnvironment = editorEnvironment;
    this.serverCommunication = serverCommunication;
    WebappConfigurator.initialize(editorEnvironment);
    this.modelStore = new InMemoryModel(editorEnvironment, serverCommunication);
}
```

Finally, the `initialize` function fills the Svelte state variable `langInfo` with the values that we need.
Note that the `LanguageEnvironment` initializes the `FreLanguage` class from the core package. A call to
`LanguageEnvironment.getInstance()` must therefore precede a call to `FreLanguage.getInstance()`. Both classes
follow the Singleton pattern and are initialized through `getInstance`.

Commented out, because we do not yet have an element in our web app to show error messages, is the way to
handle messages from the Freon editor. Assign a function to the editor's `setUserMessage` property, which handles
the messages. Its signature is `setUserMessage(message: string, severity?: FreErrorSeverity): void`.

Note also that you need to start the `FreUndoManager` for undo/redo handling to function.

```ts
// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L60-L92

static initialize(editorEnvironment: FreEnvironment): void {
    let langEnv: FreEnvironment = editorEnvironment;
    // the language name
    langInfo.name = langEnv.languageName;

    // the names of the unit types
    langInfo.unitTypes = FreLanguage.getInstance().getUnitNames();

    // the names of the projections / views
    const proj: FreProjectionHandler = langEnv.editor.projection;
    let nameList: string[] = !!proj ? proj.projectionNames() : ["default"];
    // remove any old values
    langInfo.projectionNames.splice(0, langInfo.projectionNames.length);
    // push the right ones
    langInfo.projectionNames.push(...nameList);
    replaceProjectionsShown(nameList);

    // the file extensions for all unit types
    // because 'langEnv.fileExtensions.values()' is not an Array but an IterableIterator,
    // we transfer the value to a tmp array.
    const tmp: string[] = [];
    for (const val of langEnv.fileExtensions.values()) {
        tmp.push(val);
    }
    langInfo.fileExtensions = tmp;

    // let the editor know how to set the user message,
    // we do this by assigning our own method to the editor's method
    // langEnv.editor.setUserMessage = setUserMessage;

    // start the undo manager
    FreUndoManager.getInstance();
}
```

## Unit Types in Model Drawer

In this example web app, as in the standard Freon web app, we show the information about
the current model in a drawer panel.
For the names of the model unit types in this drawer we use the same approach as above. From the
`langInfo` state variable we take the `unitTypes`, and loop over them. The inner list is where
the model information
