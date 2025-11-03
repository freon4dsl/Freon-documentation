---
title: In Need of Scoping
description: Limit which names are visible where by defining namespaces in Freon. This lesson shows how to restrict grading references to only the questions on the current page using a simple `.scope` file.
tags: Freon, scoping, namespaces, scope rules, Page, questions, grading, DSL, editor, Education language, tutorial
---

<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# In Need of Scoping

In this lesson, we’ll restrict the question references used in a page’s grading to **only** the questions on that page.  
To do this, we need to define **scope rules**.

## A Simple View on Scoping

Oh my, you might think—this is going to be difficult. But with Freon we stick to the philosophy:  
“_Simple things should be simple, complex things should be possible._” (See our [Background](/Background) for more.)

Scoping answers the question: **which names are visible where?** In general, all names in a context are divided into **sets**.  
These sets don’t overlap, but there are subsets within larger sets, as shown below.

Let’s say the smallest set that contains a name **owns** that name. For example, in the figure the name “Peter” is owned by `set8`.  
Using common scoping rules, a name is visible in its owning set and in any set that **contains** the owning set, but not elsewhere.  
So “Peter” would be visible in (from smallest to largest) `set8`, `set4`, `set2`, and `set1`, but **not** in `set3`, `set5`, `set6`, or `set7`.

<Figure
imageName={'tutorial/Tutorial-lesson6-namespaces.png'}
caption={'Simple View on Namespaces'}
figureNumber={1}
/>

In Freon, these sets of names are called **NameSpaces**. Without any scope definitions, your editor has a **single** namespace containing every name in the model.

## Defining namespaces

There’s an easy way to define additional namespaces in Freon. Any file that defines scoping must use the `.scope` extension.  
Create a file called `edu.scope`.

First, think about the DSL: which names should be hidden in certain parts? Our problem is that **question** names are visible across **all** pages, not just the page where they’re defined.  
That suggests the `Page` concept should be a **namespace**. Add the following to `edu.scope`:

```proto
// Education/lesson6-defs/edu.scope

scoper for language Education

isNamespace { Page  }
```

That’s it—easy peasy! Try it out: in a page’s **Score**, you can now only reference **that page’s** questions.

In the following lessons we’ll explore a few more scoping features. But first, we’ll define the last model unit: the **Test** unit.
