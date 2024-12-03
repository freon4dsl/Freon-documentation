import { BoxUtil, BoxFactory, FreBoxProvider, createDefaultExpressionBox } from '@freon4dsl/core';
export class AbsExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'AbsExpression';
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
		return createDefaultExpressionBox(
			this._node,
			'default-expression-box',
			[
				BoxFactory.verticalLayout(this._node, 'AbsExpression-overall', '', [
					BoxFactory.horizontalLayout(
						this._node,
						'AbsExpression-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'AbsExpression', 'top-1-line-0-item-0'),
							BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')
						],
						{ selectable: false }
					),
					BoxUtil.indentBox(
						this._node,
						4,
						'1',
						BoxFactory.horizontalLayout(
							this._node,
							'AbsExpression-hlist-line-1',
							'',
							[
								BoxUtil.labelBox(this._node, 'expr', 'top-1-line-1-item-0'),
								BoxUtil.getBoxOrAction(this._node, 'expr', 'EntityExpression', this.mainHandler)
							],
							{ selectable: false }
						)
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
								'AbsExpression-optional-appliedfeature-hlist-line-0',
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
					BoxUtil.labelBox(this._node, '}', 'top-1-line-3-item-0')
				])
			],
			{ selectable: false }
		);
	}
}
//# sourceMappingURL=AbsExpressionBoxProvider.js.map
