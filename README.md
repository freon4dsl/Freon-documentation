# Freon Documentation

This project contains the sources for all documentation on [Freon](https://github.com/freon4dsl/Freon4dsl). More 
information for those who develop the content of this repository can be found in 
the folder `/developer-documentation`.

## Developing

During development, you can use the following commands.

```bash
# Install dependencies
npm install

# Get the example code from github
npm run install-examples

# create the website from the Markdown content
npm run buildSite

# create the website and serve it on localhost:3000
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
## Creating a documentation website

See https://www.okupter.com/blog/deploy-sveltekit-website-to-github-pages

When the website has been created, it must be build using the following commands.

```bash
# make sure this command has run
npm run buildSite

# create the website in the directory 'build'
npm run build

# preview the website
npm run preview
```

During development the latter two commands can be exchanged by the following command. 

```bash
# build and serve the website
npm run dev
```

> Note: preview should *not* be used to serve your website in production.

## Publishing

In de docs folder:

- Check whether the .nojekyll file is there, to avoid GitHub from doing stuff that breaks the site.
- Check whether the CNAME file with www.freon4dsl.dev is there
