# Changes from version 0.4.0 to 0.5.0

* Added diagram generator. It generates a UML class diagram of the AST, 
 an overview of all inheritance in the language and per .ast file
one diagram.
* Added a change manager that dispatches all changes in a model to anyone that
subscribes to it.
* Added an undo manager that is able to undo and redo changes in the model. It is
divided into one undo and redo stack per change source. For now, the changes sources
are 'model', which stores only changes in an object that implements PiModel,
and 'unit', which stores all changes in a specific model unit.
