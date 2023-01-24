<script lang="ts">
	import Tree from './Tree.svelte';
	import { NavTree } from './NavTree';
	
	let root: NavTree[] = [
      { name: 'Intro', path: '/010_Intro',
        content: [
         { name: 'Projectional Editing', path: '/010_Intro/010_Projectional_Editing'},
         { name: 'Our Philosophy', path: '/010_Intro/020_Our_Philosophy'},
         { name: 'Models and Model Units', path: '/010_Intro/030_Models_and_Model_Units'},
         { name: 'A Language in Five Parts', path: '/010_Intro/040_A_Language_in_Five_Parts'},
         { name: 'Three Levels of Customization', path: '/010_Intro/050_Three_Levels_of_Customization'},
         { name: 'Name Change', path: '/010_Intro/060_Name_Change'},
         { name: 'Future Developments', path: '/010_Intro/090_Future_Developments'},
               ]},
      { name: 'Getting Started', path: '/020_Getting_Started',
        content: [
         { name: 'Installation', path: '/020_Getting_Started/010_Installation'},
         { name: 'Project Structure', path: '/020_Getting_Started/020_Project_Structure'},
         { name: 'Calling the Generator', path: '/020_Getting_Started/030_Calling_the_Generator'},
               ]},
      { name: 'Developing a Language', path: '/030_Developing_a_Language',
        content: [
         { name: 'Default Level', path: '/030_Developing_a_Language/010_Default_Level',
           content: [
            { name: 'Defining the Language Structure', path: '/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure'},
            { name: 'Defining Concept Properties', path: '/030_Developing_a_Language/010_Default_Level/020_Defining_Concept_Properties'},
                  ]},
         { name: 'Definition Level', path: '/030_Developing_a_Language/020_Definition_Level',
           content: [
            { name: 'Editor Definition', path: '/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition',
              content: [
               { name: 'Edit Files', path: '/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/010_Edit_Files'},
               { name: 'Projections', path: '/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections'},
               { name: 'Indentation', path: '/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/030_Indentation'},
               { name: 'Other Options', path: '/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/050_Other_Options'},
                     ]},
            { name: 'Scoper Definition', path: '/030_Developing_a_Language/020_Definition_Level/020_Scoper_Definition',
              content: [
               { name: 'Scoper Files', path: '/030_Developing_a_Language/020_Definition_Level/020_Scoper_Definition/010_Scoper_Files'},
                     ]},
            { name: 'Typer Definition', path: '/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition',
              content: [
               { name: 'Typer Files', path: '/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition/010_Typer_Files'},
               { name: 'Example Structure', path: '/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition/020_Example_Structure'},
               { name: 'Example Typer Definition', path: '/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition/030_Example_Typer_Definition'},
                     ]},
            { name: 'Validator Definition', path: '/030_Developing_a_Language/020_Definition_Level/040_Validator_Definition',
              content: [
               { name: 'Validator Files', path: '/030_Developing_a_Language/020_Definition_Level/040_Validator_Definition/010_Validator_Files'},
                     ]},
                  ]},
         { name: 'API Level', path: '/030_Developing_a_Language/030_API_Level',
           content: [
            { name: 'Editor API', path: '/030_Developing_a_Language/030_API_Level/010_Editor_API'},
            { name: 'Writing Projections', path: '/030_Developing_a_Language/030_API_Level/020_Writing_Projections'},
            { name: 'Writing Actions', path: '/030_Developing_a_Language/030_API_Level/030_Writing_Actions'},
            { name: 'Validator API', path: '/030_Developing_a_Language/030_API_Level/040_Validator_API'},
            { name: 'Typer API', path: '/030_Developing_a_Language/030_API_Level/050_Typer_API'},
            { name: 'Scoper API', path: '/030_Developing_a_Language/030_API_Level/060_Scoper_API'},
            { name: 'Reader API', path: '/030_Developing_a_Language/030_API_Level/070_Reader_API'},
                  ]},
         { name: 'Styling', path: '/030_Developing_a_Language/040_Styling',
           content: [
            { name: 'SCCS Styling', path: '/030_Developing_a_Language/040_Styling/010_SCCS_Styling'},
                  ]},
               ]},
      { name: 'Under the Hood', path: '/060_Under_the_Hood',
        content: [
         { name: 'The Editor Framework', path: '/060_Under_the_Hood/010_The_Editor_Framework',
           content: [
            { name: 'Predefined Boxes', path: '/060_Under_the_Hood/010_The_Editor_Framework/010_Predefined_Boxes'},
            { name: 'The Editor Interfaces', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces',
              content: [
               { name: 'PiProjection Interface', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces/010_PiProjection_Interface'},
               { name: 'PiAction Interface', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces/020_PiAction_Interface'},
               { name: 'PiExpression Interface', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces/030_PiExpression_Interface'},
               { name: 'PiBinary Expression Interface', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces/040_PiBinary_Expression_Interface'},
               { name: 'PiElement Interface', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces/050_PiElement_Interface'},
               { name: 'PiNamedElement Interface', path: '/060_Under_the_Hood/010_The_Editor_Framework/020_The_Editor_Interfaces/060_PiNamedElement_Interface'},
                     ]},
                  ]},
         { name: 'The PiTool Interfaces', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces',
           content: [
            { name: 'PiEnvironment Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/010_PiEnvironment_Interface'},
            { name: 'PiScoper Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/020_PiScoper_Interface'},
            { name: 'PiValidator Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/040_PiValidator_Interface'},
            { name: 'PiTyper Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/050_PiTyper_Interface'},
            { name: 'PiReader Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/060_PiReader_Interface'},
            { name: 'PiWriter Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/070_PiWriter_Interface'},
            { name: 'PiStandardlib Interface', path: '/060_Under_the_Hood/020_The_PiTool_Interfaces/080_PiStandardlib_Interface'},
                  ]},
         { name: 'Source Code Documentation', path: '/060_Under_the_Hood/030_Source_Code_Documentation'},
               ]},
      { name: 'Release notes', path: '/090_Release_notes'},
      { name: 'About', path: '/099_about'},];
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