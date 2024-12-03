# Third Level Customization of the Validator

The validator can be adjusted on the Customization level by adding a single Typescript class. This class should implement
the worker part of the visitor pattern, adding checks per node of the AST that is visited.

You can add the Typescript class anywhere, providing you let Freon know where the file can be found through
the Freon configuration.

## Adjusting the Configuration

You should let Freon know where it can find your customized validation class by adding an
instance of your class to the `customValidations` array in
the file `FreonConfiguration.ts`. You will find this file in `~/frecode/config`.
It is generated once, and wil not be overwritten on regeneration.

Using the above example class, the configuration should look like this:

```ts
// add your custom validations here
customValidations: EntityCheckerInterface[] = [new CustomEntityModelValidator()];
```

## You own Validation Class

As a convenience, Freon generates a file `~/frecode/validator/CustomYourLanguageNameValidator.ts`,
which will not be overwritten upon regeneration. If you want to use it you can skip steps 1 and 2 in the next
list.

1.  Create a Typescript file somewhere, for instance in `~/frecode/validator`. Note, again,
    to not add it to the `~/frecode/validator/gen` folder, as this will be deleted upon regeneration.
2.  Create a class in this file and let this class implement the generated `YourLanguageNameCheckerInterface`,
    which you can find in the `~/frecode/validator/gen` folder.
    Obviously, `YourLanguageName` needs to be replaced by the name of your language.

        This is the interface to be implemented for the example language called `Entity`.

        ```ts
            export interface EntityCheckerInterface extends EntityDefaultWorker {
                errorList: FreError[];
            }
        ```

3.  Now implement any of the methods of the default worker by putting in your validation in
the corresponding model element method. This method will override the (empty) default implementation.
The validation error should be pushed onto the `errorList` attribute. Therefore, each error must implement the
[FreError](/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreValidator_Interface#FreError) interface.
<!--- (TODO link) --->

The result of the above should look something like this:

```ts
// TutorialLanguage/src/validator/CustomEntityModelValidator.ts#L9-L42


    /**
     * Example of a custom validation. Every EntityFunction with name 'determine' is considered incorrect.
     * @param modelelement
     */
    public execBeforeEntityFunction(modelelement: EntityFunction): boolean {
        if (modelelement.name == "determine") {
            this.errorList.push(
                new FreError(
                    `"determine" is a terrible name for a Function`,
                    modelelement,
                    modelelement.name,
                    FreErrorSeverity.Error
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
