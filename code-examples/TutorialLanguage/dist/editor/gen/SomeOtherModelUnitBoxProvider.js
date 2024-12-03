import { BoxUtil, BoxFactory, FreBoxProvider } from '@freon4dsl/core';
export class SomeOtherModelUnitBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'SomeOtherModelUnit';
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
		return BoxFactory.verticalLayout(this._node, 'SomeOtherModelUnit-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'SomeOtherModelUnit-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'SomeOtherModelUnit', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-2')
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'1',
				BoxFactory.horizontalLayout(
					this._node,
					'SomeOtherModelUnit-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, 'somePart', 'top-1-line-1-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'somePart', 'Entity', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-2-item-0')
		]);
	}
}
//# sourceMappingURL=SomeOtherModelUnitBoxProvider.js.map
