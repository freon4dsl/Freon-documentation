import Prism from "prismjs"

/**
 * Freon language definition for Prism code highlighting.
 */
export function setupFreon() {
	Prism.languages.freon = {
		'comment': [
			/\/\*(.*)\*\//,
			/%\{[\s\S]*?\}%/,
			/%.+/,
			/\/\/.*\n/
		],
		'builtin': [
			/\b(?:boolean|string|identifier|number|error|warning)\b/,
		],
		'class-name': [{
				pattern: /(\bconcept\s+)\w+\b/,
				lookbehind: true
			},{
				pattern: /\b\w+(?=\s*{)\b/,
				greedy: true
			},
			{
				pattern: /(?<=:\s*)\w+\b/
			}
		],
		'string': [
			{
				pattern: /\B"(?:""|[^"\r\n])*"/,
				greedy: true
			}
		],
		'number': /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
		'keyword': [
			/\b(?:notEmpty|validIdentifier|message|severity|isunique|in)\b/,
			/\b(?:typecheck|equalsto|conformsto|where|type|hastype|istype|infertype|typeof)\b/,
			/\b(?:scope|isnamespace|container|namespace_addition)\b/,
			/\b(?:editor|button|text|boxRole|table|default|external|referenceShortcut|global|priority|replace|wrap|symbol|referenceShortcut|trigger|fragment)\b/,
			/\b(?:reference|concept|modelunit|interface|limited|base|implements|binary|expression|model|abstract)\b/
		],
		'keyword2': /\b(?:NaN|notEmpty|validIdentifier|message|severity|isunique|in|typecheck|equalsto|conformsto|where|scope|isnamespace|container|namespace_addition|type|hastype|istype|infertype|typeof|editor|table|default|external|referenceSeparator|global|concept|modelunit|interface|limited|base|implements|binary|expression|model|abstract|priority|symbol|referenceShortcut)\b/,
		'function': {
			pattern: /(?<=\$\{)[^}]*(?=\})/,
			inside: {
				'keyword': /\b(?:wrap|replace|radio|terminator|rows|checkbox|slider|horizontal|separator|vertical|inner-switch|switch)\b/,
				'variable': /\b(?:self)\b/
			}
		},
		// 'operator': /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
		// 'punctuation': /\.{3}|[.,;\[\](){}!]/
		'variable': /\b(?:self|equalsType)\b/,
		'punctuation': [/\[/, /\]/]
	};
}

