# Intro
This list contains changes and additions to Freon that we would like to do.
This list was composed on 28 december 2021. At this moment there are no priorities
given to any of the following items.

# Editor/Projection Items

# AST Items
3. The model and model unit will be defined in a separate file (or file part???). They may not inherit,
   or implement interfaces. They are solely present to indicate the organisation of the model. This file also
   states the name of the language. 

   ```
   // file MyLanguage.lang
   language PiLanguage
   
   model {
      .... // other meta data ???
      content = {
         structure: PiStructureDef[];
         editor: PiEditorDef[];
         scoper: PiScoperDef[];
         typer: PiTyperDef[];
         validator: PiValidatorDef[];
      }
   }
   
   modelunit PiEditorDef {
      .... // other meta data ???
      file-extension = "edit";
      content = {
         conceptEditors: PiEditConcept[];
      }
   }
   ...
   ```

4. The .ast files simply contain a series of concept/expression definitions.
     ```
   // file MyLanguage.ast
   
   concept PiEditConcept {
      reference concept: PiConcept;
      projection: PiEditProjection;
      trigger?: string;
      operator?: string;
   }
   ```
   
* Done 0.4.0 => 8. The keyword 'public' should only be used for properties. Any concept that has one or more 
   public properties in included in the model unit interface.   
10. There should be an error message when an indirect property is used as expression over the ast. Eg. self.type.name.
11. When importing a model unit by parsing an external file, the name of the model unit will be the name mentioned 
    in the content of the file, if present, otherwise the filename will be used.
12. We will rethink imports...

# Validator items
1. Any checks defined on interfaces will be executed for all instances of concepts that implement these interfaces.

# Far, far away future
In the long run we will consider the following questions.
1. Do we need 'static' properties?
2. A language engineer often needs to consult the 'owning' concept of a part property. 
   Currently, this can be managed on the typescript level by using "container().container".
   Will we support this on the AST level?
3. Maybe we could define a limited concept 'on the spot'? Eg. 
   ```   
   Concept XX {
      prefix: limited {GRAPH; EDGE; NODE};
   }   
   ```
4. Might we allow lists of primitive properties in limited concepts?
5. Might we allow default values for non-primitives? E.g. in octopus the default for multiplicity is [1..1]. 
   We cannot express that at the moment. Or, a default for visibility, when it is defined as:
   ```
   interface IPackagableElement base IModelElement {
      visibility: VisibilityKind;
   }
   ```
   This could be done using a json-like notation.
6. We might consider derived properties.
   ```
   concept CollectionType base DataType implements IType {
      elementType: IType;
      metatype: CollectionMetaType;
      /isSet: boolean = metatype === CollectionMetaType:Set;
   }
   ```
