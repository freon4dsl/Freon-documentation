# Freon Glossary – Key Phrases and Concepts

## Core Freon Concepts
- **Freon Editor** — The model-aware graphical editor generated from a Freon DSL specification.
- **FreLanguage / Language Environment** — The runtime representation of a Freon DSL, containing concepts, projections, and unit types.
- **FreModelUnit** — A top-level model element that can be opened, saved, renamed, or exported.
- **FreProjection / ProjectionHandler** — The mechanism defining how a model is visually represented in the editor.
- **AST (Abstract Syntax Tree)** — The structural backbone of the model; each Freon editor works directly with an AST.
- **AST.change()** — A helper method from `@freon4dsl/core` to ensure all model mutations are MobX-reactive.
- **MobX Reactivity** — The reactive data layer used in Freon to track model state and automatically update the UI.
- **FreUndoManager** — Component that handles undo/redo operations for model edits.
- **Box Model** — The internal layout system that maps model elements to their visual boxes.
- **BoxFactory.clearCaches()** — Utility function to clear cached box instances when a model reloads or changes.

## Svelte Integration
- **External Components** — Custom Svelte components integrated into Freon’s editor projection system.
- **ExternalPartListBox** — Box type used for embedding a Svelte component that replaces a list of parts in the projection.
- **PartListReplacerBox** — Box type used to replace the rendering of a Freon list property entirely.
- **RenderComponent** — Svelte component that renders a specific Freon box inside an external component.
- **FreComponentProps** — Interface providing access to `editor` and `box` when embedding Freon components.
- **initialize()** — Function used in external components to set up and synchronize data before rendering.
- **setFocus() / refreshComponent()** — Mandatory methods that enable external components to integrate properly with Freon’s editor lifecycle.

## Example Components
- **StaffAccordion.svelte** — Custom accordion UI replacing a part list of teachers in a course schedule example.
- **Schedule.svelte (Sorted Table)** — Custom Svelte component displaying and sorting `Slot` elements by day and time.
- **Slot / TimeStamp** — Example concepts defining time slots (day and part of day) within a course schedule.
- **sortSlots()** — Function sorting slots by their `TimeStamp` before rendering.
- **slotToBoxMap** — Map storing the correspondence between model slots and their Freon boxes.
- **addSlot()** — Function creating a new `Slot` and inserting it into the model through `AST.change()`.

## Web Application Integration
- **IntegrationExample** — Demonstration monorepo showing how to embed a Freon editor into a Svelte + Flowbite web app.
- **Mono Repository** — A combined repository structure holding both the DSL and the web app packages.
- **WebappConfigurator** — Central configuration class linking the web app, the language environment, and the server.
- **ServerCommunication** — Freon’s default implementation of the `IServerCommunication` interface for model exchange.
- **InMemoryModel** — Class that stores and manages models on the client side, synchronizing with the server.
- **getAllModelNames()** — Method that retrieves a list of available models from the server.
- **openModel() / newModel()** — Methods in `WebappConfigurator` that load or create models, clearing caches and projec
