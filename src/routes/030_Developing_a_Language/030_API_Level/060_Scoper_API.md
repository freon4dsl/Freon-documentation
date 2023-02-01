
# Third Level Customization of the Scoper

The scoper can not yet be customized **per concept**. Instead, you can replace the whole 
scoper by one create yourself.
The new scoper needs to implement the following interface.


```ts
export interface PiScoper {

	/**
	 * Returns the element to which the 'pathname' refers. If the elment cannot be found, or if the element is
	 * not visible (private) from the location of 'modelelement', then null is returned.
	 * If present, then the search is limited to elements which type is 'metatype'.
	 *
	 * @param modelelement: the containing element, where 'pathname' should be visible
	 * @param doNotSearch: the role or property name of the element that we are searching for
	 * @param pathname: the name or series of names of the element that we are searching for
	 * @param metatype: the metatype of the element that we are searching for
	 */
	resolvePathName(modelelement: PiElement, doNotSearch: string, pathname: string[], metatype?: string): PiNamedElement;

	/**
	 *   Returns true if 'name' is known in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns true if the element named 'name'
	 *   is an instance of 'metatype'. There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns true if the element named 'name'
	 *   is known in the namespace containing 'modelelement', without looking in surrounding namespaces.
	 *
	 * @param modelElement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */
	isInScope(modelElement: PiElement, name: string, metatype?: string, excludeSurrounding?: boolean): boolean;

	/**
	 *   Returns all elements that are visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns all elements that are an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns all elements that are visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */
	getVisibleElements(modelelement: PiElement, metatype?: string, excludeSurrounding?: boolean): PiNamedElement[];

	/**
	 *   Returns the element named 'name' which is visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns the element that is an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns the element that is visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */
	getFromVisibleElements(modelelement: PiElement, name: string, metatype?: string, excludeSurrounding?: boolean): PiNamedElement;

	/**
	 *   Does the same as getVisibleElements, only it does not return the elements,
	 *   but the names of the elements.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */
	getVisibleNames(modelelement: PiElement, metatype?: string, excludeSurrounding?: boolean): string[];
}
```

## Adjusting the Environment
Furthermore, you need to tell Freon to use this new scoper instead of the generated one. You do this by
changing the line that initializes the scoper in the class `<yourLanguageName>Environment`. You can find it
in `~/picode/environment/`. Obviously,
you need to exchange `<yourLanguageName>` by the name of the language that you are creating.

Suppose the class `YourScoper`
holds the scoper with the improvements that you have made, then the entry in the environment class would be:


```ts
export class EntityEnvironment implements PiEnvironment {
    ...
    scoper: PiScoper = new YourScoper();
    ...
}
```
