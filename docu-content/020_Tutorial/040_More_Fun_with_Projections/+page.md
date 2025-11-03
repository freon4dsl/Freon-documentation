---
title: More Fun with Projections
description: Explore advanced Freon editor projections—build tables, define multiple editor views, control precedence, and target specific projections for concepts like FlowRule and PageTransition.
tags: Freon, projectional editing, editor, projections, tables, Flow, FlowRule, PageTransition, rules_as_table, footing editor, multiple editors, editor precedence, Education language, tutorial
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# More Fun with Projections

Freon projections are very flexible. In this lesson we’re going to explore several ways to make your editor look great.
We’re going to create tables!

## A projection for the _Flow_ model unit

We almost forgot to make an editor definition for the _Flow_ model unit. Create a file called `edu-flow.edit`,
and add the following lines. You should be familiar with everything in these projections by now.

```proto
// Education/lesson3-defs/edu-flow.edit

/* This file contains the default editor definition. */

editor default

Flow {[
    Flow ${self.name} for SiteGroup ${self.main}

    ${self.rules vertical}
]}

FlowRule {[
    -------------------------------------
    Name: ${self.name}
    Description: ${self.description}
    From page ${self.page}

        ${self.transitions}
]}

PageTransition {[
    when ${self.condition} goto page ${self.toPage}
]}
```

Yes—generate the editor and try it! To see this definition in action, click the arrow-left
icon in the top bar and select **StartFlow** from the list of model units. It looks like this:

<Figure
imageName={'tutorial/Tutorial-lesson3-screenshot1.png'}
caption={'Editor after adding projections for the Flow model unit'}
figureNumber={1}
/>

## More than One Editor

With Freon you can have multiple views on the same concept. Freon generates a [projectional editor](/Background/Projectional_Editing).

Remember that the editor definition in the previous lesson and the one above are called `default`? That’s
because you can create any number of editor definitions, each with its own name.

You can think of an editor as a different view on the model, but in terms of the editor definition,
it’s simply a set of projection definitions. This set can change the appearance of a single concept
or multiple concepts.

When an editor definition doesn’t include a projection for a certain concept, it falls back to a projection from another
editor definition. Which projection is chosen is determined by a fixed algorithm.
For details, see [Editor Precedence](/Documentation/Defining_an_Editor#editor-precedence-4).

<Note> {#snippet header()} One property, one occurrence in the editor{/snippet}
{#snippet content()}
<p>Unfortunately, it’s not possible to show the same property of a concept twice in the same editor.
The tooling that keeps the underlying model and the editor view in sync doesn’t allow this.</p>
{/snippet}
</Note>

## Creating Tables

Let’s create a second editor definition for the _Flow_ model unit—one that displays
the list of _PageTransitions_ in a _FlowRule_ as a table.
We’ll name this editor definition `rules_as_table`. Put it in `edu-flow-table.edit`.

```proto
// Education/lesson3-defs/edu-flow-table.edit#L3-L3

editor rules_as_table
```

To create a projection for _FlowRule_, we’ll reuse the default projection with one change:
we remove the keyword `vertical` from `${self.transitions}` and add `table`.

Furthermore, we want one element per row, so we add the keyword `rows`.  
(You can also display one element per column using `columns`.)

```proto
// Education/lesson3-defs/edu-flow-table.edit#L5-L12

FlowRule {[
    -------------------------------------
    Name: ${name}
        Description: ${self.description}
        For page ${page}

        ${self.transitions table rows}
]}
```

Next, define the table itself. Each element in the list is an instance of the _PageTransition_ concept,
so we add a projection for this concept—but we prefix it with the keyword `table`.  
This means the projection is only used when the concept is rendered within a list projected **as a table**.

You may also add headers (taken literally). Here the headers are `Condition` and `Goto Page`.  
The `|` character separates columns. Headers are optional.

Finally, specify the cell content by indicating which property goes into each column.

```proto
// Education/lesson3-defs/edu-flow-table.edit#L14-L17

PageTransition { table [
    Condition          | Goto Page
    ${self.condition}  |  ${self.toPage}
]}
```

Note that for _PageTransition_ we defined a table with two parts. The **context** in which these objects are projected
determines whether they appear as **rows** or **columns**.

After saving `edu-flow-table.edit`, run the generator again. Find the model unit
named **StartFlow** and… yes, there’s a table. Try switching `rows` to `columns` in the _FlowRule_ projection
to see the difference.

<Figure
imageName={'tutorial/Tutorial-lesson3-screenshot2.png'}
caption={'Editor after adding projections for the Flow model unit'}
figureNumber={2}
/>

If you want to revert to the earlier look, open the **View** menu, deselect **rules_as_table**, and click **Apply changes**.  
The menu lists each editor definition by name; as you add more, you can toggle them on or off.

## Using a Specific Editor

We mentioned that there is an [algorithm](/Documentation/Defining_an_Editor#editor-precedence-4) that determines which projection is shown.
Sometimes you want to force a specific projection. You can do this by stating the concept **and** the editor name using
`[=>ConceptName:editor-name]`—for example, `[=>Page:footing]`.

Before using the `footing` editor, create it. Add a file called `page-footing.edit` and copy:

```proto
// Education/lesson3-defs/page-footing.edit#L3-L8

editor footing

Page {[
    Questions:
        ${self.questions vertical terminator [END]}
]}
```

Now we can specify a specific editor. Rewrite `edu-topics.edit` as follows:

```proto
// Education/lesson3-defs/edu-topics.edit#L17-L60


Theory {[
    ----------------------------------------------------
    Theory [=>Page]
        ${self.content vertical  terminator[== END OF LINE]}

        [=>Page:footing]
]}

Video {[
    ----------------------------------------------------
    Video [=>Page]
        Maybe this video will help you understand.
        ${self.url}

        [=>Page:footing]
]}

WorkSheet {[
    ----------------------------------------------------
    Worksheet [=>Page]
        See if you can answer the following questions.

        [=>Page:footing]
]}

ExamplePage {[
    ----------------------------------------------------
    Example [=>Page]
        ${self.content}

        Now, please, answer the following questions.

        [=>Page:footing]
]}

InDepthMaterial {[
    ----------------------------------------------------
    InDepthMaterial [=>Page]
        ${self.content}

        Test your understanding by answering the following questions.

        [=>Page:footing]
```

Try it out! There’s a lot of fun to be had with projections.
In the next lesson we’ll add expressions to the metamodel and to the editor definitions.
