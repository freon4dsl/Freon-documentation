# Freon Documentation

This project contains the sources for all documentation on [Freon](https://github.com/freon4dsl/Freon4dsl). It uses SvelteKit. 

## Developing

During development, you can use the following commands.

```bash
# Install dependencies
npm install

# create the website from the Markdown content
npm run buildSite

# create the website and serve it on localhost:3000
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Creating a documentation website

Create the website and browse through it.

```bash
# Install dependencies
npm install

# create the website from the Markdown content
npm run buildSite

# create the website in the directory 'docs'
npm run build

# preview the website
npm run preview
```

> Note: preview should *not* be used to serve your website in production.

## Publishing

In de docs folder:

- Check whether the .nojekyll file is there, to avoid GitHub from doing stuff that breaks the site.
- Check whether the CNAME file with www.freon4dsl.dev is there
