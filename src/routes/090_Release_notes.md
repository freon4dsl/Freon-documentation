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
