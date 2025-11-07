---
title: Styling
description: Learn how to style the Freon web app and editor using SCSS or CSS, including light and dark theme customization, SMUI integration, and overriding Freon component styles.
tags: styling, SCSS, CSS, themes, light mode, dark mode, editor styling, SMUI, Material UI, Freon, DSL development
---

# Styling

The web app and/or the editor can be styled using either SCSS or CSS. 

# Styling the Web App

The provided [web app](/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5)
is built using the <a href="https://flowbite-svelte.com/" target="_blank">Flowbite Svelte</a> UI library.
This library uses <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>. We have provided a CSS file that includes the required styling, which is called
`webapp-styles.css`. It imports the base Tailwind styles, as well as styles for the core-svelte and the webapp libraries.
Any styles that you want to define should be imported last, in order for them to overwrite the default styles.
In the provided CSS file we have already included imports for two entries:
1. a file for any styling of external components
2. a file for changing the theme of the webapp.

```scss
// Styling/webapp-styles.css

/* Import the standard tailwind styles */
@import 'tailwindcss';

/* Import all styles from core-svelte */
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon.css';
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon-light.css';
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon-tw-dark.css';
@import '../../../node_modules/@freon4dsl/core-svelte/src/lib/styles/freon-color-definitions.css';

/* Import all styles from the webapp library */
@import '../../../node_modules/@freon4dsl/weblib-flowbite/dist/styles/lib-styles.css';

/* Import local styles and overrides */
@import './theme-colors-override.css';
@import './externals-styles.css';

```

Run the following command to make these files available. If you don’t modify any of the styles, a single 
run is enough. However, if you do make changes, rerun this command.

```bash
  npm run styles   # Needed to generate the runtime CSS files. A single run will suffice.
```

 ## Changing the Theme

To change the theme colors you need to edit the colors in the `theme-colors-override.css` file.
This file contains various sets of colors that are used in the webapp dark and light modes, and in the editor dark and light modes.

