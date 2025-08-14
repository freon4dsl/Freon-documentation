<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Integration a Freon Editor into your own Web Application

As explained in [Getting Started](/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-6), the web 
application that Freon provides will usually need to be replaced with appropriate solutions for the 
company or organization where the resulting product will be used. In this example we explain how to integrate a Freon 
editor in your own web application. The code that is shown here can be found in 
a GitHub repository called [IntegrationExample](https://github.com/freon4dsl/IntegrationExample).

Note, this example does not extend to a complete web application. Many aspects that are necessary in a proper product
still need to be implemented. Because these aspects highly depend on the exact look-and-feel and functioning
of the web application, the variation will be extreme. Therefore, we leave these aspects as 'an exercise'. The aim of 
the example (and the GitHub repo that accompanies it) is to give you some pointers on how and were to use
functionality from the Freon `core` and `core-svelte` packages. 

<Note {header} {content}> </Note>{#snippet header()}Svelte version 5{/snippet}
{#snippet content()}
<p>The example in the GitHub repo uses Svelte version 5 and can therefore only be used with Freon version 1.1.0.
(There is currently a beta version available: version 1.1.0-beta1.)</p>
{/snippet}

## Mono Repository

In the [IntegrationExample](https://github.com/freon4dsl/IntegrationExample) repository we have combined two projects into one mono repository, a Freon language 
project in the package `dsl`, and a [Flowbite](https://flowbite-svelte.com/) web application project in 
the package `webapp`. To make everything working in a mono repo slight changes were made to the package.json 
files, but in essence you can start with the 'Getting Started' projects from both sources. 

Of course, you can also choose to use other UI and CSS libraries.

## Baseline Web Application

In the `webapp` package of our mono repo we have created a Flowbite web page with some initially empty places where 
the Freon editor, and other information, for instance about the language, should be added. 
This web application resembles the one that comes with Freon, which was build
using a different Svelte library called [Svelte Material UI](https://sveltematerialui.com), and a different CSS library (Sass).

If you want to dive into the code in our [repository](https://github.com/freon4dsl/IntegrationExample), take a look at the 
pull requests. We have tried to keep the example as clean as possible, such that almost every pull request represents a step in 
this tutorial.
