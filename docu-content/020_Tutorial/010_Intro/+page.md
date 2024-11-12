# Welcome to the Freon tutorial!

This step-by-step guide will teach you everything you need to know to easily build your own domain specific language (DSL).
You will learn how to create the set of tools, editor, validator, interpreter, etc, which will enable your end-users to use your DSL efficiently.

You can also consult the API docs, or — if you’re impatient to start hacking on your machine locally — create a project with todo.

## The DSL: Computer Aided Learning

First we need to explain the domain in which our DSL is positioned, which is Computer Aided Learning. Our (hypothetical) client is a company that provides
a service to children of various ages to help them learn certain subjects, like arithmetic and mathematics, geography, history, biology, or
road safety. For this purpose the company deploys a number of websites, each dedicated to a certain subject.

The company, therefore, needs a lean and agile means
to define the content of the webpages, and the flow between them. For instance, when a pupil makes many mistakes, the page that will be
shown next to this specific pupil is one that might contain extra explanation, or extra practice material. But when another pupil goes through the topic
with much ease, he or she will be shown more advanced material to keep him/her interested. Furthermore, our client company want a means to test the page
flow before the actual webpages are produced.

So you might see that we have a bit of task before us, to satisfy this clients needs and expectations.

## How to use this tutorial

This tutorial is split into six parts:

- TODO

Each section has a dedicated subject, but it will build upon the previous sections. So the best way is to work through them in the order given above.

The easiest way to follow this tutorial is to create your own project in the IDE of your choice by TODO. There you can recreate the project, and toys with many of the options.
Alternatively you can check out the sources for this tutorial on github: TODO link.
The github project is broken up into the same six parts, so you won't be bothered by any of the details that are not yet explained, when going through the parts one by one.

## Where do the files go?

Your project will be set up to have all your Freon definition files in the folder `src/defs`,
but if you decide to do things differently, you can change the `package.json` file.
Look at the scripts for `generate `and `clean-gen`. There you find the folder `src/defs`
mentioned. If you change these entries you can place the language definition files anywhere you like.

```
"generate": "freon -v all -d src/defs -o src/",
"clean-gen": "freon clean-it -d src/defs -o src/",
```

[Next](/Tutorial/Creating_your_DSL)
