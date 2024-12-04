## Customization of the Reader and Writer

The reader (parser) and writer (unparser) can not yet be
customized **per concept**. Instead, you can replace the whole
reader or writer by one create yourself.
The new reader needs to
implement the [`FreReader`](/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6) interface.

The new writer needs to implement the [`FreWriter`](/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7) interface.

[//]: # (todo add something about the standard library)
