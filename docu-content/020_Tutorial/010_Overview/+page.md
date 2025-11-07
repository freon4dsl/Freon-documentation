---
title: Welcome to the Freon Tutorial
description: Follow this step-by-step tutorial to learn how to create your own domain-specific language (DSL) with Freon. Build editors, validators, and interpreters while exploring an example in the domain of Computer Aided Learning.
tags: tutorial, introduction, DSL, domain-specific language, Freon, metamodel, projectional editing, TypeScript, language workbench, computer aided learning
---

# Welcome to the Freon Tutorial!

This step-by-step guide will teach you everything you need to know to build your own domain-specific language (DSL) using **Freon**.  
You will learn how to create the supporting tools—such as the editor, validator, and interpreter—that enable your end-users to work efficiently with your DSL.

You can also consult the full documentation, or — if you’re eager to get started locally — [create a project](/Documentation/Overview/Getting_Started#creating-a-project-2).

We assume that you have an interest in DSLs and are familiar with terms such as *metamodel*, *abstract syntax*, and *model*, as well as abbreviations like *AST*.  
If not, please refer to introductory materials, such as the 
book <a href="https://www.manning.com/books/building-user-friendly-dsls" target="_blank">*Building User-Friendly DSLs*</a> by Meinte Boersma.
If you just need a refresher, see the [Freon Terminology](/Documentation/Terminology) page. Some basic knowledge of UML is useful, but not strictly required.

## The DSL: Computer Aided Learning

To illustrate how Freon can be used, this tutorial focuses on a domain called **Computer Aided Learning (CAL)**.

Our hypothetical client is a company that offers educational services to children of various ages.  
Through multiple websites, it helps students learn subjects such as arithmetic, mathematics, geography, history, biology, and road safety.

### The Client’s Needs

The company wants to create and manage educational webpages for these subjects in a way that is both **lean** and **flexible**.  
They need a system to define:

- The **content** of each page, and
- The **flow** between pages, depending on how each student performs.

For example:
- When a pupil makes many mistakes, the next page should provide extra explanations or more practice material.
- When a pupil progresses easily, the next page should offer more advanced exercises to maintain engagement.

In addition, the company wants to **test and validate** the page flow before generating the actual webpages.

### How the DSL Addresses These Needs

Our task is to design a **domain-specific language** that allows the company to define these pages and their flow in a simple, structured, and testable way.  
With the DSL, non-programmers can specify educational content and behavior directly, while developers can generate the necessary website logic automatically.

As you can see, satisfying this client’s requirements gives us an excellent example of how a well-designed DSL can combine **expressiveness**, **usability**, and **automation**.


## How to Use This Tutorial

This tutorial consists of **nine lessons**, each covering a specific topic while building upon the previous ones.  
For the best learning experience, follow the lessons in the given order.

The easiest way to follow along is to use the *create project* command and choose the language `Education`.  
This lets you recreate the example project and experiment with its components.

```bash
npm create freon@latest
```

In the `Education` project, you’ll find all definition files for each lesson in separate folders.  
This prevents you from being distracted by details not yet introduced.  
For example, the files for Lesson 3 are in the folder `lesson3-defs`, and so on.  
Lesson 1 files are located in the `src/defs` folder (see [Where do the files go?](/Tutorial/Overview#where-do-the-files-go-4)).

Before starting a new lesson, empty the `src/defs` folder and copy in the files for the lesson you’re about to follow.  
You’ll also find example models for the lessons in the **modelstore** folder.  
(For details on the project contents, see [Project Structure](/Documentation/Overview/Getting_Started#project-structure-5).)  
Use the model `Lesson1` for Lessons 1–3, `Lesson4` for Lessons 4–5, and `Lesson6` for the remaining lessons.

For tips on using the editor, click the **question mark** icon on the editor’s top bar.

## Where Do the Files Go?

Your project is set up so that all Freon definition files reside in the `src/defs` folder.  
If you prefer a different structure, you can modify your `package.json` file.  
Check the scripts for `generate` and `clean-gen`, which reference `src/defs`.  
Changing these paths allows you to place your language definition files anywhere you like. 
You might also adjust the output location (currently `src/freon`).

```
"generate": "freon -v all -d src/defs -o src/freon",
"clean-gen": "freon clean-it -d src/defs -o src/freon",
```

In this tutorial, we’ll create several Freon definition files.  
Note that the **file extension** (e.g., `.ast`, `.valid`) is important, while the file name is not.  
All metamodel definitions belong in `.ast` files, editor definitions in `.edit` files, and so on.

If you’re following this tutorial in your own IDE and notice that the browser occasionally displays an empty page after regeneration, don’t worry.  
This happens because the browser reloads faster than the regeneration process completes.  
In the browser’s developer console, you might see the message:
`Uncaught SyntaxError: Unexpected end of input`.
Simply reload the page—everything will display correctly afterward.
