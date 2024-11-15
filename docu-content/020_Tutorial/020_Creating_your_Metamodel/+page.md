<script>
    import Note from "$lib/notes/Note.svelte";
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
</script>

# Creating your Metamodel

From this point onwards we assume that you have a Freon project in your
favorite IDE, either by creating one through TODO, or by cloning this GitHub
project TODO.

## Defining the model and model units

The first we need to decide is the name of our language, and how we
want to divide any model made by the user into partitions. The user will see only one of the partitions
at a time in the editor, but references can be made to nodes in other partitions. In
Freon terminology these partition are called _Model Units_.

We choose to create a model with a number of subjects. Each model is dedicated to
one of the courses that our client offers, that is, to one of their websites. Each model is divided into four
parts. The **Topics** part will deal with the different webpages that are available
for the subject. The **Flow** handles the way in which the flow between
the pages need to stream. Further there are the **Tests**, which define the tests for
the topics, and the flow between the topics. Finally, there is the **Subject** part, which gives an overview of 
a subject, with all topic, flows, and tests that regard that subject.

Create the file `edu-subjects.ast` in the `src/defs` folder, and add the following code.

```txt
// Education/lesson1-defs/edu-subjects.ast#L1-L10

language Education

model Education /* Computer Aided Learning */ {
    name: identifier;
    topic: Topic[];
    flow: Flow[];
    tests: Test[];
    overviews: Subject[];
}

```

If you are impatient, and already tried to generate the editor, you will have noticed
that there are errors in our input. We need to define the concepts Topic,
Flow, Test, and Subject. All four are model units, so we define them as such.

```txt
modelunit Topic {

}
modelunit Test {

}
modelunit Flow {

}
modelunit Subject {

}
```

## The _Topic_ model unit

Let's focus on the Topic model unit first. Because it is likely that we need to make references to topics,
we give each topic a `name `of type `identifier`. 

<Note><svelte:fragment slot="header"> The type identifier versus the type string.</svelte:fragment>  
<svelte:fragment slot="content">

<p>A property of type string may contain any printable character, but the content of an identifier is bound to a number of rules.
These rules are equal to the rules in Typescript. Any concept or model unit that has a property
<i>name</i> of type <i>identifier</i> can be referred to. </p>
</svelte:fragment></Note>

Every topic belongs to a subject, but we do not want this relationship
to be like a UML aggregation, because we feel that this is too restrictive here. Therefore, we introduce another feature of 
Freons metamodel, the **reference**. You may compare a reference to a UML directed association, where the role name is the name of the property ('subject'), and the direction
is from the owner of the property ('Topic') to the type of the property ('Subject').

A description is probably useful as well, we give it the type `string`, because it should be able to contain all kinds of characters.
We are building a model of a website, thus the concept **Page** should definitely be present.
Each Topic will have a number of pages. The result for now is the code below.

```txt
// Education/lesson1-defs/edu-topics.ast#L3-L8

modelunit Topic {
    name: identifier;
    reference subject: Subject;
    description: string;
    pages: Page[];
}
```

So far, so good!

Now, let's get an idea of the type of pages we will be dealing with.
There will of course be a large number of ordinary pages with text that explains a part
of a topic, some questions to test the understanding of the topic. But we will want to
include stuff that is more interesting for the kids as well, for instance some videos.
There should also be pages with examples, and pages with assignments. So it is a good
idea to make the **Page** concept abstract, and have a number of concepts that inherit from it.

```txt
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

concept Line { // todo use MultiLine Component
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

<Note><svelte:fragment slot="header">UML diagrams</svelte:fragment>
<svelte:fragment slot="content">
<p>The Freon metamodel can be expressed in UML. For instance, the Freon concept may be compared to a UML class. 
It can have properties, and may have associations with other concepts.
It can inherit from other concepts, and/or implement an interface.</p>
<p>Likewise, reference properties may be compared to UML directed associations, and normal properties to aggregation relations.</p>
<p>Freon automatically generates a number of UML class diagrams of your metamodel. You can find them in the
folder <code>src/diagrams</code>, together with some other diagrams
(for instance, one that focuses on inheritance relations).  </p>
</svelte:fragment></Note>

But let's not forget to add a definition for the concept **Question**. Freon will complain if you
do not define all the concepts that you are using. And, because we are dealing with mathematics, we need to
create a concept that represents fractions. A simple number will not be sufficient.

```txt
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

By now, you will have understood the gist of how to build a simple metamodel. For the sake of brevity,
we wil not get any further into defining the content of each page type. Let's just assume 
there is some content. We will be representing this as lines of text.

If you like, you could generate the editor for our DSL, and try it out. Use the following command in the terminal
window of your IDE (you can exchange npm for the package manager of your choice). (todo check if the model works with only this model unit defined.)

```bash
npm run build
```

In the GitHub project (todo link) we have provided an example model named 'lesson1'.
Before you open the editor, start the server. (todo check if this is the right command)

```bash
npm run start
```

Open the editor, select 'lesson1' as model, and have a browse. 

Yes, we know. It works, but it doesn't look great. In the next lesson we will learn how to
make the model in the editor look a bit more decent. But first we are going to define the second model unit, the
description of the flow between the pages.


## The _Flow_ model unit

To avoid having very large files, you can divide your language definition into as many files as you like.
As long as the file extension is `.ast`, and the language has the same name (todo check the latter), the file
will be taken into account as part of your language metamodel.

Let's create a second file called `edu-flow.ast`. This file will contain the part of the metamodel that handles
**Flows**.

```txt
// Education/lesson1-defs/edu-flow.ast#L1-L6

language Education

modelunit Flow {
    reference subject: Subject;
    rules: FlowRule[];
}
```
Here again, we use a reference to link the flow a subject.

In the following code, each **FlowRule** is linked to a certain page. This is the page that the pupil is currently
working on. The flow rule will determine which page to show next, using a set of **PageTransitions**.
A page transition is simply a condition coupled to another page. If the condition is fulfilled, then that
page will be the next in the flow.

```txt
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

But how to define the condition for a page transition? Well, we'll take the easy road for now, and make it an enumeration.
In Freon terminology that is a **limited concept**, which is a slightly more extensive notion than the old-fashioned
enumeration (see todo link to documentation).

```txt
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

That is the second model unit done! 

Again, you might want to generate the editor and try it out. Note that when you start the editor, it will open
with the topic, the one from the previous step. Simply click on the arrow-left icon in the top bar. This will open an
overview of all the model units that are present in your project. Click on 'StartFlow', select 'Open' from the dropdown menu, 
and you can view and edit the partition that
we have created for your use. Or, you can play with the File menu. Click `New Model Unit`, and see where that takes you.

Still, things do not look great, do they? Please be patient. In the next lesson you will learn to beautify the appearance of the model in the editor.

<PrevNextSection prevLink= "/Tutorial/Intro" nextLink="/Tutorial/Making_an_Editor" />
