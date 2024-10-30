<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# The Scoper Definition Files

In the scoper definition you provide the information necessary to determine which names are visible from a certain
element of your user's model.

## Namespaces

In the scoper definition you can mark a list of concepts to be **namespaces**. Any _namespace_ has its own
set of visible names. Any namespace shadows the visible names from its surrounding namespace (using lexical scope).
The default scoper simply regards the model of your user as the only namespace.

```ts
// DocuProject/src/defs/scoper-docu.scope#L3-L3

isnamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity }
```

Interfaces can be namespaces as well.
Any instance of a concept that implements the namespace interface is a
namespace, but only the properties of the interface will be visible.

<Note>
<svelte:fragment slot="header"> Each model unit is a namespace.</svelte:fragment>
<svelte:fragment slot="content">
On all Levels of Customizations model units are always considered to be namespaces.
<!--- TODO: check whether this is still correct. --->
</svelte:fragment>
</Note>

## Namespace Additions

The standard namespaces can be added to. In that case, the visible elements from the addition are included.
By indicating an addition to a namespace you can, for instance, support inheritance. In the following example,
`baseEntity` is in the language structure definition (`.ast` file) defined to be the
super type of the `Entity` concept. The names visible in the `baseEntity`
are included in the namespace by defining the namespace-addition.

```ts
// DocuProject/src/defs/language-extras.ast#L34-L38

concept Entity {
    isCompany: boolean;
    name: identifier;
    reference baseEntity?: Entity;
}
```

```ts
// DocuProject/src/defs/scoper-docu.scope#L13-L15

Entity {
    namespace_addition = self.baseEntity;
}
```

## Alternative Scopes

You can also indicate that a different namespace altogether should be used. In the following example,
the elements visible in
an `AttributeRef` are determined based on the type of its container, i.e. the type of its parent in the AST.

```ts
// DocuProject/src/defs/scoper-docu.scope#L9-L11

AttributeRef {
	scope = typeof( container );
}
```
