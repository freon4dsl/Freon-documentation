# The Parser Projection

Freon generates a parser (wrapped in a file reader), and un unparser (wrapped in a file writer), both 
based on the default projection. Because, obviously, the unparser should be able to read the files 
that were written using the parser, both are based on the same projection.

When, however, the default projection is not the one required for reading from, and writing to text files,
a separate projection called `parser` can be used. This projection is never shown in the editor. 
Like other projections, the parser generation falls back to the default projection for a certain concept, when 
no definition is present in the `parser` projection set.

Layout, like vertical and horizontal lists, is taken into account as much as possible. Furthermore,
typical parse problems like left and right recursion are avoided. To be able to do so,
Freon uses a parser generator called <a href="https://github.com/dhakehurst/net.akehurst.language" target="_blank">AGL</a>,
created by David Akehurst, which is more powerful than most PEG parser generators.

However, it is still possible to create a projection that cannot be parsed. Please, consider this
when writing the parser projection.
