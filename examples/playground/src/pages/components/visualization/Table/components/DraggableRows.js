// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Draggable Rows
 *
 * @type {*|Function}
 */
var DraggableTable = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

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
				},
				{
					store   : UsersStore,
					bindTo  : 'users',
					action  : UsersStore.getResourceListData,
					options : this.getOptions
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

	handleAction: function(action, resource) {
		switch (action) {
			case 'dragSort':
				break;
			default:
				break;
		}
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
