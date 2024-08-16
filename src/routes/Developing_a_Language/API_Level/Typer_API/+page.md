# Third Level Customization of the Typer

The typer can as of now be customized **per concept**. Your new typer needs
to implement the [PiTyperPart interface](/060_Under_the_Hood/020_The_PiTool_Interfaces/050_PiTyper_Interface).

As a convenience, Freon generates a file `~/picode/typer/Custom<yourLanguageName>TyperPart.ts`,
which will not be overwritten upon regeneration. It already contains a class that implements this interface.

## Adjusting the Configuration

Next you need to tell Freon to use this new typer by adding an
instance of your class to the `customTypers` array in
the file `FreonConfiguration.ts`. You will find this file in `~/picode/config`.
It is generated once, and wil not be overwritten on regeneration.

Using the above convenience class, the configuration should look like this:

```ts
  // add your custom type-providers here
  customTypers: PiTyperPart[] = [new CustomEntityModelTyperPart()];
```

## Adding Typing Methods

In the new typer class add the code you want to add in one or more of the methods. Let the method return 'null'
to let Freon know that the typer from the Freon Definition Level should be used instead.

The following code changes the `conformsList` method for lists of `Variables`. It checks the lists in
reverse order: A-B-C conforms to C-B-A.

[//]: # "TODO code does not come through"

```ts
// TutorialLanguage/src/typer/CustomEntityModelTyperPart.ts#L32-L48

    return null;
  }

  public getSuperTypes(type: FreType): FreType[] | null {
    return null;
  }
}

```
