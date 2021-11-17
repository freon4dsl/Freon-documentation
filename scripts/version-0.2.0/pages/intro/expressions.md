





# Support For Expressions

Editing expressions in a projectional editor is a well-known challenge. The representation of an expression
in the AST is highly structured. Yet, because its appearance to the user looks textual, users expect that
the editing behavior resembles classical text editing as much as possible.

In https://www.voelter.de/data/pub/fse2016-projEditing.pdf[Efficiency of Projectional Editing:
A Controlled Experiment] the authors express the problem as follows.

[quote, Markus Voelter a.o., Efficiency of Projectional Editing]
****
**Improving Expression Editing.**
Editing expressions with their fine-grained tree structure is one of the major challenges in a
projectional editor. The inability to insert and remove parentheses in arbitrary places (and
then refactor the treestructure according to the precedence expressed by the parentheses) is an
example.
****

For this reason, ProjectIt has in-build support for expressions. There is extra functionality to
be able to add an expression before or after an existing expression. Secondly, the AST of any binary
expression is automatically balanced.

## Adding to an existing expression

====
<figcaption id='img-projection-overview]
.Editing expressions
(/images/010_Projectional_Editing#expressions-problem.png[]
====

In the above figure, when the user types a `+` symbol after the `**`, it is not enough
to simply add the `+` in the AST.

* First of all,  a placeholder should be added to make the xpression strcuturally correct,
  so we should see something like
*** `a * ... + b`.
* Doing so will lead to the second AST shown.
* But ... this AST is not balanced right!
***  When adding parenthesis to show the AST, this will look like `a * (... + b)`
*** But the user (using his knowledge of priorities of `**` and `+` will read `(a * ...) + b`.
* Therefore the AST needs to be re-balanced to take the priorities of the multiplication and addition into account.
  This re-balancing leads to the trhird AST show, where the structure of the AST
  properly reflects what the user understands.

ProjectIt understands this kind of tree balancing and will automatically apply them while editing expressions.
