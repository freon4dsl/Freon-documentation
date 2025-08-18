# The Structure of the Freon Documentation Project

The content of this repository is structured as follows.

1. All actual content for the documentation site is written in Markdown. These files can be found in `./docu-content`.
   The only exception is the landing page, which is a standalone Svelte Component in the file `./src/routes/+page.svelte`.

2. Every page on the site is a separate file. The folder structure determines where the page will show on the site. 
The numbers in front of the folder names determine the position of the page in the left-hand side content overview,
as well as the top categories. Similarly, the numbers in the file names determine their position. For instance, the `page.md` in folder `/030_Examples/040_External_Components` will be 
the content shown in the category `Examples`, which will be after category `/020_Tutorial`. Furthermore, it will be shown
after `/030_Examples/030_Generic_Types` and before `/030_Examples/050_Website_Intregration`. Any underscores in the 
names of the folders and files will be transformed into spaces. NB when creating a new page, always use three characters for the number, and separate 
it from the actual name using an underscore.

3. The code that is used as examples, both from Freon definition files (i.e. *.ast, *.edit, etc), and
   from generated or handwritten TypeScript files, is taken from `./code-examples`. These examples
   are actual Freon projects that reside in the GitHub project `create-freon-languages`,
   and are installed in this repo via the command `npm run install-examples`. So, if you want to add an example, 
   you have to go through that route.

4. The example code is embedded in the Markdown files using a tool called `embedme`. For this purpose
   every example must be positioned within a code block (enclosed by three backticks). Using the
   name `proto` after the first three backticks indicates that the example comes from a Freon definition
   file, and the code will be highlighted as such. (You can use other names, for instance, for javascript (`js`).
   (See https://www.markdownguide.org/extended-syntax/ for more details.) The line
   before the code block must be empty, and the first entry in the code block must be the path to the
   file that needs to be included. By using an expression like `#L4-L50` after the filepath, you can indicate
   that only the lines 4 till 50 need to be included in the code block. 
   (See https://github.com/zakhenry/embedme#readme) This is an example:

````
```proto
   // Education/lesson2-defs/edu-topics.edit#L3-L3
```
````

> Note: sometimes/often you need to set the line separators to CRLF - Windows to get the embedded code
> correctly into the pages. In Webstorm this is done by selecting 'CRLF - Windows' from File/Line Properties/Line Separators.
> The command works on the currently selected file/folder.

5. Once the Markdown files have been written, they are transformed into Svelte files into the folder `/src/routes`,
which are then used
   by SvelteKit to produce the actual website. This action is automated by a number of scripts which can
   be found in `./scripts`. More information can be found in the README in that folder. The action is
   triggered by `npm run buildSite`, after which the command `npm run dev` shows you the resulting website
   on `http://localhost:5173/`. Any errors encountered during the transformation to Svelte components,
   as well as info on missing links and/or images, can be found in `./scripts/Image_Check.txt`,
   and `./scripts/Link_Check.txt`.

6. Any images and other files that need not be transformed by SvelteKit should be placed in `/static`. Here you 
can also find the .css that styles the site.

7. Finally, there is a folder `notes` which is used to store any thoughts worth remembering for a while, and stuff like that.
