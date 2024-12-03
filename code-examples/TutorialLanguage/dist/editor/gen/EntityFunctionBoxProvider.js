import { BoxUtil, BoxFactory, FreBoxProvider, TableUtil, FreNodeReference } from '@freon4dsl/core';
import { EntityModelEnvironment } from '../../config/gen/EntityModelEnvironment';
export class EntityFunctionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['tableRowFor_StartEditor'];
		this.conceptName = 'EntityFunction';
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
			} else if (projectionName === 'tableRowFor_StartEditor') {
				return this.getTableRowFor_StartEditor();
			}
		}
		return this.getDefault();
	}
	getTableRowFor_StartEditor() {
		const cells = [];
		cells.push(BoxUtil.textBox(this._node, 'name'));
		cells.push(TableUtil.tableBoxColumnOriented(this._node, this._node.parameters, 'parameters', this.mainHandler));
		cells.push(
			BoxUtil.referenceBox(
				this._node,
				'declaredType',
				(selected) => {
					this._node.declaredType = FreNodeReference.create(selected, 'Type');
				},
				EntityModelEnvironment.getInstance().scoper
			)
		);
		cells.push(BoxUtil.getBoxOrAction(this._node, 'expression', 'EntityExpression', this.mainHandler));
		return TableUtil.rowBox(
			this._node,
			this._node.freOwnerDescriptor().propertyName,
			'EntityFunction',
			cells,
			this._node.freOwnerDescriptor().propertyIndex,
			true
		);
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'EntityFunction-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'EntityFunction-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'EntityFunction', 'top-1-line-0-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-2')
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(this._node, 4, '1', BoxUtil.labelBox(this._node, 'aliases', 'top-1-line-1-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'2',
				BoxFactory.verticalList(
					this._node,
					'EntityFunction-aliases-vList',
					'',
					this._node.aliases
						.map((item, index) => BoxUtil.textBox(this._node, 'aliases', index))
						.concat([BoxFactory.action(this._node, 'new-EntityFunction-aliases-vList', '<+ aliases>')])
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'3',
				BoxFactory.horizontalLayout(
					this._node,
					'EntityFunction-hlist-line-3',
					'',
					[
						BoxUtil.labelBox(this._node, 'expression', 'top-1-line-3-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'expression', 'EntityExpression', this.mainHandler)
					],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(this._node, 4, '4', BoxUtil.labelBox(this._node, 'parameters', 'top-1-line-4-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'5',
				BoxUtil.verticalPartListBox(this._node, this._node.parameters, 'parameters', null, this.mainHandler)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'6',
				BoxFactory.horizontalLayout(
					this._node,
					'EntityFunction-hlist-line-6',
					'',
					[
						BoxUtil.labelBox(this._node, 'declaredType', 'top-1-line-6-item-0'),
						BoxUtil.referenceBox(
							this._node,
							'declaredType',
							(selected) => {
								this._node.declaredType = FreNodeReference.create(selected, 'Type');
							},
							EntityModelEnvironment.getInstance().scoper
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-7-item-0')
		]);
	}
}
//# sourceMappingURL=EntityFunctionBoxProvider.js.map
