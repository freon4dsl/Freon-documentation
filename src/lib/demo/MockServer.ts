import {
    FreErrorSeverity, FreLionwebSerializer, FreModelSerializer, type FreModelUnit, type FreNamedNode, type FreNode,
    type IServerCommunication, isNullOrUndefined,
    type ModelUnitIdentifier
} from '@freon4dsl/core';
import HealthJson from './DocuProject/HealthAll.json';
import HomeJson from './DocuProject/Home.json';

const modelName: string = 'ShowCase';
const unitNames: ModelUnitIdentifier[] = [
  // todo import all json files and adjust the switch in method loadModelUnit
  {name:'HealthAll', id: "ID-49"},
  {name:'Home', id: "ID-91"}
];

export class MockServer implements IServerCommunication {
    static serial: FreModelSerializer = new FreModelSerializer();
    static lionweb_serial: FreLionwebSerializer = new FreLionwebSerializer();

    onError(msg: string, severity?: FreErrorSeverity): void {
        alert(msg);
        console.log(msg + ', ' + severity);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generateIds(quantity: number, callback: (strings: string[]) => void): Promise<string[]> {
        this.onError('generateIds not implemented.', undefined);
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    putModelUnit(modelName: string, unitId: ModelUnitIdentifier, unit: FreNode): void {
        console.log('putModelUnit not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteModelUnit(modelName: string, unit: ModelUnitIdentifier): void {
        this.onError('deleteModelUnit not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renameModelUnit(modelName: string, oldName: string, newName: string, unit: FreNamedNode): void {
        this.onError('renameModelUnit not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createModel(modelName: string) {
        this.onError('createModel not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteModel(modelName: string): void {
        this.onError('deleteModel not implemented.');
    }
    async loadModelList(): Promise<string[]> {
        console.log('loadModelList executed');
        return [modelName];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadUnitList(modelName: string): Promise<ModelUnitIdentifier[]> {
        console.log('loadUnitList executed');
        return unitNames;
    }
    async loadModelUnit(modelName: string, unit: ModelUnitIdentifier): Promise<FreNode> {
        let jsonInput;
        switch(unit.name) {
            case 'HealthAll': {
                jsonInput = HealthJson as object;
                break;
            }
            case 'Home': {
                jsonInput = HomeJson as object;
                break;
            }
        }
        let readUnit: FreNode | undefined = undefined;
        if (isNullOrUndefined(jsonInput)) {
            console.log("Error: json input undefined");
        } else {
            // @ts-expect-error tyttrutyu
            if (jsonInput['$typename'] === undefined) {
                readUnit = MockServer.lionweb_serial.toTypeScriptInstance(jsonInput);
            } else {
                readUnit = MockServer.serial.toTypeScriptInstance(jsonInput);
            }
        }
        console.log('loadModelUnit executed for ' + modelName + ", "  + unit.name);
        // @ts-expect-error ttt
        return readUnit;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadModelUnitInterface(modelName: string, unit: ModelUnitIdentifier, loadCallback: (unit: FreModelUnit) => void) {
        this.onError('loadModelUnitInterface not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createModelUnit(modelName: string, unit: FreModelUnit): void {
        this.onError('createModelUnit not implemented.');
    }
}
