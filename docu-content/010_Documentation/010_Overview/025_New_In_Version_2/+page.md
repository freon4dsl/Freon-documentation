# 🌟 What’s New in Freon 2.0

Freon 2.0 is here — and it’s our biggest release yet!  
This version brings a completely redesigned **Scoper**, a modernized **web app interface**, and a host of improvements that make developing DSLs smoother, faster, and more fun.

---

## 🚀 Major Highlights

### ✨ A Completely Rewritten Scoper
The Scoper — responsible for name resolution and namespaces — has been rebuilt from the ground up.  
It’s now faster, more reliable, and easier to extend.  
You’ll also find new validation for unique names within namespaces.

### 🎨 A Fresh Web App Based on Flowbite
The old SMUI interface has been replaced by a new **Flowbite-powered web app**.  
Expect a cleaner look, smoother interactions, and full compatibility with the latest version of Svelte 5.

### 🔤 More Freedom in Naming
Model unit names are no longer limited to a narrow set of characters.  
Almost any character is now allowed — giving you maximum flexibility in naming your language elements.

### 🔗 Smarter References
When you rename a node, **all its references update automatically**.  
No more manual cleanup — everything stays consistent.

### 🧩 Fully Stylable Components
Every part of the editor is now **controllable through CSS**.  
You can customize the appearance of concepts, fragments, and placeholders for a look that fits your project perfectly.

### 🔍 Smarter Dropdowns
Dropdown menus now react to typed input in a **case-insensitive** way — no more missed matches because of capitalization.

### 📝 Multi-Line Textboxes
At last, you can create **multi-line text components** directly in the editor.

### 🧾 Cleaner Syntax
Definition files have been aligned and simplified for a more consistent syntax across all generators.

### 🧱 Clearer External Components
All boxes previously called `External…` have been renamed to `…ReplacerBox` for clarity.

### ⚙️ Improved Handling of Optional Primitives
Optional primitive properties now behave more intuitively across the parser, serializer, and UI.

---

## 🧰 Updated Tooling

Freon 2.0 ships with the latest versions of its underlying technologies:

- **Svelte 5** for modern component behavior
- **AGL 4.2.1-20-RC2** for improved parser generation
- Updated dependencies throughout the framework for better performance and compatibility

---

## 🐛 Bug Fixes and Polishing

Dozens of small issues have been resolved — from performance tweaks and validator fixes to undo/redo behavior and layout stability.  
Expect a smoother, more predictable editing experience across the board.

---

## 📚 Documentation & Developer Experience

The developer documentation has been expanded and reorganized, making it easier to dive into Freon’s internals or contribute to the project.  
You’ll also notice improved color themes and styling options throughout the UI.

---

## 💡 New Contributors

We’re thrilled to welcome new contributors to the Freon community!  
Special thanks to:

- **@Ulyana-F1re** — for major UI and reference improvements
- **@globallyunique** — for CSS and editor layout enhancements

---

## 🔗 Full Changelog

If you’d like to explore every commit and pull request, 
check the  <a href="https://github.com/freon4dsl/Freon4dsl/releases/tag/v2.0.0" target="_blank" rel="noopener">full changelog on GitHub</a>.
