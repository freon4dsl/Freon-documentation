import { BoxUtil, BoxFactory, FreBoxProvider, createDefaultExpressionBox } from '@freon4dsl/core';
export class BooleanLiteralExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'BooleanLiteralExpression';
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
				BoxFactory.verticalLayout(this._node, 'BooleanLiteralExpression-overall', '', [
					BoxFactory.horizontalLayout(
						this._node,
						'BooleanLiteralExpression-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'BooleanLiteralExpression', 'top-1-line-0-item-0'),
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
							'BooleanLiteralExpression-hlist-line-1',
							'',
							[BoxUtil.labelBox(this._node, 'value', 'top-1-line-1-item-0'), BoxUtil.textBox(this._node, 'value')],
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
								'BooleanLiteralExpression-optional-appliedfeature-hlist-line-0',
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
//# sourceMappingURL=BooleanLiteralExpressionBoxProvider.js.map
