import { type CategoryInfoType, type TocContentsType } from '$lib/sidebar/TocContentsType';
		
export const documentationToc: TocContentsType = 
   { name: 'Documentation', path: '/Documentation',
     content: [
      { name: 'Overview', path: '/Documentation/Overview',
        content: [
         { name: 'Getting Started', path: '/Documentation/Overview/Getting_Started'},
         { name: 'Running Example', path: '/Documentation/Overview/Running_Example'},
       ]},
      { name: 'Creating the Metamodel', path: '/Documentation/Creating_the_Metamodel',
        content: [
         { name: 'Language Structure', path: '/Documentation/Creating_the_Metamodel/Language_Structure'},
         { name: 'Defining Properties', path: '/Documentation/Creating_the_Metamodel/Defining_Properties'},
       ]},
      { name: 'Defining an Editor', path: '/Documentation/Defining_an_Editor',
        content: [
         { name: 'Projections', path: '/Documentation/Defining_an_Editor/Projections'},
         { name: 'Indentation', path: '/Documentation/Defining_an_Editor/Indentation'},
         { name: 'Ease of Editing', path: '/Documentation/Defining_an_Editor/Ease_of_Editing'},
         { name: 'Boolean Projections', path: '/Documentation/Defining_an_Editor/Boolean_Projections'},
         { name: 'Number Projections', path: '/Documentation/Defining_an_Editor/Number_Projections'},
         { name: 'Projections for Limited Concepts', path: '/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts'},
         { name: 'Binary Expressions', path: '/Documentation/Defining_an_Editor/Binary_Expressions'},
         { name: 'Global Projections', path: '/Documentation/Defining_an_Editor/Global_Projections'},
         { name: 'Buttons', path: '/Documentation/Defining_an_Editor/Buttons'},
         { name: 'Fragments', path: '/Documentation/Defining_an_Editor/Fragments'},
         { name: 'Styling', path: '/Documentation/Defining_an_Editor/Styling'},
         { name: 'The Parser Projection', path: '/Documentation/Defining_an_Editor/The_Parser_Projection'},
       ]},
      { name: 'Scoping, Typing, and Validating', path: '/Documentation/Scoping,_Typing,_and_Validating',
        content: [
         { name: 'Scope Provider', path: '/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider'},
         { name: 'Type Provider', path: '/Documentation/Scoping,_Typing,_and_Validating/Type_Provider'},
         { name: 'Validator', path: '/Documentation/Scoping,_Typing,_and_Validating/Validator'},
       ]},
      { name: 'Customizations', path: '/Documentation/Customizations',
        content: [
         { name: 'Editor Customization', path: '/Documentation/Customizations/Editor_Customization'},
         { name: 'External Components', path: '/Documentation/Customizations/External_Components'},
         { name: 'Scoper Customization', path: '/Documentation/Customizations/Scoper_Customization'},
         { name: 'Typer Customization', path: '/Documentation/Customizations/Typer_Customization'},
         { name: 'Validator Customization', path: '/Documentation/Customizations/Validator_Customization'},
         { name: 'Other Customizations', path: '/Documentation/Customizations/Other_Customizations'},
       ]},
      { name: 'Under the Hood', path: '/Documentation/Under_the_Hood',
        content: [
         { name: 'Editor Framework', path: '/Documentation/Under_the_Hood/Editor_Framework'},
         { name: 'Predefined Boxes', path: '/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes'},
         { name: 'External Component Box Types', path: '/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types'},
         { name: 'Core Interfaces', path: '/Documentation/Under_the_Hood/Core_Interfaces'},
         { name: 'Editor Interfaces', path: '/Documentation/Under_the_Hood/Editor_Interfaces'},
         { name: 'FreTool Interfaces', path: '/Documentation/Under_the_Hood/FreTool_Interfaces'},
       ]},
      { name: 'Terminology', path: '/Documentation/Terminology'},
    ]};
export const tutorialToc: TocContentsType = 
   { name: 'Tutorial', path: '/Tutorial',
     content: [
      { name: 'Overview', path: '/Tutorial/Overview'},
      { name: 'Creating your Metamodel', path: '/Tutorial/Creating_your_Metamodel'},
      { name: 'Making an Editor', path: '/Tutorial/Making_an_Editor'},
      { name: 'More Fun with Projections', path: '/Tutorial/More_Fun_with_Projections'},
      { name: 'Expressions in Freon', path: '/Tutorial/Expressions_in_Freon'},
      { name: 'Projections for Expressions', path: '/Tutorial/Projections_for_Expressions'},
      { name: 'In Need of Scoping', path: '/Tutorial/In_Need_of_Scoping'},
      { name: 'More Scoping', path: '/Tutorial/More_Scoping'},
      { name: 'How to Handle Typing', path: '/Tutorial/How_to_Handle_Typing'},
      { name: 'Validating the model', path: '/Tutorial/Validating_the_model'},
      { name: 'Conclusion', path: '/Tutorial/Conclusion'},
    ]};
export const examplesToc: TocContentsType = 
   { name: 'Examples', path: '/Examples',
     content: [
      { name: 'Overview', path: '/Examples/Overview'},
      { name: 'Using the Interpreter', path: '/Examples/Using_the_Interpreter'},
      { name: 'Special Projections', path: '/Examples/Special_Projections'},
      { name: 'Custom Projections', path: '/Examples/Custom_Projections'},
      { name: 'Custom Actions', path: '/Examples/Custom_Actions'},
      { name: 'Editor Styling', path: '/Examples/Editor_Styling'},
      { name: 'Projection Fragments', path: '/Examples/Projection_Fragments'},
      { name: 'Example Typer Definition', path: '/Examples/Example_Typer_Definition',
        content: [
         { name: 'Example Structure', path: '/Examples/Example_Typer_Definition/Example_Structure'},
         { name: 'Example Typer Definition', path: '/Examples/Example_Typer_Definition/Example_Typer_Definition'},
       ]},
      { name: 'Custom Scoping', path: '/Examples/Custom_Scoping'},
      { name: 'Custom Typing', path: '/Examples/Custom_Typing'},
      { name: 'Custom Validation', path: '/Examples/Custom_Validation'},
      { name: 'External Components', path: '/Examples/External_Components'},
      { name: 'Including Freon in Your Website', path: '/Examples/Including_Freon_in_Your_Website'},
    ]};
export const demoToc: TocContentsType = 
   { name: 'Demo', path: '/Demo',
     content: [
      { name: 'Overview', path: '/Demo/Overview'},
    ]};
export const lionWebToc: TocContentsType = 
   { name: 'LionWeb', path: '/LionWeb',
     content: [
      { name: 'Overview', path: '/LionWeb/Overview'},
    ]};
export const backgroundToc: TocContentsType = 
   { name: 'Background', path: '/Background',
     content: [
      { name: 'Overview', path: '/Background/Overview'},
      { name: 'Projectional Editing', path: '/Background/Projectional_Editing'},
      { name: 'About the Name', path: '/Background/About_the_Name'},
      { name: 'About the Authors', path: '/Background/About_the_Authors'},
      { name: 'About the Site', path: '/Background/About_the_Site'},
    ]};
		
export const allCategories: CategoryInfoType[] = [
	{name: 'Documentation', path: '/Documentation', toc: documentationToc},
		{name: 'Tutorial', path: '/Tutorial', toc: tutorialToc},
		{name: 'Examples', path: '/Examples', toc: examplesToc},
		{name: 'Demo', path: '/Demo', toc: demoToc},
		{name: 'LionWeb', path: '/LionWeb', toc: lionWebToc},
		{name: 'Background', path: '/Background', toc: backgroundToc}
];
