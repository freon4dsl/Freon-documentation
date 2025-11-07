---
title: The Parser Projection
description: Learn how Freon generates parsers and unparsers from the default or dedicated parser projection, how they handle layout, and how to avoid common parsing issues.
tags: parser projection, unparser, file reader, file writer, AGL, parser generator, projectional editor, Freon, DSL development
---

# The Parser Projection

Freon generates a parser (wrapped in a file reader), and un unparser (wrapped in a file writer), both 
based on the default projection. Because the unparser must be able to read the files 
that were written using the parser, both are based on the same projection.

However, if the default projection is not suitable for reading from or writing to text files,
a separate projection called `parser` can be used. This projection is never shown in the editor. 
Like other projections, the parser generation falls back to the default projection for a certain concept, when 
no definition is present in the `parser` projection set.

Layout elements, such as vertical and horizontal lists, are preserved wherever possible. Furthermore,
typical parse problems like left and right recursion are avoided. To be able to do so,
Freon uses a parser generator called <a href="https://github.com/dhakehurst/net.akehurst.language" target="_blank">AGL</a>,
created by David Akehurst, which is more powerful than most PEG parser generators.

However, it is still possible to create a projection that cannot be parsed. Please consider this
when writing the parser projection.
