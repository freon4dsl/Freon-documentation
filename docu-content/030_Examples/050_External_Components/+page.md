# Examples

## How to display a boolean value

### global booleans

```freon
global {
     boolean [YES | NO] // the strings used to display a boolean value

     referenceSeparator [:] // the string that separates the names in a path name, e.g. pack1:cls3:part
 }
```

### single booleans

see DocuProject/editor-main-default.edit

```freon

BaseProduct {[
    yields profit: ${self.yieldsProfit text [Plenty | Little]}
]}
```

- radio button, with or without text

```freon
BaseProduct {[
        is approved level1: ${self.isApprovedLevel1 radio [Sure | NoWay]}
        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
]}
```

- inner-switch

- checkbox

## Other special Components
- slider
- button


## Interpreter

## Include the editor in your own website

## External Svelte Components

