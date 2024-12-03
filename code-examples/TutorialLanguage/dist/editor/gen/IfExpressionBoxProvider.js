import { BoxUtil, BoxFactory, FreBoxProvider, createDefaultExpressionBox } from '@freon4dsl/core';
export class IfExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['StartEditor', 'specials', 'default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'IfExpression';
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
			} else if (projectionName === 'specials') {
				return this.getSpecials();
			} else if (projectionName === 'default') {
				return this.getDefault();
			}
		}
		return this.getDefault();
	}
	getStartEditor() {
		return createDefaultExpressionBox(
			this._node,
			'default-expression-box',
			[
				BoxFactory.verticalLayout(this._node, 'IfExpression-overall', '', [
					BoxFactory.horizontalLayout(
						this._node,
						'IfExpression-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'if', 'top-1-line-0-item-0'),
							BoxUtil.getBoxOrAction(this._node, 'condition', 'EntityExpression', this.mainHandler),
							BoxUtil.labelBox(this._node, 'then', 'top-1-line-0-item-2')
						],
						{ selectable: false }
					),
					BoxUtil.indentBox(this._node, 4, '1', BoxUtil.getBoxOrAction(this._node, 'whenTrue', 'EntityExpression', this.mainHandler)),
					BoxUtil.labelBox(this._node, 'else', 'top-1-line-2-item-0'),
					BoxUtil.indentBox(this._node, 4, '3', BoxUtil.getBoxOrAction(this._node, 'whenFalse', 'EntityExpression', this.mainHandler)),
					BoxUtil.labelBox(this._node, 'endif', 'top-1-line-4-item-0')
				])
			],
			{ selectable: false }
		);
	}
	getSpecials() {
		return createDefaultExpressionBox(
			this._node,
			'default-expression-box',
			[
				BoxFactory.horizontalLayout(
					this._node,
					'IfExpression-hlist-line-0',
					'',
					[
						BoxUtil.labelBox(this._node, '(', 'top-1-line-0-item-0'),
						BoxUtil.getBoxOrAction(this._node, 'condition', 'EntityExpression', this.mainHandler),
						BoxUtil.labelBox(this._node, '?', 'top-1-line-0-item-2'),
						BoxUtil.getBoxOrAction(this._node, 'whenTrue', 'EntityExpression', this.mainHandler),
						BoxUtil.labelBox(this._node, ':', 'top-1-line-0-item-4'),
						BoxUtil.getBoxOrAction(this._node, 'whenFalse', 'EntityExpression', this.mainHandler),
						BoxUtil.labelBox(this._node, ')', 'top-1-line-0-item-6')
					],
					{ selectable: false }
				)
			],
			{ selectable: false }
		);
	}
	getDefault() {
		return createDefaultExpressionBox(
			this._node,
			'default-expression-box',
			[
				BoxFactory.verticalLayout(this._node, 'IfExpression-overall', '', [
					BoxFactory.horizontalLayout(
						this._node,
						'IfExpression-hlist-line-0',
						'',
						[BoxUtil.labelBox(this._node, 'IfExpression', 'top-1-line-0-item-0'), BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')],
						{ selectable: false }
					),
					BoxUtil.indentBox(
						this._node,
						4,
						'1',
						BoxFactory.horizontalLayout(
							this._node,
							'IfExpression-hlist-line-1',
							'',
							[
								BoxUtil.labelBox(this._node, 'condition', 'top-1-line-1-item-0'),
								BoxUtil.getBoxOrAction(this._node, 'condition', 'EntityExpression', this.mainHandler)
							],
							{ selectable: false }
						)
					),
					BoxUtil.indentBox(
						this._node,
						4,
						'2',
						BoxFactory.horizontalLayout(
							this._node,
							'IfExpression-hlist-line-2',
							'',
							[
								BoxUtil.labelBox(this._node, 'whenTrue', 'top-1-line-2-item-0'),
								BoxUtil.getBoxOrAction(this._node, 'whenTrue', 'EntityExpression', this.mainHandler)
							],
							{ selectable: false }
						)
					),
					BoxUtil.indentBox(
						this._node,
						4,
						'3',
						BoxFactory.horizontalLayout(
							this._node,
							'IfExpression-hlist-line-3',
							'',
							[
								BoxUtil.labelBox(this._node, 'whenFalse', 'top-1-line-3-item-0'),
								BoxUtil.getBoxOrAction(this._node, 'whenFalse', 'EntityExpression', this.mainHandler)
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
								'IfExpression-optional-appliedfeature-hlist-line-0',
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
					BoxUtil.labelBox(this._node, '}', 'top-1-line-5-item-0')
				])
			],
			{ selectable: false }
		);
	}
}
//# sourceMappingURL=IfExpressionBoxProvider.js.map
