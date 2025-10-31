---
title: Styling
description: Learn how to style the Freon web app and editor using SCSS or CSS, including light and dark theme customization, SMUI integration, and overriding Freon component styles.
tags: styling, SCSS, CSS, themes, light mode, dark mode, editor styling, SMUI, Material UI, Freon, DSL development
---

# Styling

The web app and/or the editor can be styled using either SCSS or CSS. 

# Styling the Web App

The provided [web app](/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5)
is built using the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library.
This library uses SCSS, and therefore you need to run the preprocessor provided with SMUI for 
the styling to take effect. Run the following command. If you don’t modify the styles, a single 
run is enough. However, if you do make changes, rerun this command.

  ```bash
  npm run prepare-app   # Needed to generate the runtime CSS files. A single run will suffice.
  ```

The [example](/Documentation/Overview/Getting_Started#example-project-startup-2) 
and [template](/Documentation/Overview/Getting_Started#template-project-startup-3) projects both
contain a folder `style` that holds the SCSS files that are provided with the projects.
There are two sets of styles that determine the look of the web app and editor 
one for the light theme, and one for the dark theme.
The latter can be found in the folder `style/dark`.

The styling for the web app can be found in the following files.

- `_app.scss`: contains all styling common to both dark and light mode.
- `_app-theme-light.scss`: contains the styling for the light mode.
- `dark/_app-theme-dark.scss`: contains the styling for the dark mode.
- `_smui_theme.scss`: the file used in the `npm run prepare-app` command for the light mode. 
- `dark/_smui_theme.scss`: the file used in the `npm run prepare-app` command for the dark mode.

# Styling the Editor

Because the minimal [web app](/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5) 
is provided solely for your convenience, the styling of the editor is kept separate from the styling of the web
application. When you read the `_smui-theme.scss` and `dark/_smui-theme.scss` files, you will notice that 
both refer to files that are included in the `@freon4dsl/core-svelte` package.

```scss
// Styling/_smui-theme.scss#L6-L8

@use '../node_modules/@freon4dsl/core-svelte/dist/styles/freon.css';
@use '../node_modules/@freon4dsl/core-svelte/dist/styles/freon-light.css';
@use 'app_theme-light';
```

The files from the `@freon4dsl/core-svelte` package define the values for the styles that
are used within the editor. All styling that determines color has been divided over `freon-light.css`
and `freon-dark.css`. Other styles are in the file `freon.css`. 

The comments and naming should (hopefully) indicate where each
style is being used. For example, the following styles are defined for horizontal and vertical lists.

```scss
// Styling/freon.css#L50-L66

.list-component-horizontal {
    white-space: nowrap;
    display: grid;
    padding: 0px;
    border-width: 0pt;
    border-style: none;
    margin: 0px;
    box-sizing: border-box;
}

.list-component-vertical {
    padding: 0px;
    border-width: 0pt;
    border-style: none;
    margin: 1px;
    box-sizing: border-box;
}
```

To modify the styling, copy the files from the `@freon4dsl/core-svelte` package into your
styles folder and adjust the `@use` statement in both `_smui-theme.scss` files to include your own
files instead of the packaged ones. Then start changing the styles in your own
copies to your liking, however, take care when modifying the boolean and numeric controls, because they are based on
Material UI components.

The following components derive their colors from Material UI variables, which you can override using Freon-specific CSS variables:

- RadioComponent uses  "--mdc-theme-secondary" for its color, if you want to override this value set "--freon-boolean-radiobox-color".
- CheckComponent uses  "--mdc-theme-secondary", if you want to override it, use "--freon-boolean-checkbox-color".
- SwitchComponent uses  "--mdc-theme-primary", if you want to override it, set "--freon-boolean-switch-color".
- NumericSliderComponent uses  "--mdc-theme-primary", if you want to override it, set "--freon-numeric-slider-color".
- InnerSwitchComponent uses  "--mdc-theme-primary", if you want to override it, set "--freon-boolean-switch-color".
