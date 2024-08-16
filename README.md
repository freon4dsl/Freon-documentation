# Freon Documentation

This project contains the sources for all documentation on [Freon](https://github.com/freon4dsl/Freon4dsl). It is powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a documentation website

Create the website using (either npm or yarn will work) and browse through it.

```bash
# Install dependencies
npm install

# create the content for navigation tree, check the internal links, and include the code fragments
npm run prepare

# create the website in the directory 'docs'
npm run build

# preview the website
yarn preview
```

> Note: preview should _not_ be used to serve your website in production.

## Developing

During development, you can use the following commands.

```bash
# create the content for navigation tree, check the internal links, and include the code fragments
yarn prepare

# create the website and serve it on localhost:3000
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Publishing

In de docs folder:

- Check whether the .nojekyll file is there, to avoid GitHub from doing stuff that breaks the site.
- Check whether the CNAME file with www.freon4dsl.dev is there
