
# Source Code Documentation

The source code for the development of Freon is organised into the following packages.

* *docs*: documentation, i.e. this website
* *packages/core*: framework source code.
* *packages/core/src/editor*: the editor framework source code.
* *packages/core/src/language/decorators*: source code for <a href="https://mobx.js.org/" target="_blank">MobX</a> decorators that can be used to easily implement a language that can be
directly used by Freon.
* *packages/meta*: source code that reads the language definition files and generates the language environment.
* *packages/meta/src/languagedef*: source code that generates code from a language structure definition (*.ast*) file.
* *packages/meta/src/editordef*: source code that generates code from an editor definition (*.edit*) file.
* *packages/meta/src/scoperdef*: source code that generates code from a scoper definition (*.scope*) file.
* *packages/meta/src/typerdef*: source code that generates code from a typer definition (*.type*) file.
* *packages/meta/src/validatordef*: source code that generates code from a validator definition (*.valid*) file.
* *packages/playground*: source code generated from the language definition files.
* *packages/playground/src/webapp*: a copy of *packages/webapp*, for use within the playground.
* *packages/playground/src/example/defs*: the language definition files for the example language called 'Example'.
* *packages/server*: source code for a minimalistic model-server used for demonstration purposes.
* *packages/webapp*: source code for the web-application used for all generated languages.
* _/*_: the usual suspects.

In the future, this page will refer to the generated javadoc pages.
