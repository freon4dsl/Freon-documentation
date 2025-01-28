import {
	MobxModelElementImpl,
	FreUtils,
	observablepartlist,
	matchElementList,
	FreLanguage,
	AST,
	observableprim,
	observablepart,
	matchReferenceList,
	FreCustomAction,
	FreNodeReference,
	FreCreateBinaryExpressionAction,
	LEFT_MOST,
	RIGHT_MOST,
	BEFORE_BINARY_OPERATOR,
	AFTER_BINARY_OPERATOR,
	ActionsUtil,
	FreBoxProvider,
	createDefaultExpressionBox,
	BoxFactory,
	BoxUtil,
	NumberDisplay,
	BoolDisplay,
	createDefaultBinaryBox,
	isFreBinaryExpression,
	LimitedDisplay,
	TableUtil,
	FragmentBox,
	ExternalSimpleBox,
	FreTableHeaderInfo,
	FreLogger,
	FreScoperBase,
	FreNamespace,
	AstType,
	FreCommonSuperTypeUtil,
	FreLanguageEnvironment,
	FreError,
	FreErrorSeverity,
	FreParseLocation,
	RtError,
	MainInterpreter,
	InterpreterContext,
	FreScoperComposite,
	FreCompositeTyper,
	FreProjectionHandler,
	FreEditor
} from '@freon4dsl/core';
import { runInAction } from 'mobx';
import agl from 'net.akehurst.language-agl-processor';

class InsuranceModel extends MobxModelElementImpl {
	static create(data) {
		const result = new InsuranceModel(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parts) {
			data.parts.forEach((x) => result.parts.push(x));
		}
		if (!!data.products) {
			data.products.forEach((x) => result.products.push(x));
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'InsuranceModel';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observablepartlist(this, 'parts');
		observablepartlist(this, 'products');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return true;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new InsuranceModel();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.parts) {
			this.parts.forEach((x) => result.parts.push(x.copy()));
		}
		if (!!this.products) {
			this.products.forEach((x) => result.products.push(x.copy()));
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.parts) {
			result = result && matchElementList(this.parts, toBeMatched.parts);
		}
		if (result && !!toBeMatched.products) {
			result = result && matchElementList(this.products, toBeMatched.products);
		}
		return result;
	}
	findUnit(name, metatype) {
		let result = null;
		const checkType = metatype !== undefined;
		result = this.getUnits().find(
			(mod) => mod.name === name && (checkType ? FreLanguage.getInstance().metaConformsToType(mod, metatype) : true)
		);
		if (!!result) {
			return result;
		}
		return null;
	}
	replaceUnit(oldUnit, newUnit) {
		if (oldUnit.freLanguageConcept() !== newUnit.freLanguageConcept()) {
			return false;
		}
		if (oldUnit.freOwnerDescriptor().owner !== this) {
			return false;
		}
		if (oldUnit.freLanguageConcept() === 'Part' && oldUnit.freOwnerDescriptor().propertyName === 'parts') {
			AST.changeNamed('removeUnit', () => {
				const index = this.parts.indexOf(oldUnit);
				this.parts.splice(index, 1, newUnit);
			});
		} else if (oldUnit.freLanguageConcept() === 'Product' && oldUnit.freOwnerDescriptor().propertyName === 'products') {
			AST.changeNamed('removeUnit', () => {
				const index = this.products.indexOf(oldUnit);
				this.products.splice(index, 1, newUnit);
			});
		} else {
			return false;
		}
		return true;
	}
	addUnit(newUnit) {
		if (!!newUnit) {
			const myMetatype = newUnit.freLanguageConcept();
			switch (myMetatype) {
				case 'Part': {
					AST.changeNamed('addUnit', () => {
						this.parts.push(newUnit);
					});
					return true;
				}
				case 'Product': {
					AST.changeNamed('addUnit', () => {
						this.products.push(newUnit);
					});
					return true;
				}
			}
		}
		return false;
	}
	removeUnit(oldUnit) {
		if (!!oldUnit) {
			const myMetatype = oldUnit.freLanguageConcept();
			switch (myMetatype) {
				case 'Part': {
					AST.changeNamed('removeUnit', () => {
						this.parts.splice(this.parts.indexOf(oldUnit), 1);
					});
					return true;
				}
				case 'Product': {
					AST.changeNamed('removeUnit', () => {
						this.products.splice(this.products.indexOf(oldUnit), 1);
					});
					return true;
				}
			}
		}
		return false;
	}
	newUnit(typename) {
		switch (typename) {
			case 'Part': {
				const unit = Part.create({});
				AST.changeNamed('newUnit', () => {
					this.parts.push(unit);
				});
				return unit;
			}
			case 'Product': {
				const unit = Product.create({});
				AST.changeNamed('newUnit', () => {
					this.products.push(unit);
				});
				return unit;
			}
		}
		return null;
	}
	getUnits() {
		let result = [];
		result = result.concat(this.parts);
		result = result.concat(this.products);
		return result;
	}
	getUnitsForType(type) {
		switch (type) {
			case 'Part': {
				return this.parts;
			}
			case 'Product': {
				return this.products;
			}
		}
		return [];
	}
}

class Part extends MobxModelElementImpl {
	static create(data) {
		const result = new Part(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.part) {
			result.part = data.part;
		} else {
			result.part = BaseProduct.create({});
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.fileExtension = '';
		this.$typename = 'Part';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observablepart(this, 'part');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return true;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Part();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.part) {
			result.part = this.part.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.part) {
			result = result && this.part.match(toBeMatched.part);
		}
		return result;
	}
}

class Product extends MobxModelElementImpl {
	static create(data) {
		const result = new Product(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.product) {
			result.product = data.product;
		} else {
			result.product = InsuranceProduct.create({});
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.fileExtension = '';
		this.$typename = 'Product';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observablepart(this, 'product');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return true;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Product();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.product) {
			result.product = this.product.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.product) {
			result = result && this.product.match(toBeMatched.product);
		}
		return result;
	}
}

