<script lang="ts">
	import Tree from './Tree.svelte';
	import type { NavTree } from './NavTree.js';
	
	let root: NavTree[] = [
      { name: 'Documentation', path: '/Documentation',
        content: [
         { name: 'Intro', path: '/Documentation/Intro',
           content: [
            { name: 'Projectional Editing', path: '/Documentation/Intro/Projectional_Editing'},
            { name: 'A Language in Five Parts', path: '/Documentation/Intro/A_Language_in_Five_Parts'},
            { name: 'Three Levels of Customization', path: '/Documentation/Intro/Three_Levels_of_Customization'},
            { name: 'Name Change', path: '/Documentation/Intro/Name_Change'},
            { name: 'Future Developments', path: '/Documentation/Intro/Future_Developments'},
                  ]},
         { name: 'Developing a Language', path: '/Documentation/Developing_a_Language',
           content: [
            { name: 'Default Level', path: '/Documentation/Developing_a_Language/Default_Level',
              content: [
               { name: 'Defining the Language Structure', path: '/Documentation/Developing_a_Language/Default_Level/Defining_the_Language_Structure'},
               { name: 'Defining Concept Properties', path: '/Documentation/Developing_a_Language/Default_Level/Defining_Concept_Properties'},
                     ]},
            { name: 'Definition Level', path: '/Documentation/Developing_a_Language/Definition_Level',
              content: [
               { name: 'Editor Definition', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition',
                 content: [
                  { name: 'Edit Files', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition/Edit_Files'},
                  { name: 'Projections', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition/Projections'},
                  { name: 'Indentation', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition/Indentation'},
                  { name: 'Other Options', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition/Other_Options'},
                  { name: 'Fragments', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition/Fragments'},
                  { name: 'External Components', path: '/Documentation/Developing_a_Language/Definition_Level/Editor_Definition/External_Components'},
                        ]},
               { name: 'Scoper Definition', path: '/Documentation/Developing_a_Language/Definition_Level/Scoper_Definition',
                 content: [
                  { name: 'Scoper Files', path: '/Documentation/Developing_a_Language/Definition_Level/Scoper_Definition/Scoper_Files'},
                        ]},
               { name: 'Typer Definition', path: '/Documentation/Developing_a_Language/Definition_Level/Typer_Definition',
                 content: [
                  { name: 'Typer Files', path: '/Documentation/Developing_a_Language/Definition_Level/Typer_Definition/Typer_Files'},
                  { name: 'Example Structure', path: '/Documentation/Developing_a_Language/Definition_Level/Typer_Definition/Example_Structure'},
                  { name: 'Example Typer Definition', path: '/Documentation/Developing_a_Language/Definition_Level/Typer_Definition/Example_Typer_Definition'},
                        ]},
               { name: 'Validator Definition', path: '/Documentation/Developing_a_Language/Definition_Level/Validator_Definition',
                 content: [
                  { name: 'Validator Files', path: '/Documentation/Developing_a_Language/Definition_Level/Validator_Definition/Validator_Files'},
                        ]},
                     ]},
            { name: 'API Level', path: '/Documentation/Developing_a_Language/API_Level',
              content: [
               { name: 'Editor API', path: '/Documentation/Developing_a_Language/API_Level/Editor_API'},
               { name: 'Writing Projections', path: '/Documentation/Developing_a_Language/API_Level/Writing_Projections'},
               { name: 'Writing Actions', path: '/Documentation/Developing_a_Language/API_Level/Writing_Actions'},
               { name: 'Validator API', path: '/Documentation/Developing_a_Language/API_Level/Validator_API'},
               { name: 'Typer API', path: '/Documentation/Developing_a_Language/API_Level/Typer_API'},
               { name: 'Scoper API', path: '/Documentation/Developing_a_Language/API_Level/Scoper_API'},
               { name: 'Reader API', path: '/Documentation/Developing_a_Language/API_Level/Reader_API'},
                     ]},
            { name: 'Styling', path: '/Documentation/Developing_a_Language/Styling',
              content: [
               { name: 'SCCS Styling', path: '/Documentation/Developing_a_Language/Styling/SCCS_Styling'},
                     ]},
                  ]},
         { name: 'Under the Hood', path: '/Documentation/Under_the_Hood',
           content: [
            { name: 'The Editor Framework', path: '/Documentation/Under_the_Hood/The_Editor_Framework',
              content: [
               { name: 'Predefined Boxes', path: '/Documentation/Under_the_Hood/The_Editor_Framework/Predefined_Boxes'},
               { name: 'The Editor Interfaces', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces',
                 content: [
                  { name: 'FreProjection Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreProjection_Interface'},
                  { name: 'FreAction Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreAction_Interface'},
                  { name: 'FreExpression Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreExpression_Interface'},
                  { name: 'FreBinary Expression Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreBinary_Expression_Interface'},
                  { name: 'FreElement Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreElement_Interface'},
                  { name: 'FreNamedElement Interface', path: '/Documentation/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreNamedElement_Interface'},
                        ]},
                     ]},
            { name: 'The FreTool Interfaces', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces',
              content: [
               { name: 'FreEnvironment Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreEnvironment_Interface'},
               { name: 'FreScoper Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreScoper_Interface'},
               { name: 'FreValidator Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreValidator_Interface'},
               { name: 'FreTyper Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreTyper_Interface'},
               { name: 'FreReader Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreReader_Interface'},
               { name: 'FreWriter Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreWriter_Interface'},
               { name: 'FreStandardlib Interface', path: '/Documentation/Under_the_Hood/The_FreTool_Interfaces/FreStandardlib_Interface'},
                     ]},
            { name: 'Source Code Documentation', path: '/Documentation/Under_the_Hood/Source_Code_Documentation'},
                  ]},
               ]},
      { name: 'Tutorial', path: '/Tutorial'},
      { name: 'Examples', path: '/Examples'},
      { name: 'Demos', path: '/Demos'},
      { name: 'Guiding Principles', path: '/Guiding_Principles',
        content: [
         { name: 'Our Philosophy', path: '/Guiding_Principles/Our_Philosophy'},
         { name: 'Models and Model Units', path: '/Guiding_Principles/Models_and_Model_Units'},
               ]},
      { name: 'Getting Started', path: '/Getting Started',
        content: [
         { name: 'Installation', path: '/Getting Started/Installation'},
         { name: 'Project Structure', path: '/Getting Started/Project_Structure'},
         { name: 'Calling the Generator', path: '/Getting Started/Calling_the_Generator'},
               ]},
      { name: 'Release Notes', path: '/Release_Notes'},
      { name: 'About', path: '/About'},];
	</script>
	
	<div class='navigator'>
		<Tree content={root} expanded/>
	</div>
	
	<style>
		.navigator {
			position: relative;
			width: 100%;
			heigth: 100%;
			background: var(--theme-colors-bg_color);
		}
	</style>