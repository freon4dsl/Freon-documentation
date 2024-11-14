<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
</script>

# Making an Editor for your DSL

At last, your patience is rewarded. In this step of the tutorial we are going to make the editor looking great!

## The default editor

Let's create a file called `edu-subjects.edit` in the `src/defs` folder,
and define a default editor for this model unit. Please, enter the following line.

```text
// Education/lesson2-defs/edu-subjects.edit#L3-L3

editor default
```

There, that's done!

No, of course we are not done. Just kidding, and showing you that Freon will add a default [projection](Documentation/Editor/Projections) for any concept that is not
included in the editor definition. You can build your editor concept by concept.

## A projection for the _Topic_ model unit

Again, we focus on the _Topic_ model unit first. Let's state how this model unit should look. To define a projection
we need the name of the concept, some curly brackets, and, last but not least a pair of square brackets. Everything
that goes between the square brackets is the projection. It will be taken as literal as possible into the editor, that is,
if there is indentation or literal text this will be projected as unchangeable strings.

The projection for _Topic_ consists of three parts.

- A line with the fixed
  string 'Topic:' followed by the name of the unit. For the latter we use a syntax similar to the smart
  strings in TypeScript: `${self.name}`. You may leave out the 'self.' part. It indicates that we refer to the property of the _Topic_ object
  that is projected. For clarity we will be using this prefix everywhere in the tutorial.
- The second line is similar to the first, but projects the `description` property of the model unit. Next, we add an empty line
  which, like the indentation, will show in the editor.
- The third part of the definition gives the projection of the `pages` property, which is a list. By adding the keyword `vertical`
  we tell Freon to project the list vertically.

```text
// Education/lesson2-defs/edu-subjects.edit#L3-L11

editor default

Topic {[
    Topic: ${self.name}
    Description: ${self.description}

    Pages:
    ${self.pages vertical }
]}
```

Go ahead, and generate a new editor and have a look. Your editor should look like this.

(TODO screenshot of editor)

## Inherited Projections

Remember that we defined the concept `Page` to be abstract, and there were a lot of concepts that inherit from `Page`? Of course,
we can build inherited projection definitions as well. We define the projection for the abstract concept `Page` as follows.

```text
// Education/lesson2-defs/edu-subjects.edit#L13-L15

Page {[
    ${self.name}
]}
```

It's nothing fancy, but you could do more, if you like. Now look at how we incorporate this projection in the projection of one of `Page`'s children.
Note that the line of dashes will also appear in the editor. Note also that we can use inherited properties, like `questions`, as expected in the projection.

```text
// Education/lesson2-defs/edu-subjects.edit#L17-L31

Theory {[
    ----------------------------------------------------
    Theory [=>Page]
        ${self.lines vertical}

    Questions:
        ${self.questions vertical separator [.]}

    Score
        ${self.calcResult}
]}

Line {[
    ${self.content}
]}
```

The editor now looks like this.

TODO add screenshot of editor

When you've gotten this far, it might be a good idea to try for yourself what
happens if you switch the order of the lines in the projection.

## The Possibilities for Lists

You might have noticed something else in the above definition: `separator [.]` in the list of `questions`. It means that
between every element of the list the '.' character is projected.

This is only one of the possible manners of projecting a list. You could also opt for using a `terminator`, a character
or string without spaces to be projected after every element of the list. And there is the `initiator`, which project
the character or string before the element.

Furthermore, not all lists need to be projected vertically. Use the keyword `horizontal` to display all list elements on a single line.
Here are some examples of how you can tweak the display. The keyword may also be omitted, the default value is 'vertical'.

```text
    Questions:
        ${self.questions vertical separator [.]}

    Questions:
        ${self.questions horizontal terminator [====]}

    Questions:
        ${self.questions vertical initiator [Question]}
]}
```

Go ahead and try the different options. When you are done, finish the projection for this mode unit by adding the following lines.
But don't forget to get back to the next part of the tutorial, where we will have more fun with defining projections.

```text
// Education/lesson2-defs/edu-subjects.edit#L33-L89

Video {[
    ----------------------------------------------------
    Video [=>Page]
        Maybe this video will help you understand.
        ${self.url}

    Questions:
        ${self.questions vertical separator [.]}

    Score
        ${self.calcResult}
]}

WorkSheet {[
    ----------------------------------------------------
    Worksheet [=>Page]
        See if you can answer the following questions.

    Questions:
        ${self.questions vertical separator [.]}

    Score
        ${self.calcResult}
]}

ExamplePage {[
    ----------------------------------------------------
    Example [=>Page]
        ${self.content}

    Now, please, answer the following questions.

    Questions:
        ${self.questions vertical separator [.]}

    Score
        ${self.calcResult}
]}

InDepthMaterial {[
    ----------------------------------------------------
    [=>Page]
        ${self.content}

    Test your understanding by answering the following questions.

    Questions:
        ${self.questions vertical separator [.]}

    Score
        ${self.calcResult}
]}

Question {[
    ${name}
        ${self.content} Correct Answer: ${self.correctAnswer}
]}
```

<PrevNextSection prevLink= "/Tutorial/Creating_your_Metamodel" nextLink="/Tutorial/More_Fun_with_Projections" />
