# Changes from version 0.4.0 to 0.5.0

* A diagram generator was added. It generates a UML class diagram of the complete AST, 
 an overview of all inheritance in the language, and one diagram per .ast file.
* A change manager was added that dispatches all changes in a model to anyone that
subscribes to it.
* An undo manager was added that is able to undo and redo changes in the model. It is
divided into one undo and redo stack per change source. For now, the changes sources
are 'model', which stores only changes in an object that implements PiModel,
and 'unit', which stores all changes in a specific model unit.
* Drag and drop is supported between elements of lists, i.e. the user is able to move
an element that is displayed in a list or table to another list or table.
* A context menu can be shown for list elements, which offers the user options to cut/copy/paste
the selected element.
* Two search mechanisms were added. One that searches for instances of AST nodes, and 
one that searches random text within the shown model unit.
* Many under the hood changes were made that improve the way in which a user model 
is transformed into the html/javascript that is shown in the browser.

## Known Issues in Release 0.5.0

1. In tables not all the context menu options are functioning correctly.
2. When creating a new element, the selection is on the first editable/selectabe child, 
but the focus is missing. Both when creating by mouse and keyboard.
3. When selecting a reference/option in the editor, the selection is on the selected element, 
but the focus is not.  After one TAG the focus dopes go to the selected option.
4. Dropping an item, even when their types conform, is sometimes refused because the 
types appear to not match.
5. When creating a "base" entity the whole entity is selected afterwards.
6. When tabbing inside tables, the width of the columns changes (slightly).
7. Arrow up loses focus with last element at top, and the last element at the bottom.
8. Add Plus _sometimes_ goes wrong. E.g. after "==".
9. Click already selected error in error/search list does not select it in editor.
10. Search for named elements does not find references.
11. Text for found elements should include something readable, instead of the object id.
12. Scrollbar for complete app is showing when error panel size is changed.
13. Brackets view does not show brackets.
