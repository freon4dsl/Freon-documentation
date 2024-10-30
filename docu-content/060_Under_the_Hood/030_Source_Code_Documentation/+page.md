# Source Code Documentation

The source code for the development of Freon is organised into the following packages.

- _docs_: documentation, i.e. this website
- _packages/core_: framework source code.
- _packages/core/src/editor_: the editor framework source code.
- _packages/core/src/language/decorators_: source code for <a href="https://mobx.js.org/" target="_blank">MobX</a> decorators that can be used to easily implement a language that can be
  directly used by Freon.
- _packages/meta_: source code that reads the language definition files and generates the language environment.
- _packages/meta/src/languagedef_: source code that generates code from a language structure definition (_.ast_) file.
- _packages/meta/src/editordef_: source code that generates code from an editor definition (_.edit_) file.
- _packages/meta/src/scoperdef_: source code that generates code from a scoper definition (_.scope_) file.
- _packages/meta/src/typerdef_: source code that generates code from a typer definition (_.type_) file.
- _packages/meta/src/validatordef_: source code that generates code from a validator definition (_.valid_) file.
- _packages/playground_: source code generated from the language definition files.
- _packages/playground/src/webapp_: a copy of _packages/webapp_, for use within the playground.
- _packages/playground/src/example/defs_: the language definition files for the example language called 'Example'.
- _packages/server_: source code for a minimalistic model-server used for demonstration purposes.
- _packages/webapp_: source code for the web-application used for all generated languages.
- _/\*_: the usual suspects.

In the future, this page will refer to the generated javadoc pages.
