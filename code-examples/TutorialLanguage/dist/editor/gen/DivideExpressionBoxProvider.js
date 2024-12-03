import { BoxUtil, BoxFactory, FreBoxProvider, createDefaultBinaryBox, isFreBinaryExpression } from '@freon4dsl/core';
import { EntityModelEnvironment } from '../../config/gen/EntityModelEnvironment';
export class DivideExpressionBoxProvider extends FreBoxProvider {
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
		return createDefaultBinaryBox(this._node, '/', EntityModelEnvironment.getInstance().editor, this.mainHandler);
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
//# sourceMappingURL=DivideExpressionBoxProvider.js.map
