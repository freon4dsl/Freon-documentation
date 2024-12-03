import { BoxUtil, BoxFactory, FreBoxProvider } from '@freon4dsl/core';
export class Text4BoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['StartEditor', 'default'];
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
			if (projectionName === 'StartEditor') {
				return this.getStartEditor();
			} else if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getStartEditor() {
		return BoxFactory.verticalLayout(this._node, 'Text4-overall', '', [
			BoxUtil.indentBox(this._node, 10, '0', BoxUtil.labelBox(this._node, 'This is', 'top-1-line-0-item-0')),
			BoxUtil.indentBox(this._node, 8, '1', BoxUtil.labelBox(this._node, 'literal text', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(this._node, 3, '2', BoxUtil.labelBox(this._node, 'that is projected in the', 'top-1-line-2-item-0')),
			BoxUtil.indentBox(this._node, 11, '3', BoxUtil.labelBox(this._node, 'editor', 'top-1-line-3-item-0')),
			BoxUtil.labelBox(this._node, 'for every concept of type Text.', 'top-1-line-4-item-0')
		]);
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Text4-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'Text4-hlist-line-0',
				'',
				[BoxUtil.labelBox(this._node, 'Text4', 'top-1-line-0-item-0'), BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')],
				{ selectable: false }
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-1-item-0')
		]);
	}
}
//# sourceMappingURL=Text4BoxProvider.js.map
