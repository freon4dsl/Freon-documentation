<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';

    let nextLink = "/Tutorial/Creating_your_Metamodel";
</script>

<PrevNextSection {nextLink} />

# Welcome to the Freon tutorial!

This step-by-step guide will teach you everything you need to know to easily build your own domain specific language (DSL).
You will learn how to create the set of tools, editor, validator, interpreter, etc., which will enable your end-users to use your DSL efficiently.

You can also consult the API docs, or — if you’re impatient to start hacking on your machine locally — create a project with todo.

We assume that you are interested in DSLs, and are therefore familiar with terms
like metamodel, abstract syntax, and model, as well as abbreviations like AST. If you
are not, please first refer to TODO. Furthermore, a little knowledge of UML will come in handy,
but this is not a true requirement.

## The DSL: Computer Aided Learning

First we need to explain the domain in which our DSL is positioned, which is Computer Aided Learning. Our (hypothetical) client is a company that provides
a service to children of various ages to help them learn certain topics, like arithmetic and mathematics, geography, history, biology, or
road safety. For this purpose the company deploys a number of websites, each dedicated to a certain topic.

The company, therefore, needs a lean and agile means
to define the content of the webpages, and the flow between them. For instance, when a pupil makes many mistakes, the page that will be
shown next to this specific pupil is one that might contain extra explanation, or extra practice material. But when another pupil goes through the topic
with much ease, he or she will be shown more advanced material to keep him/her interested. Furthermore, our client company want a means to test the page
flow before the actual webpages are produced.

So you might see that we have a bit of task before us to satisfy this client's needs and expectations.

## How to use this tutorial

This tutorial is split into (todo) number of lessons:

1. [Creating your Metamodel](/Tutorial/Creating_your_Metamodel), which will take you through the steps of defining your metamodel as input to Freon.
2. [Making an Editor](/Tutorial/Making_an_Editor), which will explain how to determine the looks of the editor.
3. [More Fun with Projections](/Tutorial/More_Fun_with_Projections), which shows how to define extra views within the editor.
4. [In Need of Scoping](/Tutorial/In_Need_of_Scoping), which gives insights into defining scoping rules.

Each section has a dedicated subject, but it will build upon the previous sections. So the best way is to work through them in the order given above.

The easiest way to follow this tutorial is to create your own project in the IDE of your choice by TODO. There you can recreate the project, and toy with many of the options.
Alternatively you can clone the sources for this tutorial on GitHub: TODO link.

The GitHub project is broken up into the same number of parts, so you won't be bothered by any of the details that are not yet explained, when going through the parts one by one.
You can find all definition files for lesson&nbsp1 in the folder named `lesson1-defs`, and likewise for all other lessons. Empty
the `src/defs` folder (see <a href='#where-do-the-files-go-4'>Where do the files go?</a>), and copy in the files for the lesson you are about to follow. You can also find 
a number of models that fit the language(s) from the lessons in the model server.

## Where do the files go?

Your project will be set up to have all your Freon definition files in the folder `src/defs`,
but if you decide to do things differently, you can change the `package.json` file.
Look at the scripts for `generate `and `clean-gen`. There you find the folder `src/defs`
mentioned. If you change these entries you can place the language definition files anywhere you like.

```
"generate": "freon -v all -d src/defs -o src/",
"clean-gen": "freon clean-it -d src/defs -o src/",
```

<PrevNextSection {nextLink} />
