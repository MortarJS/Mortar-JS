// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;
var TabbedComponentMixin   = MortarJS.Mixins.TabbedComponentMixin;

// Components
var DefaultTable           = require('./components/DefaultTable');
var ActionableRows         = require('./components/ActionableRows');
var DraggableRows          = require('./components/DraggableRows');
var SummableRows           = require('./components/SummableRows');
var SpinnerToggle          = require('./components/SpinnerToggle');

/**
 * Table
 *
 * @type {*|Function}
 */
var Table = React.createClass({
	mixins: [ResourceComponentMixin, TabbedComponentMixin],

	getInitialState: function() {
		return {
			workingResource: [
				{
					'id'         : '0',
					'name'       : 'Darth Vader',
					'username'   : 'lilorphanannie',
					'hands'      : 0,
					'occupation' : 'Sith Lord',
					'email'      : 'lilorphanannie@galaxyfarfaraway.com'
				},
				{
					'id'         : '1',
					'name'       : 'Leia Organa',
					'username'   : 'lorgana',
					'hands'      : 2,
					'occupation' : 'Rebel',
					'email'      : 'lorgana@galaxyfarfaraway.com'
				},
				{
					'id'         : '2',
					'name'       : 'Luke Skywalker',
					'username'   : 'lskywalker',
					'hands'      : 1,
					'occupation' : 'Jedi',
					'email'      : 'lskywalker@galaxyfarfaraway.com'
				},
				{
					'id'         : '3',
					'name'       : 'R2-D2',
					'username'   : 'artoo',
					'hands'      : 0,
					'occupation' : 'Rebel Spy',
					'email'      : 'artoo@galaxyfarfaraway.com'
				},
				{
					'id'         : '4',
					'name'       : 'Han Solo',
					'username'   : 'solocup',
					'hands'      : 2,
					'occupation' : 'Smuggler',
					'email'      : 'solocup@galaxyfarfaraway.com'
				},
				{
					'id'         : '5',
					'name'       : 'Chewbacca',
					'username'   : 'chewbaclava',
					'hands'      : 2,
					'occupation' : 'First Officer',
					'email'      : 'starwarsfurlife@galaxyfarfaraway.com'
				}
			],
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
			'summable rows': {
				'mods'    : [],
				'content' : <SummableRows tableKeys={this.tableKeys} workingResource={this.state.workingResource} />
			},
			'spinner': {
				'mods'    : [],
				'content' : <SpinnerToggle tableKeys={this.tableKeys} />
			}
		};
	},

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
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
