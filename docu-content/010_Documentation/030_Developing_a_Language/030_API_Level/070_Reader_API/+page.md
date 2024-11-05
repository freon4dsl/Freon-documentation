## Third Level Customization of the Reader and Writer

The reader (parser) and writer (unparser) can not yet be
customized **per concept**. Instead, you can replace the whole
reader or writer by one create yourself.
The new reader needs to
implement the [`FreReader`](/Under_the_Hood/The_FreTool_Interfaces/FreReader_Interface) interface.

The new writer needs to implement the [`FreWriter`](/Under_the_Hood/The_FreTool_Interfaces/FreWriter_Interface) interface.