class DocuExpression extends MobxModelElementImpl {
	constructor(id) {
		super();
		this.$typename = 'DocuExpression';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		console.log('DocuExpression: copy method should be implemented by concrete subclass');
		return null;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}

class AttributeRef extends MobxModelElementImpl {
	constructor(id) {
		super();
		this.$typename = 'AttributeRef';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		console.log('AttributeRef: copy method should be implemented by concrete subclass');
		return null;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}

class Text extends MobxModelElementImpl {
	static create(data) {
		const result = new Text(data.$id);
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Text';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Text();
		return result;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}

class Text2 extends MobxModelElementImpl {
	static create(data) {
		const result = new Text2(data.$id);
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Text2';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Text2();
		return result;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}

class Text3 extends MobxModelElementImpl {
	static create(data) {
		const result = new Text3(data.$id);
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Text3';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Text3();
		return result;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}

class Text4 extends MobxModelElementImpl {
	static create(data) {
		const result = new Text4(data.$id);
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Text4';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Text4();
		return result;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}

class GenericKind extends MobxModelElementImpl {
	static create(data) {
		const result = new GenericKind(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'GenericKind';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new GenericKind();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	GenericKind.Set = GenericKind.create({
		name: 'Set'
	});
	GenericKind.Sequence = GenericKind.create({
		name: 'Sequence'
	});
	GenericKind.Bag = GenericKind.create({
		name: 'Bag'
	});
	GenericKind.Collection = GenericKind.create({
		name: 'Collection'
	});
});

class Entity extends MobxModelElementImpl {
	static create(data) {
		const result = new Entity(data.$id);
		if (!!data.isCompany) {
			result.isCompany = data.isCompany;
		}
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.baseEntity) {
			result.baseEntity = data.baseEntity;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Entity';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'isCompany');
		this.isCompany = false;
		observableprim(this, 'name');
		this.name = '';
		observablepart(this, 'baseEntity');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Entity();
		if (!!this.isCompany) {
			result.isCompany = this.isCompany;
		}
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.baseEntity) {
			result.baseEntity = this.baseEntity.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.isCompany !== null && toBeMatched.isCompany !== undefined) {
			result = result && this.isCompany === toBeMatched.isCompany;
		}
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.baseEntity) {
			result = result && this.baseEntity.match(toBeMatched.baseEntity);
		}
		return result;
	}
	get $baseEntity() {
		if (!!this.baseEntity) {
			return this.baseEntity.referred;
		}
		return null;
	}
}

class EntityAttribute extends MobxModelElementImpl {
	static create(data) {
		const result = new EntityAttribute(data.$id);
		if (!!data.numVal) {
			result.numVal = data.numVal;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'EntityAttribute';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'numVal');
		this.numVal = 0;
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new EntityAttribute();
		if (!!this.numVal) {
			result.numVal = this.numVal;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.numVal !== null && toBeMatched.numVal !== undefined) {
			result = result && this.numVal === toBeMatched.numVal;
		}
		return result;
	}
}

class BaseProduct extends MobxModelElementImpl {
	static create(data) {
		const result = new BaseProduct(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.isUnderConstruction) {
			result.isUnderConstruction = data.isUnderConstruction;
		}
		if (!!data.isApprovedLevel1) {
			result.isApprovedLevel1 = data.isApprovedLevel1;
		}
		if (!!data.isApprovedLevel2) {
			result.isApprovedLevel2 = data.isApprovedLevel2;
		}
		if (!!data.isApprovedLevel3) {
			result.isApprovedLevel3 = data.isApprovedLevel3;
		}
		if (!!data.yieldsProfit) {
			result.yieldsProfit = data.yieldsProfit;
		}
		if (!!data.range) {
			result.range = data.range;
		}
		if (!!data.nrOfUse) {
			result.nrOfUse = data.nrOfUse;
		}
		if (!!data.date) {
			result.date = data.date;
		}
		if (!!data.parts) {
			data.parts.forEach((x) => result.parts.push(x));
		}
		if (!!data.theme) {
			result.theme = data.theme;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'BaseProduct';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observableprim(this, 'isUnderConstruction');
		this.isUnderConstruction = false;
		observableprim(this, 'isApprovedLevel1');
		this.isApprovedLevel1 = false;
		observableprim(this, 'isApprovedLevel2');
		this.isApprovedLevel2 = false;
		observableprim(this, 'isApprovedLevel3');
		this.isApprovedLevel3 = false;
		observableprim(this, 'yieldsProfit');
		this.yieldsProfit = false;
		observableprim(this, 'range');
		this.range = 0;
		observableprim(this, 'nrOfUse');
		this.nrOfUse = 0;
		observableprim(this, 'date');
		this.date = '';
		observablepartlist(this, 'parts');
		observablepart(this, 'theme');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new BaseProduct();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.isUnderConstruction) {
			result.isUnderConstruction = this.isUnderConstruction;
		}
		if (!!this.isApprovedLevel1) {
			result.isApprovedLevel1 = this.isApprovedLevel1;
		}
		if (!!this.isApprovedLevel2) {
			result.isApprovedLevel2 = this.isApprovedLevel2;
		}
		if (!!this.isApprovedLevel3) {
			result.isApprovedLevel3 = this.isApprovedLevel3;
		}
		if (!!this.yieldsProfit) {
			result.yieldsProfit = this.yieldsProfit;
		}
		if (!!this.range) {
			result.range = this.range;
		}
		if (!!this.nrOfUse) {
			result.nrOfUse = this.nrOfUse;
		}
		if (!!this.date) {
			result.date = this.date;
		}
		if (!!this.parts) {
			this.parts.forEach((x) => result.parts.push(x.copy()));
		}
		if (!!this.theme) {
			result.theme = this.theme.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && toBeMatched.isUnderConstruction !== null && toBeMatched.isUnderConstruction !== undefined) {
			result = result && this.isUnderConstruction === toBeMatched.isUnderConstruction;
		}
		if (result && toBeMatched.isApprovedLevel1 !== null && toBeMatched.isApprovedLevel1 !== undefined) {
			result = result && this.isApprovedLevel1 === toBeMatched.isApprovedLevel1;
		}
		if (result && toBeMatched.isApprovedLevel2 !== null && toBeMatched.isApprovedLevel2 !== undefined) {
			result = result && this.isApprovedLevel2 === toBeMatched.isApprovedLevel2;
		}
		if (result && toBeMatched.isApprovedLevel3 !== null && toBeMatched.isApprovedLevel3 !== undefined) {
			result = result && this.isApprovedLevel3 === toBeMatched.isApprovedLevel3;
		}
		if (result && toBeMatched.yieldsProfit !== null && toBeMatched.yieldsProfit !== undefined) {
			result = result && this.yieldsProfit === toBeMatched.yieldsProfit;
		}
		if (result && toBeMatched.range !== null && toBeMatched.range !== undefined) {
			result = result && this.range === toBeMatched.range;
		}
		if (result && toBeMatched.nrOfUse !== null && toBeMatched.nrOfUse !== undefined) {
			result = result && this.nrOfUse === toBeMatched.nrOfUse;
		}
		if (result && toBeMatched.date !== null && toBeMatched.date !== undefined && toBeMatched.date.length > 0) {
			result = result && this.date === toBeMatched.date;
		}
		if (result && !!toBeMatched.parts) {
			result = result && matchElementList(this.parts, toBeMatched.parts);
		}
		if (result && !!toBeMatched.theme) {
			result = result && this.theme.match(toBeMatched.theme);
		}
		return result;
	}
	get $theme() {
		if (!!this.theme) {
			return this.theme.referred;
		}
		return null;
	}
}

class InsurancePart extends MobxModelElementImpl {
	static create(data) {
		const result = new InsurancePart(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.isApproved) {
			result.isApproved = data.isApproved;
		}
		if (!!data.statisticalRisk) {
			result.statisticalRisk = data.statisticalRisk;
		} else {
			result.statisticalRisk = PercentageLiteral.create({});
		}
		if (!!data.maximumPayOut) {
			result.maximumPayOut = data.maximumPayOut;
		} else {
			result.maximumPayOut = EuroLiteral.create({});
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'InsurancePart';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observableprim(this, 'isApproved');
		this.isApproved = false;
		observablepart(this, 'statisticalRisk');
		observablepart(this, 'maximumPayOut');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new InsurancePart();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.isApproved) {
			result.isApproved = this.isApproved;
		}
		if (!!this.statisticalRisk) {
			result.statisticalRisk = this.statisticalRisk.copy();
		}
		if (!!this.maximumPayOut) {
			result.maximumPayOut = this.maximumPayOut.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && toBeMatched.isApproved !== null && toBeMatched.isApproved !== undefined) {
			result = result && this.isApproved === toBeMatched.isApproved;
		}
		if (result && !!toBeMatched.statisticalRisk) {
			result = result && this.statisticalRisk.match(toBeMatched.statisticalRisk);
		}
		if (result && !!toBeMatched.maximumPayOut) {
			result = result && this.maximumPayOut.match(toBeMatched.maximumPayOut);
		}
		return result;
	}
}

class InsuranceProduct extends MobxModelElementImpl {
	static create(data) {
		const result = new InsuranceProduct(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.productName) {
			result.productName = data.productName;
		}
		if (!!data.advertisedPremium) {
			result.advertisedPremium = data.advertisedPremium;
		} else {
			result.advertisedPremium = EuroLiteral.create({});
		}
		if (!!data.riskAdjustment) {
			result.riskAdjustment = data.riskAdjustment;
		}
		if (!!data.calculation) {
			result.calculation = data.calculation;
		}
		if (!!data.helpers) {
			data.helpers.forEach((x) => result.helpers.push(x));
		}
		if (!!data.themes) {
			data.themes.forEach((x) => result.themes.push(x));
		}
		if (!!data.nrPremiumDays) {
			result.nrPremiumDays = data.nrPremiumDays;
		}
		if (!!data.parts) {
			data.parts.forEach((x) => result.parts.push(x));
		}
		if (!!data.basedOn) {
			data.basedOn.forEach((x) => result.basedOn.push(x));
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'InsuranceProduct';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observableprim(this, 'productName');
		this.productName = '';
		observablepart(this, 'advertisedPremium');
		observablepart(this, 'riskAdjustment');
		observablepart(this, 'calculation');
		observablepartlist(this, 'helpers');
		observablepartlist(this, 'themes');
		observablepart(this, 'nrPremiumDays');
		observablepartlist(this, 'parts');
		observablepartlist(this, 'basedOn');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new InsuranceProduct();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.productName) {
			result.productName = this.productName;
		}
		if (!!this.advertisedPremium) {
			result.advertisedPremium = this.advertisedPremium.copy();
		}
		if (!!this.riskAdjustment) {
			result.riskAdjustment = this.riskAdjustment.copy();
		}
		if (!!this.calculation) {
			result.calculation = this.calculation.copy();
		}
		if (!!this.helpers) {
			this.helpers.forEach((x) => result.helpers.push(x.copy()));
		}
		if (!!this.themes) {
			this.themes.forEach((x) => result.themes.push(x.copy()));
		}
		if (!!this.nrPremiumDays) {
			result.nrPremiumDays = this.nrPremiumDays.copy();
		}
		if (!!this.parts) {
			this.parts.forEach((x) => result.parts.push(x.copy()));
		}
		if (!!this.basedOn) {
			this.basedOn.forEach((x) => result.basedOn.push(x.copy()));
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && toBeMatched.productName !== null && toBeMatched.productName !== undefined && toBeMatched.productName.length > 0) {
			result = result && this.productName === toBeMatched.productName;
		}
		if (result && !!toBeMatched.advertisedPremium) {
			result = result && this.advertisedPremium.match(toBeMatched.advertisedPremium);
		}
		if (result && !!toBeMatched.riskAdjustment) {
			result = result && this.riskAdjustment.match(toBeMatched.riskAdjustment);
		}
		if (result && !!toBeMatched.calculation) {
			result = result && this.calculation.match(toBeMatched.calculation);
		}
		if (result && !!toBeMatched.helpers) {
			result = result && matchElementList(this.helpers, toBeMatched.helpers);
		}
		if (result && !!toBeMatched.themes) {
			result = result && matchReferenceList(this.themes, toBeMatched.themes);
		}
		if (result && !!toBeMatched.nrPremiumDays) {
			result = result && this.nrPremiumDays.match(toBeMatched.nrPremiumDays);
		}
		if (result && !!toBeMatched.parts) {
			result = result && matchReferenceList(this.parts, toBeMatched.parts);
		}
		if (result && !!toBeMatched.basedOn) {
			result = result && matchReferenceList(this.basedOn, toBeMatched.basedOn);
		}
		return result;
	}
	get $themes() {
		const result = [];
		for (const $part of this.themes) {
			if (!!$part.referred) {
				result.push($part.referred);
			}
		}
		return result;
	}
	get $nrPremiumDays() {
		if (!!this.nrPremiumDays) {
			return this.nrPremiumDays.referred;
		}
		return null;
	}
	get $parts() {
		const result = [];
		for (const $part of this.parts) {
			if (!!$part.referred) {
				result.push($part.referred);
			}
		}
		return result;
	}
	get $basedOn() {
		const result = [];
		for (const $part of this.basedOn) {
			if (!!$part.referred) {
				result.push($part.referred);
			}
		}
		return result;
	}
}

class CalcFunction extends MobxModelElementImpl {
	static create(data) {
		const result = new CalcFunction(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.description) {
			result.description = data.description;
		}
		if (!!data.declaredType) {
			result.declaredType = data.declaredType;
		}
		if (!!data.body) {
			result.body = data.body;
		}
		if (!!data.parameters) {
			data.parameters.forEach((x) => result.parameters.push(x));
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'CalcFunction';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observablepart(this, 'description');
		observablepart(this, 'declaredType');
		observablepart(this, 'body');
		observablepartlist(this, 'parameters');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new CalcFunction();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.description) {
			result.description = this.description.copy();
		}
		if (!!this.declaredType) {
			result.declaredType = this.declaredType.copy();
		}
		if (!!this.body) {
			result.body = this.body.copy();
		}
		if (!!this.parameters) {
			this.parameters.forEach((x) => result.parameters.push(x.copy()));
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.description) {
			result = result && this.description.match(toBeMatched.description);
		}
		if (result && !!toBeMatched.declaredType) {
			result = result && this.declaredType.match(toBeMatched.declaredType);
		}
		if (result && !!toBeMatched.body) {
			result = result && this.body.match(toBeMatched.body);
		}
		if (result && !!toBeMatched.parameters) {
			result = result && matchElementList(this.parameters, toBeMatched.parameters);
		}
		return result;
	}
}

class Description extends MobxModelElementImpl {
	static create(data) {
		const result = new Description(data.$id);
		if (!!data.content) {
			result.content = data.content;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Description';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'content');
		this.content = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Description();
		if (!!this.content) {
			result.content = this.content;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.content !== null && toBeMatched.content !== undefined && toBeMatched.content.length > 0) {
			result = result && this.content === toBeMatched.content;
		}
		return result;
	}
}

class Parameter extends MobxModelElementImpl {
	static create(data) {
		const result = new Parameter(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.declaredType) {
			result.declaredType = data.declaredType;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'Parameter';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observablepart(this, 'declaredType');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new Parameter();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.declaredType) {
			result.declaredType = this.declaredType.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && !!toBeMatched.declaredType) {
			result = result && this.declaredType.match(toBeMatched.declaredType);
		}
		return result;
	}
}

class DocuType extends MobxModelElementImpl {
	constructor(id) {
		super();
		this.$typename = 'DocuType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		console.log('DocuType: copy method should be implemented by concrete subclass');
		return null;
	}
	match(toBeMatched) {
		let result = true;
		return result;
	}
}

class InsurancePartType extends MobxModelElementImpl {
	static create(data) {
		const result = new InsurancePartType(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'InsurancePartType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new InsurancePartType();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	InsurancePartType.InsurancePart = InsurancePartType.create({
		name: 'InsurancePart'
	});
});

class PercentageType extends MobxModelElementImpl {
	static create(data) {
		const result = new PercentageType(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'PercentageType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new PercentageType();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	PercentageType.Percentage = PercentageType.create({
		name: 'Percentage'
	});
});

class NumberType extends MobxModelElementImpl {
	static create(data) {
		const result = new NumberType(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'NumberType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new NumberType();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	NumberType.Number = NumberType.create({
		name: 'Number'
	});
});

class BooleanType extends MobxModelElementImpl {
	static create(data) {
		const result = new BooleanType(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'BooleanType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new BooleanType();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	BooleanType.Boolean = BooleanType.create({
		name: 'Boolean'
	});
});

class EuroType extends MobxModelElementImpl {
	static create(data) {
		const result = new EuroType(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'EuroType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new EuroType();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	EuroType.EUR = EuroType.create({
		name: 'EUR'
	});
});

class InsuranceTheme extends MobxModelElementImpl {
	static create(data) {
		const result = new InsuranceTheme(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'InsuranceTheme';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new InsuranceTheme();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}
runInAction(() => {
	InsuranceTheme.HomeTheme = InsuranceTheme.create({
		name: 'HomeTheme'
	});
	InsuranceTheme.HealthTheme = InsuranceTheme.create({
		name: 'HealthTheme'
	});
	InsuranceTheme.LegalTheme = InsuranceTheme.create({
		name: 'LegalTheme'
	});
});

class PremiumDays extends MobxModelElementImpl {
	static create(data) {
		const result = new PremiumDays(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.nrOfDays) {
			result.nrOfDays = data.nrOfDays;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super();
		this.$typename = 'PremiumDays';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
		observableprim(this, 'name');
		this.name = '';
		observableprim(this, 'nrOfDays');
		this.nrOfDays = 0;
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freId() {
		return this.$id;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new PremiumDays();
		if (!!this.name) {
			result.name = this.name;
		}
		if (!!this.nrOfDays) {
			result.nrOfDays = this.nrOfDays;
		}
		return result;
	}
	match(toBeMatched) {
		let result = true;
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		if (result && toBeMatched.nrOfDays !== null && toBeMatched.nrOfDays !== undefined) {
			result = result && this.nrOfDays === toBeMatched.nrOfDays;
		}
		return result;
	}
}
runInAction(() => {
	PremiumDays.Week = PremiumDays.create({
		name: 'Week',
		nrOfDays: 7
	});
	PremiumDays.Month = PremiumDays.create({
		name: 'Month',
		nrOfDays: 30
	});
	PremiumDays.Quarter = PremiumDays.create({
		nrOfDays: 91,
		name: 'Quarter'
	});
	PremiumDays.Semester = PremiumDays.create({
		nrOfDays: 182,
		name: 'Semester'
	});
	PremiumDays.Year = PremiumDays.create({
		nrOfDays: 365,
		name: 'Year'
	});
});

class Literal extends DocuExpression {
	constructor(id) {
		super(id);
		this.$typename = 'Literal';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		console.log('Literal: copy method should be implemented by concrete subclass');
		return null;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		return result;
	}
}

class BinaryExpression extends DocuExpression {
	constructor(id) {
		super(id);
		this.$typename = 'BinaryExpression';
		observablepart(this, 'left');
		observablepart(this, 'right');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return true;
	}
	copy() {
		console.log('BinaryExpression: copy method should be implemented by concrete subclass');
		return null;
	}
	frePriority() {
		return -1;
	}
	freLeft() {
		return this.left;
	}
	freRight() {
		return this.right;
	}
	freSetLeft(value) {
		this.left = value;
	}
	freSetRight(value) {
		this.right = value;
	}
}

class FunctionCallExpression extends DocuExpression {
	static create(data) {
		const result = new FunctionCallExpression(data.$id);
		if (!!data.args) {
			data.args.forEach((x) => result.args.push(x));
		}
		if (!!data.funcDefinition) {
			result.funcDefinition = data.funcDefinition;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'FunctionCallExpression';
		observablepartlist(this, 'args');
		observablepart(this, 'funcDefinition');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new FunctionCallExpression();
		if (!!this.args) {
			this.args.forEach((x) => result.args.push(x.copy()));
		}
		if (!!this.funcDefinition) {
			result.funcDefinition = this.funcDefinition.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.args) {
			result = result && matchElementList(this.args, toBeMatched.args);
		}
		if (result && !!toBeMatched.funcDefinition) {
			result = result && this.funcDefinition.match(toBeMatched.funcDefinition);
		}
		return result;
	}
	get $funcDefinition() {
		if (!!this.funcDefinition) {
			return this.funcDefinition.referred;
		}
		return null;
	}
}

class InsurancePartRef extends DocuExpression {
	static create(data) {
		const result = new InsurancePartRef(data.$id);
		if (!!data.part) {
			result.part = data.part;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'InsurancePartRef';
		observablepart(this, 'part');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new InsurancePartRef();
		if (!!this.part) {
			result.part = this.part.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.part) {
			result = result && this.part.match(toBeMatched.part);
		}
		return result;
	}
	get $part() {
		if (!!this.part) {
			return this.part.referred;
		}
		return null;
	}
}

class RiskAdjustmentRef extends DocuExpression {
	static create(data) {
		const result = new RiskAdjustmentRef(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'RiskAdjustmentRef';
		observableprim(this, 'name');
		this.name = 'riskAdjustment';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new RiskAdjustmentRef();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}

class ParameterRef extends DocuExpression {
	static create(data) {
		const result = new ParameterRef(data.$id);
		if (!!data.attribute) {
			result.attribute = data.attribute;
		}
		if (!!data.parameter) {
			result.parameter = data.parameter;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'ParameterRef';
		observablepart(this, 'attribute');
		observablepart(this, 'parameter');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new ParameterRef();
		if (!!this.attribute) {
			result.attribute = this.attribute.copy();
		}
		if (!!this.parameter) {
			result.parameter = this.parameter.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.attribute) {
			result = result && this.attribute.match(toBeMatched.attribute);
		}
		if (result && !!toBeMatched.parameter) {
			result = result && this.parameter.match(toBeMatched.parameter);
		}
		return result;
	}
	get $parameter() {
		if (!!this.parameter) {
			return this.parameter.referred;
		}
		return null;
	}
}

class RiskRef extends AttributeRef {
	static create(data) {
		const result = new RiskRef(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'RiskRef';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new RiskRef();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}

class PayoutRef extends AttributeRef {
	static create(data) {
		const result = new PayoutRef(data.$id);
		if (!!data.name) {
			result.name = data.name;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'PayoutRef';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new PayoutRef();
		if (!!this.name) {
			result.name = this.name;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
			result = result && this.name === toBeMatched.name;
		}
		return result;
	}
}

class GenericTypeDecl extends DocuType {
	static create(data) {
		const result = new GenericTypeDecl(data.$id);
		if (!!data.baseType) {
			result.baseType = data.baseType;
		}
		if (!!data.kind) {
			result.kind = data.kind;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'GenericTypeDecl';
		observablepart(this, 'baseType');
		observablepart(this, 'kind');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new GenericTypeDecl();
		if (!!this.baseType) {
			result.baseType = this.baseType.copy();
		}
		if (!!this.kind) {
			result.kind = this.kind.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.baseType) {
			result = result && this.baseType.match(toBeMatched.baseType);
		}
		if (result && !!toBeMatched.kind) {
			result = result && this.kind.match(toBeMatched.kind);
		}
		return result;
	}
	get $kind() {
		if (!!this.kind) {
			return this.kind.referred;
		}
		return null;
	}
}

class GenericLiteral extends DocuExpression {
	static create(data) {
		const result = new GenericLiteral(data.$id);
		if (!!data.content) {
			data.content.forEach((x) => result.content.push(x));
		}
		if (!!data.kind) {
			result.kind = data.kind;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'GenericLiteral';
		observablepartlist(this, 'content');
		observablepart(this, 'kind');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new GenericLiteral();
		if (!!this.content) {
			this.content.forEach((x) => result.content.push(x.copy()));
		}
		if (!!this.kind) {
			result.kind = this.kind.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.content) {
			result = result && matchElementList(this.content, toBeMatched.content);
		}
		if (result && !!toBeMatched.kind) {
			result = result && this.kind.match(toBeMatched.kind);
		}
		return result;
	}
	get $kind() {
		if (!!this.kind) {
			return this.kind.referred;
		}
		return null;
	}
}

class TypeRef extends DocuType {
	static create(data) {
		const result = new TypeRef(data.$id);
		if (!!data.type) {
			result.type = data.type;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'TypeRef';
		observablepart(this, 'type');
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return false;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new TypeRef();
		if (!!this.type) {
			result.type = this.type.copy();
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && !!toBeMatched.type) {
			result = result && this.type.match(toBeMatched.type);
		}
		return result;
	}
	get $type() {
		if (!!this.type) {
			return this.type.referred;
		}
		return null;
	}
}

class EuroLiteral extends Literal {
	static create(data) {
		const result = new EuroLiteral(data.$id);
		if (!!data.euros) {
			result.euros = data.euros;
		}
		if (!!data.cents) {
			result.cents = data.cents;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'EuroLiteral';
		observableprim(this, 'euros');
		this.euros = 0;
		observableprim(this, 'cents');
		this.cents = 0;
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new EuroLiteral();
		if (!!this.euros) {
			result.euros = this.euros;
		}
		if (!!this.cents) {
			result.cents = this.cents;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.euros !== null && toBeMatched.euros !== undefined) {
			result = result && this.euros === toBeMatched.euros;
		}
		if (result && toBeMatched.cents !== null && toBeMatched.cents !== undefined) {
			result = result && this.cents === toBeMatched.cents;
		}
		return result;
	}
}

class NumberLiteral extends Literal {
	static create(data) {
		const result = new NumberLiteral(data.$id);
		if (!!data.value) {
			result.value = data.value;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'NumberLiteral';
		observableprim(this, 'value');
		this.value = 0;
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new NumberLiteral();
		if (!!this.value) {
			result.value = this.value;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.value !== null && toBeMatched.value !== undefined) {
			result = result && this.value === toBeMatched.value;
		}
		return result;
	}
}

class PercentageLiteral extends Literal {
	static create(data) {
		const result = new PercentageLiteral(data.$id);
		if (!!data.value) {
			result.value = data.value;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'PercentageLiteral';
		observableprim(this, 'value');
		this.value = 0;
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new PercentageLiteral();
		if (!!this.value) {
			result.value = this.value;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.value !== null && toBeMatched.value !== undefined) {
			result = result && this.value === toBeMatched.value;
		}
		return result;
	}
}

class BooleanLiteral extends Literal {
	static create(data) {
		const result = new BooleanLiteral(data.$id);
		if (!!data.value) {
			result.value = data.value;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'BooleanLiteral';
		observableprim(this, 'value');
		this.value = false;
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return false;
	}
	copy() {
		const result = new BooleanLiteral();
		if (!!this.value) {
			result.value = this.value;
		}
		return result;
	}
	match(toBeMatched) {
		let result = super.match(toBeMatched);
		if (result && toBeMatched.value !== null && toBeMatched.value !== undefined) {
			result = result && this.value === toBeMatched.value;
		}
		return result;
	}
}

class PlusExpression extends BinaryExpression {
	static create(data) {
		const result = new PlusExpression(data.$id);
		if (!!data.left) {
			result.left = data.left;
		}
		if (!!data.right) {
			result.right = data.right;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'PlusExpression';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return true;
	}
	copy() {
		const result = new PlusExpression();
		if (!!this.left) {
			result.left = this.left.copy();
		}
		if (!!this.right) {
			result.right = this.right.copy();
		}
		return result;
	}
	frePriority() {
		return 4;
	}
	freLeft() {
		return this.left;
	}
	freRight() {
		return this.right;
	}
	freSetLeft(value) {
		this.left = value;
	}
	freSetRight(value) {
		this.right = value;
	}
}

class MinusExpression extends BinaryExpression {
	static create(data) {
		const result = new MinusExpression(data.$id);
		if (!!data.left) {
			result.left = data.left;
		}
		if (!!data.right) {
			result.right = data.right;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'MinusExpression';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return true;
	}
	copy() {
		const result = new MinusExpression();
		if (!!this.left) {
			result.left = this.left.copy();
		}
		if (!!this.right) {
			result.right = this.right.copy();
		}
		return result;
	}
	frePriority() {
		return 4;
	}
	freLeft() {
		return this.left;
	}
	freRight() {
		return this.right;
	}
	freSetLeft(value) {
		this.left = value;
	}
	freSetRight(value) {
		this.right = value;
	}
}

class MultiplyExpression extends BinaryExpression {
	static create(data) {
		const result = new MultiplyExpression(data.$id);
		if (!!data.left) {
			result.left = data.left;
		}
		if (!!data.right) {
			result.right = data.right;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'MultiplyExpression';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return true;
	}
	copy() {
		const result = new MultiplyExpression();
		if (!!this.left) {
			result.left = this.left.copy();
		}
		if (!!this.right) {
			result.right = this.right.copy();
		}
		return result;
	}
	frePriority() {
		return 8;
	}
	freLeft() {
		return this.left;
	}
	freRight() {
		return this.right;
	}
	freSetLeft(value) {
		this.left = value;
	}
	freSetRight(value) {
		this.right = value;
	}
}

class DivideExpression extends BinaryExpression {
	static create(data) {
		const result = new DivideExpression(data.$id);
		if (!!data.left) {
			result.left = data.left;
		}
		if (!!data.right) {
			result.right = data.right;
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		super(id);
		this.$typename = 'DivideExpression';
	}
	freLanguageConcept() {
		return this.$typename;
	}
	freIsModel() {
		return false;
	}
	freIsUnit() {
		return false;
	}
	freIsExpression() {
		return true;
	}
	freIsBinaryExpression() {
		return true;
	}
	copy() {
		const result = new DivideExpression();
		if (!!this.left) {
			result.left = this.left.copy();
		}
		if (!!this.right) {
			result.right = this.right.copy();
		}
		return result;
	}
	frePriority() {
		return 8;
	}
	freLeft() {
		return this.left;
	}
	freRight() {
		return this.right;
	}
	freSetLeft(value) {
		this.left = value;
	}
	freSetRight(value) {
		this.right = value;
	}
}

class CustomInsuranceModelProjection {
	constructor() {
		this.name = 'Manual';
		this.nodeTypeToBoxMethod = new Map([]);
		this.nodeTypeToTableDefinition = new Map([]);
	}
}

class CustomInsuranceModelActions {
	constructor() {
		this.binaryExpressionActions = MANUAL_BINARY_EXPRESSION_ACTIONS;
		this.customActions = MANUAL_CUSTOM_ACTIONS;
	}
}
const MANUAL_BINARY_EXPRESSION_ACTIONS = [];
const MANUAL_CUSTOM_ACTIONS = [
	FreCustomAction.create({
		activeInBoxRoles: ['MyButton-role'],
		action: (box, trigger, ed) => {
			const thisNode = box.node;
			alert(
				"You shouldn't have pushed the button with role 'MyButton-role' on element " + thisNode.freId() + '.\nPunishment awaits !!!!!!!!!!'
			);
			return null;
		}
	}),
	FreCustomAction.create({
		activeInBoxRoles: ['MyTableButton-role'],
		action: (box, trigger, ed) => {
			const thisNode = box.node;
			alert(
				"You shouldn't have pushed the button with role 'MyTableButton-role' on element " +
					thisNode.freId() +
					'.\nPunishment awaits !!!!!!!!!!'
			);
			return null;
		}
	})
];

class CustomInsuranceModelScoper {
	resolvePathName(modelelement, doNotSearch, pathname, metatype) {
		return undefined;
	}
	isInScope(modelElement, name, metatype, excludeSurrounding) {
		return undefined;
	}
	getVisibleElements(modelelement, metatype, excludeSurrounding) {
		return undefined;
	}
	getFromVisibleElements(modelelement, name, metatype, excludeSurrounding) {
		return undefined;
	}
	getVisibleNames(modelelement, metatype, excludeSurrounding) {
		return undefined;
	}
	additionalNamespaces(element) {
		return undefined;
	}
}

class CustomInsuranceModelTyperPart {
	isType(modelelement) {
		return null;
	}
	inferType(modelelement) {
		return null;
	}
	equals(type1, type2) {
		return null;
	}
	conforms(type1, type2) {
		return null;
	}
	conformsList(typelist1, typelist2) {
		return null;
	}
	commonSuper(typelist) {
		return null;
	}
	getSuperTypes(type) {
		return null;
	}
}

class InsuranceModelDefaultWorker {
	execBeforeInsuranceModel(modelelement) {
		return false;
	}
	execAfterInsuranceModel(modelelement) {
		return false;
	}
	execBeforePart(modelelement) {
		return false;
	}
	execAfterPart(modelelement) {
		return false;
	}
	execBeforeProduct(modelelement) {
		return false;
	}
	execAfterProduct(modelelement) {
		return false;
	}
	execBeforeDocuExpression(modelelement) {
		return false;
	}
	execAfterDocuExpression(modelelement) {
		return false;
	}
	execBeforeLiteral(modelelement) {
		return false;
	}
	execAfterLiteral(modelelement) {
		return false;
	}
	execBeforeEuroLiteral(modelelement) {
		return false;
	}
	execAfterEuroLiteral(modelelement) {
		return false;
	}
	execBeforeNumberLiteral(modelelement) {
		return false;
	}
	execAfterNumberLiteral(modelelement) {
		return false;
	}
	execBeforePercentageLiteral(modelelement) {
		return false;
	}
	execAfterPercentageLiteral(modelelement) {
		return false;
	}
	execBeforeBooleanLiteral(modelelement) {
		return false;
	}
	execAfterBooleanLiteral(modelelement) {
		return false;
	}
	execBeforeBinaryExpression(modelelement) {
		return false;
	}
	execAfterBinaryExpression(modelelement) {
		return false;
	}
	execBeforePlusExpression(modelelement) {
		return false;
	}
	execAfterPlusExpression(modelelement) {
		return false;
	}
	execBeforeMinusExpression(modelelement) {
		return false;
	}
	execAfterMinusExpression(modelelement) {
		return false;
	}
	execBeforeMultiplyExpression(modelelement) {
		return false;
	}
	execAfterMultiplyExpression(modelelement) {
		return false;
	}
	execBeforeDivideExpression(modelelement) {
		return false;
	}
	execAfterDivideExpression(modelelement) {
		return false;
	}
	execBeforeFunctionCallExpression(modelelement) {
		return false;
	}
	execAfterFunctionCallExpression(modelelement) {
		return false;
	}
	execBeforeInsurancePartRef(modelelement) {
		return false;
	}
	execAfterInsurancePartRef(modelelement) {
		return false;
	}
	execBeforeRiskAdjustmentRef(modelelement) {
		return false;
	}
	execAfterRiskAdjustmentRef(modelelement) {
		return false;
	}
	execBeforeParameterRef(modelelement) {
		return false;
	}
	execAfterParameterRef(modelelement) {
		return false;
	}
	execBeforeAttributeRef(modelelement) {
		return false;
	}
	execAfterAttributeRef(modelelement) {
		return false;
	}
	execBeforeRiskRef(modelelement) {
		return false;
	}
	execAfterRiskRef(modelelement) {
		return false;
	}
	execBeforePayoutRef(modelelement) {
		return false;
	}
	execAfterPayoutRef(modelelement) {
		return false;
	}
	execBeforeText(modelelement) {
		return false;
	}
	execAfterText(modelelement) {
		return false;
	}
	execBeforeText2(modelelement) {
		return false;
	}
	execAfterText2(modelelement) {
		return false;
	}
	execBeforeText3(modelelement) {
		return false;
	}
	execAfterText3(modelelement) {
		return false;
	}
	execBeforeText4(modelelement) {
		return false;
	}
	execAfterText4(modelelement) {
		return false;
	}
	execBeforeGenericKind(modelelement) {
		return false;
	}
	execAfterGenericKind(modelelement) {
		return false;
	}
	execBeforeGenericTypeDecl(modelelement) {
		return false;
	}
	execAfterGenericTypeDecl(modelelement) {
		return false;
	}
	execBeforeGenericLiteral(modelelement) {
		return false;
	}
	execAfterGenericLiteral(modelelement) {
		return false;
	}
	execBeforeEntity(modelelement) {
		return false;
	}
	execAfterEntity(modelelement) {
		return false;
	}
	execBeforeEntityAttribute(modelelement) {
		return false;
	}
	execAfterEntityAttribute(modelelement) {
		return false;
	}
	execBeforeBaseProduct(modelelement) {
		return false;
	}
	execAfterBaseProduct(modelelement) {
		return false;
	}
	execBeforeInsurancePart(modelelement) {
		return false;
	}
	execAfterInsurancePart(modelelement) {
		return false;
	}
	execBeforeInsuranceProduct(modelelement) {
		return false;
	}
	execAfterInsuranceProduct(modelelement) {
		return false;
	}
	execBeforeCalcFunction(modelelement) {
		return false;
	}
	execAfterCalcFunction(modelelement) {
		return false;
	}
	execBeforeDescription(modelelement) {
		return false;
	}
	execAfterDescription(modelelement) {
		return false;
	}
	execBeforeParameter(modelelement) {
		return false;
	}
	execAfterParameter(modelelement) {
		return false;
	}
	execBeforeDocuType(modelelement) {
		return false;
	}
	execAfterDocuType(modelelement) {
		return false;
	}
	execBeforeInsurancePartType(modelelement) {
		return false;
	}
	execAfterInsurancePartType(modelelement) {
		return false;
	}
	execBeforePercentageType(modelelement) {
		return false;
	}
	execAfterPercentageType(modelelement) {
		return false;
	}
	execBeforeNumberType(modelelement) {
		return false;
	}
	execAfterNumberType(modelelement) {
		return false;
	}
	execBeforeBooleanType(modelelement) {
		return false;
	}
	execAfterBooleanType(modelelement) {
		return false;
	}
	execBeforeEuroType(modelelement) {
		return false;
	}
	execAfterEuroType(modelelement) {
		return false;
	}
	execBeforeTypeRef(modelelement) {
		return false;
	}
	execAfterTypeRef(modelelement) {
		return false;
	}
	execBeforeInsuranceTheme(modelelement) {
		return false;
	}
	execAfterInsuranceTheme(modelelement) {
		return false;
	}
	execBeforePremiumDays(modelelement) {
		return false;
	}
	execAfterPremiumDays(modelelement) {
		return false;
	}
}

class CustomInsuranceModelValidator extends InsuranceModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.errorList = [];
	}
}

class CustomInsuranceModelStdlib {
	get elements() {
		return [];
	}
}

class FreonConfiguration {
	constructor() {
		this.customProjection = [new CustomInsuranceModelProjection()];
		this.customActions = [new CustomInsuranceModelActions()];
		this.customValidations = [new CustomInsuranceModelValidator()];
		this.customScopers = [new CustomInsuranceModelScoper()];
		this.customTypers = [new CustomInsuranceModelTyperPart()];
		this.customStdLibs = [new CustomInsuranceModelStdlib()];
	}
}
const freonConfiguration = new FreonConfiguration();

class ListUtil {
	static addIfNotPresent(list, addition) {
		if (!!addition && !list.includes(addition)) {
			list.push(addition);
		}
	}
	static addAllIfNotPresent(list, listOfAdditions) {
		for (const xx of listOfAdditions) {
			ListUtil.addIfNotPresent(list, xx);
		}
	}
}

class InsuranceModelStdlib {
	static getInstance() {
		if (this.stdlib === undefined || this.stdlib === null) {
			this.stdlib = new InsuranceModelStdlib();
		}
		return this.stdlib;
	}
	constructor() {
		this.elements = [];
		this.elements.push(GenericKind.Set);
		this.elements.push(GenericKind.Sequence);
		this.elements.push(GenericKind.Bag);
		this.elements.push(GenericKind.Collection);
		this.elements.push(InsurancePartType.InsurancePart);
		this.elements.push(PercentageType.Percentage);
		this.elements.push(NumberType.Number);
		this.elements.push(BooleanType.Boolean);
		this.elements.push(EuroType.EUR);
		this.elements.push(InsuranceTheme.HomeTheme);
		this.elements.push(InsuranceTheme.HealthTheme);
		this.elements.push(InsuranceTheme.LegalTheme);
		this.elements.push(PremiumDays.Week);
		this.elements.push(PremiumDays.Month);
		this.elements.push(PremiumDays.Quarter);
		this.elements.push(PremiumDays.Semester);
		this.elements.push(PremiumDays.Year);
		for (const lib of freonConfiguration.customStdLibs) {
			ListUtil.addAllIfNotPresent(this.elements, lib.elements);
		}
	}
	find(name, metatype) {
		if (!!name) {
			const possibles = this.elements.filter((elem) => elem.name === name);
			if (possibles.length !== 0) {
				if (metatype) {
					for (const elem of possibles) {
						if (FreLanguage.getInstance().metaConformsToType(elem, metatype)) {
							return elem;
						}
					}
				} else {
					return possibles[0];
				}
			}
		}
		return null;
	}
}

function initializeLanguage() {
	FreLanguage.getInstance().name = 'InsuranceModel';
	FreLanguage.getInstance().id = '';
	FreLanguage.getInstance().addModel(describeInsuranceModel());
	FreLanguage.getInstance().addUnit(describePart());
	FreLanguage.getInstance().addUnit(describeProduct());
	FreLanguage.getInstance().addConcept(describeDocuExpression());
	FreLanguage.getInstance().addConcept(describeLiteral());
	FreLanguage.getInstance().addConcept(describeEuroLiteral());
	FreLanguage.getInstance().addConcept(describeNumberLiteral());
	FreLanguage.getInstance().addConcept(describePercentageLiteral());
	FreLanguage.getInstance().addConcept(describeBooleanLiteral());
	FreLanguage.getInstance().addConcept(describeBinaryExpression());
	FreLanguage.getInstance().addConcept(describePlusExpression());
	FreLanguage.getInstance().addConcept(describeMinusExpression());
	FreLanguage.getInstance().addConcept(describeMultiplyExpression());
	FreLanguage.getInstance().addConcept(describeDivideExpression());
	FreLanguage.getInstance().addConcept(describeFunctionCallExpression());
	FreLanguage.getInstance().addConcept(describeInsurancePartRef());
	FreLanguage.getInstance().addConcept(describeRiskAdjustmentRef());
	FreLanguage.getInstance().addConcept(describeParameterRef());
	FreLanguage.getInstance().addConcept(describeAttributeRef());
	FreLanguage.getInstance().addConcept(describeRiskRef());
	FreLanguage.getInstance().addConcept(describePayoutRef());
	FreLanguage.getInstance().addConcept(describeText());
	FreLanguage.getInstance().addConcept(describeText2());
	FreLanguage.getInstance().addConcept(describeText3());
	FreLanguage.getInstance().addConcept(describeText4());
	FreLanguage.getInstance().addConcept(describeGenericKind());
	FreLanguage.getInstance().addConcept(describeGenericTypeDecl());
	FreLanguage.getInstance().addConcept(describeGenericLiteral());
	FreLanguage.getInstance().addConcept(describeEntity());
	FreLanguage.getInstance().addConcept(describeEntityAttribute());
	FreLanguage.getInstance().addConcept(describeBaseProduct());
	FreLanguage.getInstance().addConcept(describeInsurancePart());
	FreLanguage.getInstance().addConcept(describeInsuranceProduct());
	FreLanguage.getInstance().addConcept(describeCalcFunction());
	FreLanguage.getInstance().addConcept(describeDescription());
	FreLanguage.getInstance().addConcept(describeParameter());
	FreLanguage.getInstance().addConcept(describeDocuType());
	FreLanguage.getInstance().addConcept(describeInsurancePartType());
	FreLanguage.getInstance().addConcept(describePercentageType());
	FreLanguage.getInstance().addConcept(describeNumberType());
	FreLanguage.getInstance().addConcept(describeBooleanType());
	FreLanguage.getInstance().addConcept(describeEuroType());
	FreLanguage.getInstance().addConcept(describeTypeRef());
	FreLanguage.getInstance().addConcept(describeInsuranceTheme());
	FreLanguage.getInstance().addConcept(describePremiumDays());
	FreLanguage.getInstance().addInterface(describeNamedType());
	FreLanguage.getInstance().addReferenceCreator((name, type) => {
		return !!name ? FreNodeReference.create(name, type) : null;
	});
	FreLanguage.getInstance().stdLib = InsuranceModelStdlib.getInstance();
}
function describeInsuranceModel() {
	const model = {
		typeName: 'InsuranceModel',
		id: '-default-id-InsuranceModel',
		key: '-default-key-InsuranceModel',
		isNamespace: true,
		language: '-default-key-DocuProject',
		constructor: (id) => {
			return new InsuranceModel(id);
		},
		creator: (data) => {
			return InsuranceModel.create(data);
		},
		properties: new Map()
	};
	model.properties.set('name', {
		name: 'name',
		id: 'TODO_set-correct-id',
		key: 'TODO_set-correct-key',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	model.properties.set('parts', {
		name: 'parts',
		id: '-default-id-InsuranceModel-parts',
		key: '-default-key-InsuranceModel-parts',
		type: 'Part',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	model.properties.set('products', {
		name: 'products',
		id: '-default-id-InsuranceModel-products',
		key: '-default-key-InsuranceModel-products',
		type: 'Product',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return model;
}
function describePart() {
	const modelunit = {
		typeName: 'Part',
		id: '-default-id-Part',
		key: '-default-key-Part',
		isNamedElement: true,
		language: '-default-key-DocuProject',
		fileExtension: 'base',
		subConceptNames: [],
		constructor: (id) => {
			return new Part(id);
		},
		creator: (data) => {
			return Part.create(data);
		},
		properties: new Map(),
		trigger: 'Part'
	};
	modelunit.properties.set('name', {
		name: 'name',
		id: 'TODO_set-correct-id',
		key: 'TODO_set-correct-key',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	modelunit.properties.set('part', {
		name: 'part',
		id: '-default-id-Part-part',
		key: '-default-key-Part-part',
		type: 'BaseProduct',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return modelunit;
}
function describeProduct() {
	const modelunit = {
		typeName: 'Product',
		id: '-default-id-Product',
		key: '-default-key-Product',
		isNamedElement: true,
		language: '-default-key-DocuProject',
		fileExtension: 'prod',
		subConceptNames: [],
		constructor: (id) => {
			return new Product(id);
		},
		creator: (data) => {
			return Product.create(data);
		},
		properties: new Map(),
		trigger: 'Product'
	};
	modelunit.properties.set('name', {
		name: 'name',
		id: 'TODO_set-correct-id',
		key: 'TODO_set-correct-key',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	modelunit.properties.set('product', {
		name: 'product',
		id: '-default-id-Product-product',
		key: '-default-key-Product-product',
		type: 'InsuranceProduct',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return modelunit;
}
function describeDocuExpression() {
	const concept = {
		typeName: 'DocuExpression',
		id: '-default-id-DocuExpression',
		key: '-default-key-DocuExpression',
		isAbstract: true,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'DocuExpression',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: [
			'Literal',
			'EuroLiteral',
			'NumberLiteral',
			'PercentageLiteral',
			'BooleanLiteral',
			'BinaryExpression',
			'PlusExpression',
			'MinusExpression',
			'MultiplyExpression',
			'DivideExpression',
			'FunctionCallExpression',
			'InsurancePartRef',
			'RiskAdjustmentRef',
			'ParameterRef',
			'GenericLiteral'
		]
	};
	return concept;
}
function describeLiteral() {
	const concept = {
		typeName: 'Literal',
		id: '-default-id-Literal',
		key: '-default-key-Literal',
		isAbstract: true,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'Literal',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: ['EuroLiteral', 'NumberLiteral', 'PercentageLiteral', 'BooleanLiteral']
	};
	return concept;
}
function describeEuroLiteral() {
	const concept = {
		typeName: 'EuroLiteral',
		id: '-default-id-EuroLiteral',
		key: '-default-key-EuroLiteral',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'EuroLiteral',
		constructor: (id) => {
			return new EuroLiteral(id);
		},
		creator: (data) => {
			return EuroLiteral.create(data);
		},
		properties: new Map(),
		baseName: 'Literal',
		subConceptNames: []
	};
	concept.properties.set('euros', {
		name: 'euros',
		id: '-default-id-EuroLiteral-euros',
		key: '-default-key-EuroLiteral-euros',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('cents', {
		name: 'cents',
		id: '-default-id-EuroLiteral-cents',
		key: '-default-key-EuroLiteral-cents',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeNumberLiteral() {
	const concept = {
		typeName: 'NumberLiteral',
		id: '-default-id-NumberLiteral',
		key: '-default-key-NumberLiteral',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'NumberLiteral',
		constructor: (id) => {
			return new NumberLiteral(id);
		},
		creator: (data) => {
			return NumberLiteral.create(data);
		},
		properties: new Map(),
		baseName: 'Literal',
		subConceptNames: []
	};
	concept.properties.set('value', {
		name: 'value',
		id: '-default-id-NumberLiteral-value',
		key: '-default-key-NumberLiteral-value',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describePercentageLiteral() {
	const concept = {
		typeName: 'PercentageLiteral',
		id: '-default-id-PercentageLiteral',
		key: '-default-key-PercentageLiteral',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'PercentageLiteral',
		constructor: (id) => {
			return new PercentageLiteral(id);
		},
		creator: (data) => {
			return PercentageLiteral.create(data);
		},
		properties: new Map(),
		baseName: 'Literal',
		subConceptNames: []
	};
	concept.properties.set('value', {
		name: 'value',
		id: '-default-id-PercentageLiteral-value',
		key: '-default-key-PercentageLiteral-value',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeBooleanLiteral() {
	const concept = {
		typeName: 'BooleanLiteral',
		id: '-default-id-BooleanLiteral',
		key: '-default-key-BooleanLiteral',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'BooleanLiteral',
		constructor: (id) => {
			return new BooleanLiteral(id);
		},
		creator: (data) => {
			return BooleanLiteral.create(data);
		},
		properties: new Map(),
		baseName: 'Literal',
		subConceptNames: []
	};
	concept.properties.set('value', {
		name: 'value',
		id: '-default-id-BooleanLiteral-value',
		key: '-default-key-BooleanLiteral-value',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'BinaryExpression',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: ['PlusExpression', 'MinusExpression', 'MultiplyExpression', 'DivideExpression']
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'PlusExpression',
		constructor: (id) => {
			return new PlusExpression(id);
		},
		creator: (data) => {
			return PlusExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return concept;
}
function describeMinusExpression() {
	const concept = {
		typeName: 'MinusExpression',
		id: '-default-id-MinusExpression',
		key: '-default-key-MinusExpression',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'MinusExpression',
		constructor: (id) => {
			return new MinusExpression(id);
		},
		creator: (data) => {
			return MinusExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'MultiplyExpression',
		constructor: (id) => {
			return new MultiplyExpression(id);
		},
		creator: (data) => {
			return MultiplyExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'DivideExpression',
		constructor: (id) => {
			return new DivideExpression(id);
		},
		creator: (data) => {
			return DivideExpression.create(data);
		},
		properties: new Map(),
		baseName: 'BinaryExpression',
		subConceptNames: []
	};
	concept.properties.set('left', {
		name: 'left',
		id: '-default-id-BinaryExpression-left',
		key: '-default-key-BinaryExpression-left',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('right', {
		name: 'right',
		id: '-default-id-BinaryExpression-right',
		key: '-default-key-BinaryExpression-right',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'FunctionCallExpression',
		constructor: (id) => {
			return new FunctionCallExpression(id);
		},
		creator: (data) => {
			return FunctionCallExpression.create(data);
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: []
	};
	concept.properties.set('args', {
		name: 'args',
		id: '-default-id-FunctionCallExpression-args',
		key: '-default-key-FunctionCallExpression-args',
		type: 'DocuExpression',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('funcDefinition', {
		name: 'funcDefinition',
		id: '-default-id-FunctionCallExpression-funcDefinition',
		key: '-default-key-FunctionCallExpression-funcDefinition',
		type: 'CalcFunction',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeInsurancePartRef() {
	const concept = {
		typeName: 'InsurancePartRef',
		id: '-default-id-InsurancePartRef',
		key: '-default-key-InsurancePartRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'InsurancePartRef',
		constructor: (id) => {
			return new InsurancePartRef(id);
		},
		creator: (data) => {
			return InsurancePartRef.create(data);
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: []
	};
	concept.properties.set('part', {
		name: 'part',
		id: '-default-id-InsurancePartRef-part',
		key: '-default-key-InsurancePartRef-part',
		type: 'InsurancePart',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeRiskAdjustmentRef() {
	const concept = {
		typeName: 'RiskAdjustmentRef',
		id: '-default-id-RiskAdjustmentRef',
		key: '-default-key-RiskAdjustmentRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'RiskAdjustmentRef',
		constructor: (id) => {
			return new RiskAdjustmentRef(id);
		},
		creator: (data) => {
			return RiskAdjustmentRef.create(data);
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-RiskAdjustmentRef-name',
		key: '-default-key-RiskAdjustmentRef-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeParameterRef() {
	const concept = {
		typeName: 'ParameterRef',
		id: '-default-id-ParameterRef',
		key: '-default-key-ParameterRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'ParameterRef',
		constructor: (id) => {
			return new ParameterRef(id);
		},
		creator: (data) => {
			return ParameterRef.create(data);
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: []
	};
	concept.properties.set('attribute', {
		name: 'attribute',
		id: '-default-id-ParameterRef-attribute',
		key: '-default-key-ParameterRef-attribute',
		type: 'AttributeRef',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('parameter', {
		name: 'parameter',
		id: '-default-id-ParameterRef-parameter',
		key: '-default-key-ParameterRef-parameter',
		type: 'Parameter',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeAttributeRef() {
	const concept = {
		typeName: 'AttributeRef',
		id: '-default-id-AttributeRef',
		key: '-default-key-AttributeRef',
		isAbstract: true,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'AttributeRef',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: ['RiskRef', 'PayoutRef']
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-AttributeRef-name',
		key: '-default-key-AttributeRef-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeRiskRef() {
	const concept = {
		typeName: 'RiskRef',
		id: '-default-id-RiskRef',
		key: '-default-key-RiskRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'RiskRef',
		constructor: (id) => {
			return new RiskRef(id);
		},
		creator: (data) => {
			return RiskRef.create(data);
		},
		properties: new Map(),
		baseName: 'AttributeRef',
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-RiskRef-name',
		key: '-default-key-RiskRef-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describePayoutRef() {
	const concept = {
		typeName: 'PayoutRef',
		id: '-default-id-PayoutRef',
		key: '-default-key-PayoutRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'PayoutRef',
		constructor: (id) => {
			return new PayoutRef(id);
		},
		creator: (data) => {
			return PayoutRef.create(data);
		},
		properties: new Map(),
		baseName: 'AttributeRef',
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-PayoutRef-name',
		key: '-default-key-PayoutRef-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'Text',
		constructor: (id) => {
			return new Text(id);
		},
		creator: (data) => {
			return Text.create(data);
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'Text2',
		constructor: (id) => {
			return new Text2(id);
		},
		creator: (data) => {
			return Text2.create(data);
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'Text3',
		constructor: (id) => {
			return new Text3(id);
		},
		creator: (data) => {
			return Text3.create(data);
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
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'Text4',
		constructor: (id) => {
			return new Text4(id);
		},
		creator: (data) => {
			return Text4.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	return concept;
}
function describeGenericKind() {
	const concept = {
		typeName: 'GenericKind',
		id: '-default-id-GenericKind',
		key: '-default-key-GenericKind',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['Set', 'Sequence', 'Bag', 'Collection'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'GenericKind',
		constructor: (id) => {
			return new GenericKind(id);
		},
		creator: (data) => {
			return GenericKind.create(data);
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
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeGenericTypeDecl() {
	const concept = {
		typeName: 'GenericTypeDecl',
		id: '-default-id-GenericTypeDecl',
		key: '-default-key-GenericTypeDecl',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'GenericTypeDecl',
		constructor: (id) => {
			return new GenericTypeDecl(id);
		},
		creator: (data) => {
			return GenericTypeDecl.create(data);
		},
		properties: new Map(),
		baseName: 'DocuType',
		subConceptNames: []
	};
	concept.properties.set('baseType', {
		name: 'baseType',
		id: '-default-id-GenericTypeDecl-baseType',
		key: '-default-key-GenericTypeDecl-baseType',
		type: 'DocuType',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('kind', {
		name: 'kind',
		id: '-default-id-GenericTypeDecl-kind',
		key: '-default-key-GenericTypeDecl-kind',
		type: 'GenericKind',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeGenericLiteral() {
	const concept = {
		typeName: 'GenericLiteral',
		id: '-default-id-GenericLiteral',
		key: '-default-key-GenericLiteral',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'GenericLiteral',
		constructor: (id) => {
			return new GenericLiteral(id);
		},
		creator: (data) => {
			return GenericLiteral.create(data);
		},
		properties: new Map(),
		baseName: 'DocuExpression',
		subConceptNames: []
	};
	concept.properties.set('content', {
		name: 'content',
		id: '-default-id-GenericLiteral-content',
		key: '-default-key-GenericLiteral-content',
		type: 'DocuExpression',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('kind', {
		name: 'kind',
		id: '-default-id-GenericLiteral-kind',
		key: '-default-key-GenericLiteral-kind',
		type: 'GenericKind',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
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
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'Entity',
		constructor: (id) => {
			return new Entity(id);
		},
		creator: (data) => {
			return Entity.create(data);
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
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-Entity-name',
		key: '-default-key-Entity-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('baseEntity', {
		name: 'baseEntity',
		id: '-default-id-Entity-baseEntity',
		key: '-default-key-Entity-baseEntity',
		type: 'Entity',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeEntityAttribute() {
	const concept = {
		typeName: 'EntityAttribute',
		id: '-default-id-EntityAttribute',
		key: '-default-key-EntityAttribute',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'EntityAttribute',
		constructor: (id) => {
			return new EntityAttribute(id);
		},
		creator: (data) => {
			return EntityAttribute.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('numVal', {
		name: 'numVal',
		id: '-default-id-EntityAttribute-numVal',
		key: '-default-key-EntityAttribute-numVal',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeBaseProduct() {
	const concept = {
		typeName: 'BaseProduct',
		id: '-default-id-BaseProduct',
		key: '-default-key-BaseProduct',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'BaseProduct',
		constructor: (id) => {
			return new BaseProduct(id);
		},
		creator: (data) => {
			return BaseProduct.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-BaseProduct-name',
		key: '-default-key-BaseProduct-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('isUnderConstruction', {
		name: 'isUnderConstruction',
		id: '-default-id-BaseProduct-isUnderConstruction',
		key: '-default-key-BaseProduct-isUnderConstruction',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('isApprovedLevel1', {
		name: 'isApprovedLevel1',
		id: '-default-id-BaseProduct-isApprovedLevel1',
		key: '-default-key-BaseProduct-isApprovedLevel1',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('isApprovedLevel2', {
		name: 'isApprovedLevel2',
		id: '-default-id-BaseProduct-isApprovedLevel2',
		key: '-default-key-BaseProduct-isApprovedLevel2',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('isApprovedLevel3', {
		name: 'isApprovedLevel3',
		id: '-default-id-BaseProduct-isApprovedLevel3',
		key: '-default-key-BaseProduct-isApprovedLevel3',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('yieldsProfit', {
		name: 'yieldsProfit',
		id: '-default-id-BaseProduct-yieldsProfit',
		key: '-default-key-BaseProduct-yieldsProfit',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('range', {
		name: 'range',
		id: '-default-id-BaseProduct-range',
		key: '-default-key-BaseProduct-range',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('nrOfUse', {
		name: 'nrOfUse',
		id: '-default-id-BaseProduct-nrOfUse',
		key: '-default-key-BaseProduct-nrOfUse',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('date', {
		name: 'date',
		id: '-default-id-BaseProduct-date',
		key: '-default-key-BaseProduct-date',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('parts', {
		name: 'parts',
		id: '-default-id-BaseProduct-parts',
		key: '-default-key-BaseProduct-parts',
		type: 'InsurancePart',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('theme', {
		name: 'theme',
		id: '-default-id-BaseProduct-theme',
		key: '-default-key-BaseProduct-theme',
		type: 'InsuranceTheme',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeInsurancePart() {
	const concept = {
		typeName: 'InsurancePart',
		id: '-default-id-InsurancePart',
		key: '-default-key-InsurancePart',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'InsurancePart',
		constructor: (id) => {
			return new InsurancePart(id);
		},
		creator: (data) => {
			return InsurancePart.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-InsurancePart-name',
		key: '-default-key-InsurancePart-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('isApproved', {
		name: 'isApproved',
		id: '-default-id-InsurancePart-isApproved',
		key: '-default-key-InsurancePart-isApproved',
		type: 'boolean',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('statisticalRisk', {
		name: 'statisticalRisk',
		id: '-default-id-InsurancePart-statisticalRisk',
		key: '-default-key-InsurancePart-statisticalRisk',
		type: 'PercentageLiteral',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('maximumPayOut', {
		name: 'maximumPayOut',
		id: '-default-id-InsurancePart-maximumPayOut',
		key: '-default-key-InsurancePart-maximumPayOut',
		type: 'EuroLiteral',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return concept;
}
function describeInsuranceProduct() {
	const concept = {
		typeName: 'InsuranceProduct',
		id: '-default-id-InsuranceProduct',
		key: '-default-key-InsuranceProduct',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'InsuranceProduct',
		constructor: (id) => {
			return new InsuranceProduct(id);
		},
		creator: (data) => {
			return InsuranceProduct.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-InsuranceProduct-name',
		key: '-default-key-InsuranceProduct-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('productName', {
		name: 'productName',
		id: '-default-id-InsuranceProduct-productName',
		key: '-default-key-InsuranceProduct-productName',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('advertisedPremium', {
		name: 'advertisedPremium',
		id: '-default-id-InsuranceProduct-advertisedPremium',
		key: '-default-key-InsuranceProduct-advertisedPremium',
		type: 'EuroLiteral',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('riskAdjustment', {
		name: 'riskAdjustment',
		id: '-default-id-InsuranceProduct-riskAdjustment',
		key: '-default-key-InsuranceProduct-riskAdjustment',
		type: 'PercentageLiteral',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('calculation', {
		name: 'calculation',
		id: '-default-id-InsuranceProduct-calculation',
		key: '-default-key-InsuranceProduct-calculation',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('helpers', {
		name: 'helpers',
		id: '-default-id-InsuranceProduct-helpers',
		key: '-default-key-InsuranceProduct-helpers',
		type: 'CalcFunction',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('themes', {
		name: 'themes',
		id: '-default-id-InsuranceProduct-themes',
		key: '-default-key-InsuranceProduct-themes',
		type: 'InsuranceTheme',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	concept.properties.set('nrPremiumDays', {
		name: 'nrPremiumDays',
		id: '-default-id-InsuranceProduct-nrPremiumDays',
		key: '-default-key-InsuranceProduct-nrPremiumDays',
		type: 'PremiumDays',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	concept.properties.set('parts', {
		name: 'parts',
		id: '-default-id-InsuranceProduct-parts',
		key: '-default-key-InsuranceProduct-parts',
		type: 'InsurancePart',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	concept.properties.set('basedOn', {
		name: 'basedOn',
		id: '-default-id-InsuranceProduct-basedOn',
		key: '-default-key-InsuranceProduct-basedOn',
		type: 'BaseProduct',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeCalcFunction() {
	const concept = {
		typeName: 'CalcFunction',
		id: '-default-id-CalcFunction',
		key: '-default-key-CalcFunction',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'CalcFunction',
		constructor: (id) => {
			return new CalcFunction(id);
		},
		creator: (data) => {
			return CalcFunction.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-CalcFunction-name',
		key: '-default-key-CalcFunction-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('description', {
		name: 'description',
		id: '-default-id-CalcFunction-description',
		key: '-default-key-CalcFunction-description',
		type: 'Description',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('declaredType', {
		name: 'declaredType',
		id: '-default-id-CalcFunction-declaredType',
		key: '-default-key-CalcFunction-declaredType',
		type: 'DocuType',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('body', {
		name: 'body',
		id: '-default-id-CalcFunction-body',
		key: '-default-key-CalcFunction-body',
		type: 'DocuExpression',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	concept.properties.set('parameters', {
		name: 'parameters',
		id: '-default-id-CalcFunction-parameters',
		key: '-default-key-CalcFunction-parameters',
		type: 'Parameter',
		isList: true,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return concept;
}
function describeDescription() {
	const concept = {
		typeName: 'Description',
		id: '-default-id-Description',
		key: '-default-key-Description',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'Description',
		constructor: (id) => {
			return new Description(id);
		},
		creator: (data) => {
			return Description.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('content', {
		name: 'content',
		id: '-default-id-Description-content',
		key: '-default-key-Description-content',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeParameter() {
	const concept = {
		typeName: 'Parameter',
		id: '-default-id-Parameter',
		key: '-default-key-Parameter',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'Parameter',
		constructor: (id) => {
			return new Parameter(id);
		},
		creator: (data) => {
			return Parameter.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-Parameter-name',
		key: '-default-key-Parameter-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('declaredType', {
		name: 'declaredType',
		id: '-default-id-Parameter-declaredType',
		key: '-default-key-Parameter-declaredType',
		type: 'DocuType',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'part'
	});
	return concept;
}
function describeDocuType() {
	const concept = {
		typeName: 'DocuType',
		id: '-default-id-DocuType',
		key: '-default-key-DocuType',
		isAbstract: true,
		isPublic: false,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'DocuType',
		constructor: (id) => {
			return null;
		},
		creator: (data) => {
			return null;
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: ['GenericTypeDecl', 'TypeRef']
	};
	return concept;
}
function describeInsurancePartType() {
	const concept = {
		typeName: 'InsurancePartType',
		id: '-default-id-InsurancePartType',
		key: '-default-key-InsurancePartType',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['InsurancePart'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'InsurancePartType',
		constructor: (id) => {
			return new InsurancePartType(id);
		},
		creator: (data) => {
			return InsurancePartType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-NamedType-name',
		key: '-default-key-NamedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describePercentageType() {
	const concept = {
		typeName: 'PercentageType',
		id: '-default-id-PercentageType',
		key: '-default-key-PercentageType',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['Percentage'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'PercentageType',
		constructor: (id) => {
			return new PercentageType(id);
		},
		creator: (data) => {
			return PercentageType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-NamedType-name',
		key: '-default-key-NamedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeNumberType() {
	const concept = {
		typeName: 'NumberType',
		id: '-default-id-NumberType',
		key: '-default-key-NumberType',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['Number'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'NumberType',
		constructor: (id) => {
			return new NumberType(id);
		},
		creator: (data) => {
			return NumberType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-NamedType-name',
		key: '-default-key-NamedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeBooleanType() {
	const concept = {
		typeName: 'BooleanType',
		id: '-default-id-BooleanType',
		key: '-default-key-BooleanType',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['Boolean'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'BooleanType',
		constructor: (id) => {
			return new BooleanType(id);
		},
		creator: (data) => {
			return BooleanType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-NamedType-name',
		key: '-default-key-NamedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeEuroType() {
	const concept = {
		typeName: 'EuroType',
		id: '-default-id-EuroType',
		key: '-default-key-EuroType',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['EUR'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'EuroType',
		constructor: (id) => {
			return new EuroType(id);
		},
		creator: (data) => {
			return EuroType.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-NamedType-name',
		key: '-default-key-NamedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeTypeRef() {
	const concept = {
		typeName: 'TypeRef',
		id: '-default-id-TypeRef',
		key: '-default-key-TypeRef',
		isAbstract: false,
		isPublic: true,
		isLimited: false,
		instanceNames: [],
		language: '-default-key-DocuProject',
		isNamedElement: false,
		trigger: 'TypeRef',
		constructor: (id) => {
			return new TypeRef(id);
		},
		creator: (data) => {
			return TypeRef.create(data);
		},
		properties: new Map(),
		baseName: 'DocuType',
		subConceptNames: []
	};
	concept.properties.set('type', {
		name: 'type',
		id: '-default-id-TypeRef-type',
		key: '-default-key-TypeRef-type',
		type: 'NamedType',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'reference'
	});
	return concept;
}
function describeInsuranceTheme() {
	const concept = {
		typeName: 'InsuranceTheme',
		id: '-default-id-InsuranceTheme',
		key: '-default-key-InsuranceTheme',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['HomeTheme', 'HealthTheme', 'LegalTheme'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'InsuranceTheme',
		constructor: (id) => {
			return new InsuranceTheme(id);
		},
		creator: (data) => {
			return InsuranceTheme.create(data);
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
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describePremiumDays() {
	const concept = {
		typeName: 'PremiumDays',
		id: '-default-id-PremiumDays',
		key: '-default-key-PremiumDays',
		isAbstract: false,
		isPublic: true,
		isLimited: true,
		instanceNames: ['Week', 'Month', 'Quarter', 'Semester', 'Year'],
		language: '-default-key-DocuProject',
		isNamedElement: true,
		trigger: 'PremiumDays',
		constructor: (id) => {
			return new PremiumDays(id);
		},
		creator: (data) => {
			return PremiumDays.create(data);
		},
		properties: new Map(),
		baseName: null,
		subConceptNames: []
	};
	concept.properties.set('name', {
		name: 'name',
		id: '-default-id-PremiumDays-name',
		key: '-default-key-PremiumDays-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	concept.properties.set('nrOfDays', {
		name: 'nrOfDays',
		id: '-default-id-PremiumDays-nrOfDays',
		key: '-default-key-PremiumDays-nrOfDays',
		type: 'number',
		isList: false,
		isPublic: true,
		language: '-default-key-DocuProject',
		propertyKind: 'primitive'
	});
	return concept;
}
function describeNamedType() {
	const intface = {
		typeName: 'NamedType',
		id: '-default-id-NamedType',
		key: '-default-key-NamedType',
		isPublic: true,
		isNamedElement: true,
		properties: new Map(),
		constructor: undefined,
		creator: undefined,
		language: 'DocuProject',
		subConceptNames: ['InsurancePartType', 'PercentageType', 'NumberType', 'BooleanType', 'EuroType']
	};
	intface.properties.set('name', {
		name: 'name',
		id: '-default-id-NamedType-name',
		key: '-default-key-NamedType-name',
		type: 'string',
		isList: false,
		isPublic: true,
		language: 'DocuProject',
		propertyKind: 'primitive'
	});
	return intface;
}

const BINARY_EXPRESSION_CREATORS = [
	FreCreateBinaryExpressionAction.create({
		trigger: '+',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new PlusExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: '-',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new MinusExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: '*',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new MultiplyExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	}),
	FreCreateBinaryExpressionAction.create({
		trigger: '/',
		activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
		expressionBuilder: (box, trigger, editor) => {
			const parent = box.node;
			const newExpression = new DivideExpression();
			parent[box.propertyName] = newExpression;
			return newExpression;
		}
	})
];
const CUSTOM_ACTIONS = [
	FreCustomAction.create({
		trigger: '.',
		activeInBoxRoles: ['optional-attribute'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'ParameterRef-attribute'
	}),
	FreCustomAction.create({
		trigger: 'Risk adjusted by =',
		activeInBoxRoles: ['optional-riskAdjustment'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'InsuranceProduct-riskAdjustment'
	}),
	FreCustomAction.create({
		trigger: 'Helper functions:',
		activeInBoxRoles: ['optional-helpers'],
		action: (box, trigger, ed) => {
			box.parent.mustShow = true;
			return box.node;
		},
		boxRoleToSelect: 'InsuranceProduct-helpers'
	}),
	FreCustomAction.create({
		activeInBoxRoles: ['themes'],
		trigger: 'themes',
		action: (box, trigger, ed) => {
			const parent = box.node;
			const newBase = FreNodeReference.create('', null);
			parent.themes.push(newBase);
			return newBase.referred;
		}
	}),
	FreCustomAction.create({
		activeInBoxRoles: ['parts'],
		trigger: 'InsurancePart',
		action: (box, trigger, ed) => {
			const parent = box.node;
			const newBase = FreNodeReference.create('', null);
			parent.parts.push(newBase);
			return newBase.referred;
		}
	}),
	FreCustomAction.create({
		activeInBoxRoles: ['basedOn'],
		trigger: 'BaseProduct',
		action: (box, trigger, ed) => {
			const parent = box.node;
			const newBase = FreNodeReference.create('', null);
			parent.basedOn.push(newBase);
			return newBase.referred;
		}
	})
];

class InsuranceModelActions {
	constructor() {
		this.binaryExpressionActions = ActionsUtil.join(BINARY_EXPRESSION_CREATORS, MANUAL_BINARY_EXPRESSION_ACTIONS);
		this.customActions = ActionsUtil.join(CUSTOM_ACTIONS, MANUAL_CUSTOM_ACTIONS);
	}
}

class EuroLiteralBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'EuroLiteral';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			[
				BoxFactory.horizontalLayout(
					this._node,
					'EuroLiteral-hlist-line-0',
					'',
					[
						BoxUtil.labelBox(this._node, 'EUR', 'top-1-line-0-item-0'),
						BoxUtil.numberBox(this._node, 'euros', NumberDisplay.SELECT),
						BoxUtil.labelBox(this._node, ',', 'top-1-line-0-item-2'),
						BoxUtil.numberBox(this._node, 'cents', NumberDisplay.SELECT)
					],
					{ selectable: false }
				)
			],
			{ selectable: false }
		);
	}
}

class NumberLiteralBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'NumberLiteral';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(this._node, [BoxUtil.numberBox(this._node, 'value', NumberDisplay.SELECT)], { selectable: false });
	}
}

class PercentageLiteralBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'PercentageLiteral';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			[
				BoxFactory.horizontalLayout(
					this._node,
					'PercentageLiteral-hlist-line-0',
					'',
					[BoxUtil.numberBox(this._node, 'value', NumberDisplay.SELECT), BoxUtil.labelBox(this._node, '%', 'top-1-line-0-item-1')],
					{ selectable: false }
				)
			],
			{ selectable: false }
		);
	}
}

class BooleanLiteralBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'BooleanLiteral';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(this._node, [BoxUtil.booleanBox(this._node, 'value', { yes: 'YES', no: 'NO' }, BoolDisplay.SELECT)], {
			selectable: false
		});
	}
}

class PlusExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'PlusExpression';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultBinaryBox(this._node, '+', InsuranceModelEnvironment.getInstance().editor, this.mainHandler);
	}
	getBrackets() {
		const binBox = this.getDefault();
		if (!!this._node.freOwnerDescriptor().owner && isFreBinaryExpression(this._node.freOwnerDescriptor().owner)) {
			return BoxFactory.horizontalLayout(this._node, 'brackets', '', [
				BoxUtil.labelBox(this._node, '(', 'bracket-open', { selectable: true }),
				binBox,
				BoxUtil.labelBox(this._node, ')', 'bracket-close', { selectable: true })
			]);
		} else {
			return binBox;
		}
	}
}

class MinusExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'MinusExpression';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultBinaryBox(this._node, '-', InsuranceModelEnvironment.getInstance().editor, this.mainHandler);
	}
	getBrackets() {
		const binBox = this.getDefault();
		if (!!this._node.freOwnerDescriptor().owner && isFreBinaryExpression(this._node.freOwnerDescriptor().owner)) {
			return BoxFactory.horizontalLayout(this._node, 'brackets', '', [
				BoxUtil.labelBox(this._node, '(', 'bracket-open', { selectable: true }),
				binBox,
				BoxUtil.labelBox(this._node, ')', 'bracket-close', { selectable: true })
			]);
		} else {
			return binBox;
		}
	}
}

class MultiplyExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'MultiplyExpression';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultBinaryBox(this._node, '*', InsuranceModelEnvironment.getInstance().editor, this.mainHandler);
	}
	getBrackets() {
		const binBox = this.getDefault();
		if (!!this._node.freOwnerDescriptor().owner && isFreBinaryExpression(this._node.freOwnerDescriptor().owner)) {
			return BoxFactory.horizontalLayout(this._node, 'brackets', '', [
				BoxUtil.labelBox(this._node, '(', 'bracket-open', { selectable: true }),
				binBox,
				BoxUtil.labelBox(this._node, ')', 'bracket-close', { selectable: true })
			]);
		} else {
			return binBox;
		}
	}
}

class DivideExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'DivideExpression';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultBinaryBox(this._node, '/', InsuranceModelEnvironment.getInstance().editor, this.mainHandler);
	}
	getBrackets() {
		const binBox = this.getDefault();
		if (!!this._node.freOwnerDescriptor().owner && isFreBinaryExpression(this._node.freOwnerDescriptor().owner)) {
			return BoxFactory.horizontalLayout(this._node, 'brackets', '', [
				BoxUtil.labelBox(this._node, '(', 'bracket-open', { selectable: true }),
				binBox,
				BoxUtil.labelBox(this._node, ')', 'bracket-close', { selectable: true })
			]);
		} else {
			return binBox;
		}
	}
}

class FunctionCallExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'FunctionCallExpression';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			[
				BoxFactory.horizontalLayout(
					this._node,
					'FunctionCallExpression-hlist-line-0',
					'',
					[
						BoxUtil.referenceBox(
							this._node,
							'funcDefinition',
							(selected) => {
								this._node.funcDefinition = FreNodeReference.create(selected, 'CalcFunction');
							},
							InsuranceModelEnvironment.getInstance().scoper
						),
						BoxUtil.labelBox(this._node, '(', 'top-1-line-0-item-1'),
						BoxUtil.horizontalPartListBox(this._node, this._node.args, 'args', { text: ',', type: 'Separator' }, this.mainHandler),
						BoxUtil.labelBox(this._node, ')', 'top-1-line-0-item-3')
					],
					{ selectable: false }
				)
			],
			{ selectable: false }
		);
	}
}

class InsurancePartRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'InsurancePartRef';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			[
				BoxUtil.referenceBox(
					this._node,
					'part',
					(selected) => {
						this._node.part = FreNodeReference.create(selected, 'InsurancePart');
					},
					InsuranceModelEnvironment.getInstance().scoper
				)
			],
			{ selectable: false }
		);
	}
}

class RiskAdjustmentRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'RiskAdjustmentRef';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(this._node, [BoxUtil.labelBox(this._node, 'riskAdjustment', 'top-1-line-0-item-0')], {
			selectable: false
		});
	}
}

class ParameterRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'ParameterRef';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			[
				BoxFactory.horizontalLayout(
					this._node,
					'ParameterRef-hlist-line-0',
					'',
					[
						BoxUtil.referenceBox(
							this._node,
							'parameter',
							(selected) => {
								this._node.parameter = FreNodeReference.create(selected, 'Parameter');
							},
							InsuranceModelEnvironment.getInstance().scoper
						),
						BoxFactory.optional2(
							this._node,
							'optional-attribute',
							() => !!this._node.attribute,
							BoxFactory.horizontalLayout(
								this._node,
								'ParameterRef-optional-attribute-hlist-line-0',
								'',
								[
									BoxUtil.labelBox(this._node, '.', 'top-2-line-0-item-0'),
									BoxUtil.getBoxOrAction(this._node, 'attribute', 'AttributeRef', this.mainHandler)
								],
								{ selectable: false }
							),
							false,
							BoxFactory.action(this._node, 'optional-attribute', '.')
						)
					],
					{ selectable: false }
				)
			],
			{ selectable: false }
		);
	}
}

class RiskRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'RiskRef';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxUtil.labelBox(this._node, 'statisticalRisk', 'top-1-line-0-item-0');
	}
}

class PayoutRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'PayoutRef';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxUtil.labelBox(this._node, 'maximumPayOut', 'top-1-line-0-item-0');
	}
}

class TextBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Text';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Text-overall', '', [
			BoxUtil.labelBox(this._node, 'This is', 'top-1-line-0-item-0'),
			BoxUtil.indentBox(this._node, 8, '1', BoxUtil.labelBox(this._node, 'literal text', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(this._node, 6, '2', BoxUtil.labelBox(this._node, 'that is projected in the', 'top-1-line-2-item-0')),
			BoxUtil.indentBox(this._node, 16, '3', BoxUtil.labelBox(this._node, 'editor', 'top-1-line-3-item-0')),
			BoxUtil.indentBox(this._node, 2, '4', BoxUtil.labelBox(this._node, 'for every concept of type Text.', 'top-1-line-4-item-0'))
		]);
	}
}

class Text2BoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Text2';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Text2-overall', '', [
			BoxUtil.labelBox(this._node, 'This is', 'top-1-line-0-item-0'),
			BoxUtil.indentBox(this._node, 8, '1', BoxUtil.labelBox(this._node, 'literal text', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(this._node, 6, '2', BoxUtil.labelBox(this._node, 'that is projected in the', 'top-1-line-2-item-0')),
			BoxUtil.emptyLineBox(this._node, 'Text2-empty-line-3'),
			BoxUtil.indentBox(this._node, 16, '4', BoxUtil.labelBox(this._node, 'editor', 'top-1-line-4-item-0')),
			BoxUtil.indentBox(this._node, 2, '5', BoxUtil.labelBox(this._node, 'for every concept of type Text.', 'top-1-line-5-item-0'))
		]);
	}
}

class Text3BoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Text3';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Text3-overall', '', [
			BoxUtil.indentBox(this._node, 10, '0', BoxUtil.labelBox(this._node, 'This is', 'top-1-line-0-item-0')),
			BoxUtil.indentBox(this._node, 8, '1', BoxUtil.labelBox(this._node, 'literal text', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(this._node, 3, '2', BoxUtil.labelBox(this._node, 'that is projected in the', 'top-1-line-2-item-0')),
			BoxUtil.indentBox(this._node, 11, '3', BoxUtil.labelBox(this._node, 'editor', 'top-1-line-3-item-0')),
			BoxUtil.labelBox(this._node, 'for every concept of type Text.', 'top-1-line-4-item-0')
		]);
	}
}

class Text4BoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Text4';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Text4-overall', '', [
			BoxUtil.indentBox(this._node, 10, '0', BoxUtil.labelBox(this._node, 'This is', 'top-1-line-0-item-0')),
			BoxUtil.indentBox(this._node, 8, '1', BoxUtil.labelBox(this._node, 'literal text', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(this._node, 3, '2', BoxUtil.labelBox(this._node, 'that is projected in the', 'top-1-line-2-item-0')),
			BoxUtil.indentBox(this._node, 11, '3', BoxUtil.labelBox(this._node, 'editor', 'top-1-line-3-item-0')),
			BoxUtil.labelBox(this._node, 'for every concept of type Text.', 'top-1-line-4-item-0')
		]);
	}
}

class GenericTypeDeclBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'GenericTypeDecl';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.horizontalLayout(
			this._node,
			'GenericTypeDecl-hlist-line-0',
			'',
			[
				BoxUtil.limitedBox(
					this._node,
					'kind',
					(selected) => {
						this._node.kind = FreNodeReference.create(selected, 'GenericKind');
					},
					LimitedDisplay.SELECT,
					InsuranceModelEnvironment.getInstance().scoper
				),
				BoxUtil.labelBox(this._node, '<', 'top-1-line-0-item-1'),
				BoxUtil.getBoxOrAction(this._node, 'baseType', 'DocuType', this.mainHandler),
				BoxUtil.labelBox(this._node, '>', 'top-1-line-0-item-3')
			],
			{ selectable: false }
		);
	}
}

class GenericLiteralBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'GenericLiteral';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			[
				BoxFactory.horizontalLayout(
					this._node,
					'GenericLiteral-hlist-line-0',
					'',
					[
						BoxUtil.limitedBox(
							this._node,
							'kind',
							(selected) => {
								this._node.kind = FreNodeReference.create(selected, 'GenericKind');
							},
							LimitedDisplay.SELECT,
							InsuranceModelEnvironment.getInstance().scoper
						),
						BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1'),
						BoxUtil.horizontalPartListBox(this._node, this._node.content, 'content', { text: ',', type: 'Separator' }, this.mainHandler),
						BoxUtil.labelBox(this._node, '}', 'top-1-line-0-item-3')
					],
					{ selectable: false }
				)
			],
			{ selectable: false }
		);
	}
}

class EntityBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'specials'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Entity';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'specials') {
				return this.getSpecials();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.horizontalLayout(
			this._node,
			'Entity-hlist-line-0',
			'',
			[
				BoxUtil.booleanBox(this._node, 'isCompany', { yes: 'COMPANY', no: 'undefined' }, BoolDisplay.INNER_SWITCH),
				BoxUtil.textBox(this._node, 'name')
			],
			{ selectable: false }
		);
	}
	getSpecials() {
		return BoxFactory.horizontalLayout(
			this._node,
			'Entity-hlist-line-0',
			'',
			[
				BoxUtil.booleanBox(this._node, 'isCompany', { yes: 'COMPANY', no: 'PERSON' }, BoolDisplay.INNER_SWITCH),
				BoxUtil.textBox(this._node, 'name')
			],
			{ selectable: false }
		);
	}
}

class EntityAttributeBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'EntityAttribute';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'EntityAttribute-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'EntityAttribute-hlist-line-0',
				'',
				[BoxUtil.labelBox(this._node, 'EntityAttribute', 'top-1-line-0-item-0'), BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'1',
				BoxFactory.horizontalLayout(
					this._node,
					'EntityAttribute-hlist-line-1',
					'',
					[BoxUtil.labelBox(this._node, 'numVal', 'top-1-line-1-item-0'), BoxUtil.numberBox(this._node, 'numVal', NumberDisplay.SELECT)],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-2-item-0')
		]);
	}
}

class BaseProductBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments', 'specials', 'tables'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'BaseProduct';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			} else if (projectionName === 'specials') {
				return this.getSpecials();
			} else if (projectionName === 'tables') {
				return this.getTables();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'BaseProduct-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'BaseProduct-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'Base Products', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, 'for', 'top-1-line-0-item-2'),
					BoxUtil.limitedBox(
						this._node,
						'theme',
						(selected) => {
							this._node.theme = FreNodeReference.create(selected, 'InsuranceTheme');
						},
						LimitedDisplay.SELECT,
						InsuranceModelEnvironment.getInstance().scoper
					)
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'1',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, 'is still under construction:', 'top-1-line-1-item-0'),
						BoxUtil.booleanBox(this._node, 'isUnderConstruction', { yes: 'YES', no: 'NO' }, BoolDisplay.SWITCH)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'is approved level1:', 'top-1-line-2-item-0'),
						BoxUtil.booleanBox(this._node, 'isApprovedLevel1', { yes: 'Sure', no: 'NoWay' }, BoolDisplay.RADIO_BUTTON)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'3',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-3',
					'',
					[
						BoxUtil.labelBox(this._node, 'is approved level2:', 'top-1-line-3-item-0'),
						BoxUtil.booleanBox(this._node, 'isApprovedLevel2', { yes: 'YES', no: 'NO' }, BoolDisplay.INNER_SWITCH)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'4',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-4',
					'',
					[
						BoxUtil.labelBox(this._node, 'is approved level3:', 'top-1-line-4-item-0'),
						BoxUtil.booleanBox(this._node, 'isApprovedLevel3', { yes: 'YES', no: 'NO' }, BoolDisplay.CHECKBOX)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'5',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-5',
					'',
					[
						BoxUtil.labelBox(this._node, 'yields profit:', 'top-1-line-5-item-0'),
						BoxUtil.booleanBox(this._node, 'yieldsProfit', { yes: 'Plenty', no: 'Little' }, BoolDisplay.SELECT)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'6',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-6',
					'',
					[
						BoxUtil.labelBox(this._node, 'expected nr of use:', 'top-1-line-6-item-0'),
						BoxUtil.numberBox(this._node, 'nrOfUse', NumberDisplay.SELECT)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'7',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-7',
					'',
					[BoxUtil.labelBox(this._node, 'range:', 'top-1-line-7-item-0'), BoxUtil.numberBox(this._node, 'range', NumberDisplay.SLIDER)],
					{ selectable: false }
				)
			),
			BoxUtil.emptyLineBox(this._node, 'BaseProduct-empty-line-8'),
			BoxUtil.emptyLineBox(this._node, 'BaseProduct-empty-line-9'),
			BoxUtil.indentBox(this._node, 4, '10', BoxUtil.verticalPartListBox(this._node, this._node.parts, 'parts', null, this.mainHandler))
		]);
	}
	getComments() {
		return BoxFactory.verticalLayout(this._node, 'BaseProduct-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'BaseProduct-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'Base Products', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, 'for', 'top-1-line-0-item-2'),
					BoxUtil.limitedBox(
						this._node,
						'theme',
						(selected) => {
							this._node.theme = FreNodeReference.create(selected, 'InsuranceTheme');
						},
						LimitedDisplay.SELECT,
						InsuranceModelEnvironment.getInstance().scoper
					)
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(this._node, 4, '1', BoxUtil.verticalPartListBox(this._node, this._node.parts, 'parts', null, this.mainHandler))
		]);
	}
	getSpecials() {
		return BoxFactory.verticalLayout(this._node, 'BaseProduct-overall', '', [
			BoxUtil.labelBox(
				this._node,
				"/* In this projection 'self.parts' is always shown according to the projection */",
				'top-1-line-0-item-0'
			),
			BoxUtil.labelBox(
				this._node,
				"/* defined for concept InsurancePart in the editor 'comments'.                 */",
				'top-1-line-1-item-0'
			),
			BoxFactory.horizontalLayout(
				this._node,
				'BaseProduct-hlist-line-2',
				'',
				[
					BoxUtil.labelBox(this._node, 'Base Product for', 'top-1-line-2-item-0'),
					BoxUtil.limitedBox(
						this._node,
						'theme',
						(selected) => {
							this._node.theme = FreNodeReference.create(selected, 'InsuranceTheme');
						},
						LimitedDisplay.RADIO_BUTTON
					),
					BoxUtil.stringWrapperBox(this._node, 'name', 'SMUI_Dialog', BoxUtil.textBox(this._node, 'name'), {
						params: [{ key: 'buttonLabel', value: 'Change Product Name' }]
					})
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'3',
				BoxFactory.horizontalLayout(
					this._node,
					'BaseProduct-hlist-line-3',
					'',
					[this.getFragmentBox_First(), this.getFragmentBox_Second()],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'4',
				BoxUtil.externalPartListBox(this._node, this._node.parts, 'parts', 'SMUI_Accordion', this.mainHandler, {
					params: [{ key: 'multi', value: 'multiple' }]
				})
			)
		]);
	}
	getTables() {
		return BoxFactory.verticalLayout(this._node, 'BaseProduct-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'BaseProduct-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'Base Products', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, 'for', 'top-1-line-0-item-2'),
					BoxUtil.limitedBox(
						this._node,
						'theme',
						(selected) => {
							this._node.theme = FreNodeReference.create(selected, 'InsuranceTheme');
						},
						LimitedDisplay.SELECT,
						InsuranceModelEnvironment.getInstance().scoper
					)
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(this._node, 4, '1', TableUtil.tableBoxRowOriented(this._node, this._node.parts, 'parts', this.mainHandler))
		]);
	}
	getFragmentBox_First() {
		return new FragmentBox(
			this._node,
			'BaseProduct-fragment-First',
			BoxFactory.verticalLayout(this._node, 'BaseProduct-fragment-First-overall', '', [
				BoxUtil.labelBox(this._node, 'First Card', 'top-1-line-0-item-0'),
				BoxUtil.indentBox(
					this._node,
					4,
					'1',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-First-hlist-line-1',
						'',
						[
							BoxUtil.labelBox(this._node, 'is still under construction:', 'top-1-line-1-item-0'),
							BoxUtil.booleanBox(this._node, 'isUnderConstruction', { yes: 'YES', no: 'NO' }, BoolDisplay.SWITCH)
						],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'2',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-First-hlist-line-2',
						'',
						[
							BoxUtil.labelBox(this._node, 'is approved level1:', 'top-1-line-2-item-0'),
							BoxUtil.booleanBox(this._node, 'isApprovedLevel1', { yes: 'YES', no: 'NO' }, BoolDisplay.RADIO_BUTTON)
						],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'3',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-First-hlist-line-3',
						'',
						[
							BoxUtil.labelBox(this._node, 'is approved level2:', 'top-1-line-3-item-0'),
							BoxUtil.booleanBox(this._node, 'isApprovedLevel2', { yes: 'YES', no: 'NO' }, BoolDisplay.INNER_SWITCH)
						],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'4',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-First-hlist-line-4',
						'',
						[
							BoxUtil.labelBox(this._node, 'is approved level3:', 'top-1-line-4-item-0'),
							BoxUtil.booleanBox(this._node, 'isApprovedLevel3', { yes: 'YES', no: 'NO' }, BoolDisplay.CHECKBOX)
						],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'5',
					new ExternalSimpleBox('AnimatedGif', this._node, 'BaseProduct-fragment-First-simple-external-AnimatedGif', {
						params: [{ key: 'number', value: '1' }]
					})
				)
			])
		);
	}
	getFragmentBox_Second() {
		return new FragmentBox(
			this._node,
			'BaseProduct-fragment-Second',
			BoxFactory.verticalLayout(this._node, 'BaseProduct-fragment-Second-overall', '', [
				BoxUtil.labelBox(this._node, 'Second Card', 'top-1-line-0-item-0'),
				BoxUtil.indentBox(this._node, 4, '1', BoxUtil.buttonBox(this._node, "Don't push me!", 'MyButton-role')),
				BoxUtil.indentBox(
					this._node,
					4,
					'2',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-Second-hlist-line-2',
						'',
						[
							BoxUtil.labelBox(this._node, 'yields profit:', 'top-1-line-2-item-0'),
							BoxUtil.booleanBox(this._node, 'yieldsProfit', { yes: 'YES', no: 'NO' }, BoolDisplay.INNER_SWITCH)
						],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'3',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-Second-hlist-line-3',
						'',
						[
							BoxUtil.labelBox(this._node, 'expected nr of use:', 'top-1-line-3-item-0'),
							BoxUtil.numberBox(this._node, 'nrOfUse', NumberDisplay.SLIDER)
						],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'4',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-Second-hlist-line-4',
						'',
						[BoxUtil.labelBox(this._node, 'range:', 'top-1-line-4-item-0'), BoxUtil.numberBox(this._node, 'range', NumberDisplay.SELECT)],
						{ selectable: false }
					)
				),
				BoxUtil.indentBox(
					this._node,
					4,
					'5',
					BoxFactory.horizontalLayout(
						this._node,
						'BaseProduct-fragment-Second-hlist-line-5',
						'',
						[
							BoxUtil.labelBox(this._node, 'date:', 'top-1-line-5-item-0'),
							BoxUtil.externalStringBox(this._node, 'date', 'DatePicker', {
								params: [{ key: 'startDate', value: '24/02/2024' }]
							})
						],
						{ selectable: false }
					)
				)
			])
		);
	}
}

class InsurancePartBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments'];
		this.knownTableProjections = ['tableRowFor_tables'];
		this.conceptName = 'InsurancePart';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			} else if (projectionName === 'tableRowFor_tables') {
				return this.getTableRowFor_tables();
			}
		}
		return this.getDefault();
	}
	getTableRowFor_tables() {
		const cells = [];
		cells.push(BoxUtil.textBox(this._node, 'name'));
		cells.push(BoxUtil.getBoxOrAction(this._node, 'statisticalRisk', 'PercentageLiteral', this.mainHandler));
		cells.push(BoxUtil.getBoxOrAction(this._node, 'maximumPayOut', 'EuroLiteral', this.mainHandler));
		cells.push(BoxUtil.booleanBox(this._node, 'isApproved', { yes: 'YES', no: 'NO' }, BoolDisplay.INNER_SWITCH));
		cells.push(BoxUtil.buttonBox(this._node, '', 'MyTableButton-role'));
		return TableUtil.rowBox(
			this._node,
			this._node.freOwnerDescriptor().propertyName,
			'InsurancePart',
			cells,
			this._node.freOwnerDescriptor().propertyIndex,
			true
		);
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'InsurancePart-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'InsurancePart-hlist-line-0',
				'',
				[BoxUtil.labelBox(this._node, 'Insurance Part', 'top-1-line-0-item-0'), BoxUtil.textBox(this._node, 'name')],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'1',
				BoxFactory.horizontalLayout(
					this._node,
					'InsurancePart-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, 'risk assessment:', 'top-1-line-1-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'statisticalRisk', 'PercentageLiteral', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'InsurancePart-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'maximum payout:', 'top-1-line-2-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'maximumPayOut', 'EuroLiteral', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'3',
				BoxFactory.horizontalLayout(
					this._node,
					'InsurancePart-hlist-line-3',
					'',
					[
						BoxUtil.labelBox(this._node, 'is approved:', 'top-1-line-3-item-0'),
						BoxUtil.booleanBox(this._node, 'isApproved', { yes: 'JA', no: 'NEE' }, BoolDisplay.INNER_SWITCH)
					],
					{ selectable: false }
				)
			)
		]);
	}
	getComments() {
		return BoxFactory.verticalLayout(this._node, 'InsurancePart-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'InsurancePart-hlist-line-0',
				'',
				[BoxUtil.labelBox(this._node, 'Insurance Part', 'top-1-line-0-item-0'), BoxUtil.textBox(this._node, 'name')],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'1',
				BoxUtil.labelBox(this._node, '/* An insurance part holds details about a to be insured event. */', 'top-1-line-1-item-0')
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'InsurancePart-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'risk assessment:', 'top-1-line-2-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'statisticalRisk', 'PercentageLiteral', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'3',
				BoxUtil.labelBox(this._node, '/* The risk assessment is the statistical risk that the event will happen. */', 'top-1-line-3-item-0')
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'4',
				BoxFactory.horizontalLayout(
					this._node,
					'InsurancePart-hlist-line-4',
					'',
					[
						BoxUtil.labelBox(this._node, 'maximum payout:', 'top-1-line-4-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'maximumPayOut', 'EuroLiteral', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'5',
				BoxUtil.labelBox(
					this._node,
					'/* The maximum payout is the maximum amount to be paid in case the insured event happens. */',
					'top-1-line-5-item-0'
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'6',
				BoxFactory.horizontalLayout(
					this._node,
					'InsurancePart-hlist-line-6',
					'',
					[
						BoxUtil.labelBox(this._node, 'is approved:', 'top-1-line-6-item-0'),
						BoxUtil.booleanBox(this._node, 'isApproved', { yes: 'YES', no: 'NO' }, BoolDisplay.INNER_SWITCH)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'7',
				BoxUtil.labelBox(
					this._node,
					"/* 'is approved' indicates whether this insurance part is in development, or in use. */",
					'top-1-line-7-item-0'
				)
			)
		]);
	}
}

class InsuranceProductBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'InsuranceProduct';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'InsuranceProduct-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'InsuranceProduct-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'Insurance Product', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '( public name:', 'top-1-line-0-item-2'),
					BoxUtil.textBox(this._node, 'productName'),
					BoxUtil.labelBox(this._node, ') USES', 'top-1-line-0-item-4'),
					BoxUtil.horizontalReferenceListBox(this._node, 'basedOn', InsuranceModelEnvironment.getInstance().scoper, false, {
						text: ',',
						type: 'Separator'
					})
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'1',
				BoxFactory.horizontalLayout(
					this._node,
					'InsuranceProduct-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, 'Themes:', 'top-1-line-1-item-0'),
						BoxUtil.limitedListBox(
							this._node,
							'themes',
							(selected) => {
								for (let i = 0; i < this._node.themes.length; i++) {
									if (!selected.includes(this._node.themes[i].name)) {
										this._node.themes.splice(i, 1);
									}
								}
								const existingNames = this._node.themes.map((n) => n.name);
								for (let i = 0; i < selected.length; i++) {
									if (!existingNames.includes(selected[i])) {
										this._node.themes.push(FreNodeReference.create(selected, 'InsuranceTheme'));
									}
								}
							},
							LimitedDisplay.CHECKBOX
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'InsuranceProduct-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'Premium:', 'top-1-line-2-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'advertisedPremium', 'EuroLiteral', this.mainHandler),
						BoxUtil.labelBox(this._node, 'per', 'top-1-line-2-item-2'),
						BoxUtil.limitedBox(
							this._node,
							'nrPremiumDays',
							(selected) => {
								this._node.nrPremiumDays = FreNodeReference.create(selected, 'PremiumDays');
							},
							LimitedDisplay.SELECT,
							InsuranceModelEnvironment.getInstance().scoper
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(this._node, 4, '3', BoxUtil.labelBox(this._node, 'Insured risks:', 'top-1-line-3-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'4',
				BoxUtil.verticalReferenceListBox(this._node, 'parts', InsuranceModelEnvironment.getInstance().scoper, false, {
					text: ';',
					type: 'Terminator'
				})
			),
			BoxUtil.indentBox(this._node, 4, '5', BoxUtil.labelBox(this._node, 'Calculation', 'top-1-line-5-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'6',
				BoxFactory.optional2(
					this._node,
					'optional-riskAdjustment',
					() => !!this._node.riskAdjustment,
					BoxFactory.horizontalLayout(
						this._node,
						'InsuranceProduct-optional-riskAdjustment-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'Risk adjusted by =', 'top-2-line-0-item-0'),
							BoxUtil.getBoxOrAction(this._node, 'riskAdjustment', 'PercentageLiteral', this.mainHandler)
						],
						{ selectable: false }
					),
					false,
					BoxFactory.action(this._node, 'optional-riskAdjustment', 'Risk adjusted by =')
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'7',
				BoxFactory.horizontalLayout(
					this._node,
					'InsuranceProduct-hlist-line-7',
					'',
					[
						BoxUtil.labelBox(this._node, 'calculated premium:', 'top-1-line-7-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'calculation', 'DocuExpression', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'8',
				BoxFactory.optional2(
					this._node,
					'optional-helpers',
					() => !!this._node.helpers && this._node.helpers.length !== 0,
					BoxFactory.horizontalLayout(
						this._node,
						'InsuranceProduct-optional-helpers-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'Helper functions:', 'top-2-line-0-item-0'),
							,
							BoxUtil.verticalPartListBox(this._node, this._node.helpers, 'helpers', null, this.mainHandler)
						],
						{ selectable: false }
					),
					false,
					BoxFactory.action(this._node, 'optional-helpers', 'Helper functions:')
				)
			)
		]);
	}
	getComments() {
		return BoxFactory.verticalLayout(this._node, 'InsuranceProduct-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'InsuranceProduct-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'Insurance Product', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '( public name:', 'top-1-line-0-item-2'),
					BoxUtil.textBox(this._node, 'productName'),
					BoxUtil.labelBox(this._node, ') USES', 'top-1-line-0-item-4'),
					BoxUtil.horizontalReferenceListBox(this._node, 'basedOn', InsuranceModelEnvironment.getInstance().scoper, false, {
						text: ',',
						type: 'Separator'
					})
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'1',
				BoxUtil.labelBox(
					this._node,
					'/* An insurance product defines a combination of to be insured events that are packaged as a sellable product. */',
					'top-1-line-1-item-0'
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'InsuranceProduct-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'Themes:', 'top-1-line-2-item-0'),
						BoxUtil.limitedListBox(
							this._node,
							'themes',
							(selected) => {
								for (let i = 0; i < this._node.themes.length; i++) {
									if (!selected.includes(this._node.themes[i].name)) {
										this._node.themes.splice(i, 1);
									}
								}
								const existingNames = this._node.themes.map((n) => n.name);
								for (let i = 0; i < selected.length; i++) {
									if (!existingNames.includes(selected[i])) {
										this._node.themes.push(FreNodeReference.create(selected, 'InsuranceTheme'));
									}
								}
							},
							LimitedDisplay.CHECKBOX
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'3',
				BoxUtil.labelBox(
					this._node,
					'/* Themes gives a list of types of insurance parts that are packaged in this product. */',
					'top-1-line-3-item-0'
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'4',
				BoxFactory.horizontalLayout(
					this._node,
					'InsuranceProduct-hlist-line-4',
					'',
					[
						BoxUtil.labelBox(this._node, 'Premium:', 'top-1-line-4-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'advertisedPremium', 'EuroLiteral', this.mainHandler),
						BoxUtil.labelBox(this._node, 'per', 'top-1-line-4-item-2'),
						BoxUtil.limitedBox(
							this._node,
							'nrPremiumDays',
							(selected) => {
								this._node.nrPremiumDays = FreNodeReference.create(selected, 'PremiumDays');
							},
							LimitedDisplay.SELECT,
							InsuranceModelEnvironment.getInstance().scoper
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'5',
				BoxUtil.labelBox(this._node, '/* Premium is the income by selling this product per part of the year. */', 'top-1-line-5-item-0')
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'6',
				BoxUtil.labelBox(this._node, 'Insured risks: /* The packaged insured events. */', 'top-1-line-6-item-0')
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'7',
				BoxUtil.verticalReferenceListBox(this._node, 'parts', InsuranceModelEnvironment.getInstance().scoper, false, {
					text: ';',
					type: 'Terminator'
				})
			),
			BoxUtil.indentBox(this._node, 4, '8', BoxUtil.labelBox(this._node, 'Calculation', 'top-1-line-8-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'9',
				BoxFactory.optional2(
					this._node,
					'optional-riskAdjustment',
					() => !!this._node.riskAdjustment,
					BoxFactory.horizontalLayout(
						this._node,
						'InsuranceProduct-optional-riskAdjustment-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'Risk adjusted by =', 'top-2-line-0-item-0'),
							BoxUtil.getBoxOrAction(this._node, 'riskAdjustment', 'PercentageLiteral', this.mainHandler),
							,
							BoxUtil.labelBox(this._node, '/* Risk adjustment is used to change the calculation, because the', 'top-2-line-0-item-3'),
							,
							BoxUtil.labelBox(this._node, 'packaging changes the individual risks of the insurance parts. */', 'top-2-line-0-item-5')
						],
						{ selectable: false }
					),
					false,
					BoxFactory.action(this._node, 'optional-riskAdjustment', 'Risk adjusted by =')
				)
			),
			BoxUtil.indentBox(
				this._node,
				8,
				'10',
				BoxFactory.horizontalLayout(
					this._node,
					'InsuranceProduct-hlist-line-10',
					'',
					[
						BoxUtil.labelBox(this._node, 'calculated premium:', 'top-1-line-10-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'calculation', 'DocuExpression', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(
				this._node,
				12,
				'11',
				BoxUtil.labelBox(this._node, '/* Calculation is an estimate of the cost of this product per year. */', 'top-1-line-11-item-0')
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'12',
				BoxFactory.optional2(
					this._node,
					'optional-helpers',
					() => !!this._node.helpers && this._node.helpers.length !== 0,
					BoxFactory.horizontalLayout(
						this._node,
						'InsuranceProduct-optional-helpers-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(
								this._node,
								'Helper functions: /* Functions that can be used within the premium calculation. */',
								'top-2-line-0-item-0'
							),
							,
							BoxUtil.verticalPartListBox(this._node, this._node.helpers, 'helpers', null, this.mainHandler)
						],
						{ selectable: false }
					),
					false,
					BoxFactory.action(
						this._node,
						'optional-helpers',
						'Helper functions: /* Functions that can be used within the premium calculation. */'
					)
				)
			)
		]);
	}
}

class CalcFunctionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'CalcFunction';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'CalcFunction-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'CalcFunction-hlist-line-0',
				'',
				[
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '(', 'top-1-line-0-item-1'),
					BoxUtil.horizontalPartListBox(
						this._node,
						this._node.parameters,
						'parameters',
						{ text: ',', type: 'Separator' },
						this.mainHandler
					),
					BoxUtil.labelBox(this._node, '):', 'top-1-line-0-item-3'),
					BoxUtil.getBoxOrAction(this._node, 'declaredType', 'DocuType', this.mainHandler),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-5')
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(this._node, 4, '1', BoxUtil.getBoxOrAction(this._node, 'body', 'DocuExpression', this.mainHandler)),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-2-item-0')
		]);
	}
	getComments() {
		return BoxFactory.verticalLayout(this._node, 'CalcFunction-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'CalcFunction-hlist-line-0',
				'',
				[
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '(', 'top-1-line-0-item-1'),
					BoxUtil.horizontalPartListBox(
						this._node,
						this._node.parameters,
						'parameters',
						{ text: ',', type: 'Separator' },
						this.mainHandler
					),
					BoxUtil.labelBox(this._node, '):', 'top-1-line-0-item-3'),
					BoxUtil.getBoxOrAction(this._node, 'declaredType', 'DocuType', this.mainHandler),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-5')
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'1',
				BoxFactory.horizontalLayout(
					this._node,
					'CalcFunction-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, '/*', 'top-1-line-1-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'description', 'Description', this.mainHandler),
						BoxUtil.labelBox(this._node, '*/', 'top-1-line-1-item-2')
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(this._node, 4, '2', BoxUtil.getBoxOrAction(this._node, 'body', 'DocuExpression', this.mainHandler)),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-3-item-0')
		]);
	}
}

class DescriptionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Description';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxUtil.textBox(this._node, 'content');
	}
}

class ParameterBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Parameter';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxFactory.horizontalLayout(
			this._node,
			'Parameter-hlist-line-0',
			'',
			[
				BoxUtil.textBox(this._node, 'name'),
				BoxUtil.labelBox(this._node, ':', 'top-1-line-0-item-1'),
				BoxUtil.getBoxOrAction(this._node, 'declaredType', 'DocuType', this.mainHandler)
			],
			{ selectable: false }
		);
	}
	getComments() {
		return BoxFactory.horizontalLayout(
			this._node,
			'Parameter-hlist-line-0',
			'',
			[
				BoxUtil.textBox(this._node, 'name'),
				BoxUtil.labelBox(this._node, ':', 'top-1-line-0-item-1'),
				BoxUtil.getBoxOrAction(this._node, 'declaredType', 'DocuType', this.mainHandler)
			],
			{ selectable: false }
		);
	}
}

class TypeRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'TypeRef';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxUtil.referenceBox(
			this._node,
			'type',
			(selected) => {
				this._node.type = FreNodeReference.create(selected, 'NamedType');
			},
			InsuranceModelEnvironment.getInstance().scoper
		);
	}
}

class PartBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Part';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxUtil.getBoxOrAction(this._node, 'part', 'BaseProduct', this.mainHandler);
	}
	getComments() {
		return BoxFactory.verticalLayout(this._node, 'Part-overall', '', [
			BoxUtil.labelBox(this._node, '/* This is a model unit that contains a part of an insurance product */', 'top-1-line-0-item-0'),
			BoxUtil.emptyLineBox(this._node, 'Part-empty-line-1'),
			BoxUtil.getBoxOrAction(this._node, 'part', 'BaseProduct', this.mainHandler)
		]);
	}
}

class ProductBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default', 'comments'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Product';
	}
	getContent(projectionName) {
		if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
			const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
			if (!!BOX) {
				return BOX;
			}
		} else {
			if (projectionName === 'default') {
				return this.getDefault();
			} else if (projectionName === 'comments') {
				return this.getComments();
			}
		}
		return this.getDefault();
	}
	getDefault() {
		return BoxUtil.getBoxOrAction(this._node, 'product', 'InsuranceProduct', this.mainHandler);
	}
	getComments() {
		return BoxFactory.verticalLayout(this._node, 'Product-overall', '', [
			BoxUtil.labelBox(this._node, '/* This is a model unit that contains an insurance product */', 'top-1-line-0-item-0'),
			BoxUtil.getBoxOrAction(this._node, 'product', 'InsuranceProduct', this.mainHandler)
		]);
	}
}

const map = new Map([
	[
		'EuroLiteral',
		new Map([
			[
				'default',
				new Map([
					['euros', ''],
					['cents', '']
				])
			]
		])
	],
	['NumberLiteral', new Map([['default', new Map([['value', '']])]])],
	['PercentageLiteral', new Map([['default', new Map([['value', '']])]])],
	['BooleanLiteral', new Map([['default', new Map([['value', '']])]])],
	[
		'FunctionCallExpression',
		new Map([
			[
				'default',
				new Map([
					['funcDefinition', ''],
					['args', '']
				])
			]
		])
	],
	['InsurancePartRef', new Map([['default', new Map([['part', '']])]])],
	[
		'ParameterRef',
		new Map([
			[
				'default',
				new Map([
					['parameter', ''],
					['attribute', '']
				])
			]
		])
	],
	[
		'GenericTypeDecl',
		new Map([
			[
				'default',
				new Map([
					['kind', ''],
					['baseType', '']
				])
			]
		])
	],
	[
		'GenericLiteral',
		new Map([
			[
				'default',
				new Map([
					['kind', ''],
					['content', '']
				])
			]
		])
	],
	[
		'Entity',
		new Map([
			[
				'default',
				new Map([
					['isCompany', ''],
					['name', '']
				])
			],
			[
				'specials',
				new Map([
					['isCompany', ''],
					['name', '']
				])
			]
		])
	],
	['EntityAttribute', new Map([['default', new Map([['numVal', '']])]])],
	[
		'BaseProduct',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['theme', ''],
					['isUnderConstruction', ''],
					['isApprovedLevel1', ''],
					['isApprovedLevel2', ''],
					['isApprovedLevel3', ''],
					['yieldsProfit', ''],
					['nrOfUse', ''],
					['range', ''],
					['parts', '']
				])
			],
			[
				'comments',
				new Map([
					['name', ''],
					['theme', ''],
					['parts', '']
				])
			],
			[
				'specials',
				new Map([
					['theme', ''],
					['name', ''],
					['parts', 'comments'],
					['isUnderConstruction', ''],
					['isApprovedLevel1', ''],
					['isApprovedLevel2', ''],
					['isApprovedLevel3', ''],
					['yieldsProfit', ''],
					['nrOfUse', ''],
					['range', ''],
					['date', '']
				])
			],
			[
				'tables',
				new Map([
					['name', ''],
					['theme', ''],
					['parts', '__TABLE__']
				])
			]
		])
	],
	[
		'InsurancePart',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['statisticalRisk', ''],
					['maximumPayOut', ''],
					['isApproved', '']
				])
			],
			[
				'comments',
				new Map([
					['name', ''],
					['statisticalRisk', ''],
					['maximumPayOut', ''],
					['isApproved', '']
				])
			],
			[
				'tableRowFor_tables',
				new Map([
					['name', ''],
					['statisticalRisk', ''],
					['maximumPayOut', ''],
					['isApproved', '']
				])
			]
		])
	],
	[
		'InsuranceProduct',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['productName', ''],
					['basedOn', ''],
					['themes', ''],
					['advertisedPremium', ''],
					['nrPremiumDays', ''],
					['parts', ''],
					['riskAdjustment', ''],
					['calculation', ''],
					['helpers', '']
				])
			],
			[
				'comments',
				new Map([
					['name', ''],
					['productName', ''],
					['basedOn', ''],
					['themes', ''],
					['advertisedPremium', ''],
					['nrPremiumDays', ''],
					['parts', ''],
					['riskAdjustment', ''],
					['calculation', ''],
					['helpers', '']
				])
			]
		])
	],
	[
		'CalcFunction',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['parameters', ''],
					['declaredType', ''],
					['body', '']
				])
			],
			[
				'comments',
				new Map([
					['name', ''],
					['parameters', ''],
					['declaredType', ''],
					['description', ''],
					['body', '']
				])
			]
		])
	],
	['Description', new Map([['default', new Map([['content', '']])]])],
	[
		'Parameter',
		new Map([
			[
				'default',
				new Map([
					['name', ''],
					['declaredType', '']
				])
			],
			[
				'comments',
				new Map([
					['name', ''],
					['declaredType', '']
				])
			]
		])
	],
	['TypeRef', new Map([['default', new Map([['type', '']])]])],
	[
		'Part',
		new Map([
			['default', new Map([['part', '']])],
			['comments', new Map([['part', '']])]
		])
	],
	[
		'Product',
		new Map([
			['default', new Map([['product', '']])],
			['comments', new Map([['product', '']])]
		])
	]
]);
function initializeProjections(handler) {
	handler.addProjection('Brackets');
	handler.addProjection('tables');
	handler.addProjection('comments');
	handler.addProjection('specials');
	for (const p of freonConfiguration.customProjection) {
		handler.addCustomProjection(p);
	}
	handler.initConceptToPropertyProjection(map);
	handler.initProviderConstructors(
		new Map([
			[
				'EuroLiteral',
				() => {
					return new EuroLiteralBoxProvider(handler);
				}
			],
			[
				'NumberLiteral',
				() => {
					return new NumberLiteralBoxProvider(handler);
				}
			],
			[
				'PercentageLiteral',
				() => {
					return new PercentageLiteralBoxProvider(handler);
				}
			],
			[
				'BooleanLiteral',
				() => {
					return new BooleanLiteralBoxProvider(handler);
				}
			],
			[
				'PlusExpression',
				() => {
					return new PlusExpressionBoxProvider(handler);
				}
			],
			[
				'MinusExpression',
				() => {
					return new MinusExpressionBoxProvider(handler);
				}
			],
			[
				'MultiplyExpression',
				() => {
					return new MultiplyExpressionBoxProvider(handler);
				}
			],
			[
				'DivideExpression',
				() => {
					return new DivideExpressionBoxProvider(handler);
				}
			],
			[
				'FunctionCallExpression',
				() => {
					return new FunctionCallExpressionBoxProvider(handler);
				}
			],
			[
				'InsurancePartRef',
				() => {
					return new InsurancePartRefBoxProvider(handler);
				}
			],
			[
				'RiskAdjustmentRef',
				() => {
					return new RiskAdjustmentRefBoxProvider(handler);
				}
			],
			[
				'ParameterRef',
				() => {
					return new ParameterRefBoxProvider(handler);
				}
			],
			[
				'RiskRef',
				() => {
					return new RiskRefBoxProvider(handler);
				}
			],
			[
				'PayoutRef',
				() => {
					return new PayoutRefBoxProvider(handler);
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
				'GenericTypeDecl',
				() => {
					return new GenericTypeDeclBoxProvider(handler);
				}
			],
			[
				'GenericLiteral',
				() => {
					return new GenericLiteralBoxProvider(handler);
				}
			],
			[
				'Entity',
				() => {
					return new EntityBoxProvider(handler);
				}
			],
			[
				'EntityAttribute',
				() => {
					return new EntityAttributeBoxProvider(handler);
				}
			],
			[
				'BaseProduct',
				() => {
					return new BaseProductBoxProvider(handler);
				}
			],
			[
				'InsurancePart',
				() => {
					return new InsurancePartBoxProvider(handler);
				}
			],
			[
				'InsuranceProduct',
				() => {
					return new InsuranceProductBoxProvider(handler);
				}
			],
			[
				'CalcFunction',
				() => {
					return new CalcFunctionBoxProvider(handler);
				}
			],
			[
				'Description',
				() => {
					return new DescriptionBoxProvider(handler);
				}
			],
			[
				'Parameter',
				() => {
					return new ParameterBoxProvider(handler);
				}
			],
			[
				'TypeRef',
				() => {
					return new TypeRefBoxProvider(handler);
				}
			],
			[
				'Part',
				() => {
					return new PartBoxProvider(handler);
				}
			],
			[
				'Product',
				() => {
					return new ProductBoxProvider(handler);
				}
			]
		])
	);
	handler.initTableHeaders([
		new FreTableHeaderInfo('InsurancePart', 'tableRowFor_tables', ['Name', 'risk', 'pay out', 'is approved', 'action'])
	]);
}
function initializeEditorDef() {
	FreLanguage.getInstance().concept('EuroLiteral').trigger = 'EuroLiteral';
	FreLanguage.getInstance().concept('NumberLiteral').trigger = 'NumberLiteral';
	FreLanguage.getInstance().concept('PercentageLiteral').trigger = 'PercentageLiteral';
	FreLanguage.getInstance().concept('BooleanLiteral').trigger = 'BooleanLiteral';
	FreLanguage.getInstance().concept('PlusExpression').trigger = '+';
	FreLanguage.getInstance().concept('MinusExpression').trigger = '-';
	FreLanguage.getInstance().concept('MultiplyExpression').trigger = '*';
	FreLanguage.getInstance().concept('DivideExpression').trigger = '/';
	FreLanguage.getInstance().concept('FunctionCallExpression').trigger = 'calc';
	FreLanguage.getInstance().concept('InsurancePartRef').trigger = 'InsurancePartRef';
	FreLanguage.getInstance().concept('RiskAdjustmentRef').trigger = 'RiskAdjustmentRef';
	FreLanguage.getInstance().concept('ParameterRef').trigger = 'ParameterRef';
	FreLanguage.getInstance().concept('RiskRef').trigger = 'RiskRef';
	FreLanguage.getInstance().concept('PayoutRef').trigger = 'PayoutRef';
	FreLanguage.getInstance().concept('Text').trigger = 'Text';
	FreLanguage.getInstance().concept('Text2').trigger = 'Text2';
	FreLanguage.getInstance().concept('Text3').trigger = 'Text3';
	FreLanguage.getInstance().concept('Text4').trigger = 'Text4';
	FreLanguage.getInstance().concept('GenericTypeDecl').trigger = 'GenericTypeDecl';
	FreLanguage.getInstance().concept('GenericLiteral').trigger = 'GenericLiteral';
	FreLanguage.getInstance().concept('Entity').trigger = 'Entity';
	FreLanguage.getInstance().concept('EntityAttribute').trigger = 'EntityAttribute';
	FreLanguage.getInstance().concept('BaseProduct').trigger = 'BaseProduct';
	FreLanguage.getInstance().concept('InsurancePart').trigger = 'InsurancePart';
	FreLanguage.getInstance().concept('InsuranceProduct').trigger = 'InsuranceProduct';
	FreLanguage.getInstance().concept('CalcFunction').trigger = 'CalcFunction';
	FreLanguage.getInstance().concept('Description').trigger = 'Description';
	FreLanguage.getInstance().concept('Parameter').trigger = 'Parameter';
	FreLanguage.getInstance().concept('TypeRef').trigger = 'TypeRef';
	FreLanguage.getInstance().concept('FunctionCallExpression').referenceShortcut = {
		propertyName: 'funcDefinition',
		conceptName: 'CalcFunction'
	};
	FreLanguage.getInstance().concept('InsurancePartRef').referenceShortcut = {
		propertyName: 'part',
		conceptName: 'InsurancePart'
	};
	FreLanguage.getInstance().concept('ParameterRef').referenceShortcut = {
		propertyName: 'parameter',
		conceptName: 'Parameter'
	};
	FreLanguage.getInstance().concept('GenericTypeDecl').referenceShortcut = {
		propertyName: 'kind',
		conceptName: 'GenericKind'
	};
	FreLanguage.getInstance().concept('GenericLiteral').referenceShortcut = {
		propertyName: 'kind',
		conceptName: 'GenericKind'
	};
	FreLanguage.getInstance().concept('TypeRef').referenceShortcut = {
		propertyName: 'type',
		conceptName: 'NamedType'
	};
}

new FreLogger('InsuranceModelScoper');
class InsuranceModelScoper extends FreScoperBase {
	getAlternativeScope(modelelement) {
		if (!!modelelement && modelelement instanceof AttributeRef) {
			let owner = modelelement.freOwnerDescriptor().owner;
			if (!!owner) {
				let newScopeElement = this.myTyper.inferType(owner)?.toAstElement();
				if (!!newScopeElement) {
					return FreNamespace.create(newScopeElement);
				}
			}
		}
		return null;
	}
	hasAlternativeScope(modelelement) {
		if (!!modelelement && modelelement instanceof AttributeRef) {
			return true;
		}
		return false;
	}
	additionalNamespaces(element) {
		const result = [];
		if (element instanceof InsuranceProduct) {
			for (let loopVariable of element.basedOn) {
				if (loopVariable instanceof FreNodeReference) {
					if (!this.currentRoleNames.includes('basedOn')) {
						if (!!loopVariable.referred) {
							if (!this.additionalNamespacesVisited.includes(loopVariable)) {
								this.additionalNamespacesVisited.push(loopVariable);
								const referred = loopVariable.referred;
								if (!!referred) {
									result.push(loopVariable.referred);
								}
								this.additionalNamespacesVisited.pop();
							}
						}
					}
				} else {
					result.push(loopVariable);
				}
			}
		}
		if (element instanceof Entity) {
			if (!this.currentRoleNames.includes('baseEntity')) {
				if (!!element.baseEntity) {
					if (!this.additionalNamespacesVisited.includes(element.baseEntity)) {
						this.additionalNamespacesVisited.push(element.baseEntity);
						const referred = element.baseEntity.referred;
						if (!!referred) {
							result.push(element.baseEntity.referred);
						}
						this.additionalNamespacesVisited.pop();
					}
				}
			}
		}
		return result;
	}
}

function initializeScopers(rootScoper) {
	for (const p of freonConfiguration.customScopers) {
		rootScoper.appendScoper(p);
	}
	rootScoper.appendScoper(new InsuranceModelScoper());
}
function initializeScoperDef(rootScoper) {
	FreLanguage.getInstance().classifier('InsuranceProduct').isNamespace = true;
	FreLanguage.getInstance().classifier('BaseProduct').isNamespace = true;
	FreLanguage.getInstance().classifier('CalcFunction').isNamespace = true;
	FreLanguage.getInstance().classifier('Entity').isNamespace = true;
	initializeScopers(rootScoper);
}

class GenericType {
	static create(data) {
		const result = new GenericType(data.$id);
		if (!!data.base) {
			result.base = data.base;
		}
		if (!!data.kind) {
			result.kind = data.kind;
		} else {
			result.kind = GenericKind.create({});
		}
		if (!!data.parseLocation) {
			result.parseLocation = data.parseLocation;
		}
		return result;
	}
	constructor(id) {
		this.$typename = 'GenericType';
		this.$id = '';
		if (!!id) {
			this.$id = id;
		} else {
			this.$id = FreUtils.ID();
		}
	}
	copy() {
		const result = new GenericType();
		if (!!this.base) {
			result.base = this.base.copy();
		}
		if (!!this.kind) {
			result.kind = this.kind.copy();
		}
		return result;
	}
	toFreString(writer) {
		return `GenericType [
    base: ${this.base?.toFreString(writer)},
	kind: ${writer.writeToString(this.kind)}
]`;
	}
	toAstElement() {
		return null;
	}
}

class InsuranceModelTyperPart {
	isType(modelelement) {
		if (modelelement instanceof InsurancePartType) {
			return true;
		} else if (modelelement instanceof PercentageType) {
			return true;
		} else if (modelelement instanceof NumberType) {
			return true;
		} else if (modelelement instanceof BooleanType) {
			return true;
		} else if (modelelement instanceof EuroType) {
			return true;
		}
		return false;
	}
	inferType(modelelement) {
		if (!modelelement) {
			return null;
		}
		let result = null;
		if (FreLanguage.getInstance().metaConformsToType(modelelement, 'DivideExpression')) {
			result = this.mainTyper.commonSuperType([modelelement?.left, modelelement?.right]);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'MultiplyExpression')) {
			result = this.mainTyper.commonSuperType([modelelement?.left, modelelement?.right]);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'MinusExpression')) {
			result = this.mainTyper.commonSuperType([modelelement?.left, modelelement?.right]);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'PlusExpression')) {
			result = this.mainTyper.commonSuperType([modelelement?.left, modelelement?.right]);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'BooleanLiteral')) {
			result = AstType.create({ astElement: BooleanType.Boolean });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'PercentageLiteral')) {
			result = AstType.create({ astElement: PercentageType.Percentage });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'NumberLiteral')) {
			result = AstType.create({ astElement: NumberType.Number });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'EuroLiteral')) {
			result = AstType.create({ astElement: EuroType.EUR });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'TypeRef')) {
			result = this.mainTyper.inferType(modelelement?.type?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'GenericTypeDecl')) {
			result = GenericType.create({
				base: this.mainTyper.inferType(modelelement?.baseType),
				kind: modelelement?.kind?.referred
			});
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'GenericLiteral')) {
			result = GenericType.create({
				base: this.mainTyper.commonSuperType(modelelement?.content),
				kind: modelelement?.kind?.referred
			});
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'ParameterRef')) {
			result = this.mainTyper.inferType(modelelement?.parameter?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'RiskAdjustmentRef')) {
			result = AstType.create({ astElement: PercentageType.Percentage });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'InsurancePartRef')) {
			result = AstType.create({ astElement: InsurancePartType.InsurancePart });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'FunctionCallExpression')) {
			result = this.mainTyper.inferType(modelelement?.funcDefinition?.referred);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'PayoutRef')) {
			result = AstType.create({ astElement: EuroType.EUR });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'RiskRef')) {
			result = AstType.create({ astElement: PercentageType.Percentage });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'Parameter')) {
			result = this.mainTyper.inferType(modelelement?.declaredType);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'CalcFunction')) {
			result = this.mainTyper.inferType(modelelement?.declaredType);
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'GenericKind')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'InsurancePartType')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'PercentageType')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'NumberType')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'BooleanType')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'EuroType')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'InsuranceTheme')) {
			result = AstType.create({ astElement: modelelement });
		} else if (FreLanguage.getInstance().metaConformsToType(modelelement, 'PremiumDays')) {
			result = AstType.create({ astElement: modelelement });
		} else if (this.mainTyper.isType(modelelement)) {
			result = AstType.create({ astElement: modelelement });
		}
		return result;
	}
	equals(type1, type2) {
		if (!type1 || !type2) return false;
		if (type1.$typename === 'AstType') {
			if (FreLanguage.getInstance().metaConformsToType(type1.astElement, 'NamedType')) {
				const elem1 = type1.astElement;
				const elem2 = type2.astElement;
				if (!!elem1 && !!elem2) {
					const condition1 = elem1?.name === elem2?.name;
					return condition1;
				}
			} else {
				return type1.astElement === type2.astElement;
			}
		} else if (type1.$typename === 'GenericType') {
			const condition1 = this.mainTyper.equals(type1?.base, type2?.base);
			const condition2 = type1?.kind === type2?.kind;
			return condition1 && condition2;
		}
		return false;
	}
	conforms(type1, type2) {
		if (!type1 || !type2) return null;
		let result = false;
		if (this.equals(type1, type2)) {
			result = true;
		} else {
			this.getSuperTypes(type1).forEach((super1) => {
				if (this.equals(super1, type2)) {
					result = true;
				}
			});
		}
		return result;
	}
	conformsList(typelist1, typelist2) {
		if (typelist1.length !== typelist2.length) return false;
		let result = true;
		for (let index in typelist1) {
			result = this.conforms(typelist1[index], typelist2[index]);
			if (result == false) return result;
		}
		return result;
	}
	commonSuper(typelist) {
		const result = FreCommonSuperTypeUtil.commonSuperType(typelist, this.mainTyper);
		if (!!result && result.length > 0) {
			return result[0];
		}
		return null;
	}
	getSuperTypes(type) {
		if (!type) {
			return [];
		}
		let result = [];
		if (type.$typename === 'AstType') {
			const elem = type.astElement;
			if (FreLanguage.getInstance().metaConformsToType(elem, 'NamedType'));
			else if (FreLanguage.getInstance().metaConformsToType(elem, 'GenericKind')) {
				if (elem === GenericKind.Set) {
					return [AstType.create({ astElement: GenericKind.Collection })];
				}
				if (elem === GenericKind.Sequence) {
					return [AstType.create({ astElement: GenericKind.Collection })];
				}
				if (elem === GenericKind.Bag) {
					return [AstType.create({ astElement: GenericKind.Collection })];
				}
			} else {
				return [];
			}
		} else if (type.$typename === 'GenericType') {
			const rhs0 = this.getSuperTypes(type?.base);
			const rhs1 = this.getSuperTypes(this.mainTyper.inferType(type?.kind));
			for (const partA of rhs0) {
				result.push(
					GenericType.create({
						base: partA,
						kind: type.kind
					})
				);
				for (const partB of rhs1) {
					const elemB = this.getElemFromAstType(partB, 'GenericKind');
					result.push(
						GenericType.create({
							base: partA,
							kind: elemB
						})
					);
				}
			}
			for (const partB of rhs1) {
				const elemB = this.getElemFromAstType(partB, 'GenericKind');
				result.push(
					GenericType.create({
						kind: elemB,
						base: type.base
					})
				);
			}
		}
		return result;
	}
	typeOf(myArg) {
		let result;
		if (Array.isArray(myArg)) {
			result = this.mainTyper.commonSuperType(myArg);
		} else {
			result = this.mainTyper.inferType(myArg);
		}
		return result;
	}
	getElemFromAstType(type, metatype) {
		if (type.$typename === 'AstType') {
			const astElement = type.astElement;
			if (FreLanguage.getInstance().metaConformsToType(astElement, metatype)) {
				return astElement;
			}
		}
		return null;
	}
}

function initializeTypers(rootTyper) {
	for (const p of freonConfiguration.customTypers) {
		rootTyper.appendTyper(p);
	}
	rootTyper.appendTyper(new InsuranceModelTyperPart());
}

const LOGGER = new FreLogger('InsuranceModelWalker');
class InsuranceModelWalker {
	constructor() {
		this.myWorkers = [];
	}
	walk(modelelement, includeChildren) {
		if (this.myWorkers.length > 0) {
			if (modelelement instanceof DivideExpression) {
				return this.walkDivideExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof MultiplyExpression) {
				return this.walkMultiplyExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof MinusExpression) {
				return this.walkMinusExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof PlusExpression) {
				return this.walkPlusExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof BooleanLiteral) {
				return this.walkBooleanLiteral(modelelement, includeChildren);
			}
			if (modelelement instanceof PercentageLiteral) {
				return this.walkPercentageLiteral(modelelement, includeChildren);
			}
			if (modelelement instanceof NumberLiteral) {
				return this.walkNumberLiteral(modelelement, includeChildren);
			}
			if (modelelement instanceof EuroLiteral) {
				return this.walkEuroLiteral(modelelement, includeChildren);
			}
			if (modelelement instanceof TypeRef) {
				return this.walkTypeRef(modelelement, includeChildren);
			}
			if (modelelement instanceof GenericLiteral) {
				return this.walkGenericLiteral(modelelement, includeChildren);
			}
			if (modelelement instanceof GenericTypeDecl) {
				return this.walkGenericTypeDecl(modelelement, includeChildren);
			}
			if (modelelement instanceof PayoutRef) {
				return this.walkPayoutRef(modelelement, includeChildren);
			}
			if (modelelement instanceof RiskRef) {
				return this.walkRiskRef(modelelement, includeChildren);
			}
			if (modelelement instanceof ParameterRef) {
				return this.walkParameterRef(modelelement, includeChildren);
			}
			if (modelelement instanceof RiskAdjustmentRef) {
				return this.walkRiskAdjustmentRef(modelelement, includeChildren);
			}
			if (modelelement instanceof InsurancePartRef) {
				return this.walkInsurancePartRef(modelelement, includeChildren);
			}
			if (modelelement instanceof FunctionCallExpression) {
				return this.walkFunctionCallExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof BinaryExpression) {
				return this.walkBinaryExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof Literal) {
				return this.walkLiteral(modelelement, includeChildren);
			}
			if (modelelement instanceof PremiumDays) {
				return this.walkPremiumDays(modelelement, includeChildren);
			}
			if (modelelement instanceof InsuranceTheme) {
				return this.walkInsuranceTheme(modelelement, includeChildren);
			}
			if (modelelement instanceof EuroType) {
				return this.walkEuroType(modelelement, includeChildren);
			}
			if (modelelement instanceof BooleanType) {
				return this.walkBooleanType(modelelement, includeChildren);
			}
			if (modelelement instanceof NumberType) {
				return this.walkNumberType(modelelement, includeChildren);
			}
			if (modelelement instanceof PercentageType) {
				return this.walkPercentageType(modelelement, includeChildren);
			}
			if (modelelement instanceof InsurancePartType) {
				return this.walkInsurancePartType(modelelement, includeChildren);
			}
			if (modelelement instanceof DocuType) {
				return this.walkDocuType(modelelement, includeChildren);
			}
			if (modelelement instanceof Parameter) {
				return this.walkParameter(modelelement, includeChildren);
			}
			if (modelelement instanceof Description) {
				return this.walkDescription(modelelement, includeChildren);
			}
			if (modelelement instanceof CalcFunction) {
				return this.walkCalcFunction(modelelement, includeChildren);
			}
			if (modelelement instanceof InsuranceProduct) {
				return this.walkInsuranceProduct(modelelement, includeChildren);
			}
			if (modelelement instanceof InsurancePart) {
				return this.walkInsurancePart(modelelement, includeChildren);
			}
			if (modelelement instanceof BaseProduct) {
				return this.walkBaseProduct(modelelement, includeChildren);
			}
			if (modelelement instanceof EntityAttribute) {
				return this.walkEntityAttribute(modelelement, includeChildren);
			}
			if (modelelement instanceof Entity) {
				return this.walkEntity(modelelement, includeChildren);
			}
			if (modelelement instanceof GenericKind) {
				return this.walkGenericKind(modelelement, includeChildren);
			}
			if (modelelement instanceof Text4) {
				return this.walkText4(modelelement, includeChildren);
			}
			if (modelelement instanceof Text3) {
				return this.walkText3(modelelement, includeChildren);
			}
			if (modelelement instanceof Text2) {
				return this.walkText2(modelelement, includeChildren);
			}
			if (modelelement instanceof Text) {
				return this.walkText(modelelement, includeChildren);
			}
			if (modelelement instanceof AttributeRef) {
				return this.walkAttributeRef(modelelement, includeChildren);
			}
			if (modelelement instanceof DocuExpression) {
				return this.walkDocuExpression(modelelement, includeChildren);
			}
			if (modelelement instanceof Part) {
				return this.walkPart(modelelement, includeChildren);
			}
			if (modelelement instanceof Product) {
				return this.walkProduct(modelelement, includeChildren);
			}
			if (modelelement instanceof InsuranceModel) {
				return this.walkInsuranceModel(modelelement, includeChildren);
			}
		} else {
			LOGGER.error('No worker found.');
		}
	}
	walkDivideExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeDivideExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterDivideExpression(modelelement);
			}
		}
	}
	walkMultiplyExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeMultiplyExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterMultiplyExpression(modelelement);
			}
		}
	}
	walkMinusExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeMinusExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterMinusExpression(modelelement);
			}
		}
	}
	walkPlusExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePlusExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPlusExpression(modelelement);
			}
		}
	}
	walkBooleanLiteral(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeBooleanLiteral(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterBooleanLiteral(modelelement);
			}
		}
	}
	walkPercentageLiteral(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePercentageLiteral(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPercentageLiteral(modelelement);
			}
		}
	}
	walkNumberLiteral(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeNumberLiteral(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterNumberLiteral(modelelement);
			}
		}
	}
	walkEuroLiteral(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEuroLiteral(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEuroLiteral(modelelement);
			}
		}
	}
	walkTypeRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeTypeRef(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterTypeRef(modelelement);
			}
		}
	}
	walkGenericLiteral(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeGenericLiteral(modelelement);
			}
		}
		modelelement.content.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterGenericLiteral(modelelement);
			}
		}
	}
	walkGenericTypeDecl(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeGenericTypeDecl(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.baseType)) {
			this.walk(modelelement.baseType, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterGenericTypeDecl(modelelement);
			}
		}
	}
	walkPayoutRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePayoutRef(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPayoutRef(modelelement);
			}
		}
	}
	walkRiskRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeRiskRef(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterRiskRef(modelelement);
			}
		}
	}
	walkParameterRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeParameterRef(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.attribute)) {
			this.walk(modelelement.attribute, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterParameterRef(modelelement);
			}
		}
	}
	walkRiskAdjustmentRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeRiskAdjustmentRef(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterRiskAdjustmentRef(modelelement);
			}
		}
	}
	walkInsurancePartRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeInsurancePartRef(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterInsurancePartRef(modelelement);
			}
		}
	}
	walkFunctionCallExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeFunctionCallExpression(modelelement);
			}
		}
		modelelement.args.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterFunctionCallExpression(modelelement);
			}
		}
	}
	walkBinaryExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeBinaryExpression(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.left)) {
			this.walk(modelelement.left, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.right)) {
			this.walk(modelelement.right, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterBinaryExpression(modelelement);
			}
		}
	}
	walkLiteral(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeLiteral(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterLiteral(modelelement);
			}
		}
	}
	walkPremiumDays(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePremiumDays(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPremiumDays(modelelement);
			}
		}
	}
	walkInsuranceTheme(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeInsuranceTheme(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterInsuranceTheme(modelelement);
			}
		}
	}
	walkEuroType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEuroType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEuroType(modelelement);
			}
		}
	}
	walkBooleanType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeBooleanType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterBooleanType(modelelement);
			}
		}
	}
	walkNumberType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeNumberType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterNumberType(modelelement);
			}
		}
	}
	walkPercentageType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePercentageType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPercentageType(modelelement);
			}
		}
	}
	walkInsurancePartType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeInsurancePartType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterInsurancePartType(modelelement);
			}
		}
	}
	walkDocuType(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeDocuType(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterDocuType(modelelement);
			}
		}
	}
	walkParameter(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeParameter(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.declaredType)) {
			this.walk(modelelement.declaredType, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterParameter(modelelement);
			}
		}
	}
	walkDescription(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeDescription(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterDescription(modelelement);
			}
		}
	}
	walkCalcFunction(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeCalcFunction(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.description)) {
			this.walk(modelelement.description, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.declaredType)) {
			this.walk(modelelement.declaredType, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.body)) {
			this.walk(modelelement.body, includeChildren);
		}
		modelelement.parameters.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterCalcFunction(modelelement);
			}
		}
	}
	walkInsuranceProduct(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeInsuranceProduct(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.advertisedPremium)) {
			this.walk(modelelement.advertisedPremium, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.riskAdjustment)) {
			this.walk(modelelement.riskAdjustment, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.calculation)) {
			this.walk(modelelement.calculation, includeChildren);
		}
		modelelement.helpers.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterInsuranceProduct(modelelement);
			}
		}
	}
	walkInsurancePart(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeInsurancePart(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.statisticalRisk)) {
			this.walk(modelelement.statisticalRisk, includeChildren);
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.maximumPayOut)) {
			this.walk(modelelement.maximumPayOut, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterInsurancePart(modelelement);
			}
		}
	}
	walkBaseProduct(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeBaseProduct(modelelement);
			}
		}
		modelelement.parts.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterBaseProduct(modelelement);
			}
		}
	}
	walkEntityAttribute(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntityAttribute(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntityAttribute(modelelement);
			}
		}
	}
	walkEntity(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeEntity(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterEntity(modelelement);
			}
		}
	}
	walkGenericKind(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeGenericKind(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterGenericKind(modelelement);
			}
		}
	}
	walkText4(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText4(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText4(modelelement);
			}
		}
	}
	walkText3(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText3(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText3(modelelement);
			}
		}
	}
	walkText2(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText2(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText2(modelelement);
			}
		}
	}
	walkText(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeText(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterText(modelelement);
			}
		}
	}
	walkAttributeRef(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeAttributeRef(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterAttributeRef(modelelement);
			}
		}
	}
	walkDocuExpression(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeDocuExpression(modelelement);
			}
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterDocuExpression(modelelement);
			}
		}
	}
	walkPart(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforePart(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.part)) {
			this.walk(modelelement.part, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterPart(modelelement);
			}
		}
	}
	walkProduct(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeProduct(modelelement);
			}
		}
		if (!(includeChildren === undefined) && includeChildren(modelelement.product)) {
			this.walk(modelelement.product, includeChildren);
		}
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterProduct(modelelement);
			}
		}
	}
	walkInsuranceModel(modelelement, includeChildren) {
		let stopWalkingThisNode = false;
		for (const worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execBeforeInsuranceModel(modelelement);
			}
		}
		modelelement.parts.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		modelelement.products.forEach((p) => {
			if (!(includeChildren === undefined) && includeChildren(p)) {
				this.walk(p, includeChildren);
			}
		});
		for (let worker of this.myWorkers) {
			if (!stopWalkingThisNode) {
				stopWalkingThisNode = worker.execAfterInsuranceModel(modelelement);
			}
		}
	}
}

