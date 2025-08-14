import {
	FreErrorSeverity,
	FreLionwebSerializer,
	FreModelSerializer,
	type FreModelUnit,
	type FreNamedNode,
	type FreNode,
	type IServerCommunication,
	isNullOrUndefined,
	type FreUnitIdentifier, ServerResponse, VoidServerResponse
} from '@freon4dsl/core';
import HealthJson from './model/Health.json';
import HealthAllJson from './model/HealthAll.json';
import HomeJson from './model/Home.json';
import HomeAllJson from './model/HomeAll.json';
import HomeAndHealthJson from './model/HomeAndHealth.json';
import HomeCheapJson from './model/HomeCheap.json';
import HomeExtraJson from './model/HomeExtra.json';
import LegalJson from './model/Legal.json';
import LegalAllJson from './model/LegalAll.json';

const modelName: string = 'ShowCase';
const unitNames: FreUnitIdentifier[] = [
	// todo import all json files and adjust the switch in method loadModelUnit
	{ name: 'HealthAll', id: 'ID-49', type: '' },
	{ name: 'Home', id: 'ID-91', type: '' },
	{ name: 'HomeAll', id: 'ID-105', type: '' },
	{ name: 'HomeAndHealth', id: 'ID-131', type: '' },
	{ name: 'HomeCheap', id: 'ID-174', type: '' },
	{ name: 'HomeExtra', id: 'ID-191', type: '' },
	{ name: 'Legal', id: 'ID-197', type: '' },
	{ name: 'LegalAll', id: 'ID-205', type: '' }
];

export class MockServer implements IServerCommunication {
	static serial: FreModelSerializer = new FreModelSerializer();
	static lionweb_serial: FreLionwebSerializer = new FreLionwebSerializer();

	onError(msg: string, severity?: FreErrorSeverity): void {
		alert(msg);
		console.log(msg + ', ' + severity);
	}
	async generateIds(_quantity: number, _callback: (strings: string[]) => void): Promise<ServerResponse<string[]>> {
		return {
			result: [],
			errors: ['Method not implemented.']
		};
	}
	async saveModelUnit(_modelName: string, _unitId: FreUnitIdentifier, _unit: FreNode): Promise<VoidServerResponse> {
		return {
			errors: ['Method not implemented.']
		};
	}
	async deleteModelUnit(_modelName: string, _unit: FreUnitIdentifier): Promise<VoidServerResponse> {
		return {
			errors: ['Method not implemented.']
		};
	}
	async renameModelUnit(_modelName: string, _oldName: string, _newName: string, _unit: FreNamedNode): Promise<VoidServerResponse> {
		return {
			errors: ['Method not implemented.']
		};
	}
	async createModel(_modelName: string): Promise<VoidServerResponse> {
		return {
			errors: ['Method not implemented.']
		};
	}
	async deleteModel(_modelName: string): Promise<VoidServerResponse> {
		return {
			errors: ['Method not implemented.']
		};
	}
	async loadModelList(): Promise<ServerResponse<string[]>> {
		console.log('loadModelList executed');
		return {
			result: [modelName],
			errors: []
		}
	}
	async loadUnitList(_modelName: string): Promise<ServerResponse<FreUnitIdentifier[]>> {
		console.log('loadUnitList executed');
		return {
			result: unitNames,
			errors: []
		};
	}
	async loadModelUnit(_modelName: string, unit: FreUnitIdentifier): Promise<ServerResponse<FreNode>> {
		let jsonInput;
		switch (unit.name) {
			case 'HealthAll': {
				jsonInput = HealthAllJson as object;
				break;
			}
			case 'Home': {
				jsonInput = HomeJson as object;
				break;
			}
			case 'Health': {
				jsonInput = HealthJson as object;
				break;
			}
			case 'HomeAndHealth': {
				jsonInput = HomeAndHealthJson as object;
				break;
			}
			case 'HomeAll': {
				jsonInput = HomeAllJson as object;
				break;
			}
			case 'HomeExtra': {
				jsonInput = HomeExtraJson as object;
				break;
			}
			case 'Legal': {
				jsonInput = LegalJson as object;
				break;
			}
			case 'LegalAll': {
				jsonInput = LegalAllJson as object;
				break;
			}
			case 'HomeCheap': {
				jsonInput = HomeCheapJson as object;
				break;
			}
		}
		let readUnit: FreNode | undefined = undefined;
		if (isNullOrUndefined(jsonInput)) {
			console.log('Error: json input undefined');
		} else {
			// @ts-expect-error TS7053: Element implicitly has an 'any' type
			if (jsonInput['$typename'] === undefined) {
				readUnit = MockServer.lionweb_serial.toTypeScriptInstance(jsonInput);
			} else {
				readUnit = MockServer.serial.toTypeScriptInstance(jsonInput);
			}
		}
		console.log('loadModelUnit executed for ' + modelName + ', ' + unit.name);
		return  {
			result: readUnit as FreNode,
			errors: []
		};
	}
	async createModelUnit(_modelName: string, _unit: FreModelUnit): Promise<VoidServerResponse> {
		return {
			errors: ['Method not implemented.']
		};
	}
}
