# How to Publish the Site to GitHub Pages

To make a SvelteKit site ready for GitHub pages takes some extra care. A lot of the following
information can be found in https://www.okupter.com/blog/deploy-sveltekit-website-to-github-pages, and
https://docs.github.com/en/pages.
This how-to-guide makes the general information explicit for this repo.

Note that we need not add 'base' to our internal links, because the site is published on a custom domain.

## In the GitHub Settings

1. Go to the GitHub repo where this project is stored.
2. Go to Settings, click on Pages and Select "Deploy from a branch", select 'main' (or 'master'),
   or use separate branch for deployed site, for instance 'release-2.0.0'. Choose to deploy 
from '/docs' folder (The name of this folder must be the same as the outDir in the vite.config.js.)
3. Add the custom domain 'www.freon4dsl.dev'.

## In the Sources

1. Create copy of old 'main' branch.
   To be able to go back to old documentation when needed, we keep a copy of the old documentation in a separate branch.
   TODO: we need to establish a naming convention for this.

2. Move the 'development' branch to 'main', work in that branch, or work in the branch
   that is chosen to deploy from, and adjust as follows. 

3. Set the base path in svelte.config.ts, and use it for all hrefs. The latter is done automatically 
by the markdown to svelte transformation. (TODO this needs to be implemented.)
4. Add a .nojekyll file to the root of the project.
5. When ready for publishing, build the SvelteKit project, using `npm run build`, not `npm run dev`. 
This will create a new folder containing the generated publishable sources.
6. Depending on the settings of outDir in the `vite.config.js` file, you may need to copy the 
`build` folder to `/docs` (NB the same name as in the GitHub settings). To avoid this last step you 
can add the following to the `vite.config.js` file.
 
```js
// in vite.config.js next to plugins():
  build: {
    outDir: './docs'
  }
```
1. Finally, make sure the '/docs' folder is added to Git, and push it to GitHub. If you have chosen to use
a specific branch to deploy from, be sure to push it to that branch.
