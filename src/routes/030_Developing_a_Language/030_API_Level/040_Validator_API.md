
# Third Level Customization of the Validator

The validator can be adjusted on the API level by adding a single Typescript class. This class should implement
the worker part of the visitor pattern, adding checks per node of the AST that is visited.

You can add the Typescript class anywhere, providing you let Freon know where the file can be found through
the Freon configuration.

## Adjusting the Configuration
You should let Freon know where it can find your customized validation class by adding an 
instance of your class to the `customValidations` array in
the file `FreonConfiguration.ts`. You will find this file in `~/picode/config`.
It is generated once, and wil not be overwritten on regeneration.

Using the above example class, the configuration should look like this:

```ts
// add your custom validations here
customValidations: EntityCheckerInterface[] = [new CustomEntityValidator()];
```

## You own Validation Class
As a convenience, Freon generates a file `~/picode/validator/Custom<yourLanguageName>Validator.ts`, 
which will not be overwritten upon regeneration. If you want to use it you can skip steps 1 and 2 in the next
list.

1. Create a Typescript file somewhere, for instance in `~/picode/validator`. Note, again, 
  to not add it to the `~/picode/validator/gen` folder, as this will be deleted upon regeneration.
2. Create a class in this file and let this class implement the generated `<yourLanguageName>CheckerInterface`, 
  which you can find in the `~/picode/validator/gen` folder.
Obviously, `<yourLanguageName>` needs to be replaced by the name of your language.

    This is the interface to be implemented for the example language called `Entity`.

    ```ts
        export interface EntityCheckerInterface extends EntityDefaultWorker {
            errorList: PiError[];
        }
    ```

3. Now implement any of the methods of the default worker by putting in your validation in
the corresponding model element method. This method will override the (empty) default implementation.
The validation error should be pushed onto the `errorList` attribute. Therefore, each error must implement the
[PiError](/060_Under_the_Hood/020_The_PiTool_Interfaces/040_PiValidator_Interface#PiError) interface.
<!--- (TODO link) --->

The result of the above should look something like this:

```ts
// tutorial-language/validator/CustomEntityValidator.ts#L9-L42

    public execBeforeEntityFunction(modelelement: EntityFunction): boolean {
        if (modelelement.name == "determine") {
            this.errorList.push(
                new PiError(
                    `"determine" is a terrible name for a Function`,
                    modelelement,
                    modelelement.name,
                    PiErrorSeverity.Error
                )
            );
            return true;
        }
        return false;
    }
}

```

In this example only nodes of type `EntityFunction` are checked. If the name of the node equals `determine` than an error is
pushed on the `errorList`.

If you want the walker to stop when an erroneous node is found you
should return `true`, else return `false`.



