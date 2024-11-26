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
         { name: 'Edit Files', path: '/Documentation/Defining_an_Editor/Edit_Files'},
         { name: 'Projections', path: '/Documentation/Defining_an_Editor/Projections'},
         { name: 'Order of Projections', path: '/Documentation/Defining_an_Editor/Order_of_Projections'},
         { name: 'Indentation', path: '/Documentation/Defining_an_Editor/Indentation'},
         { name: 'Other Options', path: '/Documentation/Defining_an_Editor/Other_Options'},
         { name: 'Fragments', path: '/Documentation/Defining_an_Editor/Fragments'},
         { name: 'External Components', path: '/Documentation/Defining_an_Editor/External_Components'},
         { name: 'Styling', path: '/Documentation/Defining_an_Editor/Styling'},
       ]},
      { name: 'Scoping, Typing, and Validating', path: '/Documentation/Scoping,_Typing,_and_Validating',
        content: [
         { name: 'Scoper Definition', path: '/Documentation/Scoping,_Typing,_and_Validating/Scoper_Definition'},
         { name: 'Scoper Files', path: '/Documentation/Scoping,_Typing,_and_Validating/Scoper_Definition/Scoper_Files'},
         { name: 'Typer Definition', path: '/Documentation/Scoping,_Typing,_and_Validating/Typer_Definition'},
         { name: 'Typer Files', path: '/Documentation/Scoping,_Typing,_and_Validating/Typer_Definition/Typer_Files'},
         { name: 'Example Structure', path: '/Documentation/Scoping,_Typing,_and_Validating/Typer_Definition/Example_Structure'},
         { name: 'Example Typer Definition', path: '/Documentation/Scoping,_Typing,_and_Validating/Typer_Definition/Example_Typer_Definition'},
         { name: 'Validator Definition', path: '/Documentation/Scoping,_Typing,_and_Validating/Validator_Definition'},
         { name: 'Validator Files', path: '/Documentation/Scoping,_Typing,_and_Validating/Validator_Definition/Validator_Files'},
       ]},
      { name: 'Customizations', path: '/Documentation/Customizations',
        content: [
         { name: 'Editor API', path: '/Documentation/Customizations/Editor_API'},
         { name: 'Writing Projections', path: '/Documentation/Customizations/Writing_Projections'},
         { name: 'Writing Actions', path: '/Documentation/Customizations/Writing_Actions'},
         { name: 'Validator API', path: '/Documentation/Customizations/Validator_API'},
         { name: 'Typer API', path: '/Documentation/Customizations/Typer_API'},
         { name: 'Scoper API', path: '/Documentation/Customizations/Scoper_API'},
         { name: 'Reader API', path: '/Documentation/Customizations/Reader_API'},
       ]},
      { name: 'Under the Hood', path: '/Documentation/Under_the_Hood',
        content: [
         { name: 'The Editor Framework', path: '/Documentation/Under_the_Hood/The_Editor_Framework'},
         { name: 'Predefined Boxes', path: '/Documentation/Under_the_Hood/The_Editor_Framework/Predefined_Boxes'},
         { name: 'The Editor Interfaces', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces'},
         { name: 'FreProjection Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreProjection_Interface'},
         { name: 'FreAction Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreAction_Interface'},
         { name: 'FreExpression Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreExpression_Interface'},
         { name: 'FreBinary Expression Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreBinary_Expression_Interface'},
         { name: 'FreElement Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreElement_Interface'},
         { name: 'FreNamedElement Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreNamedElement_Interface'},
         { name: 'The FreTool Interfaces', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces'},
         { name: 'FreEnvironment Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreEnvironment_Interface'},
         { name: 'FreScoper Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreScoper_Interface'},
         { name: 'FreValidator Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreValidator_Interface'},
         { name: 'FreTyper Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreTyper_Interface'},
         { name: 'FreReader Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreReader_Interface'},
         { name: 'FreWriter Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreWriter_Interface'},
         { name: 'FreStandardlib Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreStandardlib_Interface'},
         { name: 'Source Code Documentation', path: '/Documentation/Under_the_Hood/Source_Code_Documentation'},
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
      { name: 'Custom Scoping', path: '/Examples/Custom_Scoping'},
      { name: 'Custom Typing', path: '/Examples/Custom_Typing'},
      { name: 'Custom Validation', path: '/Examples/Custom_Validation'},
      { name: 'Svelte Components from a Library', path: '/Examples/Svelte_Components_from_a_Library'},
      { name: 'Including Freon in Your Website', path: '/Examples/Including_Freon_in_Your_Website'},
    ]};
export const demosToc: TocContentsType = 
   { name: 'Demos', path: '/Demos',
     content: [
      { name: 'Overview', path: '/Demos/Overview'},
    ]};
export const backgroundToc: TocContentsType = 
   { name: 'Background', path: '/Background',
     content: [
      { name: 'Overview', path: '/Background/Overview'},
      { name: 'Projectional Editing', path: '/Background/Projectional_Editing'},
      { name: 'Models and Model Units', path: '/Background/Models_and_Model_Units'},
      { name: 'A Language in Five Parts', path: '/Background/A_Language_in_Five_Parts'},
      { name: 'Guiding Principles', path: '/Background/Guiding_Principles',
        content: [
         { name: 'Intro', path: '/Background/Guiding_Principles/Intro'},
         { name: 'Our Philosophy', path: '/Background/Guiding_Principles/Our_Philosophy'},
       ]},
      { name: 'Three Levels of Customization', path: '/Background/Three_Levels_of_Customization'},
      { name: 'Name Change', path: '/Background/Name_Change'},
      { name: 'Future Developments', path: '/Background/Future_Developments'},
      { name: 'Release Notes', path: '/Background/Release_Notes'},
      { name: 'About this site', path: '/Background/About_this_site'},
    ]};
		
export const allCategories: CategoryInfoType[] = [
	{name: 'Documentation', path: '/Documentation', toc: documentationToc},
		{name: 'Tutorial', path: '/Tutorial', toc: tutorialToc},
		{name: 'Examples', path: '/Examples', toc: examplesToc},
		{name: 'Demos', path: '/Demos', toc: demosToc},
		{name: 'Background', path: '/Background', toc: backgroundToc}
];
