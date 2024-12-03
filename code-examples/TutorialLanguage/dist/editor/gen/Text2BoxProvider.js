import { BoxUtil, BoxFactory, FreBoxProvider } from '@freon4dsl/core';
export class Text2BoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['StartEditor', 'default'];
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
			if (projectionName === 'StartEditor') {
				return this.getStartEditor();
			} else if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getStartEditor() {
		return BoxFactory.verticalLayout(this._node, 'Text2-overall', '', [
			BoxUtil.labelBox(this._node, 'This is', 'top-1-line-0-item-0'),
			BoxUtil.indentBox(this._node, 8, '1', BoxUtil.labelBox(this._node, 'literal text', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(this._node, 6, '2', BoxUtil.labelBox(this._node, 'that is projected in the', 'top-1-line-2-item-0')),
			BoxUtil.emptyLineBox(this._node, 'Text2-empty-line-3'),
			BoxUtil.indentBox(this._node, 16, '4', BoxUtil.labelBox(this._node, 'editor', 'top-1-line-4-item-0')),
			BoxUtil.indentBox(this._node, 2, '5', BoxUtil.labelBox(this._node, 'for every concept of type Text.', 'top-1-line-5-item-0'))
		]);
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Text2-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'Text2-hlist-line-0',
				'',
				[BoxUtil.labelBox(this._node, 'Text2', 'top-1-line-0-item-0'), BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')],
				{ selectable: false }
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-1-item-0')
		]);
	}
}
//# sourceMappingURL=Text2BoxProvider.js.map