class InsuranceModelNonOptionalsChecker extends InsuranceModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.myWriter = FreLanguageEnvironment.getInstance().writer;
		this.errorList = [];
	}
	execBeforeInsuranceModel(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforePart(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.part === null || modelelement.part === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'part' must have a value", modelelement, modelelement.name, 'part', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeProduct(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.product === null || modelelement.product === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'product' must have a value", modelelement, modelelement.name, 'product', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeEuroLiteral(modelelement) {
		let hasFatalError = false;
		if (modelelement.euros === null || modelelement.euros === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'euros' must have a value", modelelement, 'unnamed', 'euros', FreErrorSeverity.Error));
		}
		if (modelelement.cents === null || modelelement.cents === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'cents' must have a value", modelelement, 'unnamed', 'cents', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeNumberLiteral(modelelement) {
		let hasFatalError = false;
		if (modelelement.value === null || modelelement.value === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'value' must have a value", modelelement, 'unnamed', 'value', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforePercentageLiteral(modelelement) {
		let hasFatalError = false;
		if (modelelement.value === null || modelelement.value === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'value' must have a value", modelelement, 'unnamed', 'value', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeBooleanLiteral(modelelement) {
		let hasFatalError = false;
		if (modelelement.value === null || modelelement.value === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'value' must have a value", modelelement, 'unnamed', 'value', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeBinaryExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforePlusExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeMinusExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeMultiplyExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeDivideExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeFunctionCallExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.funcDefinition === null || modelelement.funcDefinition === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'funcDefinition' must have a value", modelelement, 'unnamed', 'funcDefinition', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeInsurancePartRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.part === null || modelelement.part === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'part' must have a value", modelelement, 'unnamed', 'part', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeRiskAdjustmentRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeParameterRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.parameter === null || modelelement.parameter === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'parameter' must have a value", modelelement, 'unnamed', 'parameter', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeAttributeRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeRiskRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforePayoutRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeGenericKind(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeGenericTypeDecl(modelelement) {
		let hasFatalError = false;
		if (modelelement.baseType === null || modelelement.baseType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'baseType' must have a value", modelelement, 'unnamed', 'baseType', FreErrorSeverity.Error)
			);
		}
		if (modelelement.kind === null || modelelement.kind === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'kind' must have a value", modelelement, 'unnamed', 'kind', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeGenericLiteral(modelelement) {
		let hasFatalError = false;
		if (modelelement.kind === null || modelelement.kind === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'kind' must have a value", modelelement, 'unnamed', 'kind', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeEntity(modelelement) {
		let hasFatalError = false;
		if (modelelement.isCompany === null || modelelement.isCompany === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'isCompany' must have a value", modelelement, modelelement.name, 'isCompany', FreErrorSeverity.Error)
			);
		}
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeEntityAttribute(modelelement) {
		let hasFatalError = false;
		if (modelelement.numVal === null || modelelement.numVal === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'numVal' must have a value", modelelement, 'unnamed', 'numVal', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeBaseProduct(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.isUnderConstruction === null || modelelement.isUnderConstruction === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'isUnderConstruction' must have a value",
					modelelement,
					modelelement.name,
					'isUnderConstruction',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.isApprovedLevel1 === null || modelelement.isApprovedLevel1 === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'isApprovedLevel1' must have a value",
					modelelement,
					modelelement.name,
					'isApprovedLevel1',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.isApprovedLevel2 === null || modelelement.isApprovedLevel2 === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'isApprovedLevel2' must have a value",
					modelelement,
					modelelement.name,
					'isApprovedLevel2',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.isApprovedLevel3 === null || modelelement.isApprovedLevel3 === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'isApprovedLevel3' must have a value",
					modelelement,
					modelelement.name,
					'isApprovedLevel3',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.yieldsProfit === null || modelelement.yieldsProfit === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'yieldsProfit' must have a value", modelelement, modelelement.name, 'yieldsProfit', FreErrorSeverity.Error)
			);
		}
		if (modelelement.range === null || modelelement.range === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'range' must have a value", modelelement, modelelement.name, 'range', FreErrorSeverity.Error)
			);
		}
		if (modelelement.nrOfUse === null || modelelement.nrOfUse === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'nrOfUse' must have a value", modelelement, modelelement.name, 'nrOfUse', FreErrorSeverity.Error)
			);
		}
		if (modelelement.date === null || modelelement.date === undefined || modelelement.date?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'date' must have a value", modelelement, modelelement.name, 'date', FreErrorSeverity.Error)
			);
		}
		if (modelelement.theme === null || modelelement.theme === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'theme' must have a value", modelelement, modelelement.name, 'theme', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeInsurancePart(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.isApproved === null || modelelement.isApproved === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'isApproved' must have a value", modelelement, modelelement.name, 'isApproved', FreErrorSeverity.Error)
			);
		}
		if (modelelement.statisticalRisk === null || modelelement.statisticalRisk === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'statisticalRisk' must have a value",
					modelelement,
					modelelement.name,
					'statisticalRisk',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.maximumPayOut === null || modelelement.maximumPayOut === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'maximumPayOut' must have a value", modelelement, modelelement.name, 'maximumPayOut', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeInsuranceProduct(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.productName === null || modelelement.productName === undefined || modelelement.productName?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'productName' must have a value", modelelement, modelelement.name, 'productName', FreErrorSeverity.Error)
			);
		}
		if (modelelement.advertisedPremium === null || modelelement.advertisedPremium === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'advertisedPremium' must have a value",
					modelelement,
					modelelement.name,
					'advertisedPremium',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.calculation === null || modelelement.calculation === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'calculation' must have a value", modelelement, modelelement.name, 'calculation', FreErrorSeverity.Error)
			);
		}
		if (modelelement.nrPremiumDays === null || modelelement.nrPremiumDays === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'nrPremiumDays' must have a value", modelelement, modelelement.name, 'nrPremiumDays', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeCalcFunction(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'declaredType' must have a value", modelelement, modelelement.name, 'declaredType', FreErrorSeverity.Error)
			);
		}
		if (modelelement.body === null || modelelement.body === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'body' must have a value", modelelement, modelelement.name, 'body', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeDescription(modelelement) {
		let hasFatalError = false;
		if (modelelement.content === null || modelelement.content === undefined || modelelement.content?.length === 0) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'content' must have a value", modelelement, 'unnamed', 'content', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeParameter(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'declaredType' must have a value", modelelement, modelelement.name, 'declaredType', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeInsurancePartType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforePercentageType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeNumberType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeBooleanType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeEuroType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeTypeRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.type === null || modelelement.type === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'type' must have a value", modelelement, 'unnamed', 'type', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeInsuranceTheme(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforePremiumDays(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.nrOfDays === null || modelelement.nrOfDays === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'nrOfDays' must have a value", modelelement, modelelement.name, 'nrOfDays', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
}

