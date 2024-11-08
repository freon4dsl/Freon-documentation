const FRE_LIGHT = '#FFFDF5'; // a very light yellow
const FRE_COLOR2 = '#FDE281';
const FRE_COLOR3 = '#FCCB1A';
const FRE_COLOR4 = '#B08A03';
const FRE_DARK = '#272007'; // darkbrown
const FRE_ACCENT = '#c94117';

/* todo select only the values that are being used, and remove others */
export const themePresets = [
	{
		name: 'light',
		colors: {
			color2: FRE_COLOR2,
			color3: FRE_COLOR3,
			color: FRE_DARK /* Primary text color */,
			inverse_color: FRE_LIGHT /* Text color on non_normal background */,
			bg_app_bar: FRE_DARK /* Color of header and footer background */,
			text_app_bar: 'white' /* Color of header and footer text */,
			bg_color: FRE_LIGHT /* Color of background of side panes */,
			divider: FRE_DARK /* Color of dialog title background */,
			list_divider: FRE_DARK /* Color of lines between columns in the error list */,
			slider: FRE_DARK /* Color of lines between views */,
			accent: FRE_ACCENT /* Color to get attention to an element */,
			primary_button_text: 'black' /* Color of primary buttons in dialogs */,
			secondary_button_text: 'grey' /* Color of non-primary buttons in dialogs */,
			link_hover: FRE_COLOR4 /* color of link when being hovered */,
			// TODO find some appealing default values for the user message colors
			user_mess_bg_error: '#ff4d4d' /* Color of user message background when showing an error */,
			user_mess_bg_warning: '#ffff80' /* Color of user message background when showing a warning */,
			user_mess_bg_hint: '#d9d9d9' /* Color of user message background when showing a hint */,
			user_mess_bg_info: '#d9d9d9' /* Color of user message background when showing information */,
			user_mess_text_error: 'black' /* Color of user message text when showing an error */,
			user_mess_text_warning: '#ff0' /* Color of user message text when showing a warning */,
			user_mess_text_hint: '#ff0' /* Color of user message text when showing a hint */,
			user_mess_text_info: '#f50057' /* Color of user message text when showing information */,
			user_mess_button_text_error: 'black' /* Color of user message button text when showing an error */,
			user_mess_button_text_warning: '#ff0' /* Color of user message button text when showing a warning */,
			user_mess_button_text_hint: '#ff0' /* Color of user message button text when showing a hint */,
			user_mess_button_text_info: '#f50057' /* Color of user message button text when showing information */,
			bg_editor: 'white' /* The background color of the editor */,
			text_editor: 'darkblue' /* The color of the text, unless set otherwise by the projection */,
			// TextBox
			bg_empty_before_text_box: '#f4f4f4' /* Color of background of empty textbox */,
			bg_text_box: 'white' /* Color of background of non-empty textbox */,
			color_text_box: FRE_DARK /* Color of text in textbox */,
			color_empty_before_text_box: FRE_DARK /* Color of text in empty textbox */,
			// AliasBox
			bg_empty_before_alias_box: '#f4f4f4' /* Color of background of empty alias */,
			bg_alias_box: 'white' /* Color of background of non-empty aliasbox */,
			color_alias_box: FRE_DARK /* Color of text of aliasbox */,
			/* Selection */
			bg_selected: 'rgba(211, 227, 253, 255)' /* Color of selected element */,
			border_selected: FRE_DARK /* Color of border of selected element */,
			/* Dropdown Component */
			bg_dropdown_component: '#f4f4f4',
			border_dropdown_component: FRE_DARK,
			color_dropdownitem_component: FRE_DARK,
			/* Buttons */
			button_color: 'white',
			button_bg_color: 'rgba(0,0,139, 1)' /* darkblue with opacity 1 */,
			button_active: 'rgba(0,0,139, .7)' /* darkblue with opacity .7 */,
			button_hover: 'rgba(0,0,139, .8)' /* darkblue with opacity .8 */,
			ripple_color: '#c199f9',
			/* Tooltips */
			tooltip_color: 'white',
			tooltip_background: 'red',
			/* Navigation Tree */
			active: FRE_COLOR2,
			/* Syntax Highlighting */
			code_color: '#393A34',
			code_background: '#C1DEF1',
			code_background_color: 'white',
			code_keyword: '#0000ff',
			token_color_string: '#A31515',
			token_keyword: '#0000ff',
			token_constant: '#36acaa',
			token_not_pre: '#db4c69',
			token_number: '#36acaa',
			token_operator: '#393A34',
			/* to be done */
			token_att_value: '#ce9178',
			token_atrule: '#c586c0',
			token_function: '#a237b8',
			token_regex: '#d16969',
			token_boolean: '#569cd6',
			token_class_name: '#c21016',
			/* end to be done */
			token_comment: '#008000',
			code_border: '#dddddd',
			/* Links */
			link: '#DE6B48',
			link_visited: '#7381de',
			/* Tables */
			note_background: '#C199F93C',
			figure_background: 'cornsilk',
			table_background: 'cornsilk',
			table_heading: '#8ed4c6',
			block_quote_background: 'cornsilk'
		},
		fonts: {
			size_editor: '14px',
			style_editor: 'normal',
			weight_editor: 'normal',
			family_editor: 'Arial'
		}
	},
	{
		name: 'dark',
		colors: {
			color: FRE_LIGHT /* Primary text color */,
			inverse_color: FRE_DARK /* Text color on non_normal background */,
			bg_app_bar: FRE_LIGHT /* Color of header and footer background */,
			bg_color: FRE_DARK /* Color of background of side panes */,
			divider: FRE_LIGHT /* Color of dialog title background */,
			list_divider: FRE_LIGHT /* Color of lines between columns in the error list */,
			slider: FRE_LIGHT /* Color of lines between views */,
			accent: '#f50057' /* Color to get attention to an element */,
			primary_button_text: 'yellow' /* Color of primary buttons in dialogs */,
			secondary_button_text: 'white' /* Color of non-primary buttons in dialogs */,
			// TODO find some appealing default values for the user message colors
			user_mess_bg_error: '#ff4d4d' /* Color of user message background when showing an error */,
			user_mess_bg_warning: '#ffff80' /* Color of user message background when showing a warning */,
			user_mess_bg_hint: '#d9d9d9' /* Color of user message background when showing a hint */,
			user_mess_bg_info: '#d9d9d9' /* Color of user message background when showing information */,
			user_mess_text_error: 'black' /* Color of user message text when showing an error */,
			user_mess_text_warning: '#ff0' /* Color of user message text when showing a warning */,
			user_mess_text_hint: '#ff0' /* Color of user message text when showing a hint */,
			user_mess_text_info: '#f50057' /* Color of user message text when showing information */,
			user_mess_button_text_error: 'black' /* Color of user message button text when showing an error */,
			user_mess_button_text_warning: '#ff0' /* Color of user message button text when showing a warning */,
			user_mess_button_text_hint: '#ff0' /* Color of user message button text when showing a hint */,
			user_mess_button_text_info: '#f50057' /* Color of user message button text when showing information */,
			bg_editor: 'darkblue' /* The background color of the editor */,
			text_editor: 'white' /* The color of the text, unless set otherwise by the projection */,
			// TextBox
			bg_empty_before_text_box: 'rgba(1, 1, 150, 255)',
			bg_text_box: FRE_DARK,
			color_empty_before_text_box: 'white',
			color_text_box: 'white',
			// AliasBox
			bg_empty_before_alias_box: '#f4f4f4',
			bg_alias_box: 'white',
			color_alias_box: FRE_DARK,
			// Selection
			bg_selected: 'rgba(21, 21, 250, 255)',
			border_selected: FRE_LIGHT,
			// Dropdown Component
			bg_dropdown_component: FRE_DARK,
			border_dropdown_component: FRE_LIGHT,
			color_dropdownitem_component: FRE_LIGHT,
			/* Buttons */
			button_color: 'black',
			button_bg_color: 'rgba(211, 227, 253, 1)' /* lightblue with opacity 1 */,
			button_active: 'rgba(211, 227, 253, .7)' /* lightblue with opacity .7 */,
			button_hover: 'rgba(211, 227, 253, .8)' /* lightblue with opacity .8 */,
			ripple_color: '#c6b1e4',
			/* Tooltips */
			tooltip_color: 'black',
			tooltip_background: 'red',
			/* Navigation Tree */
			active: 'black',
			/* Syntax Highlighting */
			code_color: '#d4d4d4',
			code_background: '#264F78',
			code_background_color: '#1e1e1e',
			code_keyword: '#c586c0',
			token_color_string: '#ce9178',
			token_keyword: '#569CD6',
			token_constant: '#9cdcfe',
			token_number: '#b5cea8',
			token_not_pre: '#db4c69',
			token_operator: '#d4d4d4',
			token_att_value: '#ce9178',
			token_atrule: '#c586c0',
			token_function: '#dcdcaa',
			token_regex: '#d16969',
			token_boolean: '#569cd6',
			token_class_name: '#4ec9b0',
			token_comment: '#6a9955',
			code_border: '#1e1e1e',
			/* Links */
			link: '#ddb3e5',
			link_visited: '#73dede',
			/* Tables */
			note_background: '#C199F93C',
			figure_background: 'cornsilk',
			table_background: '#715d0a',
			table_heading: '#096552',
			block_quote_background: '#ab8a06'
		},
		fonts: {
			size_editor: '14px',
			style_editor: 'normal',
			weight_editor: 'normal',
			family_editor: 'monospace'
		}
	}
];