```scss
// Styling/theme-colors-override.css

:root {
    /* Colors for the Flowbite webapp Light mode  */
    --color-light-base-50:  #FFFCF2;
    --color-light-base-100: #FFF1CC;
    --color-light-base-150: #FFE8A3;
    --color-light-base-200: #FFDD7A;
    --color-light-base-250: #FFD24D;
    --color-light-base-300: #FFC61A;
    --color-light-base-350: #FFC61A;
    --color-light-base-400: #E6AF00;
    --color-light-base-500: #E6AF00;
    --color-light-base-600: #BF9200;
    --color-light-base-700: #997500;
    --color-light-base-800: #735900;
    --color-light-base-900: #4D3D00;

    /* Colors for the Flowbite webapp Light mode accent */
    --color-light-accent-50:  #EAF4FF;
    --color-light-accent-100: #CFE6FF;
    --color-light-accent-200: #B3D7FF;
    --color-light-accent-300: #99C8FF;
    --color-light-accent-400: #7AB6FF;
    --color-light-accent-500: #5AA3FF;
    --color-light-accent-600: #3F8CFF;
    --color-light-accent-700: #2F6FCE;
    --color-light-accent-800: #22539B;
    --color-light-accent-900: #173A6B;

    /* Colors for the Freon editor Light mode  */
    --color-light-freon-50:  #FFFCF2;
    --color-light-freon-100: #FFF1CC;
    --color-light-freon-150: #FFE8A3;
    --color-light-freon-200: #FFDD7A;
    --color-light-freon-250: #FFD24D;
    --color-light-freon-300: #FFC61A;
    --color-light-freon-350: #FFC61A;
    --color-light-freon-400: #E6AF00;
    --color-light-freon-500: #E6AF00;
    --color-light-freon-600: #BF9200;
    --color-light-freon-700: #997500;
    --color-light-freon-800: #735900;
    --color-light-freon-900: #4D3D00;
    --color-light-freon-error:    #FF4C4C;       /* unchanged */
    --color-light-freon-editable: #FFE8A3;       /* was orange-150 → yellow-150 */
    --color-light-freon-optional: #E6AF00;       /* was orange-400/500 → yellow-400/500 */
    --color-light-freon-border:   #22539B;       /* was green-800 → blue-800 */
    --color-light-freon-dropdown: #2F6FCE;       /* was green-700 → blue-700 */
    --color-light-freon-button:   #CFE6FF;       /* was green-100 → blue-100 */

    /* Colors for the Flowbite webapp Dark mode */
    --color-dark-base-50:  #FAFBFF;
    --color-dark-base-100: #EAF4FF;
    --color-dark-base-150: #CFE6FF;
    --color-dark-base-200: #BFE0FF;
    --color-dark-base-250: #B3D7FF;
    --color-dark-base-300: #99C8FF;
    --color-dark-base-350: #7AB6FF;
    --color-dark-base-400: #5AA3FF;
    --color-dark-base-500: #3F8CFF;
    --color-dark-base-600: #2F6FCE;
    --color-dark-base-700: #22539B;
    --color-dark-base-800: #173A6B;
    --color-dark-base-900: #0F2746;

    --color-dark-accent-50:  #FFF1CC;
    --color-dark-accent-100: #FFE8A3;
    --color-dark-accent-200: #FFDD7A;
    --color-dark-accent-300: #FFD24D;
    --color-dark-accent-400: #FFC61A;
    --color-dark-accent-500: #E6AF00;
    --color-dark-accent-600: #BF9200;
    --color-dark-accent-700: #997500;
    --color-dark-accent-800: #735900;
    --color-dark-accent-900: #4D3D00;

    /* Colors for the Freon editor Dark mode */
    --color-dark-freon-50:  #FAFBFF;
    --color-dark-freon-100: #EAF4FF;
    --color-dark-freon-150: #CFE6FF;
    --color-dark-freon-200: #BFE0FF;
    --color-dark-freon-250: #B3D7FF;
    --color-dark-freon-300: #99C8FF;
    --color-dark-freon-350: #7AB6FF;
    --color-dark-freon-400: #5AA3FF;
    --color-dark-freon-500: #3F8CFF;
    --color-dark-freon-600: #2F6FCE;
    --color-dark-freon-700: #22539B;
    --color-dark-freon-800: #173A6B;
    --color-dark-freon-900: #0F2746;
    --color-dark-freon-error:    #FF4C4C;  /* unchanged */
    --color-dark-freon-editable: #FFE8A3;  /* yellow-150 */
    --color-dark-freon-optional: #E6AF00;  /* yellow-400/500 */
    --color-dark-freon-border:   #22539B;  /* blue-800 */
    --color-dark-freon-dropdown: #2F6FCE;  /* blue-700 */
    --color-dark-freon-button:   #7AB6FF;  /* blue-350 */

    /* Colors used in both light and dark mode (colorblind-safe version) */
    --color-light-freon-accent-error: #FF4C4C;         /* unchanged */
    --color-light-freon-accent-editable: #FFE8A3;      /* was #FFD0B3 → lighter yellow */
    --color-light-freon-accent-optional: #E6AF00;      /* was #DB6506 → deep yellow */
    --color-light-freon-border-green: #22539B;         /* was #47651A → strong blue */
    --color-light-freon-accent-dropdown: #2F6FCE;      /* was #5B7F20 → mid-blue */
    --color-light-freon-accent-button: #7AB6FF;        /* was #98CA32 → bright blue */
    --freon-light-accent-lightgreen: #EAF4FF;          /* was #e4f5e5 → very light blue */

    /* Colors used in dark mode (colorblind-safe version) */
    --color-dark-freon-accent-error: #FF4C4C;          /* unchanged */
    --color-dark-freon-accent-editable: #FFE8A3;       /* was #FFD0B3 → soft yellow */
    --color-dark-freon-accent-optional: #E6AF00;       /* was #DB6506 → deep yellow */
    --color-dark-freon-border-green: #22539B;          /* was #47651A → strong blue */
    --color-dark-freon-accent-dropdown: #2F6FCE;       /* was #5B7F20 → medium blue */
    --color-dark-freon-accent-button: #7AB6FF;         /* was #98CA32 → bright blue */
}

```


## Styling the Editor

Because the minimal [web app](/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5) 
is provided solely for your convenience, the styling of the editor is kept separate from the styling of the web
application. In the above `webapp-styles.css` file, you will notice that four CSS files from 
the `@freon4dsl/core-svelte` package are imported. One includes all styling that does not concern colors (`freon.css`). 
Two files define the colors for either the light or dark mode (`freon-light.css` and `freon-tw-dark.css`). If you are not 
using <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>, a file called `freon-plain-dark.css` provides all
dark mode styling in plain css. The fourth file defines colors such that they can be used to theme the web app and editor.

The comments and naming in each CSS file should (hopefully) indicate where each
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
styles folder and adjust the `@import` statement in `webapp-styles.scss` to include your own
files instead of the packaged ones. Then start changing the styles in your own
copies to your liking, however, take care when modifying the boolean and numeric controls, because they are based on
Material UI components.

The following components derive their colors from Material UI variables, which you can override using Freon-specific CSS variables:

- RadioComponent uses  "--mdc-theme-secondary" for its color, if you want to override this value set "--freon-boolean-radiobox-color".
- CheckComponent uses  "--mdc-theme-secondary", if you want to override it, use "--freon-boolean-checkbox-color".
- SwitchComponent uses  "--mdc-theme-primary", if you want to override it, set "--freon-boolean-switch-color".
- NumericSliderComponent uses  "--mdc-theme-primary", if you want to override it, set "--freon-numeric-slider-color".
- InnerSwitchComponent uses  "--mdc-theme-primary", if you want to override it, set "--freon-boolean-switch-color".
