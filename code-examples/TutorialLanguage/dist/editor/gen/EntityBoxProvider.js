import { BoxUtil, BoxFactory, FreBoxProvider, BoolDisplay, FreNodeReference, TableUtil, NumberDisplay } from '@freon4dsl/core';
import { EntityModelEnvironment } from '../../config/gen/EntityModelEnvironment';
export class EntityBoxProvider extends FreBoxProvider {
	constructor(mainHandler) {
		super(mainHandler);
		this.knownBoxProjections = ['StartEditor', 'default'];
		this.knownTableProjections = ['default'];
		this.conceptName = 'Entity';
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
		return BoxFactory.verticalLayout(this._node, 'Entity-overall', '', [
			BoxUtil.booleanBox(this._node, 'isCompany', { yes: 'COMPANY', no: 'undefined' }, BoolDisplay.SELECT),
			BoxFactory.horizontalLayout(
				this._node,
				'Entity-hlist-line-1',
				'',
				[
					BoxUtil.labelBox(this._node, 'entity', 'top-1-line-1-item-0'),
					BoxUtil.textBox(this._node, 'name'),
					BoxFactory.optional2(
						this._node,
						'optional-baseEntity',
						() => !!this._node.baseEntity,
						BoxFactory.horizontalLayout(
							this._node,
							'Entity-optional-baseEntity-hlist-line-0',
							'',
							[
								BoxUtil.labelBox(this._node, 'base', 'top-2-line-0-item-0'),
								BoxUtil.referenceBox(
									this._node,
									'baseEntity',
									(selected) => {
										this._node.baseEntity = FreNodeReference.create(selected, 'Entity');
									},
									EntityModelEnvironment.getInstance().scoper
								)
							],
							{ selectable: false }
						),
						false,
						BoxUtil.referenceBox(
							this._node,
							'baseEntity',
							(selected) => {
								this._node.baseEntity = FreNodeReference.create(selected, 'Entity');
							},
							EntityModelEnvironment.getInstance().scoper
						)
					),
					BoxUtil.labelBox(this._node, '{', 'top-1-line-1-item-3')
				],
				{ selectable: false }
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'2',
				BoxFactory.horizontalLayout(
					this._node,
					'Entity-hlist-line-2',
					'',
					[
						BoxUtil.verticalPartListBox(this._node, this._node.attributes, 'attributes', null, this.mainHandler),
						BoxUtil.labelBox(
							this._node,
							'// this list is projected as a vertical list without separator or terminator',
							'top-1-line-2-item-1'
						)
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
					'Entity-hlist-line-3',
					'',
					[
						TableUtil.tableBoxColumnOriented(this._node, this._node.functions, 'functions', this.mainHandler),
						BoxUtil.labelBox(this._node, '// this list is projected as a column based table', 'top-1-line-3-item-1')
					],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-4-item-0')
		]);
	}
	getDefault() {
		return BoxFactory.verticalLayout(this._node, 'Entity-overall', '', [
			BoxFactory.horizontalLayout(
				this._node,
				'Entity-hlist-line-0',
				'',
				[
					BoxUtil.labelBox(this._node, 'Entity', 'top-1-line-0-item-0'),
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
					'Entity-hlist-line-1',
					'',
					[
						BoxUtil.labelBox(this._node, 'isCompany', 'top-1-line-1-item-0'),
						BoxUtil.booleanBox(this._node, 'isCompany', { yes: 'true', no: 'false' }, BoolDisplay.SELECT)
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
					'Entity-hlist-line-2',
					'',
					[
						BoxUtil.labelBox(this._node, 'baseInterface_attr', 'top-1-line-2-item-0'),
						BoxUtil.numberBox(this._node, 'baseInterface_attr', NumberDisplay.SELECT)
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
					'Entity-hlist-line-3',
					'',
					[BoxUtil.labelBox(this._node, 'simpleprop', 'top-1-line-3-item-0'), BoxUtil.textBox(this._node, 'simpleprop')],
					{ selectable: false }
				)
			),
			BoxUtil.indentBox(this._node, 4, '4', BoxUtil.labelBox(this._node, 'attributes', 'top-1-line-4-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'5',
				BoxUtil.verticalPartListBox(this._node, this._node.attributes, 'attributes', null, this.mainHandler)
			),
			BoxUtil.indentBox(this._node, 4, '6', BoxUtil.labelBox(this._node, 'entAttributes', 'top-1-line-6-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'7',
				BoxUtil.verticalPartListBox(this._node, this._node.entAttributes, 'entAttributes', null, this.mainHandler)
			),
			BoxUtil.indentBox(this._node, 4, '8', BoxUtil.labelBox(this._node, 'functions', 'top-1-line-8-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'9',
				BoxUtil.verticalPartListBox(this._node, this._node.functions, 'functions', null, this.mainHandler)
			),
			BoxUtil.indentBox(this._node, 4, '10', BoxUtil.labelBox(this._node, 'int_attrs', 'top-1-line-10-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'11',
				BoxUtil.verticalPartListBox(this._node, this._node.int_attrs, 'int_attrs', null, this.mainHandler)
			),
			BoxUtil.indentBox(this._node, 4, '12', BoxUtil.labelBox(this._node, 'int_functions', 'top-1-line-12-item-0')),
			BoxUtil.indentBox(
				this._node,
				8,
				'13',
				BoxUtil.verticalPartListBox(this._node, this._node.int_functions, 'int_functions', null, this.mainHandler)
			),
			BoxFactory.optional2(
				this._node,
				'optional-baseEntity',
				() => !!this._node.baseEntity,
				BoxUtil.indentBox(
					this._node,
					4,
					'0',
					BoxFactory.horizontalLayout(
						this._node,
						'Entity-optional-baseEntity-hlist-line-0',
						'',
						[
							BoxUtil.labelBox(this._node, 'baseEntity', 'top-2-line-0-item-0'),
							BoxUtil.referenceBox(
								this._node,
								'baseEntity',
								(selected) => {
									this._node.baseEntity = FreNodeReference.create(selected, 'Entity');
								},
								EntityModelEnvironment.getInstance().scoper
							)
						],
						{ selectable: false }
					)
				),
				false,
				BoxUtil.referenceBox(
					this._node,
					'baseEntity',
					(selected) => {
						this._node.baseEntity = FreNodeReference.create(selected, 'Entity');
					},
					EntityModelEnvironment.getInstance().scoper
				)
			),
			BoxUtil.indentBox(
				this._node,
				4,
				'15',
				BoxFactory.horizontalLayout(
					this._node,
					'Entity-hlist-line-15',
					'',
					[
						BoxUtil.labelBox(this._node, 'baseInterface', 'top-1-line-15-item-0'),
						BoxUtil.referenceBox(
							this._node,
							'baseInterface',
							(selected) => {
								this._node.baseInterface = FreNodeReference.create(selected, 'Entity');
							},
							EntityModelEnvironment.getInstance().scoper
						)
					],
					{ selectable: false }
				)
			),
			BoxUtil.labelBox(this._node, '}', 'top-1-line-16-item-0')
		]);
	}
}
//# sourceMappingURL=EntityBoxProvider.js.map
