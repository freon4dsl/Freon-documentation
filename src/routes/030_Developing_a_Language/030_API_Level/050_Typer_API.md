
# Third Level Customization of the Typer

The typer can as of now be customized **per concept**. Your new typer needs 
to implement the [PiTyperPart interface](/060_Under_the_Hood/020_The_PiTool_Interfaces/050_PiTyper_Interface).

As a convenience, Freon generates a file `~/picode/typer/Custom<yourLanguageName>TyperPart.ts`,
which will not be overwritten upon regeneration. It already contains a class that implements this interface.

## Adjusting the Configuration
Next you need to tell Freon to use this new typer by adding an
instance of your class to the `customTypers` array in
the file `ProjectitConfiguration.ts`. You will find this file in `~/picode/projectit`.
It is generated once, and wil not be overwritten on regeneration.

Using the above convenience class, the configuration should look like this:

```ts
  // add your custom type-providers here
  customTypers: PiTyperPart[] = [new CustomEntityTyperPart()];
```

## Adding Typing Methods

In the new typer class add the code you want to add in one or more of the methods. Let the method return 'null'
to let Freon know that the typer from the Freon Definition Level should be used instead.

The following code changes the `conformsList` method for lists of `Variables`. It checks the lists in 
reverse order: A-B-C conforms to C-B-A.

```ts
// tutorial-language/typer/CustomEntityTyperPart.ts#L32-L48

public conformList(typelist1: EntityEveryConcept[], typelist2: EntityEveryConcept[]): boolean | null {
    if (typelist1.length > 0 && (typelist1[0] instanceof Variable)) {
        if (typelist1.length !== typelist2.length) return false;
        let result: boolean = true;
        const max_length = typelist1.length;
        for (let i = 0; i < typelist1.length; i++) {
            result = EntityEnvironment.getInstance().typer.conformsTo(typelist1[i], typelist2[max_length - i]);
            if (result == false) return result;
        }
        return result;
    } else {
        return null;
    }
}
/**
 * See interface
 */
```
