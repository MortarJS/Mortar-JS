// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;
var TabbedComponentMixin   = MortarJS.Mixins.TabbedComponentMixin;

var DefaultTable           = require('./components/DefaultTable');
var ActionableRows         = require('./components/ActionableRows');
var DraggableRows          = require('./components/DraggableRows');

/**
 * Table
 *
 * @type {*|Function}
 */
var Table = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation, TabbedComponentMixin],

	getInitialState: function () {
		return {
			workingResource: [
				{
					'name'       : 'Darth Vader',
					'username'   : 'lilorphanannie',
					'hands'      : 0,
					'occupation' : 'Sith Lord',
					'email'      : 'lilorphanannie@galaxyfarfaraway.com'
				},
				{
					'name'       : 'Leia Organa',
					'username'   : 'lorgana',
					'hands'      : 2,
					'occupation' : 'Rebel',
					'email'      : 'lorgana@galaxyfarfaraway.com'
				},
				{
					'name'       : 'Luke Skywalker',
					'username'   : 'lskywalker',
					'hands'      : 1,
					'occupation' : 'Jedi',
					'email'      : 'lskywalker@galaxyfarfaraway.com'
				}, {
					'name'       : 'R2-D2',
					'username'   : 'artoo',
					'hands'      : 0,
					'occupation' : 'Rebel Spy',
					'email'      : 'artoo@galaxyfarfaraway.com'
				},
				{
					'name'       : 'Han Solo',
					'username'   : 'solocup',
					'hands'      : 2,
					'occupation' : 'Smuggler',
					'email'      : 'solocup@galaxyfarfaraway.com'
				},
				{
					'name'       : 'Chewbacca',
					'username'   : 'chewbaclava',
					'hands'      : 2,
					'occupation' : 'First Officer',
					'email'      : 'starwarsfurlife@galaxyfarfaraway.com'
				}],
			params        : {},
			openEditModal : false,
			formIsValid   : true,
			activeTab     : 'default',
			modalResource : {}

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

	tabs: function() {
		return {
			'default': {
				'mods'    : [],
				'content' : <DefaultTable tableKeys={this.tableKeys} workingResource={this.state.workingResource} />
			},
			'actionable rows': {
				'mods'    : [],
				'content' : <ActionableRows tableKeys={this.tableKeys} workingResource={this.state.workingResource} />
			},
			'draggable rows': {
				'mods'    : [],
				'content' : <DraggableRows tableKeys={this.tableKeys} workingResource={this.state.workingResource} />
			},
		}
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

	getOptions: {
		modifiers: {}
	},

	options: {
		summableRows: ['hands']
	},

	tableKeys: {
		"Name"                    : "name",
		"Username"                : "username",
		"Number of Organic Hands" : "hands",
		"Occupation"              : "occupation",
		"Email"                   : "email"
	},

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6" classes="col-lg-offset-1">
								<h1 className="page-header">Table</h1>
							</Br.Column>

						</Br.Row>
						{this._buildTabView()}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Table;
