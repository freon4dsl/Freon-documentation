# Freon Documentation

This repository contains the sources for all documentation about [Freon](https://github.com/freon4dsl/freon4dsl).  
It powers the official [Freon documentation website](https://www.freon4dsl.dev).

For developer information about maintaining or extending this site, see the  
[`/developer-documentation`](developer-documentation) folder.

---

## 🧭 Developing

To work on the documentation site locally:

```bash

git clone https://github.com/freon4dsl/Freon-documentation.git
cd Freon-documentation

# Install dependencies
npm install

# Get the example code from GitHub
npm run install-examples

# Generate the website content from Markdown
npm run buildSite

# Create the website and serve it on localhost:3000
npm run dev

# Or start the server and open the app in a new browser tab
npm run dev -- --open
```

> **Note:** During `buildSite` several warnings may appear:  
> “failed to load language css” and “failed to load language javascript”.  
> These can safely be ignored — they are caused by a known issue in [mdsvex](https://github.com/pngwn/MDsveX/issues/719).

---

## 📁 Project Structure

The repository follows a simple structure:

- **`docu-content/`** – Markdown source files for the documentation.
- **`code-examples/`** – Example Freon and TypeScript code used in the docs.
- **`src/`** – Follows standard [SvelteKit](https://kit.svelte.dev/docs/project-structure) conventions:
  - `src/routes/` – auto-generated pages from Markdown, plus custom Svelte routes.
  - `src/lib/` – shared UI components and utilities.
- **`static/`** – Images, styles, and other assets that don’t need processing.
- **`developer-documentation/`** – Additional information for contributors.
  - Includes [structure-of-the-project.md](developer-documentation/structure-of-the-project.md)  
    for an in-depth explanation of the folder layout and generation process.

---

## 🌐 Getting the Site Ready for Publication

For detailed instructions, see [How to Publish to GitHub Pages](developer-documentation/how-to-publish-to-github-pages.md).

Once the content of the website has been created, build it using the following commands:

```bash
# Make sure this command has run
npm run buildSite

# Create the website in the directory '/docs'
npm run build

# Preview the website locally
npm run preview
```

---

## 🚀 Publishing

Before pushing to GitHub:

- Ensure the `.nojekyll` file is present — this prevents GitHub Pages from applying Jekyll processing that may break the site.
- Ensure the `CNAME` file is present and contains `www.freon4dsl.dev`.
- Confirm that the GitHub Pages settings are configured to deploy from the /docs folder on the correct branch (typically main).

---

We build Freon and its documentation out of curiosity, passion, and love for language engineering.
We invite you to share that enthusiasm and help make something meaningful — together. ❤️
