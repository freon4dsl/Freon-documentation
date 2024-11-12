# More Fun with Projections

## More than One Editor


<Note><svelte:fragment slot="header"> One property, one occurrence in the editor</i></svelte:fragment>
<svelte:fragment slot="content">
<p>Unfortunately, it is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view does not allow us to do this.</p>
</svelte:fragment></Note>

## Using a Specific Editor
using [=>Page:footing]

```ts
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

[Previous](/Tutorial/Making_an_Editor)
[Next](/Tutorial/In_Need-of_Scoping)
