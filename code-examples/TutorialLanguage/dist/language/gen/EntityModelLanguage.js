import { FreLanguage, FreNodeReference } from '@freon4dsl/core';
import * as MyLanguage from './internal';
import { EntityModelStdlib } from '../../stdlib/gen/EntityModelStdlib';
export function initializeLanguage() {
	FreLanguage.getInstance().name = 'EntityModel';
	FreLanguage.getInstance().id = '';
	FreLanguage.getInstance().addModel(describeEntityModel());
	FreLanguage.getInstance().addUnit(describeSomeOtherModelUnit());
	FreLanguage.getInstance().addUnit(describeEntityModelUnit());
	FreLanguage.getInstance().addConcept(describeEntity());
	FreLanguage.getInstance().addConcept(describeAttributeType());
	FreLanguage.getInstance().addConcept(describeMockEnumeration());
	FreLanguage.getInstance().addConcept(describeAbsExpression());
	FreLanguage.getInstance().addConcept(describeMultiplyExpression());
	FreLanguage.getInstance().addConcept(describeEntityFunction());
	FreLanguage.getInstance().addConcept(describeAttributeWithLimitedType());
	FreLanguage.getInstance().addConcept(describeText());
	FreLanguage.getInstance().addConcept(describeText2());
	FreLanguage.getInstance().addConcept(describeText3());
	FreLanguage.getInstance().addConcept(describeText4());
	FreLanguage.getInstance().addConcept(describeAttributeWithEntityType());
	FreLanguage.getInstance().addConcept(describeVariable());
	FreLanguage.getInstance().addConcept(describeEntityExpression());
	FreLanguage.getInstance().addConcept(describeAppliedFeature());
	FreLanguage.getInstance().addConcept(describeAttributeRef());
	FreLanguage.getInstance().addConcept(describeVariableRef());
	FreLanguage.getInstance().addConcept(describeLiteralExpression());
	FreLanguage.getInstance().addConcept(describeStringLiteralExpression());
	FreLanguage.getInstance().addConcept(describeNumberLiteralExpression());
	FreLanguage.getInstance().addConcept(describeBooleanLiteralExpression());
	FreLanguage.getInstance().addConcept(describeBinaryExpression());
	FreLanguage.getInstance().addConcept(describePlusExpression());
	FreLanguage.getInstance().addConcept(describeDivideExpression());
	FreLanguage.getInstance().addConcept(describeAndExpression());
	FreLanguage.getInstance().addConcept(describeOrExpression());
	FreLanguage.getInstance().addConcept(describeComparisonExpression());
	FreLanguage.getInstance().addConcept(describeLessThenExpression());
	FreLanguage.getInstance().addConcept(describeGreaterThenExpression());
	FreLanguage.getInstance().addConcept(describeEqualsExpression());
	FreLanguage.getInstance().addConcept(describeFunctionCallExpression());
	FreLanguage.getInstance().addConcept(describeIfExpression());
	FreLanguage.getInstance().addInterface(describeBaseType());
	FreLanguage.getInstance().addInterface(describeType());
	FreLanguage.getInstance().addReferenceCreator((name, type) => {
		return !!name ? FreNodeReference.create(name, type) : null;
	});
	FreLanguage.getInstance().stdLib = EntityModelStdlib.getInstance();
}
function describeEntityModel() {
	const model = {
		typeName: 'EntityModel',
		id: '-default-id-EntityModel',
		key: '-default-key-EntityModel',
		isNamespace: true,
		language: '-default-key-Entity',
		constructor: (id) => {
			return new MyLanguage.EntityModel(id);
		},
		creator: (data) => {
			return MyLanguage.EntityModel.create(data);
		},
		properties: new Map()
	};
	model.properties.set('name', {
		name: 'name',
		id: '-default-id-EntityModel-name',
		key: '-default-key-EntityModel-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	model.properties.set('units', {
		name: 'units',
		id: '-default-id-EntityModel-units',
		key: '-default-key-EntityModel-units',
		type: 'EntityModelUnit',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	model.properties.set('extraUnit', {
		name: 'extraUnit',
		id: '-default-id-EntityModel-extraUnit',
		key: '-default-key-EntityModel-extraUnit',
		type: 'SomeOtherModelUnit',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return model;
}
function describeSomeOtherModelUnit() {
	const modelunit = {
		typeName: 'SomeOtherModelUnit',
		id: '-default-id-SomeOtherModelUnit',
		key: '-default-key-SomeOtherModelUnit',
		isNamedElement: true,
		language: '-default-key-Entity',
		fileExtension: 'som',
		subConceptNames: [],
		constructor: (id) => {
			return new MyLanguage.SomeOtherModelUnit(id);
		},
		creator: (data) => {
			return MyLanguage.SomeOtherModelUnit.create(data);
		},
		properties: new Map(),
		trigger: 'SomeOtherModelUnit'
	};
	modelunit.properties.set('name', {
		name: 'name',
		id: '-default-id-SomeOtherModelUnit-name',
		key: '-default-key-SomeOtherModelUnit-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	modelunit.properties.set('somePart', {
		name: 'somePart',
		id: '-default-id-SomeOtherModelUnit-somePart',
		key: '-default-key-SomeOtherModelUnit-somePart',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return modelunit;
}
function describeEntityModelUnit() {
	const modelunit = {
		typeName: 'EntityModelUnit',
		id: '-default-id-EntityModelUnit',
		key: '-default-key-EntityModelUnit',
		isNamedElement: true,
		language: '-default-key-Entity',
		fileExtension: 'ent',
		subConceptNames: [],
		constructor: (id) => {
			return new MyLanguage.EntityModelUnit(id);
		},
		creator: (data) => {
			return MyLanguage.EntityModelUnit.create(data);
		},
		properties: new Map(),
		trigger: 'EntityModelUnit'
	};
	modelunit.properties.set('name', {
		name: 'name',
		id: '-default-id-EntityModelUnit-name',
		key: '-default-key-EntityModelUnit-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	modelunit.properties.set('functions', {
		name: 'functions',
		id: '-default-id-EntityModelUnit-functions',
		key: '-default-key-EntityModelUnit-functions',
		type: 'EntityFunction',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	modelunit.properties.set('entities', {
		name: 'entities',
		id: '-default-id-EntityModelUnit-entities',
		key: '-default-key-EntityModelUnit-entities',
		type: 'Entity',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return modelunit;
}
function describeEntity() {
	const concept = {
		typeName: 'Entity',
		id: '-default-id-Entity',
		key: '-default-key-Entity',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'Entity',
		constructor: (id) => {
			return new MyLanguage.Entity(id);
		},
		creator: (data) => {
			return MyLanguage.Entity.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('isCompany', {
		name: 'isCompany',
		id: '-default-id-Entity-isCompany',
		key: '-default-key-Entity-isCompany',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-BaseType-name',
		key: '-default-key-BaseType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('baseInterface_attr', {
		name: 'baseInterface_attr',
		id: '-default-id-BaseType-baseInterface_attr',
		key: '-default-key-BaseType-baseInterface_attr',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('simpleprop', {
		name: 'simpleprop',
		id: '-default-id-Type-simpleprop',
		key: '-default-key-Type-simpleprop',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('attributes', {
		name: 'attributes',
		id: '-default-id-Entity-attributes',
		key: '-default-key-Entity-attributes',
		type: 'AttributeWithLimitedType',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('entAttributes', {
		name: 'entAttributes',
		id: '-default-id-Entity-entAttributes',
		key: '-default-key-Entity-entAttributes',
		type: 'AttributeWithEntityType',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('functions', {
		name: 'functions',
		id: '-default-id-Entity-functions',
		key: '-default-key-Entity-functions',
		type: 'EntityFunction',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('int_attrs', {
		name: 'int_attrs',
		id: '-default-id-Type-int_attrs',
		key: '-default-key-Type-int_attrs',
		type: 'AttributeWithLimitedType',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('int_functions', {
		name: 'int_functions',
		id: '-default-id-Type-int_functions',
		key: '-default-key-Type-int_functions',
		type: 'EntityFunction',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('baseEntity', {
		name: 'baseEntity',
		id: '-default-id-Entity-baseEntity',
		key: '-default-key-Entity-baseEntity',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	concept.properties.set('baseInterface', {
		name: 'baseInterface',
		id: '-default-id-Type-baseInterface',
		key: '-default-key-Type-baseInterface',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeAttributeType() {
	const concept = {
		typeName: 'AttributeType',
		id: '-default-id-AttributeType',
		key: '-default-key-AttributeType',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['String', 'Integer', 'Boolean', 'ANY'],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'AttributeType',
		constructor: (id) => {
			return new MyLanguage.AttributeType(id);
		},
		creator: (data) => {
			return MyLanguage.AttributeType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-AttributeType-name',
		key: '-default-key-AttributeType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('extra', {
		name: 'extra',
		id: '-default-id-AttributeType-extra',
		key: '-default-key-AttributeType-extra',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('baseInterface_attr', {
		name: 'baseInterface_attr',
		id: '-default-id-BaseType-baseInterface_attr',
		key: '-default-key-BaseType-baseInterface_attr',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeMockEnumeration() {
	const concept = {
		typeName: 'MockEnumeration',
		id: '-default-id-MockEnumeration',
		key: '-default-key-MockEnumeration',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['EnumValue1', 'EnumValue2', 'EnumValue3'],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'MockEnumeration',
		constructor: (id) => {
			return new MyLanguage.MockEnumeration(id);
		},
		creator: (data) => {
			return MyLanguage.MockEnumeration.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: 'TODO_set-correct-id',
		key: 'TODO_set-correct-key',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeAbsExpression() {
	const concept = {
		typeName: 'AbsExpression',
		id: '-default-id-AbsExpression',
		key: '-default-key-AbsExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'AbsExpression',
		constructor: (id) => {
			return new MyLanguage.AbsExpression(id);
		},
		creator: (data) => {
			return MyLanguage.AbsExpression.create(data);
		},
		properties: new Map(),
		baseName: 'EntityExpression',
		subConceptNames: []
	};
	concept.properties.set('expr', {
		name: 'expr',
		id: '-default-id-AbsExpression-expr',
		key: '-default-key-AbsExpression-expr',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeMultiplyExpression() {
	const concept = {
		typeName: 'MultiplyExpression',
		id: '-default-id-MultiplyExpression',
		key: '-default-key-MultiplyExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'MultiplyExpression',
		constructor: (id) => {
			return new MyLanguage.MultiplyExpression(id);
		},
		creator: (data) => {
			return MyLanguage.MultiplyExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeEntityFunction() {
	const concept = {
		typeName: 'EntityFunction',
		id: '-default-id-EntityFunction',
		key: '-default-key-EntityFunction',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'EntityFunction',
		constructor: (id) => {
			return new MyLanguage.EntityFunction(id);
		},
		creator: (data) => {
			return MyLanguage.EntityFunction.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-EntityFunction-name',
		key: '-default-key-EntityFunction-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('aliases', {
		name: 'aliases',
		id: '-default-id-EntityFunction-aliases',
		key: '-default-key-EntityFunction-aliases',
		type: 'string',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('expression', {
		name: 'expression',
		id: '-default-id-EntityFunction-expression',
		key: '-default-key-EntityFunction-expression',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('parameters', {
		name: 'parameters',
		id: '-default-id-EntityFunction-parameters',
		key: '-default-key-EntityFunction-parameters',
		type: 'Variable',
		isList: true,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('declaredType', {
		name: 'declaredType',
		id: '-default-id-EntityFunction-declaredType',
		key: '-default-key-EntityFunction-declaredType',
		type: 'Type',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeAttributeWithLimitedType() {
	const concept = {
		typeName: 'AttributeWithLimitedType',
		id: '-default-id-AttributeWithLimitedType',
		key: '-default-key-AttributeWithLimitedType',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'AttributeWithLimitedType',
		constructor: (id) => {
			return new MyLanguage.AttributeWithLimitedType(id);
		},
		creator: (data) => {
			return MyLanguage.AttributeWithLimitedType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-AttributeWithLimitedType-name',
		key: '-default-key-AttributeWithLimitedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('declaredType', {
		name: 'declaredType',
		id: '-default-id-AttributeWithLimitedType-declaredType',
		key: '-default-key-AttributeWithLimitedType-declaredType',
		type: 'AttributeType',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeText() {
	const concept = {
		typeName: 'Text',
		id: '-default-id-Text',
		key: '-default-key-Text',
		isAbstract: false,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'Text',
		constructor: (id) => {
			return new MyLanguage.Text(id);
		},
		creator: (data) => {
			return MyLanguage.Text.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	return concept;
}
function describeText2() {
	const concept = {
		typeName: 'Text2',
		id: '-default-id-Text2',
		key: '-default-key-Text2',
		isAbstract: false,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'Text2',
		constructor: (id) => {
			return new MyLanguage.Text2(id);
		},
		creator: (data) => {
			return MyLanguage.Text2.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	return concept;
}
function describeText3() {
	const concept = {
		typeName: 'Text3',
		id: '-default-id-Text3',
		key: '-default-key-Text3',
		isAbstract: false,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'Text3',
		constructor: (id) => {
			return new MyLanguage.Text3(id);
		},
		creator: (data) => {
			return MyLanguage.Text3.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	return concept;
}
function describeText4() {
	const concept = {
		typeName: 'Text4',
		id: '-default-id-Text4',
		key: '-default-key-Text4',
		isAbstract: false,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'Text4',
		constructor: (id) => {
			return new MyLanguage.Text4(id);
		},
		creator: (data) => {
			return MyLanguage.Text4.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	return concept;
}
function describeAttributeWithEntityType() {
	const concept = {
		typeName: 'AttributeWithEntityType',
		id: '-default-id-AttributeWithEntityType',
		key: '-default-key-AttributeWithEntityType',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'AttributeWithEntityType',
		constructor: (id) => {
			return new MyLanguage.AttributeWithEntityType(id);
		},
		creator: (data) => {
			return MyLanguage.AttributeWithEntityType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-AttributeWithEntityType-name',
		key: '-default-key-AttributeWithEntityType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('declaredType', {
		name: 'declaredType',
		id: '-default-id-AttributeWithEntityType-declaredType',
		key: '-default-key-AttributeWithEntityType-declaredType',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeVariable() {
	const concept = {
		typeName: 'Variable',
		id: '-default-id-Variable',
		key: '-default-key-Variable',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: true,
		trigger: 'Variable',
		constructor: (id) => {
			return new MyLanguage.Variable(id);
		},
		creator: (data) => {
			return MyLanguage.Variable.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-Variable-name',
		key: '-default-key-Variable-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('declaredType', {
		name: 'declaredType',
		id: '-default-id-Variable-declaredType',
		key: '-default-key-Variable-declaredType',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeEntityExpression() {
	const concept = {
		typeName: 'EntityExpression',
		id: '-default-id-EntityExpression',
		key: '-default-key-EntityExpression',
		isAbstract: true,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'EntityExpression',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: [
			'AbsExpression',
			'MultiplyExpression',
			'VariableRef',
			'LiteralExpression',
			'StringLiteralExpression',
			'NumberLiteralExpression',
			'BooleanLiteralExpression',
			'BinaryExpression',
			'PlusExpression',
			'DivideExpression',
			'AndExpression',
			'OrExpression',
			'ComparisonExpression',
			'LessThenExpression',
			'GreaterThenExpression',
			'EqualsExpression',
			'FunctionCallExpression',
			'IfExpression'
		]
	};
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeAppliedFeature() {
	const concept = {
		typeName: 'AppliedFeature',
		id: '-default-id-AppliedFeature',
		key: '-default-key-AppliedFeature',
		isAbstract: true,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'AppliedFeature',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: ['AttributeRef']
	};
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-AppliedFeature-appliedfeature',
		key: '-default-key-AppliedFeature-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeAttributeRef() {
	const concept = {
		typeName: 'AttributeRef',
		id: '-default-id-AttributeRef',
		key: '-default-key-AttributeRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'AttributeRef',
		constructor: (id) => {
			return new MyLanguage.AttributeRef(id);
		},
		creator: (data) => {
			return MyLanguage.AttributeRef.create(data);
		},
		properties: new Map(),
		baseName: 'AppliedFeature',
		subConceptNames: []
	};
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-AppliedFeature-appliedfeature',
		key: '-default-key-AppliedFeature-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('attribute', {
		name: 'attribute',
		id: '-default-id-AttributeRef-attribute',
		key: '-default-key-AttributeRef-attribute',
		type: 'AttributeWithEntityType',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeVariableRef() {
	const concept = {
		typeName: 'VariableRef',
		id: '-default-id-VariableRef',
		key: '-default-key-VariableRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'VariableRef',
		constructor: (id) => {
			return new MyLanguage.VariableRef(id);
		},
		creator: (data) => {
			return MyLanguage.VariableRef.create(data);
		},
		properties: new Map(),
		baseName: 'EntityExpression',
		subConceptNames: []
	};
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('variable', {
		name: 'variable',
		id: '-default-id-VariableRef-variable',
		key: '-default-key-VariableRef-variable',
		type: 'Variable',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeLiteralExpression() {
	const concept = {
		typeName: 'LiteralExpression',
		id: '-default-id-LiteralExpression',
		key: '-default-key-LiteralExpression',
		isAbstract: true,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'LiteralExpression',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: 'EntityExpression',
		subConceptNames: ['StringLiteralExpression', 'NumberLiteralExpression', 'BooleanLiteralExpression']
	};
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeStringLiteralExpression() {
	const concept = {
		typeName: 'StringLiteralExpression',
		id: '-default-id-StringLiteralExpression',
		key: '-default-key-StringLiteralExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'StringLiteralExpression',
		constructor: (id) => {
			return new MyLanguage.StringLiteralExpression(id);
		},
		creator: (data) => {
			return MyLanguage.StringLiteralExpression.create(data);
		},
		properties: new Map(),
		baseName: 'LiteralExpression',
		subConceptNames: []
	};
	concept.properties.set('value', {
		name: 'value',
		id: '-default-id-StringLiteralExpression-value',
		key: '-default-key-StringLiteralExpression-value',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeNumberLiteralExpression() {
	const concept = {
		typeName: 'NumberLiteralExpression',
		id: '-default-id-NumberLiteralExpression',
		key: '-default-key-NumberLiteralExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'NumberLiteralExpression',
		constructor: (id) => {
			return new MyLanguage.NumberLiteralExpression(id);
		},
		creator: (data) => {
			return MyLanguage.NumberLiteralExpression.create(data);
		},
		properties: new Map(),
		baseName: 'LiteralExpression',
		subConceptNames: []
	};
	concept.properties.set('value', {
		name: 'value',
		id: '-default-id-NumberLiteralExpression-value',
		key: '-default-key-NumberLiteralExpression-value',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeBooleanLiteralExpression() {
	const concept = {
		typeName: 'BooleanLiteralExpression',
		id: '-default-id-BooleanLiteralExpression',
		key: '-default-key-BooleanLiteralExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'BooleanLiteralExpression',
		constructor: (id) => {
			return new MyLanguage.BooleanLiteralExpression(id);
		},
		creator: (data) => {
			return MyLanguage.BooleanLiteralExpression.create(data);
		},
		properties: new Map(),
		baseName: 'LiteralExpression',
		subConceptNames: []
	};
	concept.properties.set('value', {
		name: 'value',
		id: '-default-id-BooleanLiteralExpression-value',
		key: '-default-key-BooleanLiteralExpression-value',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'primitive'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeBinaryExpression() {
	const concept = {
		typeName: 'BinaryExpression',
		id: '-default-id-BinaryExpression',
		key: '-default-key-BinaryExpression',
		isAbstract: true,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'BinaryExpression',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: 'EntityExpression',
		subConceptNames: [
			'MultiplyExpression',
			'PlusExpression',
			'DivideExpression',
			'AndExpression',
			'OrExpression',
			'ComparisonExpression',
			'LessThenExpression',
			'GreaterThenExpression',
			'EqualsExpression'
		]
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describePlusExpression() {
	const concept = {
		typeName: 'PlusExpression',
		id: '-default-id-PlusExpression',
		key: '-default-key-PlusExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'PlusExpression',
		constructor: (id) => {
			return new MyLanguage.PlusExpression(id);
		},
		creator: (data) => {
			return MyLanguage.PlusExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeDivideExpression() {
	const concept = {
		typeName: 'DivideExpression',
		id: '-default-id-DivideExpression',
		key: '-default-key-DivideExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'DivideExpression',
		constructor: (id) => {
			return new MyLanguage.DivideExpression(id);
		},
		creator: (data) => {
			return MyLanguage.DivideExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeAndExpression() {
	const concept = {
		typeName: 'AndExpression',
		id: '-default-id-AndExpression',
		key: '-default-key-AndExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'AndExpression',
		constructor: (id) => {
			return new MyLanguage.AndExpression(id);
		},
		creator: (data) => {
			return MyLanguage.AndExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeOrExpression() {
	const concept = {
		typeName: 'OrExpression',
		id: '-default-id-OrExpression',
		key: '-default-key-OrExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'OrExpression',
		constructor: (id) => {
			return new MyLanguage.OrExpression(id);
		},
		creator: (data) => {
			return MyLanguage.OrExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeComparisonExpression() {
	const concept = {
		typeName: 'ComparisonExpression',
		id: '-default-id-ComparisonExpression',
		key: '-default-key-ComparisonExpression',
		isAbstract: true,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'ComparisonExpression',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: ['LessThenExpression', 'GreaterThenExpression', 'EqualsExpression']
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeLessThenExpression() {
	const concept = {
		typeName: 'LessThenExpression',
		id: '-default-id-LessThenExpression',
		key: '-default-key-LessThenExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'LessThenExpression',
		constructor: (id) => {
			return new MyLanguage.LessThenExpression(id);
		},
		creator: (data) => {
			return MyLanguage.LessThenExpression.create(data);
		},
		properties: new Map(),
		baseName: 'ComparisonExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeGreaterThenExpression() {
	const concept = {
		typeName: 'GreaterThenExpression',
		id: '-default-id-GreaterThenExpression',
		key: '-default-key-GreaterThenExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'GreaterThenExpression',
		constructor: (id) => {
			return new MyLanguage.GreaterThenExpression(id);
		},
		creator: (data) => {
			return MyLanguage.GreaterThenExpression.create(data);
		},
		properties: new Map(),
		baseName: 'ComparisonExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeEqualsExpression() {
	const concept = {
		typeName: 'EqualsExpression',
		id: '-default-id-EqualsExpression',
		key: '-default-key-EqualsExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'EqualsExpression',
		constructor: (id) => {
			return new MyLanguage.EqualsExpression(id);
		},
		creator: (data) => {
			return MyLanguage.EqualsExpression.create(data);
		},
		properties: new Map(),
		baseName: 'ComparisonExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeFunctionCallExpression() {
	const concept = {
		typeName: 'FunctionCallExpression',
		id: '-default-id-FunctionCallExpression',
		key: '-default-key-FunctionCallExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'FunctionCallExpression',
		constructor: (id) => {
			return new MyLanguage.FunctionCallExpression(id);
		},
		creator: (data) => {
			return MyLanguage.FunctionCallExpression.create(data);
		},
		properties: new Map(),
		baseName: 'EntityExpression',
		subConceptNames: []
	};
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('functionDefinition', {
		name: 'functionDefinition',
		id: '-default-id-FunctionCallExpression-functionDefinition',
		key: '-default-key-FunctionCallExpression-functionDefinition',
		type: 'EntityFunction',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'reference'
	});
	return concept;
}
function describeIfExpression() {
	const concept = {
		typeName: 'IfExpression',
		id: '-default-id-IfExpression',
		key: '-default-key-IfExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-Entity',
		isNamedElement: false,
		trigger: 'IfExpression',
		constructor: (id) => {
			return new MyLanguage.IfExpression(id);
		},
		creator: (data) => {
			return MyLanguage.IfExpression.create(data);
		},
		properties: new Map(),
		baseName: 'EntityExpression',
		subConceptNames: []
	};
	concept.properties.set('condition', {
		name: 'condition',
		id: '-default-id-IfExpression-condition',
		key: '-default-key-IfExpression-condition',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('whenTrue', {
		name: 'whenTrue',
		id: '-default-id-IfExpression-whenTrue',
		key: '-default-key-IfExpression-whenTrue',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('whenFalse', {
		name: 'whenFalse',
		id: '-default-id-IfExpression-whenFalse',
		key: '-default-key-IfExpression-whenFalse',
		type: 'EntityExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	concept.properties.set('appliedfeature', {
		name: 'appliedfeature',
		id: '-default-id-EntityExpression-appliedfeature',
		key: '-default-key-EntityExpression-appliedfeature',
		type: 'AppliedFeature',
		isList: false,
		isPublic: true,
		language: '-default-key-Entity',
		propertyKind: 'part'
	});
	return concept;
}
function describeBaseType() {
	const intface = {
		typeName: 'BaseType',
		id: '-default-id-BaseType',
		key: '-default-key-BaseType',
		isPublic: true,
		isNamedElement: true,
		properties: new Map(),
		constructor: undefined,
		creator: undefined,
		language: 'Entity',
		subConceptNames: ['Entity', 'AttributeType']
	};
	intface.properties.set('name', {
		name: 'name',
		id: '-default-id-BaseType-name',
		key: '-default-key-BaseType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'primitive'
	});
	intface.properties.set('baseInterface_attr', {
		name: 'baseInterface_attr',
		id: '-default-id-BaseType-baseInterface_attr',
		key: '-default-key-BaseType-baseInterface_attr',
		type: 'number',
		isList: false,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'primitive'
	});
	return intface;
}
function describeType() {
	const intface = {
		typeName: 'Type',
		id: '-default-id-Type',
		key: '-default-key-Type',
		isPublic: true,
		isNamedElement: true,
		properties: new Map(),
		constructor: undefined,
		creator: undefined,
		language: 'Entity',
		subConceptNames: ['Entity']
	};
	intface.properties.set('simpleprop', {
		name: 'simpleprop',
		id: '-default-id-Type-simpleprop',
		key: '-default-key-Type-simpleprop',
		type: 'string',
		isList: false,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'primitive'
	});
	intface.properties.set('name', {
		name: 'name',
		id: '-default-id-BaseType-name',
		key: '-default-key-BaseType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'primitive'
	});
	intface.properties.set('baseInterface_attr', {
		name: 'baseInterface_attr',
		id: '-default-id-BaseType-baseInterface_attr',
		key: '-default-key-BaseType-baseInterface_attr',
		type: 'number',
		isList: false,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'primitive'
	});
	intface.properties.set('int_attrs', {
		name: 'int_attrs',
		id: '-default-id-Type-int_attrs',
		key: '-default-key-Type-int_attrs',
		type: 'AttributeWithLimitedType',
		isList: true,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'part'
	});
	intface.properties.set('int_functions', {
		name: 'int_functions',
		id: '-default-id-Type-int_functions',
		key: '-default-key-Type-int_functions',
		type: 'EntityFunction',
		isList: true,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'part'
	});
	intface.properties.set('baseInterface', {
		name: 'baseInterface',
		id: '-default-id-Type-baseInterface',
		key: '-default-key-Type-baseInterface',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: 'Entity',
		propertyKind: 'reference'
	});
	return intface;
}
//# sourceMappingURL=EntityModelLanguage.js.map
