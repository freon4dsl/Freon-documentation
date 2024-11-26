<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# In Need of Scoping

In this lesson we are going to restrict the references to questions that we can select in the grading of a page 
to only the questions that are on that page. For this, we need to define scope rules.

## A Simple View on Scoping

O my, you might think, this is a really difficult subject. But, with Freon 
we adhere to the philosophy that "_Simple things should be simple, complex things should be possible._" (Read our 
[Guiding Principles](/About/Guiding_Principles) to find out more.) And in essence, scoping is not difficult at all.

Scoping is about the question of which names are accessible/visible where. In the general case, all names in a 
context are divided into sets. These sets do not overlap, but there are subsets of larger sets, as shown in the next figure. 

Let's call the relationship between a name and the smallest possible subset that contains it: the set owns the name. For
instance, in the figure the name 'Peter' is owned by set8. Using common scoping rules, any name is accessible/visible within 
the set that owns it, and within any set that contains the name's owner, but not in other sets.
In the figure the name 'Peter' would be accessible/visible 
in (from smallest to largest) set8, set 4, set2, and set1. But it would not be accessible/visible in set3, set5, set6, and set7.

<Figure
imageName={'Tutorial-lesson6-namespaces.png'}
caption={'Simple View on Namespaces'}
figureNumber={1}
/>

In Freon, we call these sets of names **NameSpaces**. Without any scope definition, in your editor there is just 
a single namespace. It contains all the names present in your model.

## Defining name spaces

There is a very easy way to define extra name spaces in Freon. Note, however, that any file that defines
scoping must have the extension `.scope`. So, let's create a file called `edu.scope`. 

First, we need to think about our DSL. Which names need to be kept from being seen in certain parts? The problem we had was with 
names of questions that are visible in all pages, also in others than the one on which the names are defined. This means that 
the concept `Page` is a likely candidate to be a name space. Knowing this, we add the following lines to the `edu.scope` file.

```txt
// Education/lesson6-defs/edu.scope

scoper EducationScoper for language Education

isnamespace { Page  }

```

That's it. Easy, peasy! You don't believe it? Just try it out for yourselves, and you will see that in the score only the questions
from that page can be used.

In the following lessons we will learn a few more things about scoping. But first we need to define the last model unit, the _Test_ unit.
