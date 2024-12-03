import { ActionsUtil } from '@freon4dsl/core';
import { BINARY_EXPRESSION_CREATORS, CUSTOM_ACTIONS } from './EntityModelDefaultActions';
import { MANUAL_BINARY_EXPRESSION_ACTIONS, MANUAL_CUSTOM_ACTIONS } from '../CustomEntityModelActions';
export class EntityModelActions {
	constructor() {
		this.binaryExpressionActions = ActionsUtil.join(BINARY_EXPRESSION_CREATORS, MANUAL_BINARY_EXPRESSION_ACTIONS);
		this.customActions = ActionsUtil.join(CUSTOM_ACTIONS, MANUAL_CUSTOM_ACTIONS);
	}
}
//# sourceMappingURL=EntityModelActions.js.map
