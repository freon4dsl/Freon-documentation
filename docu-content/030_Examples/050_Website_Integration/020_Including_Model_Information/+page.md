<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Including Model Information

Now we have dealt with information from the DSL, we are ready to take 
on the next challenge, to get information from the server.
Of course, the server needs to be running, so do not forget to execute 
the following command in the folder `/packages/dsl`.

```bash
npm run server
```

## Opening a Model 

To make things a bit more interesting we have implemented two ways to open a model.
First, you can add the name of the model to the url in the address bar of your browser.
Second, you can choose a model from the list of models available on the server. For this 
option we need to open a dialog.
(Again, we are mimicking what the standard web app is capable of.)

Below is the code that implements this. Note that we have moved all code to actually
open the model, and to get the names of the available models, to the before mentioned class
`WebappConfigurator`.

```ts
// IntegrationExample/webapp/src/lib/main-app/WebappLayout.svelte#L24-L42

nMount(async () => {
// If a model is given as parameter, open this model
// A new model is created when this model does not exist
const urlParams = new URLSearchParams(window.location.search);
const model = urlParams.get('model');
if (model !== null) {
	openModel(model);
} else {
	// No model given as parameter, open the dialog to ask for it
	// Get list of models from server
	const names = await WebappConfigurator.getInstance().getAllModelNames();
	if (!!names && names.length > 0) {
		// Make the names available for the dialog
		serverInfo.allModelNames = names;
	}

	// open the app with the open/new model dialog
	dialogs.openModelDialogVisible = true;
}
```

So, let's have a look at the `WebappConfigurator`. We first examine the `openModel` function. As you see,
the InMemoryModel class (here placed in the variable `modelStore`) from the `@freon4dsl/core` package 
is doing the actual work. Here we take the model unit identifiers (a list of name-id pairs), find the first
unit in the list, and show it in the editor.

Two things need to be done for this to function properly.
- We need to clear all box caches, because they are no longer valid (done by `BoxFactory.clearCaches()`). 
- The projections also need to be cleared (done by `this.editorEnvironment?.projectionHandler.clear()`).

Then we are all set to show the model in the editor, which will be explained 
in [Adding the Editor](/Examples/Website_Integration/Adding_the_Editor).
Finally, we store information on the units in `updateUnitList()`. 

More on Freon's Box Model can be found in [Editor Framework](/Documentation/Under_the_Hood/Editor_Framework)

```ts
// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L99-L122

async openModel(modelName: string) {
    if (!!this.modelStore) {
        // create new model instance in memory and set its name
        await this.modelStore.openModel(modelName);
        const unitIdentifiers = this.modelStore.getUnitIdentifiers();
        LOGGER.log('unit identifiers: ' + JSON.stringify(unitIdentifiers));
        if (!!unitIdentifiers && unitIdentifiers.length > 0) {
            // load the first unit and show it
            let first: boolean = true;
            for (const unitIdentifier of unitIdentifiers) {
                if (first) {
                    const unit = this.modelStore.getUnitByName(unitIdentifier.name);
                    LOGGER.log("UnitId " + unitIdentifier.name + " unit is " + unit?.name);
                    this.currentUnit = unit;
                    BoxFactory.clearCaches()
                    this.editorEnvironment?.projectionHandler.clear()
                    this.showUnit(this.currentUnit);
                    first = false;
                }
            }
        }
        this.updateUnitList()
    }
}
```

Upon submit, the Svelte dialog component also uses the `WebappConfigurator.openModel` 
and `WebappConfigurator.newModel` functions to actually open or create the model. The if-statements 
in the code check whether the user has entered a valid model name.

```ts
// IntegrationExample/webapp/src/lib/dialogs/OpenModelDialog.svelte#L47-L57

async function handleSubmit() {
	const comm = WebappConfigurator.getInstance();
	// console.log('Handle "submit": ' + newName)
	if (internalSelected?.length > 0) { // should be checked first, because newName depends on it
		await comm.openModel(internalSelected);
		// $initializing = false;
	} else if (!newNameInvalid() && newName.length > 0) {
		console.log("CREATING NEW MODEL: " + newName);
		await comm.newModel(newName);
		// $initializing = false;
	} else {
```

The result of our work is that upon opening the web page (without the model parameter in the address bar),
the open model dialog pops up.

<Figure
imageName={'examples/WebsiteIntegration/info-from-server.png'}
caption={'The open model dialog'}
figureNumber={1}
/>

## Model Drawer Content

As promised, we are going to show you how to add information to the Model Drawer. Here we are going to
focus on the inner list. All units in the model should be sorted based on their type, and every one of 
them should have a dropdown menu associated that enables opening, saving etc. of that specific model unit.

As you can see, we loop over a list called `myUnits`, and check whether the list item has the same 
type as `unitType`. This sorts out the units based on their type. Then we show the unit's name, and add
a dropdown menu where every function takes the index in `myUnits` as parameter.

```ts
// IntegrationExample/webapp/src/lib/main-app/ModelInfo.svelte#L66-L90

<Listgroup>
    {#each langInfo.unitTypes as unitType}
        <Heading tag="h5" class="pl-2">{unitType}</Heading>
        <ListgroupItem class="gap-2 text-base font-semibold">
            <Listgroup>
                {#each myUnits as unit, index}
                    {#if unit.freLanguageConcept() === unitType}
                        <div class="flex justify-between">
                            {unit.name}
                            <DotsHorizontalOutline class="dots-menu1 inline dark:text-white"/>
                        </div>
                        <Dropdown triggeredBy=".dots-menu1">
                            <DropdownItem onclick={() => (openUnit(index))}>Open</DropdownItem>
                            <DropdownItem onclick={() => (saveUnit(index))}>Save</DropdownItem>
                            <DropdownItem onclick={() => (renameUnit(index))}>Rename</DropdownItem>
                            <DropdownItem onclick={() => (deleteUnit(index))}>Delete</DropdownItem>
                            <DropdownItem slot="footer" onclick={() => (exportUnit(index))}>Export</DropdownItem>
                        </Dropdown>
                    {/if}
                {/each}
            </Listgroup>
        </ListgroupItem>
    {/each}
    <!-- Instead of DotsHorizontalOutline we could use ChevronDownOutline-->
</Listgroup>
```

To keep `myUnits` in sync with the current model, we use a Svelte effect. Here we use a state variable,
called `modelInfo`, that was set by the `WebappConfigurator.updateUnitList()`.

```ts
// IntegrationExample/webapp/src/lib/main-app/ModelInfo.svelte#L16-L28

$effect(() => {
    myUnits = !!modelInfo.units && modelInfo.units.length > 0
        ? modelInfo.units.sort((u1: FreModelUnit, u2: FreModelUnit) => {
            if (u1.name > u2.name) {
                return 1;
            }
            if (u1.name < u2.name) {
                return -1;
            }
            return 0;
        })
        : [];
});
```

When we open the model information drawer, we can see the result of all our work.

<Figure
imageName={'examples/WebsiteIntegration/model-drawer.png'}
caption={'Open drawer showing the model information'}
figureNumber={2}
/>
