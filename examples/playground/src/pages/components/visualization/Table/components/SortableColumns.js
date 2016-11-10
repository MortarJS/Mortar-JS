// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Sortable Columns
 *
 * @type {*|Function}
 */
var SortableColumns = React.createClass({
	mixins: [ResourceComponentMixin],

	propTypes: {
		workingResource : React.PropTypes.object,
		tableKeys       : React.PropTypes.object
	},

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

	handleAction: function(action) {
		switch (action) {
			case 'sort':
				break;
			default:
				break;
		}
	},

	render: function() {
		var tableOptions = {
			sortable: ['name']
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

module.exports = SortableColumns;
