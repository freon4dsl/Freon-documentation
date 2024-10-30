# # Third Level Customization of the Reader and Writer

The reader (parser) and writer (unparser) can not yet be
customized **per concept**. Instead, you can replace the whole
reader or writer by one create yourself.
The new reader needs to
implement the [`FreReader`](/060_Under_the_Hood/020_The_FreTool_Interfaces/060_FreReader_Interface) interface.

The new writer needs to implement the [`FreWriter`](/060_Under_the_Hood/020_The_FreTool_Interfaces/070_FreWriter_Interface) interface.
