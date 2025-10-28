# Contributing to Freon Documentation

Thank you for your interest in contributing to the **Freon Documentation** project!  
This repository powers the [Freon documentation website](https://www.freon4dsl.dev) — your help makes it clearer, more complete, and more welcoming for all users. 🙌

---

## 🧭 Ways to Contribute

There are many ways to help improve the Freon docs:

- 📝 **Fix or improve existing pages** — clarify explanations, correct typos, or reorganize sections.
- 🧩 **Add new guides or tutorials** — share what you’ve learned about Freon and DSL creation.
- 🪲 **Report documentation issues** — if something is missing, outdated, or confusing, please [open an issue](../../issues).
- 💬 **Join discussions** — share ideas or ask questions in our [Discussions](../../discussions).

---

## 🛠️ Local Setup

To work on the documentation site locally:

```

# Clone this repository
git clone https://github.com/freon4dsl/freon-docs.git  
cd freon-docs

# Install dependencies
npm install

# Get example code (used in the docs)
npm run install-examples

# Regenerate pages from Markdown
npm run buildSite

# Build and serve the website
npm run dev
```

The site will be available at **http://localhost:3000/**.

> **Note:** The `npm run buildSite` command **must** be run before building or serving the site, as it regenerates the documentation from the Markdown sources.

---

## 🧾 Writing Guidelines

- Use **Markdown** (`.md`) for content.
- Keep the tone **clear, concise, and friendly**.
- Prefer **British English** spelling (colour, behaviour) or **American English** (color, behavior) — whichever is consistent with the existing content.
- Include short **code examples** where helpful.  
