import { BoxUtil, BoxFactory, FreBoxProvider, FreNodeReference, createDefaultExpressionBox } from '@freon4dsl/core';
import { EntityModelEnvironment } from '../../config/gen/EntityModelEnvironment';
export class FunctionCallExpressionBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['StartEditor', 'default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'FunctionCallExpression';
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
		return createDefaultExpressionBox(
			this._node,
			'default-expression-box',
			[
				BoxFactory.horizontalLayout(
					this._node,
					'FunctionCallExpression-hlist-line-0',
					'',
					[
						BoxUtil.labelBox(this._node, 'CALL', 'top-1-line-0-item-0'),
						BoxUtil.referenceBox(
							this._node,
							'functionDefinition',
							(selected) => {
								this._node.functionDefinition = FreNodeReference.create(selected, 'EntityFunction');
							},
							EntityModelEnvironment.getInstance().scoper
						),
						BoxUtil.labelBox(this._node, '(  )', 'top-1-line-0-item-2')
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
				BoxFactory.verticalLayout(this._node, 'FunctionCallExpression-overall', '', [
					BoxFactory.horizontalLayout(
						this._node,
						'FunctionCallExpression-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'FunctionCallExpression', 'top-1-line-0-item-0'),
							BoxUtil.labelBox(this._node, '{', 'top-1-line-0-item-1')
						],
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
								'FunctionCallExpression-optional-appliedfeature-hlist-line-0',
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
							'FunctionCallExpression-hlist-line-2',
							'',
							[
								BoxUtil.labelBox(this._node, 'functionDefinition', 'top-1-line-2-item-0'),
								BoxUtil.referenceBox(
									this._node,
									'functionDefinition',
									(selected) => {
										this._node.functionDefinition = FreNodeReference.create(selected, 'EntityFunction');
									},
									EntityModelEnvironment.getInstance().scoper
								)
							],
							{ selectable: false }
						)
					),
					BoxUtil.labelBox(this._node, '}', 'top-1-line-3-item-0')
				])
			],
			{ selectable: false }
		);
	}
}
//# sourceMappingURL=FunctionCallExpressionBoxProvider.js.map
