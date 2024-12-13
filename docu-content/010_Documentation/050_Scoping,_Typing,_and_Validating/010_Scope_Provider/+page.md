<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Scope Provider

Scoping is about the question of which names are accessible/visible where. In the general case, all names in a
context are divided into sets, called **namespaces**. These sets do not overlap, but there can be subsets. 

The **scope provider** (or **scoper**, for short) definition provides the information necessary to 
determine which names are in which set. Any part of the scoper
definition must be included in a file with the extension `.scope`. All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3) 
(i.e. the folder were you keep your definition files) are combined into one scoper definition.

## Namespaces

The default scoper simply regards the model of your user as the one and only namespace.

However, in the scoper definition you can mark a list of concepts to be **namespaces**. Every _namespace_ holds its own
set of visible names. Any namespace shadows the visible names from its surrounding namespace (using lexical scope), 
which means that if name A is both in the outer, and in the inner namespace, in the inner namespace only the inner
name is used.


```txt
// DocuProject/src/defs/scoper-docu.scope#L3-L3

isnamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity }
```

Interfaces can be namespaces as well.
Any instance of a concept that implements this interface will also be regarded to be a
namespace, but only the names of the properties of the interface will be included.

[//]: # (todo check whether the following stills holds)

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

```txt
// DocuProject/src/defs/language-extras.ast#L34-L38

concept Entity {
    isCompany: boolean;
    name: identifier;
    reference baseEntity?: Entity;
}
```

```txt
// DocuProject/src/defs/scoper-docu.scope#L13-L15

Entity {
    namespace_addition = self.baseEntity;
}
```

## Alternative Scopes

You can also indicate that a different namespace altogether should be used. In the following example,
the elements visible in
an `AttributeRef` are determined based on the type of its container, i.e. the type of its parent in the AST.

```txt
// DocuProject/src/defs/scoper-docu.scope#L9-L11

AttributeRef {
	scope = typeof( container );
}
```
