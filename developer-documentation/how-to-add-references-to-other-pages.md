# How to add links to other pages

## Links to pages within the Documentation Site

All pages that are contained in this documentation site should be referenced using the Markdown manner of referencing.

```
[Scoping Imports](/Documentation/Scoping,_Typing,_and_Validating/Scoping_Imports)
```

## Links to subsection of pages within the Documentation Site

In the `md2svelte` process every subsection of a page is marked for referencing. Basically the (sub)title is used with
lower case characters, underscores instead of spaces, and a number is added. This marking can be used to create
references to subsection of pages. The `$mySections` variable in the generated `PageContent.svelte` for each page contains 
list of all subsections and their marking. 

Using this you can create links to each subsection individually.

```
[Writing_Actions](/Documentation/Customizations/Editor_Customization#writing-custom-actions-4)
```

## Links to pages outside the documentations site

All pages that are not contained in this documentation site should be referenced using `target="_blank"`. As this 
cannot be done in Markdown, we use old-fashioned html.

```html
<a href="https://pl.ewi.tudelft.nl/research/projects/scope-graphs/" target="_blank">https://pl.ewi.tudelft.nl/research/projects/scope-graphs/</a>
```