const reservedWordsInTypescript = [
	'break',
	'case',
	'catch',
	'class',
	'const',
	'constructor',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'enum',
	'export',
	'false',
	'finally',
	'for',
	'function',
	'if',
	'import',
	'in',
	'instanceof',
	'new',
	'null',
	'return',
	'super',
	'switch',
	'this',
	'throw',
	'true',
	'try',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'interface',
	'let',
	'package',
	'private',
	'protected',
	'public',
	'static',
	'yield',
	'any',
	'boolean',
	'number',
	'string',
	'symbol'
];

class InsuranceModelValidationRulesChecker extends InsuranceModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.myWriter = FreLanguageEnvironment.getInstance().writer;
		this.typer = FreLanguageEnvironment.getInstance().typer;
		this.errorList = [];
	}
	execBeforeInsuranceProduct(modelelement) {
		let hasFatalError = false;
		if (modelelement.parts.length === 0) {
			this.errorList.push(new FreError("List 'parts' may not be empty", modelelement, modelelement.name, 'parts', FreErrorSeverity.NONE));
		}
		let uniqueNameInParts = [];
		modelelement.parts.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'parts' has no value`,
						modelelement.parts[index].referred,
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInParts.includes(elem.name)) {
					uniqueNameInParts.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${elem.name}") is not unique in list 'parts'`,
							modelelement.parts[index].referred,
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		let uniqueNameInHelpers = [];
		modelelement.helpers.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'helpers' has no value`,
						modelelement.helpers[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInHelpers.includes(elem.name)) {
					uniqueNameInHelpers.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'helpers'`,
							modelelement.helpers[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		return hasFatalError;
	}
	execBeforeMinusExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(modelelement.right);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforePlusExpression(modelelement) {
		let hasFatalError = false;
		return hasFatalError;
	}
	execBeforeMultiplyExpression(modelelement) {
		let hasFatalError = false;
		return hasFatalError;
	}
	execBeforeDivideExpression(modelelement) {
		let hasFatalError = false;
		return hasFatalError;
	}
	execBeforeBaseProduct(modelelement) {
		let hasFatalError = false;
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeInsurancePart(modelelement) {
		let hasFatalError = false;
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeCalcFunction(modelelement) {
		let hasFatalError = false;
		let uniqueNameInParameters = [];
		modelelement.parameters.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'parameters' has no value`,
						modelelement.parameters[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInParameters.includes(elem.name)) {
					uniqueNameInParameters.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'parameters'`,
							modelelement.parameters[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError(`El nombre '${self.name}' no es un identificador correcto.`, modelelement, modelelement.name, FreErrorSeverity.Error)
			);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeEntityAttribute(modelelement) {
		let hasFatalError = false;
		if (!(modelelement.numVal >= 12)) {
			this.errorList.push(new FreError("'numVal >= 12' is false", modelelement, 'unnamed', FreErrorSeverity.NONE));
		}
		if (!(modelelement.numVal <= 30)) {
			this.errorList.push(new FreError("'numVal <= 30' is false", modelelement, 'unnamed', FreErrorSeverity.NONE));
		}
		return hasFatalError;
	}
	isValidName(name) {
		if (!!!name) return false;
		if (/[0-9]/.test(name[0])) return false;
		if (/[.|,|!|?|@|~|%|^|&|*|-|=|+|(|)|{|}|"|'|:|;|<|>|?]/.test(name)) return false;
		if (/\\/.test(name)) return false;
		if (/[/|[|]]/.test(name)) return false;
		if (/[\t|\n|\r| ]/.test(name)) return false;
		return !reservedWordsInTypescript.includes(name);
	}
}

class InsuranceModelReferenceChecker extends InsuranceModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.myWriter = FreLanguageEnvironment.getInstance().writer;
		this.errorList = [];
		this.refSeparator = '/';
	}
	execBeforeFunctionCallExpression(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.funcDefinition && modelelement.funcDefinition.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.funcDefinition, 'funcDefinition', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeInsurancePartRef(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.part && modelelement.part.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.part, 'part', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeParameterRef(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.parameter && modelelement.parameter.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.parameter, 'parameter', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeGenericTypeDecl(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.kind && modelelement.kind.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.kind, 'kind', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeGenericLiteral(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.kind && modelelement.kind.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.kind, 'kind', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeEntity(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.baseEntity && modelelement.baseEntity.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.baseEntity, 'baseEntity', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeBaseProduct(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.theme && modelelement.theme.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.theme, 'theme', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeInsuranceProduct(modelelement) {
		let hasFatalError = false;
		for (const referredElem of modelelement.themes) {
			if (referredElem.referred === null) {
				this.makeErrorMessage(modelelement, referredElem, 'themes', `${modelelement.name}`);
				hasFatalError = true;
			}
		}
		if (!!modelelement.nrPremiumDays && modelelement.nrPremiumDays.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.nrPremiumDays, 'nrPremiumDays', `${modelelement.name}`);
			hasFatalError = true;
		}
		for (const referredElem of modelelement.parts) {
			if (referredElem.referred === null) {
				this.makeErrorMessage(modelelement, referredElem, 'parts', `${modelelement.name}`);
				hasFatalError = true;
			}
		}
		for (const referredElem of modelelement.basedOn) {
			if (referredElem.referred === null) {
				this.makeErrorMessage(modelelement, referredElem, 'basedOn', `${modelelement.name}`);
				hasFatalError = true;
			}
		}
		return hasFatalError;
	}
	execBeforeTypeRef(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.type && modelelement.type.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.type, 'type', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	makeErrorMessage(modelelement, referredElem, propertyName, locationDescription) {
		const scoper = FreLanguageEnvironment.getInstance().scoper;
		const possibles = scoper.getVisibleElements(modelelement).filter((elem) => elem.name === referredElem.name);
		if (possibles.length > 0) {
			this.errorList.push(
				new FreError(
					`Reference '${referredElem.pathnameToString(this.refSeparator)}' should have type '${referredElem.typeName}', but found type(s) [${possibles.map((elem) => `${elem.freLanguageConcept()}`).join(', ')}]`,
					modelelement,
					`${propertyName} of ${locationDescription}`,
					`${propertyName}`,
					FreErrorSeverity.Error
				)
			);
		} else {
			this.errorList.push(
				new FreError(
					`Cannot find reference '${referredElem.pathnameToString(this.refSeparator)}'`,
					modelelement,
					`${propertyName} of ${locationDescription}`,
					`${propertyName}`,
					FreErrorSeverity.Error
				)
			);
		}
	}
}

class InsuranceModelValidator {
	validate(modelelement, includeChildren = true) {
		const errorlist = [];
		const myWalker = new InsuranceModelWalker();
		let myChecker = new InsuranceModelNonOptionalsChecker();
		myChecker.errorList = errorlist;
		myWalker.myWorkers.push(myChecker);
		myChecker = new InsuranceModelReferenceChecker();
		myChecker.errorList = errorlist;
		myWalker.myWorkers.push(myChecker);
		myChecker = new InsuranceModelValidationRulesChecker();
		myChecker.errorList = errorlist;
		myWalker.myWorkers.push(myChecker);
		for (let checker of freonConfiguration.customValidations) {
			checker.errorList = errorlist;
			myWalker.myWorkers.push(checker);
		}
		myWalker.walk(modelelement, () => {
			return includeChildren;
		});
		return errorlist;
	}
}

var SeparatorType;
(function (SeparatorType) {
	SeparatorType['NONE'] = 'NONE';
	SeparatorType['Terminator'] = 'Terminator';
	SeparatorType['Separator'] = 'Separator';
	SeparatorType['Initiator'] = 'Initiator';
})(SeparatorType || (SeparatorType = {}));
class InsuranceModelModelUnitWriter {
	constructor() {
		this.output = [];
		this.currentLine = 0;
	}
	writeToString(modelelement, startIndent, short) {
		this.writeToLines(modelelement, startIndent, short);
		return `${this.output
			.map((line) => `${line.trimEnd()}`)
			.join('\n')
			.trimEnd()}`;
	}
	writeToLines(modelelement, startIndent, short) {
		if (startIndent === undefined) {
			startIndent = 0;
		}
		if (short === undefined) {
			short = false;
		}
		this.output = [];
		this.currentLine = 0;
		let indentString = '';
		for (let _i = 0; _i < startIndent; _i++) {
			indentString += ' ';
		}
		this.output[this.currentLine] = indentString;
		this.unparse(modelelement, short);
		return this.output;
	}
	writeNameOnly(modelelement) {
		if (!modelelement) {
			return '';
		}
		if (modelelement instanceof Part) {
			return modelelement.name;
		} else if (modelelement instanceof Product) {
			return modelelement.name;
		} else if (modelelement instanceof RiskAdjustmentRef) {
			return modelelement.name;
		} else if (modelelement instanceof AttributeRef) {
			return modelelement.name;
		} else if (modelelement instanceof RiskRef) {
			return modelelement.name;
		} else if (modelelement instanceof PayoutRef) {
			return modelelement.name;
		} else if (modelelement instanceof GenericKind) {
			return modelelement.name;
		} else if (modelelement instanceof Entity) {
			return modelelement.name;
		} else if (modelelement instanceof BaseProduct) {
			return modelelement.name;
		} else if (modelelement instanceof InsurancePart) {
			return modelelement.name;
		} else if (modelelement instanceof InsuranceProduct) {
			return modelelement.name;
		} else if (modelelement instanceof CalcFunction) {
			return modelelement.name;
		} else if (modelelement instanceof Parameter) {
			return modelelement.name;
		} else if (modelelement instanceof InsurancePartType) {
			return modelelement.name;
		} else if (modelelement instanceof PercentageType) {
			return modelelement.name;
		} else if (modelelement instanceof NumberType) {
			return modelelement.name;
		} else if (modelelement instanceof BooleanType) {
			return modelelement.name;
		} else if (modelelement instanceof EuroType) {
			return modelelement.name;
		} else if (modelelement instanceof InsuranceTheme) {
			return modelelement.name;
		} else if (modelelement instanceof PremiumDays) {
			return modelelement.name;
		} else {
			this.output = [];
			this.currentLine = 0;
			this.output[this.currentLine] = '';
			this.unparse(modelelement, true);
			return this.output[0].trimEnd();
		}
	}
	unparse(modelelement, short) {
		if (!modelelement) {
			return;
		}
		switch (modelelement.freLanguageConcept()) {
			case 'DocuExpression':
				this.unparseDocuExpression(modelelement, short);
				break;
			case 'Literal':
				this.unparseLiteral(modelelement, short);
				break;
			case 'EuroLiteral':
				this.unparseEuroLiteral(modelelement, short);
				break;
			case 'NumberLiteral':
				this.unparseNumberLiteral(modelelement, short);
				break;
			case 'PercentageLiteral':
				this.unparsePercentageLiteral(modelelement, short);
				break;
			case 'BooleanLiteral':
				this.unparseBooleanLiteral(modelelement, short);
				break;
			case 'BinaryExpression':
				this.unparseBinaryExpression(modelelement, short);
				break;
			case 'PlusExpression':
				this.unparsePlusExpression(modelelement, short);
				break;
			case 'MinusExpression':
				this.unparseMinusExpression(modelelement, short);
				break;
			case 'MultiplyExpression':
				this.unparseMultiplyExpression(modelelement, short);
				break;
			case 'DivideExpression':
				this.unparseDivideExpression(modelelement, short);
				break;
			case 'FunctionCallExpression':
				this.unparseFunctionCallExpression(modelelement, short);
				break;
			case 'InsurancePartRef':
				this.unparseInsurancePartRef(modelelement, short);
				break;
			case 'RiskAdjustmentRef':
				this.unparseRiskAdjustmentRef(modelelement, short);
				break;
			case 'ParameterRef':
				this.unparseParameterRef(modelelement, short);
				break;
			case 'AttributeRef':
				this.unparseAttributeRef(modelelement, short);
				break;
			case 'RiskRef':
				this.unparseRiskRef(modelelement, short);
				break;
			case 'PayoutRef':
				this.unparsePayoutRef(modelelement, short);
				break;
			case 'Text':
				this.unparseText(modelelement, short);
				break;
			case 'Text2':
				this.unparseText2(modelelement, short);
				break;
			case 'Text3':
				this.unparseText3(modelelement, short);
				break;
			case 'Text4':
				this.unparseText4(modelelement, short);
				break;
			case 'GenericKind':
				this.unparseGenericKind(modelelement, short);
				break;
			case 'GenericTypeDecl':
				this.unparseGenericTypeDecl(modelelement, short);
				break;
			case 'GenericLiteral':
				this.unparseGenericLiteral(modelelement, short);
				break;
			case 'Entity':
				this.unparseEntity(modelelement, short);
				break;
			case 'EntityAttribute':
				this.unparseEntityAttribute(modelelement, short);
				break;
			case 'BaseProduct':
				this.unparseBaseProduct(modelelement, short);
				break;
			case 'InsurancePart':
				this.unparseInsurancePart(modelelement, short);
				break;
			case 'InsuranceProduct':
				this.unparseInsuranceProduct(modelelement, short);
				break;
			case 'CalcFunction':
				this.unparseCalcFunction(modelelement, short);
				break;
			case 'Description':
				this.unparseDescription(modelelement, short);
				break;
			case 'Parameter':
				this.unparseParameter(modelelement, short);
				break;
			case 'DocuType':
				this.unparseDocuType(modelelement, short);
				break;
			case 'InsurancePartType':
				this.unparseInsurancePartType(modelelement, short);
				break;
			case 'PercentageType':
				this.unparsePercentageType(modelelement, short);
				break;
			case 'NumberType':
				this.unparseNumberType(modelelement, short);
				break;
			case 'BooleanType':
				this.unparseBooleanType(modelelement, short);
				break;
			case 'EuroType':
				this.unparseEuroType(modelelement, short);
				break;
			case 'TypeRef':
				this.unparseTypeRef(modelelement, short);
				break;
			case 'InsuranceTheme':
				this.unparseInsuranceTheme(modelelement, short);
				break;
			case 'PremiumDays':
				this.unparsePremiumDays(modelelement, short);
				break;
			case 'Part':
				this.unparsePart(modelelement, short);
				break;
			case 'Product':
				this.unparseProduct(modelelement, short);
				break;
			case 'NamedType':
				this.unparseNamedType(modelelement, short);
				break;
		}
	}
	unparseEuroLiteral(modelelement, short) {
		this.output[this.currentLine] += `EUR `;
		this.output[this.currentLine] += `${modelelement.euros} `;
		this.output[this.currentLine] += `, `;
		this.output[this.currentLine] += `${modelelement.cents} `;
	}
	unparseNumberLiteral(modelelement, short) {
		this.output[this.currentLine] += `${modelelement.value} `;
	}
	unparsePercentageLiteral(modelelement, short) {
		this.output[this.currentLine] += `${modelelement.value} `;
		this.output[this.currentLine] += `% `;
	}
	unparseBooleanLiteral(modelelement, short) {
		if (modelelement.value) {
			this.output[this.currentLine] += `YES `;
		} else {
			this.output[this.currentLine] += `NO `;
		}
	}
	unparseFunctionCallExpression(modelelement, short) {
		this._unparseReference(modelelement.funcDefinition, short);
		this.output[this.currentLine] += `( `;
		this._unparseList(
			modelelement.args,
			', ',
			SeparatorType.Separator,
			false,
			this.output[this.currentLine].length,
			short,
			(modelelement, short) => this.unparse(modelelement, short)
		);
		this.output[this.currentLine] += `) `;
	}
	unparseInsurancePartRef(modelelement, short) {
		this._unparseReference(modelelement.part, short);
	}
	unparseRiskAdjustmentRef(modelelement, short) {
		this.output[this.currentLine] += `riskAdjustment `;
	}
	unparseParameterRef(modelelement, short) {
		this.output[this.currentLine].length;
		this._unparseReference(modelelement.parameter, short);
		if (!!modelelement.attribute) {
			this.output[this.currentLine] += `. `;
			this.unparse(modelelement.attribute, short);
		}
	}
	unparseRiskRef(modelelement, short) {
		this.output[this.currentLine] += `statisticalRisk `;
	}
	unparsePayoutRef(modelelement, short) {
		this.output[this.currentLine] += `maximumPayOut `;
	}
	unparseGenericLiteral(modelelement, short) {
		this._unparseReference(modelelement.kind, short);
		this.output[this.currentLine] += `\{ `;
		this._unparseList(
			modelelement.content,
			', ',
			SeparatorType.Separator,
			false,
			this.output[this.currentLine].length,
			short,
			(modelelement, short) => this.unparse(modelelement, short)
		);
		this.output[this.currentLine] += `} `;
	}
	unparseTypeRef(modelelement, short) {
		this._unparseReference(modelelement.type, short);
	}
	unparseGenericTypeDecl(modelelement, short) {
		this._unparseReference(modelelement.kind, short);
		this.output[this.currentLine] += `< `;
		this.unparse(modelelement.baseType, short);
		this.output[this.currentLine] += `> `;
	}
	unparseText(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `This is `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 8);
			this.output[this.currentLine] += `literal text `;
			this.newlineAndIndentation(blockIndent + 6);
			this.output[this.currentLine] += `that is projected in the `;
			this.newlineAndIndentation(blockIndent + 16);
			this.output[this.currentLine] += `editor `;
			this.newlineAndIndentation(blockIndent + 2);
			this.output[this.currentLine] += `for every concept of type Text. `;
		}
	}
	unparseText2(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `This is `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 8);
			this.output[this.currentLine] += `literal text `;
			this.newlineAndIndentation(blockIndent + 6);
			this.output[this.currentLine] += `that is projected in the `;
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += '';
			this.newlineAndIndentation(blockIndent + 16);
			this.output[this.currentLine] += `editor `;
			this.newlineAndIndentation(blockIndent + 2);
			this.output[this.currentLine] += `for every concept of type Text. `;
		}
	}
	unparseText3(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `This is `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 8);
			this.output[this.currentLine] += `literal text `;
			this.newlineAndIndentation(blockIndent + 3);
			this.output[this.currentLine] += `that is projected in the `;
			this.newlineAndIndentation(blockIndent + 11);
			this.output[this.currentLine] += `editor `;
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `for every concept of type Text. `;
		}
	}
	unparseText4(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `This is `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 8);
			this.output[this.currentLine] += `literal text `;
			this.newlineAndIndentation(blockIndent + 3);
			this.output[this.currentLine] += `that is projected in the `;
			this.newlineAndIndentation(blockIndent + 11);
			this.output[this.currentLine] += `editor `;
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `for every concept of type Text. `;
		}
	}
	unparsePart(modelelement, short) {
		this.unparse(modelelement.part, short);
	}
	unparseProduct(modelelement, short) {
		this.unparse(modelelement.product, short);
	}
	unparseBaseProduct(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Base Products `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `for `;
		this._unparseReference(modelelement.theme, short);
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `is still under construction: `;
			if (modelelement.isUnderConstruction) {
				this.output[this.currentLine] += `YES `;
			} else {
				this.output[this.currentLine] += `NO `;
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `is approved level1: `;
			if (modelelement.isApprovedLevel1) {
				this.output[this.currentLine] += `Sure `;
			} else {
				this.output[this.currentLine] += `NoWay `;
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `is approved level2: `;
			if (modelelement.isApprovedLevel2) {
				this.output[this.currentLine] += `YES `;
			} else {
				this.output[this.currentLine] += `NO `;
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `is approved level3: `;
			if (modelelement.isApprovedLevel3) {
				this.output[this.currentLine] += `YES `;
			} else {
				this.output[this.currentLine] += `NO `;
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `yields profit: `;
			if (modelelement.yieldsProfit) {
				this.output[this.currentLine] += `Plenty `;
			} else {
				this.output[this.currentLine] += `Little `;
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `expected nr of use: `;
			this.output[this.currentLine] += `${modelelement.nrOfUse} `;
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `range: `;
			this.output[this.currentLine] += `${modelelement.range} `;
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += '';
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += '';
			this.newlineAndIndentation(blockIndent + 4);
			this._unparseList(
				modelelement.parts,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
		}
	}
	unparseInsurancePart(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Insurance Part `;
		this.output[this.currentLine] += `${modelelement.name} `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `risk assessment: `;
			this.unparse(modelelement.statisticalRisk, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `maximum payout: `;
			this.unparse(modelelement.maximumPayOut, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `is approved: `;
			if (modelelement.isApproved) {
				this.output[this.currentLine] += `JA `;
			} else {
				this.output[this.currentLine] += `NEE `;
			}
		}
	}
	unparseInsuranceProduct(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Insurance Product `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `( public name: `;
		this.output[this.currentLine] += `"${modelelement.productName}" `;
		this.output[this.currentLine] += `) USES `;
		this._unparseReferenceList(modelelement.basedOn, ', ', SeparatorType.Separator, false, this.output[this.currentLine].length, short);
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `Themes: `;
			this._unparseReferenceList(modelelement.themes, ', ', SeparatorType.Separator, false, this.output[this.currentLine].length, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `Premium: `;
			this.unparse(modelelement.advertisedPremium, short);
			this.output[this.currentLine] += `per `;
			this._unparseReference(modelelement.nrPremiumDays, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `Insured risks: `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseReferenceList(modelelement.parts, '; ', SeparatorType.Terminator, true, this.output[this.currentLine].length, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `Calculation `;
			if (!!modelelement.riskAdjustment) {
				this.newlineAndIndentation(blockIndent + 8 + -4);
				this.output[this.currentLine] += `Risk adjusted by = `;
				this.unparse(modelelement.riskAdjustment, short);
			}
			this.newlineAndIndentation(blockIndent + 8);
			this.output[this.currentLine] += `calculated premium: `;
			this.unparse(modelelement.calculation, short);
			if (!!modelelement.helpers && modelelement.helpers.length > 0) {
				this.newlineAndIndentation(blockIndent + 4 + 0);
				this.output[this.currentLine] += `Helper functions: `;
				this._unparseList(
					modelelement.helpers,
					'',
					SeparatorType.Separator,
					true,
					this.output[this.currentLine].length,
					short,
					(modelelement, short) => this.unparse(modelelement, short)
				);
			}
		}
	}
	unparseCalcFunction(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `( `;
		this._unparseList(
			modelelement.parameters,
			', ',
			SeparatorType.Separator,
			false,
			this.output[this.currentLine].length,
			short,
			(modelelement, short) => this.unparse(modelelement, short)
		);
		this.output[this.currentLine] += `): `;
		this.unparse(modelelement.declaredType, short);
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.unparse(modelelement.body, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseDescription(modelelement, short) {
		this.output[this.currentLine] += `"${modelelement.content}" `;
	}
	unparseParameter(modelelement, short) {
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `: `;
		this.unparse(modelelement.declaredType, short);
	}
	unparseEntity(modelelement, short) {
		if (modelelement.isCompany) {
			this.output[this.currentLine] += `COMPANY `;
		} else {
			this.output[this.currentLine] += ` `;
		}
		this.output[this.currentLine] += `${modelelement.name} `;
	}
	unparseEntityAttribute(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `EntityAttribute `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `numVal `;
			this.output[this.currentLine] += `${modelelement.numVal} `;
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseMinusExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '- ';
		this.unparse(modelelement.right, short);
	}
	unparsePlusExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '+ ';
		this.unparse(modelelement.right, short);
	}
	unparseMultiplyExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '* ';
		this.unparse(modelelement.right, short);
	}
	unparseDivideExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '/ ';
		this.unparse(modelelement.right, short);
	}
	unparseGenericKind(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseInsurancePartType(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparsePercentageType(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseNumberType(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseBooleanType(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseEuroType(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseInsuranceTheme(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparsePremiumDays(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseDocuExpression(modelelement, short) {
		throw new Error('Method unparseDocuExpression should be implemented by its (concrete) subclasses.');
	}
	unparseLiteral(modelelement, short) {
		throw new Error('Method unparseLiteral should be implemented by its (concrete) subclasses.');
	}
	unparseBinaryExpression(modelelement, short) {
		throw new Error('Method unparseBinaryExpression should be implemented by its (concrete) subclasses.');
	}
	unparseAttributeRef(modelelement, short) {
		throw new Error('Method unparseAttributeRef should be implemented by its (concrete) subclasses.');
	}
	unparseDocuType(modelelement, short) {
		throw new Error('Method unparseDocuType should be implemented by its (concrete) subclasses.');
	}
	unparseNamedType(modelelement, short) {
		throw new Error('Method unparseNamedType should be implemented by the classes that implement it.');
	}
	_unparseReference(modelelement, short) {
		if (!!modelelement) {
			const type = modelelement?.referred;
			if (!!type) {
				if (type instanceof GenericKind) {
					this.unparseGenericKind(type, short);
				} else if (type instanceof InsurancePartType) {
					this.unparseInsurancePartType(type, short);
				} else if (type instanceof PercentageType) {
					this.unparsePercentageType(type, short);
				} else if (type instanceof NumberType) {
					this.unparseNumberType(type, short);
				} else if (type instanceof BooleanType) {
					this.unparseBooleanType(type, short);
				} else if (type instanceof EuroType) {
					this.unparseEuroType(type, short);
				} else if (type instanceof InsuranceTheme) {
					this.unparseInsuranceTheme(type, short);
				} else if (type instanceof PremiumDays) {
					this.unparsePremiumDays(type, short);
				} else {
					this.output[this.currentLine] += modelelement.pathnameToString(':') + ' ';
				}
			} else {
				this.output[this.currentLine] += modelelement.pathnameToString(':') + ' ';
			}
		}
	}
	_unparseList(list, sepText, sepType, vertical, indent, short, method) {
		list.forEach((listElem, index) => {
			const isLastInList = index === list.length - 1;
			this.doInitiator(sepText, sepType);
			method(listElem, short);
			this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
		});
	}
	_unparseReferenceList(list, sepText, sepType, vertical, indent, short) {
		list.forEach((listElem, index) => {
			const isLastInList = index === list.length - 1;
			this.doInitiator(sepText, sepType);
			this._unparseReference(listElem, short);
			this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
		});
	}
	_unparseListOfPrimitiveValues(list, isIdentifier, sepText, sepType, vertical, indent, short) {
		if (!!list) {
			list.forEach((listElem, index) => {
				const isLastInList = index === list.length - 1;
				if (typeof listElem === 'string' && !isIdentifier) {
					this.output[this.currentLine] += `"${listElem}"`;
				} else {
					this.output[this.currentLine] += `${listElem}`;
				}
				this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
			});
		}
	}
	doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent) {
		this.output[this.currentLine] = this.output[this.currentLine].trimEnd();
		if (!vertical && (!sepText || sepText.length == 0)) {
			sepText = ' ';
		}
		switch (sepType) {
			case SeparatorType.Separator: {
				if (!isLastInList) {
					this.output[this.currentLine] += sepText;
				}
				break;
			}
			case SeparatorType.Terminator: {
				this.output[this.currentLine] += sepText;
				break;
			}
			case SeparatorType.Initiator: {
				break;
			}
			case SeparatorType.NONE: {
				if (!vertical) {
					this.output[this.currentLine] += ' ';
				}
				break;
			}
		}
		if (vertical && !isLastInList) {
			if (!short) {
				this.newlineAndIndentation(indent);
			} else {
				this.output[this.currentLine] += ` ...`;
			}
		} else if (isLastInList) {
			if (this.output[this.currentLine][this.output[this.currentLine].length - 1] !== ' ') {
				this.output[this.currentLine] += ` `;
			}
		}
	}
	newlineAndIndentation(indent) {
		this.currentLine += 1;
		let indentation = '';
		for (let _i = 0; _i < indent; _i++) {
			indentation += ' ';
		}
		this.output[this.currentLine] = indentation;
	}
	doInitiator(sepText, sepType) {
		if (sepType === SeparatorType.Initiator) {
			this.output[this.currentLine] += sepText;
		}
	}
}

const InsuranceModelGrammarStr = `
namespace InsuranceModelLanguage
grammar InsuranceModelGrammar {

// rules for "Part"
Part = BaseProduct ;

BaseProduct = 'Base' 'Products' identifier 'for' InsuranceTheme
	 'is' 'still' 'under' 'construction:' booleanLiteral
	 'is' 'approved' 'level1:' ( 'Sure' | 'NoWay' )
	 'is' 'approved' 'level2:' booleanLiteral
	 'is' 'approved' 'level3:' booleanLiteral
	 'yields' 'profit:' ( 'Plenty' | 'Little' )
	 'expected' 'nr' 'of' 'use:' numberLiteral
	 'range:' numberLiteral
	 InsurancePart* ;

InsurancePart = 'Insurance' 'Part' identifier
	 'risk' 'assessment:' PercentageLiteral
	 'maximum' 'payout:' EuroLiteral
	 'is' 'approved:' ( 'JA' | 'NEE' ) ;

// rules for "Product"
Product = InsuranceProduct ;

InsuranceProduct = 'Insurance' 'Product' identifier '(' 'public' 'name:' stringLiteral ')' 'USES' [ __fre_reference / ',' ]*
	 'Themes:' [ InsuranceTheme / ',' ]*
	 'Premium:' EuroLiteral 'per' PremiumDays
	 'Insured' 'risks:'
	 ( __fre_reference ';' )*
	 'Calculation'
	 ( 'Risk' 'adjusted' 'by' '=' PercentageLiteral )?
	 'calculated' 'premium:' DocuExpression
	 ( 'Helper' 'functions:' CalcFunction* )? ;

NumberLiteral = numberLiteral ;

BooleanLiteral = booleanLiteral ;

FunctionCallExpression = __fre_reference '(' [ DocuExpression / ',' ]* ')' ;

InsurancePartRef = __fre_reference ;

RiskAdjustmentRef = 'riskAdjustment' ;

ParameterRef = __fre_reference ( '.' AttributeRef )? ;

RiskRef = 'statisticalRisk' ;

PayoutRef = 'maximumPayOut' ;

GenericLiteral = GenericKind '\{' [ DocuExpression / ',' ]* '}' ;

CalcFunction = identifier '(' [ Parameter / ',' ]* '):' DocuType '\{'
	 DocuExpression
	 '}' ;

Description = stringLiteral ;

GenericTypeDecl = GenericKind '<' DocuType '>' ;

TypeRef = __fre_reference ;

Parameter = identifier ':' DocuType ;

DocuExpression = Literal 
    | FunctionCallExpression 
    | InsurancePartRef 
    | ParameterRef 
    | GenericLiteral 
    | RiskAdjustmentRef 
    | __fre_binary_DocuExpression ;

Literal = EuroLiteral 
    | NumberLiteral 
    | PercentageLiteral 
    | BooleanLiteral  ;

AttributeRef = RiskRef 
    | PayoutRef  ;

DocuType = GenericTypeDecl 
    | TypeRef  ;

__fre_binary_DocuExpression = [DocuExpression / __fre_binary_operator]2+ ;
leaf __fre_binary_operator = '+' | '-' | '*' | '/' ;

GenericKind = 'Set'
	| 'Sequence'
	| 'Bag'
	| 'Collection' ;

PremiumDays = 'Week'
	| 'Month'
	| 'Quarter'
	| 'Semester'
	| 'Year' ;

// common rules
PercentageLiteral = numberLiteral '%' ;

EuroLiteral = 'EUR' numberLiteral ',' numberLiteral ;

InsuranceTheme = 'HomeTheme'
	| 'HealthTheme'
	| 'LegalTheme' ;

__fre_reference = [ identifier / ':' ]+ ;

// white space and comments
skip WHITE_SPACE = "\\s+" ;
skip SINGLE_LINE_COMMENT = "//[^\\r\\n]*" ;
skip MULTI_LINE_COMMENT = "/\\*[^*]*\\*+(?:[^*/][^*]*\\*+)*/" ;

// the predefined basic types
leaf identifier          = "[a-zA-Z_][a-zA-Z0-9_]*" ;
/* see https://stackoverflow.com/questions/37032620/regex-for-matching-a-string-literal-in-java */
leaf stringLiteral       = '"' "[^\\"\\\\]*(\\\\.[^\\"\\\\]*)*" '"' ;
leaf numberLiteral       = "[0-9]+";
leaf booleanLiteral      = 'NO' | 'YES';

}`;

class PartSyntaxAnalyserPart {
	constructor(mainAnalyser) {
		this.mainAnalyser = mainAnalyser;
	}
	transformPart(branch) {
		let __part;
		const children = this.mainAnalyser.getChildren(branch);
		__part = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		return Part.create({
			part: __part,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformBaseProduct(branch) {
		let __name;
		let __theme;
		let __isUnderConstruction;
		let __isApprovedLevel1;
		let __isApprovedLevel2;
		let __isApprovedLevel3;
		let __yieldsProfit;
		let __nrOfUse;
		let __range;
		let __parts;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]);
		__theme = this.mainAnalyser.freNodeRef(children[4], 'InsuranceTheme');
		__isUnderConstruction = this.mainAnalyser.transformSharedPackedParseTreeNode(children[9]);
		if (children[13].nonSkipMatchedText === 'Sure') {
			__isApprovedLevel1 = true;
		} else if (children[13].nonSkipMatchedText === 'NoWay') {
			__isApprovedLevel1 = false;
		}
		__isApprovedLevel2 = this.mainAnalyser.transformSharedPackedParseTreeNode(children[17]);
		__isApprovedLevel3 = this.mainAnalyser.transformSharedPackedParseTreeNode(children[21]);
		if (children[24].nonSkipMatchedText === 'Plenty') {
			__yieldsProfit = true;
		} else if (children[24].nonSkipMatchedText === 'Little') {
			__yieldsProfit = false;
		}
		__nrOfUse = this.mainAnalyser.transformSharedPackedParseTreeNode(children[29]);
		__range = this.mainAnalyser.transformSharedPackedParseTreeNode(children[31]);
		if (children[32].name !== 'InsurancePart') {
			__parts = this.mainAnalyser.transformSharedPackedParseTreeList(children[32]);
		} else {
			__parts = [];
			for (const child of children) {
				__parts.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
			}
		}
		return BaseProduct.create({
			name: __name,
			theme: __theme,
			isUnderConstruction: __isUnderConstruction,
			isApprovedLevel1: __isApprovedLevel1,
			isApprovedLevel2: __isApprovedLevel2,
			isApprovedLevel3: __isApprovedLevel3,
			yieldsProfit: __yieldsProfit,
			nrOfUse: __nrOfUse,
			range: __range,
			parts: __parts,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformInsurancePart(branch) {
		let __name;
		let __statisticalRisk;
		let __maximumPayOut;
		let __isApproved;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]);
		__statisticalRisk = this.mainAnalyser.transformSharedPackedParseTreeNode(children[5]);
		__maximumPayOut = this.mainAnalyser.transformSharedPackedParseTreeNode(children[8]);
		if (children[11].nonSkipMatchedText === 'JA') {
			__isApproved = true;
		} else if (children[11].nonSkipMatchedText === 'NEE') {
			__isApproved = false;
		}
		return InsurancePart.create({
			name: __name,
			statisticalRisk: __statisticalRisk,
			maximumPayOut: __maximumPayOut,
			isApproved: __isApproved,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
}

class ProductSyntaxAnalyserPart {
	constructor(mainAnalyser) {
		this.mainAnalyser = mainAnalyser;
	}
	transformProduct(branch) {
		let __product;
		const children = this.mainAnalyser.getChildren(branch);
		__product = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		return Product.create({
			product: __product,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformInsuranceProduct(branch) {
		let __name;
		let __productName;
		let __basedOn;
		let __themes;
		let __advertisedPremium;
		let __nrPremiumDays;
		let __parts;
		let __riskAdjustment;
		let __calculation;
		let __helpers;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]);
		__productName = this.mainAnalyser.transformSharedPackedParseTreeNode(children[6]);
		__basedOn = this.mainAnalyser.transformSharedPackedParseTreeRefList(children[9], 'BaseProduct', ',');
		__themes = this.mainAnalyser.transformSharedPackedParseTreeRefList(children[11], 'InsuranceTheme', ',');
		__advertisedPremium = this.mainAnalyser.transformSharedPackedParseTreeNode(children[13]);
		__nrPremiumDays = this.mainAnalyser.freNodeRef(children[15], 'PremiumDays');
		__parts = [];
		const _myList = this.mainAnalyser.getChildren(children[18]);
		_myList.forEach((subNode) => {
			const _transformed = this.mainAnalyser.freNodeRef(subNode.nonSkipChildren?.toArray()[0], 'InsurancePart');
			if (!!_transformed) {
				__parts.push(_transformed);
			}
		});
		if (!children[20].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[20]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__riskAdjustment = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[4]);
		}
		__calculation = this.mainAnalyser.transformSharedPackedParseTreeNode(children[23]);
		if (!children[24].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[24]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			if (children[2].name !== 'CalcFunction') {
				__helpers = this.mainAnalyser.transformSharedPackedParseTreeList(_propItem[2]);
			} else {
				__helpers = [];
				for (const child of children) {
					__helpers.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
				}
			}
		}
		return InsuranceProduct.create({
			name: __name,
			productName: __productName,
			basedOn: __basedOn,
			themes: __themes,
			advertisedPremium: __advertisedPremium,
			nrPremiumDays: __nrPremiumDays,
			parts: __parts,
			riskAdjustment: __riskAdjustment,
			calculation: __calculation,
			helpers: __helpers,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformNumberLiteral(branch) {
		let __value;
		const children = this.mainAnalyser.getChildren(branch);
		__value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		return NumberLiteral.create({
			value: __value,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformBooleanLiteral(branch) {
		let __value;
		const children = this.mainAnalyser.getChildren(branch);
		__value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		return BooleanLiteral.create({
			value: __value,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformFunctionCallExpression(branch) {
		let __funcDefinition;
		let __args;
		const children = this.mainAnalyser.getChildren(branch);
		__funcDefinition = this.mainAnalyser.freNodeRef(children[0], 'CalcFunction');
		__args = this.mainAnalyser.transformSharedPackedParseTreeList(children[2], ',');
		return FunctionCallExpression.create({
			funcDefinition: __funcDefinition,
			args: __args,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformInsurancePartRef(branch) {
		let __part;
		const children = this.mainAnalyser.getChildren(branch);
		__part = this.mainAnalyser.freNodeRef(children[0], 'InsurancePart');
		return InsurancePartRef.create({
			part: __part,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformRiskAdjustmentRef(branch) {
		this.mainAnalyser.getChildren(branch);
		return RiskAdjustmentRef.create({
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformParameterRef(branch) {
		let __parameter;
		let __attribute;
		const children = this.mainAnalyser.getChildren(branch);
		__parameter = this.mainAnalyser.freNodeRef(children[0], 'Parameter');
		if (!children[1].isEmptyMatch) {
			const _optGroup = this.mainAnalyser.getGroup(children[1]);
			const _propItem = this.mainAnalyser.getChildren(_optGroup);
			__attribute = this.mainAnalyser.transformSharedPackedParseTreeNode(_propItem[1]);
		}
		return ParameterRef.create({
			parameter: __parameter,
			attribute: __attribute,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformRiskRef(branch) {
		this.mainAnalyser.getChildren(branch);
		return RiskRef.create({
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformPayoutRef(branch) {
		this.mainAnalyser.getChildren(branch);
		return PayoutRef.create({
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformGenericLiteral(branch) {
		let __kind;
		let __content;
		const children = this.mainAnalyser.getChildren(branch);
		__kind = this.mainAnalyser.freNodeRef(children[0], 'GenericKind');
		__content = this.mainAnalyser.transformSharedPackedParseTreeList(children[2], ',');
		return GenericLiteral.create({
			kind: __kind,
			content: __content,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformCalcFunction(branch) {
		let __name;
		let __parameters;
		let __declaredType;
		let __body;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		__parameters = this.mainAnalyser.transformSharedPackedParseTreeList(children[2], ',');
		__declaredType = this.mainAnalyser.transformSharedPackedParseTreeNode(children[4]);
		__body = this.mainAnalyser.transformSharedPackedParseTreeNode(children[6]);
		return CalcFunction.create({
			name: __name,
			parameters: __parameters,
			declaredType: __declaredType,
			body: __body,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformDescription(branch) {
		let __content;
		const children = this.mainAnalyser.getChildren(branch);
		__content = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		return Description.create({
			content: __content,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformGenericTypeDecl(branch) {
		let __kind;
		let __baseType;
		const children = this.mainAnalyser.getChildren(branch);
		__kind = this.mainAnalyser.freNodeRef(children[0], 'GenericKind');
		__baseType = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]);
		return GenericTypeDecl.create({
			kind: __kind,
			baseType: __baseType,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformTypeRef(branch) {
		let __type;
		const children = this.mainAnalyser.getChildren(branch);
		__type = this.mainAnalyser.freNodeRef(children[0], 'NamedType');
		return TypeRef.create({
			type: __type,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformParameter(branch) {
		let __name;
		let __declaredType;
		const children = this.mainAnalyser.getChildren(branch);
		__name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		__declaredType = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]);
		return Parameter.create({
			name: __name,
			declaredType: __declaredType,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformDocuExpression(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transformLiteral(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transformAttributeRef(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transformDocuType(branch) {
		return this.mainAnalyser.transformSharedPackedParseTreeNode(branch.nonSkipChildren.toArray()[0]);
	}
	transform__fre_binary_DocuExpression(branch) {
		const children = branch.nonSkipChildren.toArray();
		let index = 0;
		let first = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
		while (index < children.length) {
			let operator = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
			let second = this.mainAnalyser.transformSharedPackedParseTreeNode(children[index++]);
			let combined = null;
			switch (operator) {
				case '+': {
					combined = PlusExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case '-': {
					combined = MinusExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case '*': {
					combined = MultiplyExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				case '/': {
					combined = DivideExpression.create({ left: first, right: second, parseLocation: this.mainAnalyser.location(branch) });
					break;
				}
				default: {
					combined = null;
				}
			}
			first = combined;
		}
		return first;
	}
	transformGenericKind(branch) {
		const choice = branch.nonSkipMatchedText;
		if (choice === 'Set') {
			return GenericKind.Set;
		} else if (choice === 'Sequence') {
			return GenericKind.Sequence;
		} else if (choice === 'Bag') {
			return GenericKind.Bag;
		} else if (choice === 'Collection') {
			return GenericKind.Collection;
		} else {
			return null;
		}
	}
	transformPremiumDays(branch) {
		const choice = branch.nonSkipMatchedText;
		if (choice === 'Week') {
			return PremiumDays.Week;
		} else if (choice === 'Month') {
			return PremiumDays.Month;
		} else if (choice === 'Quarter') {
			return PremiumDays.Quarter;
		} else if (choice === 'Semester') {
			return PremiumDays.Semester;
		} else if (choice === 'Year') {
			return PremiumDays.Year;
		} else {
			return null;
		}
	}
}

class InsuranceModelCommonSyntaxAnalyserPart {
	constructor(mainAnalyser) {
		this.mainAnalyser = mainAnalyser;
	}
	transformPercentageLiteral(branch) {
		let __value;
		const children = this.mainAnalyser.getChildren(branch);
		__value = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]);
		return PercentageLiteral.create({
			value: __value,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformEuroLiteral(branch) {
		let __euros;
		let __cents;
		const children = this.mainAnalyser.getChildren(branch);
		__euros = this.mainAnalyser.transformSharedPackedParseTreeNode(children[1]);
		__cents = this.mainAnalyser.transformSharedPackedParseTreeNode(children[3]);
		return EuroLiteral.create({
			euros: __euros,
			cents: __cents,
			parseLocation: this.mainAnalyser.location(branch)
		});
	}
	transformInsuranceTheme(branch) {
		const choice = branch.nonSkipMatchedText;
		if (choice === 'HomeTheme') {
			return InsuranceTheme.HomeTheme;
		} else if (choice === 'HealthTheme') {
			return InsuranceTheme.HealthTheme;
		} else if (choice === 'LegalTheme') {
			return InsuranceTheme.LegalTheme;
		} else {
			return null;
		}
	}
}

class InsuranceModelSemanticAnalysisWalker extends InsuranceModelDefaultWorker {
	constructor(changesToBeMade) {
		super();
		this.changesToBeMade = null;
		this.changesToBeMade = changesToBeMade;
	}
	execBeforeFunctionCallExpression(modelelement) {
		let referredElem;
		referredElem = modelelement.funcDefinition;
		if (!!modelelement.funcDefinition && modelelement.funcDefinition.referred === null) {
			this.findReplacement(modelelement, referredElem);
		}
		return false;
	}
	execBeforeParameterRef(modelelement) {
		let referredElem;
		referredElem = modelelement.parameter;
		if (!!modelelement.parameter && modelelement.parameter.referred === null) {
			this.findReplacement(modelelement, referredElem);
		}
		return false;
	}
	execBeforeInsurancePartRef(modelelement) {
		let referredElem;
		referredElem = modelelement.part;
		if (!!modelelement.part && modelelement.part.referred === null) {
			this.findReplacement(modelelement, referredElem);
		}
		return false;
	}
	findReplacement(modelelement, referredElem) {
		const scoper = FreLanguageEnvironment.getInstance().scoper;
		const possibles = scoper.getVisibleElements(modelelement).filter((elem) => elem.name === referredElem.name);
		if (possibles.length > 0) {
			let replacement = null;
			for (const elem of possibles) {
				const metatype = elem.freLanguageConcept();
				if (FreLanguage.getInstance().metaConformsToType(elem, 'CalcFunction')) {
					replacement = FunctionCallExpression.create({
						funcDefinition: FreNodeReference.create(referredElem.name, metatype)
					});
				} else if (FreLanguage.getInstance().metaConformsToType(elem, 'Parameter')) {
					replacement = ParameterRef.create({ parameter: FreNodeReference.create(referredElem.name, metatype) });
				} else if (FreLanguage.getInstance().metaConformsToType(elem, 'InsurancePart')) {
					replacement = InsurancePartRef.create({ part: FreNodeReference.create(referredElem.name, metatype) });
				} else {
					throw new Error('Semantic analysis error: cannot replace reference: ' + referredElem.name + ' of type ' + metatype + '.');
				}
			}
			this.changesToBeMade.set(modelelement, replacement);
		}
	}
}

class InsuranceModelSemanticAnalyser {
	correct(modelunit) {
		let changesToBeMade = new Map();
		const myWalker = new InsuranceModelWalker();
		let myCorrector = new InsuranceModelSemanticAnalysisWalker(changesToBeMade);
		myWalker.myWorkers.push(myCorrector);
		myWalker.walk(modelunit, () => {
			return true;
		});
		for (const [toBeReplaced, newObject] of changesToBeMade) {
			const myType = FreLanguage.getInstance().concept(toBeReplaced.freLanguageConcept());
			myType.properties.forEach((prop) => {
				if (prop.type !== 'boolean' && !!toBeReplaced[prop.name]) {
					newObject[prop.name] = toBeReplaced[prop.name];
				}
			});
			let parent = toBeReplaced.freOwnerDescriptor().owner;
			const propName = toBeReplaced.freOwnerDescriptor().propertyName;
			const propIndex = toBeReplaced.freOwnerDescriptor().propertyIndex;
			if (propIndex !== undefined) {
				parent[propName].splice(propIndex, 1, newObject);
			} else {
				parent[propName] = newObject;
			}
		}
	}
}

class InsuranceModelSyntaxAnalyser {
	constructor() {
		this.sourceName = '';
		this._unit_Part_analyser = new PartSyntaxAnalyserPart(this);
		this._unit_Product_analyser = new ProductSyntaxAnalyserPart(this);
		this._unit_common_analyser = new InsuranceModelCommonSyntaxAnalyserPart(this);
	}
	clear() {
		throw new Error('Method not implemented.');
	}
	transform(sppt) {
		if (!!sppt.root) {
			return this.transformSharedPackedParseTreeNode(sppt.root);
		} else {
			return null;
		}
	}
	transformSharedPackedParseTreeNode(node) {
		if (!!node) {
			try {
				if (node.isLeaf) {
					return this.transformSharedPackedParseTreeLeaf(node);
				} else if (node.isBranch) {
					return this.transformSharedPackedParseTreeBranch(node);
				}
			} catch (e) {
				if (e.message.startsWith('Syntax error in ') || e.message.startsWith('Error in InsuranceModelSyntaxAnalyser')) {
					throw e;
				} else {
					throw new Error(
						`Syntax error in "${this.sourceName} (line: ${node.location.line}, column: ${node.location.column})": ${e.message}`
					);
				}
			}
		} else {
			return null;
		}
	}
	transformSharedPackedParseTreeLeaf(node) {
		let tmp = (node?.nonSkipMatchedText).trim();
		if (tmp.length > 0) {
			if (tmp.startsWith('"')) {
				tmp = tmp.slice(1, tmp.length - 1);
				return tmp;
			} else if (tmp == 'NO') {
				return false;
			} else if (tmp == 'YES') {
				return true;
			} else if (Number.isInteger(parseInt(tmp, 10))) {
				return parseInt(tmp, 10);
			} else {
				return tmp;
			}
		}
		return null;
	}
	transformSharedPackedParseTreeBranch(branch) {
		const brName = branch.name;
		if ('Part' === brName) {
			return this._unit_Part_analyser.transformPart(branch);
		} else if ('BaseProduct' === brName) {
			return this._unit_Part_analyser.transformBaseProduct(branch);
		} else if ('InsurancePart' === brName) {
			return this._unit_Part_analyser.transformInsurancePart(branch);
		} else if ('Product' === brName) {
			return this._unit_Product_analyser.transformProduct(branch);
		} else if ('InsuranceProduct' === brName) {
			return this._unit_Product_analyser.transformInsuranceProduct(branch);
		} else if ('NumberLiteral' === brName) {
			return this._unit_Product_analyser.transformNumberLiteral(branch);
		} else if ('BooleanLiteral' === brName) {
			return this._unit_Product_analyser.transformBooleanLiteral(branch);
		} else if ('FunctionCallExpression' === brName) {
			return this._unit_Product_analyser.transformFunctionCallExpression(branch);
		} else if ('InsurancePartRef' === brName) {
			return this._unit_Product_analyser.transformInsurancePartRef(branch);
		} else if ('RiskAdjustmentRef' === brName) {
			return this._unit_Product_analyser.transformRiskAdjustmentRef(branch);
		} else if ('ParameterRef' === brName) {
			return this._unit_Product_analyser.transformParameterRef(branch);
		} else if ('RiskRef' === brName) {
			return this._unit_Product_analyser.transformRiskRef(branch);
		} else if ('PayoutRef' === brName) {
			return this._unit_Product_analyser.transformPayoutRef(branch);
		} else if ('GenericLiteral' === brName) {
			return this._unit_Product_analyser.transformGenericLiteral(branch);
		} else if ('CalcFunction' === brName) {
			return this._unit_Product_analyser.transformCalcFunction(branch);
		} else if ('Description' === brName) {
			return this._unit_Product_analyser.transformDescription(branch);
		} else if ('GenericTypeDecl' === brName) {
			return this._unit_Product_analyser.transformGenericTypeDecl(branch);
		} else if ('TypeRef' === brName) {
			return this._unit_Product_analyser.transformTypeRef(branch);
		} else if ('Parameter' === brName) {
			return this._unit_Product_analyser.transformParameter(branch);
		} else if ('DocuExpression' === brName) {
			return this._unit_Product_analyser.transformDocuExpression(branch);
		} else if ('Literal' === brName) {
			return this._unit_Product_analyser.transformLiteral(branch);
		} else if ('AttributeRef' === brName) {
			return this._unit_Product_analyser.transformAttributeRef(branch);
		} else if ('DocuType' === brName) {
			return this._unit_Product_analyser.transformDocuType(branch);
		} else if ('__fre_binary_DocuExpression' === brName) {
			return this._unit_Product_analyser.transform__fre_binary_DocuExpression(branch);
		} else if ('GenericKind' === brName) {
			return this._unit_Product_analyser.transformGenericKind(branch);
		} else if ('PremiumDays' === brName) {
			return this._unit_Product_analyser.transformPremiumDays(branch);
		} else if ('PercentageLiteral' === brName) {
			return this._unit_common_analyser.transformPercentageLiteral(branch);
		} else if ('EuroLiteral' === brName) {
			return this._unit_common_analyser.transformEuroLiteral(branch);
		} else if ('InsuranceTheme' === brName) {
			return this._unit_common_analyser.transformInsuranceTheme(branch);
		} else if ('__fre_reference' === brName) {
			return this.transform__fre_reference(branch);
		} else {
			throw new Error(`Error in InsuranceModelSyntaxAnalyser: ${brName} not handled for node '${branch?.matchedText}'`);
		}
	}
	getChildren(branch) {
		if (!!branch && !!branch.nonSkipChildren) {
			try {
				return branch.nonSkipChildren.toArray();
			} catch (e) {
				throw new Error(`Cannot follow branch: ${e.message} (${branch.matchedText.trimEnd()})`);
			}
		}
		return null;
	}
	getGroup(branch) {
		let group = branch;
		let stop = false;
		while (!stop) {
			let nextOne = null;
			try {
				nextOne = group.nonSkipChildren?.toArray()[0];
			} catch (e) {
				throw new Error(`Cannot follow group: ${e.message} (${group.matchedText})`);
			}
			if (!nextOne || (!nextOne.name.includes('multi') && !nextOne.name.includes('group'))) {
				stop = true;
			} else {
				group = nextOne;
			}
		}
		return group;
	}
	transform__fre_reference(branch) {
		if (branch.name.includes('multi') || branch.name.includes('List')) {
			return this.transformSharedPackedParseTreeList(branch, ':');
		} else {
			return this.transformSharedPackedParseTreeLeaf(branch);
		}
	}
	freNodeRef(branch, typeName) {
		let referred = this.transformSharedPackedParseTreeNode(branch);
		if (this.getChildren(branch)?.length > 1) {
			referred = this.transformSharedPackedParseTreeList(branch, ':');
		}
		if (referred === null || referred === undefined) {
			return null;
		} else if (typeof referred === 'string' && referred.length === 0) {
			return null;
		} else {
			return FreNodeReference.create(referred, typeName);
		}
	}
	transformSharedPackedParseTreeList(branch, separator) {
		let result = [];
		const children = this.getChildren(branch);
		if (!!children) {
			for (const child of children) {
				let element = this.transformSharedPackedParseTreeNode(child);
				if (element !== null && element !== undefined) {
					if (separator === null || separator === undefined) {
						result.push(element);
					} else {
						if (element !== separator) {
							result.push(element);
						}
					}
				}
			}
		}
		return result;
	}
	transformSharedPackedParseTreeRefList(branch, typeName, separator) {
		let result = [];
		const children = this.getChildren(branch);
		if (!!children) {
			for (const child of children) {
				let refName = this.transformSharedPackedParseTreeNode(child);
				if (refName !== null && refName !== undefined) {
					if (separator === null || separator === undefined) {
						result.push(FreNodeReference.create(refName, typeName));
					} else {
						if (refName !== separator) {
							result.push(FreNodeReference.create(refName, typeName));
						}
					}
				}
			}
		}
		return result;
	}
	location(branch) {
		return FreParseLocation.create({
			filename: this.sourceName,
			line: branch.location.line,
			column: branch.location.column
		});
	}
}

var Agl = agl.net.akehurst.language.agl.processor.Agl;
var AutomatonKind_api = agl.net.akehurst.language.api.processor.AutomatonKind_api;
class InsuranceModelModelUnitReader {
	constructor() {
		this.analyser = new InsuranceModelSyntaxAnalyser();
		this.parser = Agl.processorFromString(InsuranceModelGrammarStr, this.analyser, null, null);
	}
	readFromString(sentence, metatype, model, sourceName) {
		this.analyser.sourceName = sourceName;
		let startRule = '';
		if (metatype === 'Part') {
			startRule = 'Part';
		} else if (metatype === 'Product') {
			startRule = 'Product';
		}
		let unit = null;
		if (this.parser) {
			try {
				let asm;
				if (startRule.length > 0) {
					asm = this.parser.processForGoal(null, startRule, sentence, AutomatonKind_api.LOOKAHEAD_1);
				} else {
					asm = this.parser.process(null, sentence, AutomatonKind_api.LOOKAHEAD_1);
				}
				unit = asm;
			} catch (e) {
				let mess = e.message.replace('Could not match goal,', 'Parse error in ' + sourceName + ':');
				if (!!mess && mess.length > 0) {
					console.log(mess);
					throw new Error(mess);
				} else {
					throw e;
				}
			}
			if (!!model) {
				try {
					if (model.getUnits().filter((existing) => existing.name === unit.name).length > 0) {
						throw new Error(`Unit named '${unit.name}' already exists.`);
					} else {
						model.addUnit(unit);
						const semAnalyser = new InsuranceModelSemanticAnalyser();
						semAnalyser.correct(unit);
					}
				} catch (e) {
					console.log(e.message);
					throw e;
				}
			}
		} else {
			throw new Error(`No parser for ${metatype} available: grammar incorrect.`);
		}
		return unit;
	}
}

class InsuranceModelInterpreterBase {
	constructor() {}
	evalDocuExpression(node, ctx) {
		throw new RtError('evalDocuExpression is not defined');
	}
	evalLiteral(node, ctx) {
		throw new RtError('evalLiteral is not defined');
	}
	evalEuroLiteral(node, ctx) {
		throw new RtError('evalEuroLiteral is not defined');
	}
	evalNumberLiteral(node, ctx) {
		throw new RtError('evalNumberLiteral is not defined');
	}
	evalPercentageLiteral(node, ctx) {
		throw new RtError('evalPercentageLiteral is not defined');
	}
	evalBooleanLiteral(node, ctx) {
		throw new RtError('evalBooleanLiteral is not defined');
	}
	evalBinaryExpression(node, ctx) {
		throw new RtError('evalBinaryExpression is not defined');
	}
	evalPlusExpression(node, ctx) {
		throw new RtError('evalPlusExpression is not defined');
	}
	evalMinusExpression(node, ctx) {
		throw new RtError('evalMinusExpression is not defined');
	}
	evalMultiplyExpression(node, ctx) {
		throw new RtError('evalMultiplyExpression is not defined');
	}
	evalDivideExpression(node, ctx) {
		throw new RtError('evalDivideExpression is not defined');
	}
	evalFunctionCallExpression(node, ctx) {
		throw new RtError('evalFunctionCallExpression is not defined');
	}
	evalInsurancePartRef(node, ctx) {
		throw new RtError('evalInsurancePartRef is not defined');
	}
	evalRiskAdjustmentRef(node, ctx) {
		throw new RtError('evalRiskAdjustmentRef is not defined');
	}
	evalParameterRef(node, ctx) {
		throw new RtError('evalParameterRef is not defined');
	}
	evalAttributeRef(node, ctx) {
		throw new RtError('evalAttributeRef is not defined');
	}
	evalRiskRef(node, ctx) {
		throw new RtError('evalRiskRef is not defined');
	}
	evalPayoutRef(node, ctx) {
		throw new RtError('evalPayoutRef is not defined');
	}
	evalText(node, ctx) {
		throw new RtError('evalText is not defined');
	}
	evalText2(node, ctx) {
		throw new RtError('evalText2 is not defined');
	}
	evalText3(node, ctx) {
		throw new RtError('evalText3 is not defined');
	}
	evalText4(node, ctx) {
		throw new RtError('evalText4 is not defined');
	}
	evalGenericKind(node, ctx) {
		throw new RtError('evalGenericKind is not defined');
	}
	evalGenericTypeDecl(node, ctx) {
		throw new RtError('evalGenericTypeDecl is not defined');
	}
	evalGenericLiteral(node, ctx) {
		throw new RtError('evalGenericLiteral is not defined');
	}
	evalEntity(node, ctx) {
		throw new RtError('evalEntity is not defined');
	}
	evalEntityAttribute(node, ctx) {
		throw new RtError('evalEntityAttribute is not defined');
	}
	evalBaseProduct(node, ctx) {
		throw new RtError('evalBaseProduct is not defined');
	}
	evalInsurancePart(node, ctx) {
		throw new RtError('evalInsurancePart is not defined');
	}
	evalInsuranceProduct(node, ctx) {
		throw new RtError('evalInsuranceProduct is not defined');
	}
	evalCalcFunction(node, ctx) {
		throw new RtError('evalCalcFunction is not defined');
	}
	evalDescription(node, ctx) {
		throw new RtError('evalDescription is not defined');
	}
	evalParameter(node, ctx) {
		throw new RtError('evalParameter is not defined');
	}
	evalDocuType(node, ctx) {
		throw new RtError('evalDocuType is not defined');
	}
	evalInsurancePartType(node, ctx) {
		throw new RtError('evalInsurancePartType is not defined');
	}
	evalPercentageType(node, ctx) {
		throw new RtError('evalPercentageType is not defined');
	}
	evalNumberType(node, ctx) {
		throw new RtError('evalNumberType is not defined');
	}
	evalBooleanType(node, ctx) {
		throw new RtError('evalBooleanType is not defined');
	}
	evalEuroType(node, ctx) {
		throw new RtError('evalEuroType is not defined');
	}
	evalTypeRef(node, ctx) {
		throw new RtError('evalTypeRef is not defined');
	}
	evalInsuranceTheme(node, ctx) {
		throw new RtError('evalInsuranceTheme is not defined');
	}
	evalPremiumDays(node, ctx) {
		throw new RtError('evalPremiumDays is not defined');
	}
	evalPart(node, ctx) {
		throw new RtError('evalPart is not defined');
	}
	evalProduct(node, ctx) {
		throw new RtError('evalProduct is not defined');
	}
}

class InsuranceModelInterpreter extends InsuranceModelInterpreterBase {
	constructor(m) {
		super();
	}
}

function InsuranceModelInterpreterInit(main) {
	const interpreter = new InsuranceModelInterpreter(main);
	main.registerFunction('DocuExpression', interpreter.evalDocuExpression);
	main.registerFunction('Literal', interpreter.evalLiteral);
	main.registerFunction('EuroLiteral', interpreter.evalEuroLiteral);
	main.registerFunction('NumberLiteral', interpreter.evalNumberLiteral);
	main.registerFunction('PercentageLiteral', interpreter.evalPercentageLiteral);
	main.registerFunction('BooleanLiteral', interpreter.evalBooleanLiteral);
	main.registerFunction('BinaryExpression', interpreter.evalBinaryExpression);
	main.registerFunction('PlusExpression', interpreter.evalPlusExpression);
	main.registerFunction('MinusExpression', interpreter.evalMinusExpression);
	main.registerFunction('MultiplyExpression', interpreter.evalMultiplyExpression);
	main.registerFunction('DivideExpression', interpreter.evalDivideExpression);
	main.registerFunction('FunctionCallExpression', interpreter.evalFunctionCallExpression);
	main.registerFunction('InsurancePartRef', interpreter.evalInsurancePartRef);
	main.registerFunction('RiskAdjustmentRef', interpreter.evalRiskAdjustmentRef);
	main.registerFunction('ParameterRef', interpreter.evalParameterRef);
	main.registerFunction('AttributeRef', interpreter.evalAttributeRef);
	main.registerFunction('RiskRef', interpreter.evalRiskRef);
	main.registerFunction('PayoutRef', interpreter.evalPayoutRef);
	main.registerFunction('Text', interpreter.evalText);
	main.registerFunction('Text2', interpreter.evalText2);
	main.registerFunction('Text3', interpreter.evalText3);
	main.registerFunction('Text4', interpreter.evalText4);
	main.registerFunction('GenericKind', interpreter.evalGenericKind);
	main.registerFunction('GenericTypeDecl', interpreter.evalGenericTypeDecl);
	main.registerFunction('GenericLiteral', interpreter.evalGenericLiteral);
	main.registerFunction('Entity', interpreter.evalEntity);
	main.registerFunction('EntityAttribute', interpreter.evalEntityAttribute);
	main.registerFunction('BaseProduct', interpreter.evalBaseProduct);
	main.registerFunction('InsurancePart', interpreter.evalInsurancePart);
	main.registerFunction('InsuranceProduct', interpreter.evalInsuranceProduct);
	main.registerFunction('CalcFunction', interpreter.evalCalcFunction);
	main.registerFunction('Description', interpreter.evalDescription);
	main.registerFunction('Parameter', interpreter.evalParameter);
	main.registerFunction('DocuType', interpreter.evalDocuType);
	main.registerFunction('InsurancePartType', interpreter.evalInsurancePartType);
	main.registerFunction('PercentageType', interpreter.evalPercentageType);
	main.registerFunction('NumberType', interpreter.evalNumberType);
	main.registerFunction('BooleanType', interpreter.evalBooleanType);
	main.registerFunction('EuroType', interpreter.evalEuroType);
	main.registerFunction('TypeRef', interpreter.evalTypeRef);
	main.registerFunction('InsuranceTheme', interpreter.evalInsuranceTheme);
	main.registerFunction('PremiumDays', interpreter.evalPremiumDays);
	main.registerFunction('Part', interpreter.evalPart);
	main.registerFunction('Product', interpreter.evalProduct);
}

const getPropertyFunction = (node) => {
	const index = node.freOwnerDescriptor().propertyIndex;
	return node.freOwnerDescriptor().propertyName + (index !== undefined ? '[' + index + ']' : '');
};
const getConceptFunction = (node) => {
	if (node === undefined) {
		return '';
	}
	return node.freLanguageConcept();
};
class MainInsuranceModelInterpreter {
	constructor() {
		if (MainInsuranceModelInterpreter.main === null) {
			MainInsuranceModelInterpreter.main = MainInterpreter.instance(InsuranceModelInterpreterInit, getConceptFunction, getPropertyFunction);
		}
	}
	setTracing(value) {
		MainInsuranceModelInterpreter.main.setTracing(value);
	}
	getTrace() {
		return MainInsuranceModelInterpreter.main.getTrace();
	}
	evaluate(node) {
		return this.evaluateWithContext(node, InterpreterContext.EMPTY_CONTEXT);
	}
	evaluateWithContext(node, ctx) {
		MainInsuranceModelInterpreter.main.reset();
		try {
			return MainInsuranceModelInterpreter.main.evaluate(node, ctx);
		} catch (e) {
			return new RtError(e.message);
		}
	}
}
MainInsuranceModelInterpreter.main = null;

class InsuranceModelEnvironment {
	static getInstance() {
		if (this.environment === undefined || this.environment === null) {
			this.environment = new InsuranceModelEnvironment();
			FreLanguageEnvironment.setInstance(this.environment);
		}
		return this.environment;
	}
	constructor() {
		this.scoper = new FreScoperComposite('main');
		this.typer = new FreCompositeTyper('main');
		this.validator = new InsuranceModelValidator();
		this.writer = new InsuranceModelModelUnitWriter();
		this.reader = new InsuranceModelModelUnitReader();
		this.interpreter = new MainInsuranceModelInterpreter();
		this.languageName = 'InsuranceModel';
		this.fileExtensions = new Map([
			['Part', 'base'],
			['Product', 'prod']
		]);
		const actions = new InsuranceModelActions();
		const myComposite = new FreProjectionHandler();
		this.editor = new FreEditor(myComposite, this, actions);
		initializeLanguage();
		initializeProjections(myComposite);
		initializeEditorDef();
		initializeScoperDef(this.scoper);
		initializeTypers(this.typer);
		this.projectionHandler = myComposite;
	}
	newModel(modelName) {
		const model = new InsuranceModel();
		model.name = modelName;
		return model;
	}
}

export { InsuranceModelEnvironment };
//# sourceMappingURL=index.mjs.map
