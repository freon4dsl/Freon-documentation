<script>
    import Note from "../../../lib/notes/Note.svelte";
</script>

# The Language Structure Definition

The abstract syntax tree (AST) of the language is described in files with the extension `.ast`. 
All files with this extension in the *defs* folder (i.e. the folder were you keep your definition files)
are combined into one AST definition.

## Name of the language
Every AST file must start with the declaration of the name of your language. This name is used 
to create the name of a number of generated classes.

```ts
// docu-project/defs/language-main.ast#L1-L2

language DocuProject

```

## Concepts
The ProjectIt language structure, which describes the abstract syntax tree (AST), consists of a
list of a [Models](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Model), 
[Model Units](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Model_Unit),
[Concepts](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Concept),
[Expression Concepts](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Expression_Concept),
[Binary Expression Concepts](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Binary_Expression_Concept),
[Limited Concepts](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Limited_Concept),
and/or [Interfaces](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure#Interface).

### <a name="Model"></a> Model
A *model* is the root of the abstract syntax tree, and as such the complete description specified by the user.
It may hold any number of model units as children. These model units may be of different type. For instance, you
can have model units that define the items in a home automation system, and other model units that define the rules
that apply in this system.

<Note><svelte:fragment slot="header"> Models are never explicit in an editor</svelte:fragment><svelte:fragment slot="content">
The model is never shown in an editor as a whole. 
It is always shown in parts: the model units. However, the webapp does 'show' the model and the units, that are
part of it, in its left panel.
</svelte:fragment></Note>

```ts
// docu-project/defs/language-main.ast#L7-L10

model InsuranceModel {
    parts: Part[];              // units that hold partial definitions of insurance products
    products: Product[];        // units that hold sellable insurance products
}
```

### <a name="Model_Unit"></a> Model unit
A *model unit* is a part of the model that can be edited independently of the rest of the model. A model unit is
always a direct child of a model. The name of a model unit can never be [private](/010_Intro/030_Models_and_Model_Units#public)
(see [Models and Model Units](/010_Intro/030_Models_and_Model_Units#public)).

Model units may not extend other units or implement interfaces. 

```ts
// docu-project/defs/language-main.ast#L12-L15

modelunit Part {
    part: BaseProduct;          // one collection of partial insurance products
    file-extension = "base";    // the file extension used by the parser
}
```

Model units have one special entry `file-extension`, as shown in the example above. This is an optional
indication of the file type that the generated parser will associate with this model unit, i.e. an
instance of the above model unit will be exported/imported to/from a file with this extension. 

### <a name="Concept"></a> Concept
A *concept* is the basic element of your language definition. It defines which instances can be present in
a model created by your users. 

Concepts may extend one other concept using the keyword `base`, and implement multiple interfaces. 
Furthermore, they may be *abstract*.

```ts
// docu-project/defs/language-main.ast#L24-L28

concept BaseProduct {
    name: identifier;           // internal name
    theme: InsuranceTheme;      // the 'kind' of insurance
    parts: InsurancePart[];     // all parts of this product
}
```

```ts
// docu-project/defs/language-main.ast#L106-L112

/* The concept TypeRef represents a reference to a known type.
 * In the 'language-extras.ast' file there is an example of a
 * concept representing a type declaration.
 */
concept TypeRef base DocuType  {
    reference type: NamedType;
}
```

### <a name="Expression_Concept"></a> Expression Concept
An *expression concept* is a concept that is an expression. The editor deals with these differently in
order to give your user a more natural editing experience. 

Expression concepts may extend one other concept, and implement multiple interfaces.
```ts
// docu-project/defs/language-expressions.ast#L10-L18

abstract expression Literal base DocuExpression {
}
expression EuroLiteral base Literal {
    euros: number;
    cents: number;
}
expression NumberLiteral base Literal {
    value: number;
}
```

### <a name="Binary_Expression_Concept"></a> Binary Expression Concept
A *binary expression concept* is an expression concept that has two sub expressions, left and right operands, 
and an operator, which in the concrete syntax usually goes in the middle. For example, the expression `4 + 5` 
has as left operand `4`, as operator `+`, and as right operand `5`. 

Any concrete binary expression concept needs to have a priority. The priority is used by ProjectIt to balance the 
abstract syntax tree (see [Projectional Editing](/010_Intro/010_Projectional_Editing#tree-balancing)). In 
the [second level tutorial](/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/050_Other_Options) you can 
find more information on how to set the operand.

Binary expression concepts may extend one other concept, and implement multiple interfaces.
```ts
// docu-project/defs/language-expressions.ast#L23-L43

// Basic binary expressions: plus, minus, multiply, divide
abstract binary expression BinaryExpression base DocuExpression {
    left: DocuExpression;
    right: DocuExpression;
}

binary expression PlusExpression base BinaryExpression {
    priority = 4;
}

binary expression MinusExpression base BinaryExpression {
    priority = 4;
}

binary expression MultiplyExpression base BinaryExpression {
    priority = 8;
}

binary expression DivideExpression base BinaryExpression {
    priority = 8;
}
```

### <a name="Limited_Concept"></a> Limited Concept
A *limited concept* is a concept that has a limited number of predefined instances. Actually, it is an extended
version of an enumeration. All instances become part of the standard library of your language. 

A limited concept must always have a name property (<code> name: identifier;</code>), but if this is not provided
in the definition then it is automatically created. Furthermore, when a predefined instance does not provide a
value for the name, the name of the instance is used. In this manner, you can define simple enumerations. 

Limited concepts may extend another concept, and implement multiple interfaces.

```ts
// docu-project/defs/language-main.ast#L114-L131

limited InsuranceTheme {        // limited defined as a simple enumeration
    HomeTheme; HealthTheme; LegalTheme;
}

limited PremiumDays {           // limited with various options
    // if the 'name' property was not provided, it would have been generated
    name: identifier;
    nrOfDays: number;
    // notations 'name:' and '"name":' are both correct
    Week = { name: "Week", nrOfDays: 7 }
    Month = { "name": "Month", nrOfDays: 30 }
    // the following instance gets the name "Quarter"
    Quarter = { nrOfDays: 91 }
    // the following instance gets the name "Semester"
    Semester = { nrOfDays: 182 }
    // the following instance gets the name "Year"
    Year = { nrOfDays: 365 }
}
```
<Note>
<svelte:fragment slot="header"> No quotes around numbers and booleans.</svelte:fragment>
<svelte:fragment slot="content">
For number and boolean types, quotes (double or single) are not allowed around the values of properties of
instances of limited concepts.
</svelte:fragment>
</Note>

### <a name="Interface"></a> Interface
An *interface* is a concept that has no instances. It may extend multiple other interfaces.

```ts
// docu-project/defs/language-main.ast#L86-L88

interface NamedType {
    name: identifier;
}
```

