<script>
    import Note from "$lib/notes/Note.svelte";
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
</script>

# Creating your Metamodel

From this point onwards we assume that you have a Freon project in your
favorite IDE, either by creating one through TODO, or by cloning this github
project TODO.

## Defining the model and model units

The first we need to decide is the name of our language, and how we
want to divide any model made by the user into partitions. The user will see only one of the partitions
at a time in the editor, but references can be made to nodes in other partitions. In
Freon terminology these partition are called _Model Units_.

We choose to create a model per subject, that is, per website. Each model is dedicated to
one of the subject courses that our client offers. Each model is divided into three
parts. The **Topics** part will deal with the different webpages that are available
for the subject. The **Flow** handles the way in which the flow between
the pages need to stream. The last part are the **Tests**, which define the tests for
the topics, and the flow between the topics.

Create the file `edu-subjects.ast` in the `src/defs` folder, and add the following code.

```text
// Education/lesson1-defs/edu-subjects.ast#L1-L9

language Education

model Education /* Computer Aided Learning */ {
    name: identifier;
    description: string; /* e.g. Mathematics for students age 10 */
    topic: Topic[];
    flow: Flow[];
    tests: Test[];
}
```

If you are impatient, and already tried to generate the editor, you will have noticed
that there are errors in our input. We need to define the concepts Topic,
Flow, and Test. All three are model units, so we define them as such.

```text
modelunit Topic {

}
modelunit Test {

}
modelunit Flow {

}
```

## The _Topic_ model unit

Let's focus on the Topic model unit first. Because it is likely that we need to make references to topics,
we give each topic a `name `of type `identifier`. A description is probably useful as well, but can have the type `string`.
We are building a model of a website, thus the concept **Page** should definitely be present.
Each Topic will have a number of pages.

<Note><svelte:fragment slot="header"> The type identifier versus the type string.</svelte:fragment>  
<svelte:fragment slot="content">

<p>A property of type string may contain any printable character, but the content of an identifier is bound to a number of rules.
These rules are equal to the rules in Typescript. Any concept or model unit that has a property
<i>name</i> of type <i>identifier</i> can be referred to. </p>
</svelte:fragment></Note>

```text
// Education/lesson1-defs/edu-subjects.ast#L11-L15

modelunit Topic {
    name: identifier;
    description: string; /* e.g. Fractions, or Multiplications */
    pages: Page[];
}
```

So far, so good!

Now, let's get an idea of the type of pages we will be dealing with.
There will of course be a large number of ordinary pages with text that explains a part
of a topic, some questions to test the understanding of the topic. But we will want to
include stuff that is more interesting for the kids as well, for instance some videos.
There should also be pages with examples, and pages with assignments. So it is a good
idea to make the **Page** concept abstract and have a number of concepts that inherit from it.

```text
// Education/lesson1-defs/edu-subjects.ast#L17-L45

abstract concept Page {
    name: identifier;
    questions: Question[];
}

concept Theory base Page {
/* For the sake of the example this is simplified.
   Should be formatted text including pictures, etc. */
    lines: Line[];
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

<Note><svelte:fragment slot="header"> The Freon <i>Concept</i></svelte:fragment>
<svelte:fragment slot="content">

<p>The Freon concept may be compared to a (UML) class. It can have properties, and may have associations with other concepts.
It can inherit from other concepts, and/or implement an interface.</p>
<p>Freon automatically generates a UML class diagram of your metamodel. You can find them in the
folder <code>src/diagrams</code>, together with some other diagrams
(for instance, one that focuses on inheritance relations).  </p>
</svelte:fragment></Note>

But let's not forget to add a definition for the concept Question. Freon will complain if you
do not define all of the concepts that you are using.

```text
// Education/lesson1-defs/edu-subjects.ast#L47-L50

concept Question {
    name: identifier;
    content: string;
}
```

By now, you will have understood the gist of how to build a simple metamodel. For the sake of the example,
we wil not get any further into defining the content of each page type. Let's just assume there are lines of text.

If you like, you could generate the editor for our DSL, and try it out. Use the following command in the terminal
window of your IDE (you can exchange npm for the package manager of your choice).

```
npm run generate
```

In the github project (todo link) we have provided an example topic model.
When you open the editor, select TODO as model and have a browse. Yes, we know. It works, but it doesn't look great.
In the next lesson we will learn how to
make the model in the editor look a bit decent. But first we are going to define the second model unit, the
description of the flow between the pages.

## The _FlowDescription_ model unit

To avoid having very large files, you can divide your language definition into as many files as you like.
As long as the file extension is `.ast`, and the language has the same name (todo check the latter), the file
will be taken into account as part of your language metamodel.

Let's create a second file called `edu-flow.ast`. This file will contain the part of the metamodel that handles with
**FlowDescriptions**.

Here we introduce another feature of Freons metamodel, the **reference**. Each flow description is dedicated to a certain topic.
The topic is already in the **Topics** model unit, but we add a link, or reference to it by prefixing the property with the keyword
`reference`. You may compare a reference to a UML directed association, where the role name is the name of the property (`topic`), and the direction
is from the owner of the property (`Flow`) to the type of the property (`Topic`).

```text
// Education/lesson1-defs/edu-flow.ast#L1-L6

language Education

modelunit Flow {
    reference topic: Topic;
    rules: FlowRule[];
}
```

Likewise, each **FlowRule** will be linked to a certain page. This is the page that the pupil is currently
working on. The flow rule will determine which page to show next, using a set of **PageTransitions**.
A page transition is simply a condition coupled to another page. If the condition is fulfilled, then that
page will be the next in the flow.

```text
// Education/lesson1-defs/edu-flow.ast#L8-L18

concept FlowRule {
    name: identifier;
    description: string;
    reference page: Page;
    transitions: PageTransition[];
}

concept PageTransition { /* E.g. Grade A => show pageA, Grade F => show pageC */
    condition: Grade; /* Note: will be changed into an expression later in the tutorial. */
    reference toPage: Page;
}
```

But how to define the condition for a page transition? Well, let's take the easy road for now and make it an enumeration.
In Freon terminology that is a _limited concept_, which is a slightly more extensive notion than the old-fashioned
enumeration (see todo link to documentation).

```text
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

We will revisit the condition for a page transition later on in the tutorial and change it into a more complex concept. But for now,
we are done with the second model unit.

Again, you might want to generate the editor and try it out. Note that when you start the editor, it will open
with the model of the pages, the one from the previous step. Simply click on the arrow-left icon in the top bar. This will open an
overview of all the model units that are present in your project. Choose TODO (name of model unit) and you can view, and edit the partition that
we have created for your use. Or, you can play with the File menu. Click `New Model Unit`, and see where that takes you.
Still, things do not look great, do they? Please be patient. In the next lesson you will learn to beautify the appearance of the model in the editor.

<PrevNextSection prevLink= "/Tutorial/Intro" nextLink="/Tutorial/Making_an_Editor" />
