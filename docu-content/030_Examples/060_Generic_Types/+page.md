# Generic Types: an Example Typer Definition

This example shows how generic types and unit of measurements can be defined.

## The Example Language

The language is very simple, its units consists of lists of _expression_ - _declared type_ pairs. Ultimately, we want to compare the declared
type with the type of the expression. Below is an example of a model unit of this language.

```text
UnitA correctExps

12 : NUMBER;
"string" : STRING;
2345: NUMBER;
"this is a large string": STRING;
true : BOOLEAN;
false: BOOLEAN;

Set{ true, true, false } : Set<BOOLEAN>;
Bag { Set { 12, 13, 14 }, Set { 12, 13, 14, 15, 16 } } : Bag<Set<NUMBER>>;

124 Meters : Meters<NUMBER>;
45 kWh : kWh<NUMBER>;
```

Next the metamodel of this language will be explained.
