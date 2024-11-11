import type {
	FreErrorSeverity, FreModelUnit, FreNamedNode, FreNode,
	IServerCommunication,
	ModelUnitIdentifier
} from '@freon4dsl/core';

export class MockServer implements IServerCommunication {
		onError(msg: string, severity: FreErrorSeverity): void {
			throw new Error('Method not implemented.');
		}
    generateIds(quantity: number, callback: (strings: string[]) => void): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    putModelUnit(modelName: string, unitId: ModelUnitIdentifier, unit: FreNode): void {
        throw new Error('Method not implemented.');
    }
    deleteModelUnit(modelName: string, unit: ModelUnitIdentifier): void {
        throw new Error('Method not implemented.');
    }
    renameModelUnit(modelName: string, oldName: string, newName: string, unit: FreNamedNode): void {
        throw new Error('Method not implemented.');
    }
    createModel(modelName: string) {
        throw new Error('Method not implemented.');
    }
    deleteModel(modelName: string): void {
        throw new Error('Method not implemented.');
    }
    loadModelList(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    loadUnitList(modelName: string): Promise<ModelUnitIdentifier[]> {
        throw new Error('Method not implemented.');
    }
    loadModelUnit(modelName: string, unit: ModelUnitIdentifier): Promise<FreNode> {
        throw new Error('Method not implemented.');
    }
    loadModelUnitInterface(modelName: string, unit: ModelUnitIdentifier, loadCallback: (unit: FreModelUnit) => void) {
        throw new Error('Method not implemented.');
    }
    createModelUnit(modelName: string, unit: FreModelUnit): void {
        throw new Error('Method not implemented.');
    }

}
