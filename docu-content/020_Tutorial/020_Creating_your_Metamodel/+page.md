---
title: Creating Your Metamodel
description: Define the core metamodel for your Freon-based DSL by introducing model units (Topic, Flow, Test, SiteGroup), concepts, references, and limited concepts, and organize your definition files for generation.
tags: Freon, metamodel, model units, AST, Topic, Flow, Test, SiteGroup, Page, references, UML, limited concept, enumeration, Education language, tutorial
---

<script>
    import Note from '$lib/notes/Note.svelte';
</script>

# Creating your Metamodel

From this point onward, we assume you have a Freon project open in your
favorite IDE—either by cloning the [Example project](/Documentation/Overview/Getting_Started#creating-a-project-2)
or the [Template project](/Documentation/Overview/Getting_Started#template-project-startup-3).

## Defining the model and model units

The first thing we need to decide is the name of our language and how we
want to partition any model the user creates. The user will see only one partition
at a time in the editor, but references can point to nodes in other partitions. In
Freon terminology these partitions are called _Model Units_.

We’ll create a model with a number of topics. Each model is dedicated to
one of the courses that our client offers (i.e., one of their websites). Each model is divided into four
parts. The **Topics** part covers the different webpages available
for the topic. **Flow** defines how navigation between
pages should proceed. The **Tests** section defines tests for
topics and the flow between topics. Finally, the **SiteGroup** part provides an overview of
a site group with all subtopics, flows, and tests relevant to that topic.

Create the file `edu-main.ast` in the `src/defs` folder, and add the following code.

```proto
// Education/lesson1-defs/edu-main.ast#L1-L10

language Education

model Education /* Computer Aided Learning */ {
    name: identifier;
    topic: Topic[];
    flow: Flow[];
    tests: Test[];
    overviews: SiteGroup[];
}
```

If you’re impatient and already tried to generate the editor, you’ll have noticed
that there are errors in our input. We need to define the concepts `Topic`,
`Flow`, `Test`, and `SiteGroup`. All four are model units, so we define them as such.

```proto
modelunit Topic {

}
modelunit Test {

}
modelunit Flow {

}
modelunit SiteGroup {

}
```

## The _SiteGroup_ model unit

Let’s focus on the _SiteGroup_ model unit first. Because it’s likely that we’ll need to reference topics,
we give each topic a `name` of type `identifier`.

<Note>{#snippet header()} The type identifier versus the type string.{/snippet}  
{#snippet content()}
<p>A property of type string may contain any printable character, but the content of an identifier is bound to a number of rules.
These rules are equal to the rules in Typescript. Any concept or model unit that has a property
<i>name</i> of type <i>identifier</i> can be referred to.</p>
{/snippet}
</Note>

Every (sub)topic belongs to a site group, but we don’t want this relationship
to be like a UML aggregation, as that would be too restrictive here. Therefore, we introduce another feature of
Freon’s metamodel: the **reference**. You can compare a reference to a UML directed association, where the role name is the property name (`topics`), and the direction
is from the owner of the property (`SiteGroup`) to the property’s type (`Topic`). The square brackets after the type indicate
a list (multiple instances).

Likewise, we define references to the flows and tests that are part of this site group.

```proto
// Education/lesson1-defs/edu-main.ast#L11-L17

modelunit SiteGroup {
    name: identifier;
    description: string; /* e.g. Mathematics, fractions for students age 10 */
    reference topics: Topic[];
    reference flows: Flow[];
    reference tests: Test[];
}
```

## The _Topic_ model unit

To avoid very large files, you can split your language definition across as many files as you like.
As long as the file extension is `.ast`, the file
will be included as part of your language metamodel.

So, let’s create another file to store the metamodel for the _Topic_ model unit. Like the _SiteGroup_ model
unit, the _Topic_ model unit has a name of type `identifier`. A description is probably
useful as well; we give it the type `string`, because it may contain any characters.
We’re modeling a website, so the concept **Page** should definitely be present.
Each `Topic` will have a number of pages. The result for now is the code below.

```proto
// Education/lesson1-defs/edu-topics.ast#L3-L8

modelunit Topic {
    name: identifier;
    reference main: SiteGroup;
    description: string;
    pages: Page[];
}
```

So far, so good!

Now, let’s outline the types of pages we’ll use.
There will be ordinary pages with explanatory text and
questions to test understanding. We also want content that’s engaging for kids—for instance, videos.
There should be pages with examples and pages with assignments. It’s a good
idea to make the **Page** concept abstract, and then define several concepts that inherit from it.

```proto
// Education/lesson1-defs/edu-topics.ast#L10-L39

abstract concept Page {
    name: identifier;
    questions: Question[];
}

concept Theory base Page {
    /* For the sake of the example this is simplified.
    Should be formatted text including pictures, etc. */
    content: Line[];
}

concept Line {
    content: string;
}

concept Video base Page {
    url: string;
}

concept WorkSheet base Page {
}

concept ExamplePage base Page {
    content: Line[];
}

concept InDepthMaterial base Page {
    content: Line[];
}
```

<Note header={header2} content={content2}> 
{#snippet header2()}UML diagrams{/snippet}
{#snippet content2()}
<p>The Freon metamodel can be expressed in UML. For instance, a Freon concept may be compared to a UML class. 
It can have properties and associations with other concepts,
and it can inherit from other concepts and/or implement an interface.</p>
<p>Likewise, reference properties may be compared to UML directed associations, while normal properties resemble aggregation relations.</p>
<p>Freon automatically generates several UML class diagrams of your metamodel. You can find them in the
folder <code>src/diagrams</code>, along with other diagrams
(for example, one that focuses on inheritance relations).</p>
{/snippet}
</Note>

But let’s not forget to add a definition for the concept **Question**. Freon will complain if you
use concepts you haven’t defined. And because we’re dealing with mathematics, we need to
represent fractions; a simple number won’t be sufficient.

```proto
// Education/lesson1-defs/edu-topics.ast#L41-L57

    name: identifier;
    content: string;
    correctAnswer: NumberConcept;
}

abstract concept NumberConcept {
}

concept SimpleNumber base NumberConcept {
    value: number;
}

concept Fraction base NumberConcept {
    numerator: number;
    denominator: number;
}
```

By now, you’ve seen the gist of how to build a simple metamodel. For the sake of brevity,
we will not go further into defining the content of each page type. Let’s just assume
there is some content, represented here as lines of text.

If you like, you can generate the editor for our DSL and try it out. Use the following command in the terminal
window of your IDE (you can swap `npm` for the package manager of your choice):

```bash
npm run build
```

In the GitHub project, we’ve provided an example model named `lesson1`.
Before you open the editor, start the server.

[//]: # (todo make 'GitHub project' above a link)

```bash
npm run start
```

Open the editor, select `lesson1` as the model, and have a browse.

Yes, we know—it works, but it doesn’t look great. In the next lesson we’ll learn how to
make the model look more polished in the editor. But first, we’ll define the second model unit:
the description of the flow between pages.

## The _Flow_ model unit

Create a second file called `edu-flow.ast`. This file will contain the part of the metamodel that handles
**Flows**.

```proto
// Education/lesson1-defs/edu-flow.ast#L1-L6

language Education

modelunit Flow {
    reference main: SiteGroup;
    rules: FlowRule[];
}
```

Here again, we use a reference to link the flow to a site group.

In the following code, each **FlowRule** is linked to a specific page—the page the pupil is currently
working on. The flow rule determines which page to show next using a set of **PageTransitions**.
A page transition is a condition paired with a target page. If the condition is fulfilled, that
page will be the next in the flow.

```proto
// Education/lesson1-defs/edu-flow.ast#L8-L18

concept FlowRule {
    name: identifier;
    description: string;
    reference page: Page;
    transitions: PageTransition[];
}

concept PageTransition { /* E.g. Grade A => show pageA, Grade F => show pageC */
    condition: Grade;
    reference toPage: Page;
}
```

But how do we define the condition for a page transition? For now, we’ll take the straightforward approach and use an enumeration.
In Freon terminology this is a [limited concept](/Documentation/Creating_the_Metamodel/Language_Structure#limited-concept-7),
which is slightly more expressive than a traditional enumeration.

```proto
// Education/lesson1-defs/edu-flow.ast#L20-L27

limited Grade {
    gradeA;
    gradeB;
    gradeC;
    gradeD;
    gradeE;
    gradeF;
}
```

That’s the second model unit done!

Again, you might want to generate the editor and try it out. Note that when you start the editor, it will open
with the topic from the previous step. Click the arrow-left icon in the top bar to open an
overview of all model units present in your project. Click on `StartFlow`, select **Open** from the dropdown,
and you can view and edit the partition we’ve prepared for you. Or play with the File menu—click **New Model Unit** and explore.

Things still don’t look great, do they? Please be patient. In the next lesson you’ll learn to beautify the model’s appearance in the editor.
