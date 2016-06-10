// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Draggable Rows
 *
 * @type {*|Function}
 */
var DraggableTable = React.createClass({
	mixins: [ResourceComponentMixin],

	getInitialState: function() {
		return {
			params      : {},
			formIsValid : true
		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore
				}
			]
		};
	},

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	render: function() {
		var tableOptions = {
			draggable: true
		};

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<Br.Row>
						<Br.Column grid="lg" size="12">
							<Br.Table data={this.props.workingResource}
								dataKeys={this.props.tableKeys}
								title={'Table'}
								options={tableOptions} />
						</Br.Column>
					</Br.Row>
				</div>
			</div>
		);
	}
});

module.exports = DraggableTable;
