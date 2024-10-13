<script lang="ts">
	import Tree from './Tree.svelte';
	import { NavTree } from './NavTree';
	
	let root: NavTree[] = [
      { name: 'About', path: '/About'},
      { name: 'Developing a Language', path: '/Developing_a_Language',
        content: [
         { name: 'API Level', path: '/Developing_a_Language/API_Level',
           content: [
            { name: 'Editor API', path: '/Developing_a_Language/API_Level/Editor_API'},
            { name: 'Reader API', path: '/Developing_a_Language/API_Level/Reader_API'},
            { name: 'Scoper API', path: '/Developing_a_Language/API_Level/Scoper_API'},
            { name: 'Typer API', path: '/Developing_a_Language/API_Level/Typer_API'},
            { name: 'Validator API', path: '/Developing_a_Language/API_Level/Validator_API'},
            { name: 'Writing Actions', path: '/Developing_a_Language/API_Level/Writing_Actions'},
            { name: 'Writing Projections', path: '/Developing_a_Language/API_Level/Writing_Projections'},
                  ]},
         { name: 'Default Level', path: '/Developing_a_Language/Default_Level',
           content: [
            { name: 'Defining Concept Properties', path: '/Developing_a_Language/Default_Level/Defining_Concept_Properties'},
            { name: 'Defining the Language Structure', path: '/Developing_a_Language/Default_Level/Defining_the_Language_Structure'},
                  ]},
         { name: 'Definition Level', path: '/Developing_a_Language/Definition_Level',
           content: [
            { name: 'Editor Definition', path: '/Developing_a_Language/Definition_Level/Editor_Definition',
              content: [
               { name: 'Edit Files', path: '/Developing_a_Language/Definition_Level/Editor_Definition/Edit_Files'},
               { name: 'External Components', path: '/Developing_a_Language/Definition_Level/Editor_Definition/External_Components'},
               { name: 'Fragments', path: '/Developing_a_Language/Definition_Level/Editor_Definition/Fragments'},
               { name: 'Indentation', path: '/Developing_a_Language/Definition_Level/Editor_Definition/Indentation'},
               { name: 'Other Options', path: '/Developing_a_Language/Definition_Level/Editor_Definition/Other_Options'},
               { name: 'Projections', path: '/Developing_a_Language/Definition_Level/Editor_Definition/Projections'},
                     ]},
            { name: 'Scoper Definition', path: '/Developing_a_Language/Definition_Level/Scoper_Definition',
              content: [
               { name: 'Scoper Files', path: '/Developing_a_Language/Definition_Level/Scoper_Definition/Scoper_Files'},
                     ]},
            { name: 'Typer Definition', path: '/Developing_a_Language/Definition_Level/Typer_Definition',
              content: [
               { name: 'Example Structure', path: '/Developing_a_Language/Definition_Level/Typer_Definition/Example_Structure'},
               { name: 'Example Typer Definition', path: '/Developing_a_Language/Definition_Level/Typer_Definition/Example_Typer_Definition'},
               { name: 'Typer Files', path: '/Developing_a_Language/Definition_Level/Typer_Definition/Typer_Files'},
                     ]},
            { name: 'Validator Definition', path: '/Developing_a_Language/Definition_Level/Validator_Definition',
              content: [
               { name: 'Validator Files', path: '/Developing_a_Language/Definition_Level/Validator_Definition/Validator_Files'},
                     ]},
                  ]},
         { name: 'Styling', path: '/Developing_a_Language/Styling',
           content: [
            { name: 'SCCS Styling', path: '/Developing_a_Language/Styling/SCCS_Styling'},
                  ]},
               ]},
      { name: 'Getting Started', path: '/Getting_Started',
        content: [
         { name: 'Calling the Generator', path: '/Getting_Started/Calling_the_Generator'},
         { name: 'Installation', path: '/Getting_Started/Installation'},
         { name: 'Project Structure', path: '/Getting_Started/Project_Structure'},
               ]},
      { name: 'Intro', path: '/Intro',
        content: [
         { name: 'A Language in Five Parts', path: '/Intro/A_Language_in_Five_Parts'},
         { name: 'Future Developments', path: '/Intro/Future_Developments'},
         { name: 'Models and Model Units', path: '/Intro/Models_and_Model_Units'},
         { name: 'Name Change', path: '/Intro/Name_Change'},
         { name: 'Our Philosophy', path: '/Intro/Our_Philosophy'},
         { name: 'Projectional Editing', path: '/Intro/Projectional_Editing'},
         { name: 'Three Levels of Customization', path: '/Intro/Three_Levels_of_Customization'},
               ]},
      { name: 'Release Notes', path: '/Release_Notes'},
      { name: 'Under the Hood', path: '/Under_the_Hood',
        content: [
         { name: 'Source Code Documentation', path: '/Under_the_Hood/Source_Code_Documentation'},
         { name: 'The Editor Framework', path: '/Under_the_Hood/The_Editor_Framework',
           content: [
            { name: 'Predefined Boxes', path: '/Under_the_Hood/The_Editor_Framework/Predefined_Boxes'},
            { name: 'The Editor Interfaces', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces',
              content: [
               { name: 'FreAction Interface', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreAction_Interface'},
               { name: 'FreBinary Expression Interface', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreBinary_Expression_Interface'},
               { name: 'FreElement Interface', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreElement_Interface'},
               { name: 'FreExpression Interface', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreExpression_Interface'},
               { name: 'FreNamedElement Interface', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreNamedElement_Interface'},
               { name: 'FreProjection Interface', path: '/Under_the_Hood/The_Editor_Framework/The_Editor_Interfaces/FreProjection_Interface'},
                     ]},
                  ]},
         { name: 'The PiTool Interfaces', path: '/Under_the_Hood/The_PiTool_Interfaces',
           content: [
            { name: 'FreEnvironment Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreEnvironment_Interface'},
            { name: 'FreReader Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreReader_Interface'},
            { name: 'FreScoper Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreScoper_Interface'},
            { name: 'FreStandardlib Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreStandardlib_Interface'},
            { name: 'FreTyper Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreTyper_Interface'},
            { name: 'FreValidator Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreValidator_Interface'},
            { name: 'FreWriter Interface', path: '/Under_the_Hood/The_PiTool_Interfaces/FreWriter_Interface'},
                  ]},
               ]},];
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