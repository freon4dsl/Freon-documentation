import { FreLanguage, FreTableHeaderInfo } from '@freon4dsl/core';
import { freonConfiguration } from '../../config/FreonConfiguration';
import {
	EntityBoxProvider,
	AbsExpressionBoxProvider,
	MultiplyExpressionBoxProvider,
	EntityFunctionBoxProvider,
	AttributeWithLimitedTypeBoxProvider,
	TextBoxProvider,
	Text2BoxProvider,
	Text3BoxProvider,
	Text4BoxProvider,
	AttributeWithEntityTypeBoxProvider,
	VariableBoxProvider,
	AttributeRefBoxProvider,
	VariableRefBoxProvider,
	StringLiteralExpressionBoxProvider,
	NumberLiteralExpressionBoxProvider,
	BooleanLiteralExpressionBoxProvider,
	PlusExpressionBoxProvider,
	DivideExpressionBoxProvider,
	AndExpressionBoxProvider,
	OrExpressionBoxProvider,
	LessThenExpressionBoxProvider,
	GreaterThenExpressionBoxProvider,
	EqualsExpressionBoxProvider,
	FunctionCallExpressionBoxProvider,
	IfExpressionBoxProvider,
	SomeOtherModelUnitBoxProvider,
	EntityModelUnitBoxProvider
} from '../../editor/gen';
const map = new Map([
	[
		'Entity',
		new Map([
			[
				'StartEditor',
				new Map([
					['isCompany', ''],
					['name', ''],
					['baseEntity', ''],
					['attributes', ''],
					['functions', '__TABLE__']
				])
			],
			[
				'default',
				new Map([
					['name', ''],
					['isCompany', ''],
					['baseInterface_attr', ''],
					['simpleprop', ''],
					['attributes', ''],
					['entAttributes', ''],
					['functions', ''],
					['int_attrs', ''],
					['int_functions', ''],
					['baseEntity', ''],
					['baseInterface', '']
				])
			]
		])
	],
	[
		'AbsExpression',
		new Map([
			[
				'default',
				new Map([
					['expr', ''],
					['appliedfeature', '']
				])
			]
		])
	],
	[
		'EntityFunction',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['aliases', ''],
					['expression', ''],
					['parameters', ''],
					['declaredType', '']
				])
			],
			[
				'tableRowFor_StartEditor',
				new Map([
					['name', ''],
					['parameters', '__TABLE__'],
					['declaredType', ''],
					['expression', '']
				])
			]
		])
	],
	[
		'AttributeWithLimitedType',
		new Map([
			[
				'StartEditor',
				new Map([
					['name', ''],
					['declaredType', '']
				])
			],
			[
				'default',
				new Map([
					['name', ''],
					['declaredType', '']
				])
			]
		])
	],
	[
		'AttributeWithEntityType',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['declaredType', '']
				])
			]
		])
	],
	[
		'Variable',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['declaredType', '']
				])
			]
		])
	],
	[
		'AttributeRef',
		new Map([
			[
				'default',
				new Map([
					['appliedfeature', ''],
					['attribute', '']
				])
			]
		])
	],
	[
		'VariableRef',
		new Map([
			[
				'default',
				new Map([
					['appliedfeature', ''],
					['variable', '']
				])
			]
		])
	],
	[
		'StringLiteralExpression',
		new Map([
			['StartEditor', new Map([['value', '']])],
			[
				'default',
				new Map([
					['value', ''],
					['appliedfeature', '']
				])
			]
		])
	],
	[
		'NumberLiteralExpression',
		new Map([
			['StartEditor', new Map([['value', '']])],
			[
				'default',
				new Map([
					['value', ''],
					['appliedfeature', '']
				])
			]
		])
	],
	[
		'BooleanLiteralExpression',
		new Map([
			[
				'default',
				new Map([
					['value', ''],
					['appliedfeature', '']
				])
			]
		])
	],
	[
		'FunctionCallExpression',
		new Map([
			['StartEditor', new Map([['functionDefinition', '']])],
			[
				'default',
				new Map([
					['appliedfeature', ''],
					['functionDefinition', '']
				])
			]
		])
	],
	[
		'IfExpression',
		new Map([
			[
				'StartEditor',
				new Map([
					['condition', ''],
					['whenTrue', ''],
					['whenFalse', '']
				])
			],
			[
				'specials',
				new Map([
					['condition', ''],
					['whenTrue', ''],
					['whenFalse', '']
				])
			],
			[
				'default',
				new Map([
					['condition', ''],
					['whenTrue', ''],
					['whenFalse', ''],
					['appliedfeature', '']
				])
			]
		])
	],
	[
		'Type',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['simpleprop', ''],
					['baseInterface_attr', ''],
					['int_attrs', ''],
					['int_functions', ''],
					['baseInterface', '']
				])
			]
		])
	],
	[
		'SomeOtherModelUnit',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['somePart', '']
				])
			]
		])
	],
	[
		'EntityModelUnit',
		new Map([
			[
				'StartEditor',
				new Map([
					['name', ''],
					['entities', ''],
					['functions', '']
				])
			],
			[
				'default',
				new Map([
					['name', ''],
					['functions', ''],
					['entities', '']
				])
			]
		])
	]
]);
export function initializeProjections(handler) {
	handler.addProjection('Brackets');
	handler.addProjection('StartEditor');
	handler.addProjection('specials');
	for (const p of freonConfiguration.customProjection) {
		handler.addCustomProjection(p);
	}
	handler.initConceptToPropertyProjection(map);
	handler.initProviderConstructors(
		new Map([
			[
				'Entity',
				() => {
					return new EntityBoxProvider(handler);
				}
			],
			[
				'AbsExpression',
				() => {
					return new AbsExpressionBoxProvider(handler);
				}
			],
			[
				'MultiplyExpression',
				() => {
					return new MultiplyExpressionBoxProvider(handler);
				}
			],
			[
				'EntityFunction',
				() => {
					return new EntityFunctionBoxProvider(handler);
				}
			],
			[
				'AttributeWithLimitedType',
				() => {
					return new AttributeWithLimitedTypeBoxProvider(handler);
				}
			],
			[
				'Text',
				() => {
					return new TextBoxProvider(handler);
				}
			],
			[
				'Text2',
				() => {
					return new Text2BoxProvider(handler);
				}
			],
			[
				'Text3',
				() => {
					return new Text3BoxProvider(handler);
				}
			],
			[
				'Text4',
				() => {
					return new Text4BoxProvider(handler);
				}
			],
			[
				'AttributeWithEntityType',
				() => {
					return new AttributeWithEntityTypeBoxProvider(handler);
				}
			],
			[
				'Variable',
				() => {
					return new VariableBoxProvider(handler);
				}
			],
			[
				'AttributeRef',
				() => {
					return new AttributeRefBoxProvider(handler);
				}
			],
			[
				'VariableRef',
				() => {
					return new VariableRefBoxProvider(handler);
				}
			],
			[
				'StringLiteralExpression',
				() => {
					return new StringLiteralExpressionBoxProvider(handler);
				}
			],
			[
				'NumberLiteralExpression',
				() => {
					return new NumberLiteralExpressionBoxProvider(handler);
				}
			],
			[
				'BooleanLiteralExpression',
				() => {
					return new BooleanLiteralExpressionBoxProvider(handler);
				}
			],
			[
				'PlusExpression',
				() => {
					return new PlusExpressionBoxProvider(handler);
				}
			],
			[
				'DivideExpression',
				() => {
					return new DivideExpressionBoxProvider(handler);
				}
			],
			[
				'AndExpression',
				() => {
					return new AndExpressionBoxProvider(handler);
				}
			],
			[
				'OrExpression',
				() => {
					return new OrExpressionBoxProvider(handler);
				}
			],
			[
				'LessThenExpression',
				() => {
					return new LessThenExpressionBoxProvider(handler);
				}
			],
			[
				'GreaterThenExpression',
				() => {
					return new GreaterThenExpressionBoxProvider(handler);
				}
			],
			[
				'EqualsExpression',
				() => {
					return new EqualsExpressionBoxProvider(handler);
				}
			],
			[
				'FunctionCallExpression',
				() => {
					return new FunctionCallExpressionBoxProvider(handler);
				}
			],
			[
				'IfExpression',
				() => {
					return new IfExpressionBoxProvider(handler);
				}
			],
			[
				'SomeOtherModelUnit',
				() => {
					return new SomeOtherModelUnitBoxProvider(handler);
				}
			],
			[
				'EntityModelUnit',
				() => {
					return new EntityModelUnitBoxProvider(handler);
				}
			]
		])
	);
	handler.initTableHeaders([new FreTableHeaderInfo('EntityFunction', 'tableRowFor_StartEditor', ['Name', 'parameters', 'type', 'body'])]);
}
export function initializeEditorDef() {
	FreLanguage.getInstance().concept('Entity').trigger = 'Entity';
	FreLanguage.getInstance().concept('AbsExpression').trigger = 'AbsExpression';
	FreLanguage.getInstance().concept('MultiplyExpression').trigger = '*';
	FreLanguage.getInstance().concept('EntityFunction').trigger = 'EntityFunction';
	FreLanguage.getInstance().concept('AttributeWithLimitedType').trigger = 'AttributeWithLimitedType';
	FreLanguage.getInstance().concept('Text').trigger = 'Text';
	FreLanguage.getInstance().concept('Text2').trigger = 'Text2';
	FreLanguage.getInstance().concept('Text3').trigger = 'Text3';
	FreLanguage.getInstance().concept('Text4').trigger = 'Text4';
	FreLanguage.getInstance().concept('AttributeWithEntityType').trigger = 'AttributeWithEntityType';
	FreLanguage.getInstance().concept('Variable').trigger = 'Variable';
	FreLanguage.getInstance().concept('AttributeRef').trigger = 'AttributeRef';
	FreLanguage.getInstance().concept('VariableRef').trigger = 'VariableRef';
	FreLanguage.getInstance().concept('StringLiteralExpression').trigger = 'StringLiteralExpression';
	FreLanguage.getInstance().concept('NumberLiteralExpression').trigger = 'NumberLiteralExpression';
	FreLanguage.getInstance().concept('BooleanLiteralExpression').trigger = 'BooleanLiteralExpression';
	FreLanguage.getInstance().concept('PlusExpression').trigger = '+';
	FreLanguage.getInstance().concept('DivideExpression').trigger = '/';
	FreLanguage.getInstance().concept('AndExpression').trigger = 'AndExpression';
	FreLanguage.getInstance().concept('OrExpression').trigger = 'or';
	FreLanguage.getInstance().concept('LessThenExpression').trigger = '<';
	FreLanguage.getInstance().concept('GreaterThenExpression').trigger = 'GreaterThenExpression';
	FreLanguage.getInstance().concept('EqualsExpression').trigger = 'EqualsExpression';
	FreLanguage.getInstance().concept('FunctionCallExpression').trigger = 'function';
	FreLanguage.getInstance().concept('IfExpression').trigger = 'if';
	const conceptProjectionToPropertyProjection = new Map();
}
//# sourceMappingURL=EditorDef.js.map
