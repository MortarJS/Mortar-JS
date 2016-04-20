// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Table');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Default Table
 *
 * @type {*|Function}
 */
var DefaultTable = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			params        : {},
			formIsValid   : true
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
			default:
				break;
		}
	},

	render: function() {
		var tableOptions = {};

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

module.exports = DefaultTable;
