// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');
var Example                = require('./components/Example');
var Details                = require('./components/Details');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../stores/UsersStore');

// Mixins
var TabsMixin              = MortarJS.Mixins.TabbedComponentMixin;
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Table
 *
 * @type {*|Function}
 */
var ButtonDrawer = React.createClass({
	mixins: [ResourceComponentMixin, TabsMixin],

	getInitialState: function () {
		return {
			activeTab: 'details',
			workingResource: {}
		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore
				},
				{
					store: UsersStore,
					bindTo: 'users',
					action: UsersStore.getResourceListData,
					options: this.getOptions
				}
			]
		};
	},

	tabs: function() {
		return {
			'details': {
				'mods'    : [],
				'content' : <Details />
			},
			'example': {
				'mods'    : [],
				'content' : <Example />
			}
		};
	},

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	getOptions: {
		modifiers: {
		}
	},

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">

						<Br.Row>
							<Br.Column grid="lg" size="6" classes="col-lg-offset-1">
								<h1 className="page-header">ButtonDrawer</h1>
							</Br.Column>
						</Br.Row>

						{this._buildTabView(true)}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ButtonDrawer;
