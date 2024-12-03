import { BoxUtil, BoxFactory, FreBoxProvider, FreNodeReference } from '@freon4dsl/core';
import { EntityModelEnvironment } from '../../config/gen/EntityModelEnvironment';
export class AttributeWithEntityTypeBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'AttributeWithEntityType';
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
		return BoxFactory.verticalLayout(this._node, 'AttributeWithEntityType-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'AttributeWithEntityType-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'AttributeWithEntityType', 'top-1-line-0-item-0'),
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
					'AttributeWithEntityType-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, 'declaredType', 'top-1-line-1-item-0'),
						BoxUtil.referenceBox(
							this._node,
							'declaredType',
							(selected) => {
								this._node.declaredType = FreNodeReference.create(selected, 'Entity');
							},
							EntityModelEnvironment.getInstance().scoper
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-2-item-0')
		]);
	}
}
//# sourceMappingURL=AttributeWithEntityTypeBoxProvider.js.map
