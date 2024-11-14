<script>
    import Note from "$lib/notes/Note.svelte";
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
</script>

# More Fun with Projections

Freon projections are very flexible. In this lesson we are going to dive into a number of ways to make your editor look great.

## A projection for the _Flow_ model unit

We almost forgot to make an editor definition for the _Flow_ model unit. We are going to create a file called `edu-flow-edit`,
and add the following lines to it.

```text
// Education/lesson3-defs/edu-flow.edit

/* This file contains the default editor definition. */

editor default

Flow {[
    ${self.name} for topic ${self.topic}

    ${self.rules vertical}
]}

FlowRule {[
    -------------------------------------
    Name: ${self.name}
        Description: ${self.description}
        For page ${self.page}

        ${self.transitions}
]}

PageTransition {[
    when ${self.condition} goto page ${self.toPage}
]}

```

Yes, generate the editor and try it! Note again that to see this definition in action you need to click on the arrow-left
icon in the top bar, and select (todo) from the list of model units.

## More than One Editor

Using Freon you can have multiple views on the same concept. After all, Freon generates a [projectional editor](/Documentation/Intro/Projectional_Editing).

Remember that the editor in the previous lesson, and the one above are called `default`? That is because you can have any number of editors,
each with their own name. 

You can think of an editor as a different view on the model, but in terms of the editor definition,
it is a set of projection definitions. This set can consist of a single concept that will have a changed appearance, or multiple
concepts that need to be displayed differently.

When an editor definition does not have a projection for a certain concept, it falls back to the projection in one of the other
editor definitions. Which projection is chosen for a certain concept, is determined by a fixed algorithm. If you want to know more about this algorithm,
read [TODO](link to part of the documentation).

<Note><svelte:fragment slot="header"> One property, one occurrence in the editor</svelte:fragment>
<svelte:fragment slot="content">
<p>Unfortunately, it is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view in the running editor
does not allow us to do this.</p>
</svelte:fragment></Note>

## Creating Tables

Let's create another editor definition for the _Flow_ model unit, one that displays 
the list of _PageTransitions_ in the _FlowRule_ as a table.
We are going to name this editor definition `rules_as_table`. It goes into the file `edu-flow-table.edit`.

```text
// Education/lesson3-defs/edu-flow-table.edit#L3-L3

editor rules_as_table
```

Now to create a projection for _FlowRule_ we use almost the same projection as in the default editor. But to indicate
that we are going to display the list `${self.transitions}` as a table, we remove the keyword `vertical`, and add the keyword `table`.

Furthermore, we want the elements in the list to be displayed one element per row, thus
the keyword `rows` is added. It won't be a surprise that you can also display one element per column using the keyword `columns`.

```text
// Education/lesson3-defs/edu-flow-table.edit#L5-L12

FlowRule {[
    -------------------------------------
    Name: ${name}
        Description: ${self.description}
        For page ${page}

        ${self.transitions table rows}
]}
```

Next we need to define the table itself. Every element in the list is an instance of the _PageTransition_ concept, therefore we add
a projection for this concept, but in front of the square opening bracket we add yet another keyword: `table`. This means that the
following projection is only used when the instance of the concept is projected within a list that is projected as table. The
projection cannot be used anywhere else.

In the definition of the table projection you can add headers, which are taken literally. Here
the headers are `Condition` and `Goto Page`. The
bar between them indicates the transition from one table cell to the next table cell.
Headers are not obligatory, you can create a table without headers, if you like.

Finally, we define the content of the table cells by indicating which property of the _PageTransition_ should go where. Again the bar
indicates the transition from one table cell to the next table cell.

```text
// Education/lesson3-defs/edu-flow-table.edit#L14-L17

PageTransition { table [
    Condition          | Goto Page
    ${self.condition}  |  ${self.toPage}

]}
```

Note that for the _PageTransition_ object we have defined a table with two parts. It is the context 
in which these objects are projected that determines whether these parts are displayed as rows or columns.

When you got all this down in the file `edu-flow-table.edit`, it is time to run the generator again. The editor show look like this.
Feel free to change `rows` in _FlowRule_ to `columns` to see what changes.

(TODO add screenshot of editor)

## Using a Specific Editor

We already mentioned that there is a specific [algorithm](link to part of the documentation) to determine which projection is shown in the generated editor.
However, there is a way to circumvent this. Sometimes you want to use a very specific way to display a concept. You can indicate
that by stating the name of the concept, as well as the name of the editor, using the syntax `[=>ConceptName:editor-name]`,
for example `[=>Page:footing]`.

But before we can use this feature we need to create the `footing` editor definition. Add a file called `page-footing.edit`, and copy the following lines into it.

```text
// Education/lesson3-defs/page-footing.edit#L3-L11

editor footing

Page {[
    Questions:
        ${self.questions vertical separator [.]}

    Score
        ${self.calcResult}
]}
```

Now we are ready to use the above manner to specify a specific editor. With this technique we can rewrite the `edu-subjects.edit` file as follows.

```text
// Education/lesson3-defs/edu-subjects.edit#L17-L60

Theory {[
    ----------------------------------------------------
    Theory [=>Page]
        ${self.lines vertical}

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
    [=>Page]
        ${self.content}

        Test your understanding by answering the following questions.

        [=>Page:footing]
]}
```

You see, there is so much fun to have with creating projections. Please try it out!

But do come back for the next lesson where we will tackle the topic of adding expressions to your metamodel, and to your editor definitions.

<PrevNextSection prevLink= "/Tutorial/Making_an_Editor" nextLink="/Tutorial/Expressions" />
