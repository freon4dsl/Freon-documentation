<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Projections for Limited Concepts

There are two controls for limited concepts. They differ, based on whether the property is a list or a single value.
For single values the property can be displayed as a radio group, where all possible values of the 
limited concept are options. When the property is a list of limited values, it can be displayed as a list of checkboxes.

The example that is used in the documentation defines the limited concept `InsuranceTheme` as a simple enumeration.

```txt
// DocuProject/src/defs/language-main.ast#L129-L131

limited InsuranceTheme {        // limited defined as a simple enumeration
    HomeTheme; HealthTheme; LegalTheme;
}
```

This concept is twice used as property type. Once as a single value in `BaseProduct`, and once 
as a list in `InsurancePart`.

## Single Valued Properties

The metamodel for `BaseProduct` is the following.

```txt
// DocuProject/src/defs/language-main.ast#L24-L26

concept BaseProduct {
    name: identifier;               // internal name
    theme: InsuranceTheme;          // the 'kind' of insurance
```

We combine this metamodel with the following projection.

```txt
// DocuProject/src/defs/editor-main-controls.edit#L5-L6

BaseProduct {[
    Base Products ${name} for ${theme radio}
```

And the result looks like this.

<Figure
imageName={'documentation/Documentation-Limited-Projections-screenshot1.png'}
caption={'A control for a single value of limited type'}
figureNumber={1}
/>

## Multivalued Properties

The metamodel for `InsuranceProduct` is the following.

```txt
// DocuProject/src/defs/language-main.ast#L53-L56

concept InsuranceProduct {
    name: identifier;                       // internal name
    productName: string;                    // name by which this product is known to the public
    themes: InsuranceTheme[];               // the 'kind' of insurance
```

Again, we combine this metamodel with a projection.

```txt
// DocuProject/src/defs/editor-main-controls.edit#L19-L21

InsuranceProduct {[
    Insurance Product ${name} ( public name: ${productName} ) USES ${basedOn horizontal separator[, ]}
        Themes: ${themes checkbox}
```

And the result is the following.

<Figure
imageName={'documentation/Documentation-Limited-Projections-screenshot2.png'}
caption={'A control for a multivalued property of limited type'}
figureNumber={2}
/>
