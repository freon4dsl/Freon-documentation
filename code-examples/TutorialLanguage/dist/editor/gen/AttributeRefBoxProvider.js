import { BoxUtil, BoxFactory, FreBoxProvider, FreNodeReference } from '@freon4dsl/core';
import { EntityModelEnvironment } from '../../config/gen/EntityModelEnvironment';
export class AttributeRefBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'AttributeRef';
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
		return BoxFactory.verticalLayout(this._node, 'AttributeRef-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'AttributeRef-hlist-line-0',
				'',
				[BoxUtil.labelBox(this._node, 'AttributeRef', 'top-1-line-0-item-0'), BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')],
				{ selectable: false }
			),
			BoxFactory.optional2(
				this._node,
				'optional-appliedfeature',
				() => !!this._node.appliedfeature,
				BoxUtil.indentBox(
					this._node,
					4,
					'0',
					BoxFactory.horizontalLayout(
						this._node,
						'AttributeRef-optional-appliedfeature-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'appliedfeature', 'top-2-line-0-item-0'),
							BoxUtil.getBoxOrAction(this._node, 'appliedfeature', 'AppliedFeature', this.mainHandler)
						],
						{ selectable: false }
					)
				),
				false,
				BoxUtil.getBoxOrAction(this._node, 'appliedfeature', 'AppliedFeature', this.mainHandler)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'AttributeRef-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'attribute', 'top-1-line-2-item-0'),
						BoxUtil.referenceBox(
							this._node,
							'attribute',
							(selected) => {
								this._node.attribute = FreNodeReference.create(selected, 'AttributeWithEntityType');
							},
							EntityModelEnvironment.getInstance().scoper
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-3-item-0')
		]);
	}
}
//# sourceMappingURL=AttributeRefBoxProvider.js.map
