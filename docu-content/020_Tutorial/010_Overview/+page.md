# Welcome to the Freon tutorial!

This step-by-step guide will teach you everything you need to know to easily build your own domain specific language (DSL).
You will learn how to create the set of tools, editor, validator, interpreter, etc., which will enable your end-users to use your DSL efficiently.

You can also consult the documentation, or - if you’re impatient to start hacking on your machine 
locally - [create a project](/Documentation/Overview/Getting_Started#example-project-startup-2).

We assume that you are interested in DSLs, and are therefore familiar with terms
like metamodel, abstract syntax, and model, as well as abbreviations like AST. If you
are not, please first refer to other sources, for instance the 
book <a href="https://www.manning.com/books/building-user-friendly-dsls" target="_blank">'Building User-Friendly DSLs'</a> written by Meinte Boersma. 
If you just need to refresh your knowledge, refer to [Freon Terminology](/Documentation/Terminology).
Furthermore, a little knowledge of UML will come in handy, but this is not a true requirement.

## The DSL: Computer Aided Learning

The first thing to do is explain the domain in which our DSL is positioned, which is Computer Aided Learning. Our (hypothetical) client is a company that provides
a service to children of various ages to help them learn certain topics, like arithmetic and mathematics, geography, history, biology, or
road safety. For this purpose the company deploys a number of websites, each dedicated to a certain topic.

The company, therefore, needs a lean and agile means
to define the content of the webpages, and the flow between them. For instance, when a pupil makes many mistakes, the page that will be
shown next to this specific pupil is one that might contain extra explanation, or extra practice material. But when another pupil goes through the topic
with much ease, he or she will be shown more advanced material to keep him/her interested. Furthermore, our client company want a means to test the page
flow before the actual webpages are produced.

So you might see that we have a bit of task before us to satisfy this client's needs and expectations.

## How to use this tutorial

This tutorial is split into 9 lessons. Each lesson has a dedicated subject, but it will 
build upon the previous lessons. So the best way is to work through them in the given order.

The easiest way to follow this tutorial is to use the create project command, and choose the language `Education`.
This way you can recreate the project, and toy with many of the options.

```bash
  npm create freon@latest
```

In the `Education` project you will find all definition files needed for one of the lessons in a separate folder,
so you won't be bothered by any of the details that are not yet explained, when going through the lessons one by one.
For instance, you can find all definition files for lesson&nbsp3 in the folder named `lesson3-defs`, and likewise for all other lessons. 
The files for lesson1 are present in the `src/defs` folder (see <a href='#where-do-the-files-go-4'>Where do the files go?</a>) at the start.
Empty this folder before the next lesson, and copy in the files for the lesson you are about to follow. You can also find 
a number of models that fit the language(s) from the lessons in the **modelstore** folder. (For an explanation of the content of the project see
[Project_Structure](/Documentation/Overview/Getting_Started#project_structure-4).) Use the model called `Lesson1` for lessons 1 till 3, 
the model `Lesson4` for lessons 4 and 5, and `Lesson6` for the rest of the lessons.

For some hints on how to use the editor, click on the question mark on the top bar of the editor.

## Where do the files go?

Your project will be set up to have all your Freon definition files in the folder `src/defs`,
but if you decide to do things differently, you can change the `package.json` file.
Look at the scripts for `generate `and `clean-gen`. There you find the folder `src/defs`
mentioned. If you change these entries you can place the language definition files anywhere you like.

```
"generate": "freon -v all -d src/defs -o src/freon",
"clean-gen": "freon clean-it -d src/defs -o src/freon",
```

In this tutorial we will make a number of Freon definition files. Note that the extension of the 
file (for instance, `.ast`, `.valid`) is important, but the name is not. All metamodel definitions 
need to be in a `.ast` file, all editor definitions in a `.edit` file, etc.

When you have checked out the source code and are following this
example in your own IDE, you might notice that upon regeneration the browser sometimes shows an empty page. The reason
is that the browser is quicker than the regeneration process. (In the console of the browser development tools you will see
the message `Uncaught SyntaxError: Unexpected end of input`.) Don't worry, simply reload
the page, and everything will be fine.
