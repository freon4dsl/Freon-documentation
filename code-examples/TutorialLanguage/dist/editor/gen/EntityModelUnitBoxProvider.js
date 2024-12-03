import { BoxUtil, BoxFactory, FreBoxProvider } from '@freon4dsl/core';
export class EntityModelUnitBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['StartEditor', 'default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'EntityModelUnit';
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
		return BoxFactory.verticalLayout(this._node, 'EntityModelUnit-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'EntityModelUnit-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'model', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-2')
				],
				{ selectable: false }
			),
			BoxUtil.labelBox(this._node, 'entities:', 'top-1-line-1-item-0'),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxUtil.verticalPartListBox(this._node, this._node.entities, 'entities', { text: '&&', type: 'Terminator' }, this.mainHandler)
			),
			BoxUtil.labelBox(this._node, 'model wide functions:', 'top-1-line-3-item-0'),
			BoxUtil.indentBox(
				this._node,
				4,
				'4',
				BoxUtil.horizontalPartListBox(this._node, this._node.functions, 'functions', { text: ';', type: 'Separator' }, this.mainHandler)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-5-item-0')
		]);
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'EntityModelUnit-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'EntityModelUnit-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'EntityModelUnit', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-2')
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(this._node, 4, '1', BoxUtil.labelBox(this._node, 'functions', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'2',
				BoxUtil.verticalPartListBox(this._node, this._node.functions, 'functions', null, this.mainHandler)
			),
			BoxUtil.indentBox(this._node, 4, '3', BoxUtil.labelBox(this._node, 'entities', 'top-1-line-3-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'4',
				BoxUtil.verticalPartListBox(this._node, this._node.entities, 'entities', null, this.mainHandler)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-5-item-0')
		]);
	}
}
//# sourceMappingURL=EntityModelUnitBoxProvider.js.map
