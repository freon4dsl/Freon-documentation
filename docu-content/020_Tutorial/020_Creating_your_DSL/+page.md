<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Creating your DSL

We assume that you are interested in DSLs, and are therefore familiar with terms
like metamodel, abstract syntax, and model, as well as abbreviations like AST. If you
are not, please first refer to TODO.

From this point onwards we also assume that you have a Freon project in your
favorite IDE, either by creating one through TODO, or by cloning this github
project TODO.

## Where do the files go?

Your project will be set up to have all your Freon definition files in the folder `src/defs`,
but if you decide to do things differently, you can change the `package.json` file.
Look at the scripts for `generate `and `clean-gen`. There you find the folder `src/defs`
mentioned. If you change these entries you can place the language definition files anywhere you like.

```
"generate": "bash ../../../scripts/freon-samples-dev.sh -v all -d src/defs -o src/",
"clean-gen": "bash ../../../scripts/freon-samples-dev.sh clean-it -d src/defs -o src/",
```

TODO: change the above code into the one that correctly uses the published package.

## Defining the model and model units

The first we need to decide is the name of our language, and how we
want to divide any model made by the user into partitions. The user will see only one of the partitions
at a time in the editor, but references can be made to nodes in other partitions. In
Freon terminology these partition are called _Model Units_.

We choose to create a model per subject, that is, per website. Each model is dedicated to
one of the subject courses that our client offers. Each model is divided into three
parts. The **Topics** part will deal with the different webpages that are available
for the subject. The **FlowDescription** handles the way in which the flow between
the pages need to stream. The last part are the **Tests**, which define the tests for
the topics, and the flow between the topics.

Create the file `edu-subjects.ast` in the `src/defs` defs, and add the following code.

```
language Education

model Education /* Computer Aided Learning */ {
    name: identifier;
    description: string; /* e.g. Mathematics for students age 10 */
    topic: Topic[];
    flow: FlowDescription[];
    tests: Test[];
}
```

If you are impatient, and already tried to generate the editor, you will have noticed
that there are errors in our input. We need to define the concepts Topic,
FlowDescription, and Test. All three are model units, so we define them as such.

```
modelunit Topic {

}
modelunit Test {

}
modelunit FlowDescription {

}
```


## The _Topic_ model unit

Let's focus on the Topic model unit first. Because it is likely that we need to make references to topics,
we give each topic a `name `of type `identifier`. A description is probably useful as well, but can have the type `string`.
We are building a model of a website, thus the concept **Page** should definitely be present.
Each Topic will have a number of pages.

<Note><svelte:fragment slot="header"> The type identifier versus the type string.</svelte:fragment>  
<svelte:fragment slot="content">  
The rules for an identifier in Freon are equal to the rules in Typescript. Any concept or model unit that has a property
<i>name</i> of type <i>identifier</i> can be referred to.  
</svelte:fragment></Note>

```
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

```
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

By now, you will have understood the gist of how to build a simple metamodel. For the sake of the example,
we wil not get any further into defining the content of each page type. Let's just assume there are lines of text.

If you like you could generate the editor for our DSL and try it out. Use the following command in the terminal
window of your IDE (you can exchange npm for the package manager of your choice).

```
npm run generate
```

In the github project (todo link) we have provided an example topic model.
When you open the editor, select TODO as model and have a browse. Yes, we know. It works, but it doesn't look great. In a few step we will learn how to
make the model in the editor look a bit decent.


// todo: first make a .edit file for this unit!!!

## The _FlowDescription_ model unit

To avoid having very large files, you can divide your language definition into as many files as you like,
as long as the extension is `.ast` and the language has the same name (todo check the latter), they will be taken into account as part of your language metamodel.

Let's create a second file called `edu-flow.ast`. This file will contain the part of the metamodel that handles with
**FlowDescriptions**.

Here we introduce another feature of Freons metamodel, the reference. Each flow description is dedicated to a certain topic.
The topic is already in the **Topics** model unit, but we add a link, or reference to it by prefixing the property with the keyword
**reference**.

```
modelunit FlowDescription {
    reference topic: Topic;
    rules: FlowRule[];
}
```

Likewise, each **FlowRule** will be linked to a certain page. This is the page that the pupil is currently
working on. The flow rule will determine which page will be the next, using a set of **PageTransitions**.
A page transition is simply a condition coupled to another page. If the condition is fullfilled, then that
page will be the next in the flow.

```
language Education

modelunit FlowDescription {
    reference topic: Topic;
    rules: FlowRule[];
}

concept FlowRule {
    name: identifier;
    description: string;
    reference page: Page;
    transitions: PageTransition[];
}

concept PageTransition { /* e.g. 3 mistakes => show A, 2 mistakes => show B, 1 mistake => show C */
    condition: Grade; /* Note: will be changed into an expression later in the tutorial. */
    reference toPage: Page;
}
```

But how to define the condition for a page transition? Well, let's take the easy road for now and make it an enumeration.
In Freon terminology that is a _limited concept_, which is a slightly more extensive notion than the old-fashioned
enumeration (see todo link to documentation).

```
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
with the model from the previous step. Simple click on the arrow-left icon in the top bar. This will open an
overview of all the model units that are in your project. Choose TODO (name of model unit) and you can view and edit the partition that
we have created for your use. Or, you can play with the File menu. Click `New Model Unit`, and see where that takes you.
Still, things do not look great, do they? Please be patient. In a few more steps you will learn to beautify the appearance of the model in the editor.



## The _Test_ model unit

"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
officia deserunt mollit anim id est laborum."

[Previous](/Tutorial/Intro)
[Next](/Tutorial/Making_an_Editor)
