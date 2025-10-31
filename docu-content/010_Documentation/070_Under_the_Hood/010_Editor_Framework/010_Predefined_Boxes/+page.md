---
title: Boxes
description: Overview of Freon’s predefined box types for building editor projections — including primitive, grouping, and external component boxes.
tags: boxes, editor, projections, box types, Svelte, layout, external components, Freon, DSL development
---

# Boxes

A **Box** is an abstract class describing the features that are common to all boxes.  
As explained in the [Editor Framework](/Documentation/Under_the_Hood/Editor_Framework),
each box has a mandatory model node and role.  
The following predefined boxes are available:

| Primitive Boxes   | Grouping Boxes      | Boxes for External Components |
|-------------------|---------------------|-------------------------------|
| ActionBox         | FragmentBox         | BooleanReplacerBox            |
| AliasBox          | GridBox             | BooleanWrapperBox             |
| BooleanControlBox | GridCellBox         | FragmentWrapperBox            |
| ButtonBox         | HorizontalLayoutBox | NumberReplacerBox             |
| EmptyLineBox      | HorizontalListBox   | NumberWrapperBox              |
| IndentBox         | OptionalBox         | PartReplacerBox               |
| LabelBox          | TableBox            | PartWrapperBox                |
| NumberControlBox  | TableCellBox        | PartListReplacerBox           |
| LimitedControlBox | TableRowBox         | PartListWrapperBox            |
| MultiLineTextBox  | VerticalLayoutBox   | RefReplacerBox                |
| SelectBox         | VerticalListBox     | RefWrapperBox                 |
| SvgBox            |                     | RefListReplacerBox            |
| TextBox           |                     | RefListWrapperBox             |
|                   |                     | SimpleExternalBox             |
|                   |                     | StringReplacerBox             |
|                   |                     | StringWrapperBox              | 

All box types have a corresponding **Svelte component** that renders the box in the browser.  
In the source code:
- Box implementations are found in the `core` package.
- Svelte components are found in the `core-svelte` package.

The Freon core package also provides **utilities** to help create boxes in custom projections.  
Boxes for external components are explained in  
[External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).

---

## Primitive Boxes

Primitive boxes do not have other boxes as content.  
They are used to project **primitive AST nodes** in the editor.

### ActionBox
Offers the user the option to execute an action (e.g., adding an optional node).  
It shows a placeholder
