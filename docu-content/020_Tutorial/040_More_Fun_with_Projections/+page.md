<script>
    import Note from "$lib/notes/Note.svelte";
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
    import Figure from "$lib/figures/Figure.svelte";

    let prevLink= '/Tutorial/Making_an_Editor';
    let nextLink='/Tutorial/Expressions_in_Freon';
</script>

<PrevNextSection {prevLink} {nextLink} />


# More Fun with Projections

Freon projections are very flexible. In this lesson we are going to dive into a number of ways to make your editor look great.
We are going to create tables!

## A projection for the _Flow_ model unit

We almost forgot to make an editor definition for the _Flow_ model unit. We are going to create a file called `edu-flow-edit`,
and add the following lines to it. You should be familiar with everything in these projections by now.

```txt
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

Yes, generate the editor and try it! Note that to see this definition in action you need to click on the arrow-left
icon in the top bar, and select 'StartFlow' from the list of model units. It looks like this.

<Figure
imageName={'Tutorial-lesson3-screenshot1.png'}
caption={'Editor after adding projections for the Flow model unit'}
figureNumber={1}
/>

## More than One Editor

Using Freon you can have multiple views on the same concept. After all, Freon generates a [projectional editor](/Documentation/Overview/Projectional_Editing).

Remember that the editor definition in the previous lesson, and the one above are called `default`? That is 
because you can have any number of editor definitions, each with its own name. 

You can think of an editor as a different view on the model, but in terms of the editor definition,
it is simply a set of projection definitions. This set can consist of a single concept that will have a 
different appearance than the default, or multiple concepts that need to be displayed differently.

When an editor definition does not have a projection for a certain concept, it falls back to the projection in one of the other
editor definitions. Which projection is chosen for a certain concept, is determined by a fixed algorithm. 
If you want to know more about this algorithm, read [TODO](link to part of the documentation).

<Note><svelte:fragment slot="header"> One property, one occurrence in the editor</svelte:fragment>
<svelte:fragment slot="content">
<p>Unfortunately, it is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view in the running editor
does not allow us to do this.</p>
</svelte:fragment></Note>

## Creating Tables

Let's create a second editor definition for the _Flow_ model unit, one that displays 
the list of _PageTransitions_ in the _FlowRule_ as a table.
We are going to name this editor definition `rules_as_table`. It goes into the file `edu-flow-table.edit`.

```txt
// Education/lesson3-defs/edu-flow-table.edit#L3-L3

editor rules_as_table
```

Now to create a projection for _FlowRule_ we use almost the same projection as in the default editor. But to indicate
that we are going to display the list `${self.transitions}` as a table, we remove the keyword `vertical`, and add the keyword `table`.

Furthermore, we want the elements in the list to be displayed one element per row, thus
the keyword `rows` is added. It won't be a surprise that you can also display one element per column using the keyword `columns`.

```txt
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

```txt
// Education/lesson3-defs/edu-flow-table.edit#L14-L17

PageTransition { table [
    Condition          | Goto Page
    ${self.condition}  |  ${self.toPage}
]}
```

Note that for the _PageTransition_ object we have defined a table with two parts. It is the context 
in which these objects are projected that determines whether these parts are displayed as rows or columns.

When you got all this down in the file `edu-flow-table.edit`, it is time to run the generator again. Find the model unit 
named 'StartFlow again', and ... Yes, there is a table. Feel free to change `rows` in the _FlowRule_ projection
to `columns` to see what changes.

<Figure
imageName={'Tutorial-lesson3-screenshot2.png'}
caption={'Editor after adding projections for the Flow model unit'}
figureNumber={2}
/>

If you want to see things like they were before, go the **View** menu, deselect **rules_as_table**, and hit **Apply changes**. The 
name of the menu option is the name that we have given our second editor definition. If you create more editor definitions, every 
name will be added to the menu. That way, you are able to switch on and off any of the projection sets / editor definitions.

## Using a Specific Editor

We already mentioned that there is a specific [algorithm](link to part of the documentation) to determine which projection is shown in the generated editor.
However, there is a way to circumvent this. Sometimes you want to use a very specific way to display a concept. You can indicate
that by stating the name of the concept, as well as the name of the editor definition, using the syntax `[=>ConceptName:editor-name]`,
for example `[=>Page:footing]`.

We want to see this feature in action! But before we can use the `footing` editor definition, we need to create it. 
Add a file called `page-footing.edit`, and copy the following lines into it.

```txt
// Education/lesson3-defs/page-footing.edit#L3-L8

editor footing

Page {[
    Questions:
        ${self.questions vertical terminator [END]}
]}
```

Now we are ready to specify a specific editor. Let's rewrite the `edu-topics.edit` file as follows.

```txt
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
And try it out! You see, there is so much fun to have with creating projections.
But do come back for the next lesson where we will tackle the topic of adding 
expressions to your metamodel, and to your editor definitions.

<PrevNextSection {prevLink} {nextLink} />
