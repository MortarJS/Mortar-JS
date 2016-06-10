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
var ToolTip                = require('./components/ToolTip');
var MutatorTable           = require('./components/MutatorTable');

/**
 * Table
 *
 * @type {*|Function}
 */
var Table = React.createClass({
	mixins: [ResourceComponentMixin, TabbedComponentMixin],

	getInitialState: function() {
		return {
			workingResource : [
				{
					'id'         : '0',
					'first_name' : 'Darth',
					'last_name'  : 'Vader',
					'username'   : 'lilorphanannie',
					'hands'      : 0,
					'occupation' : 'Sith Lord',
					'email'      : 'lilorphanannie@galaxyfarfaraway.com',
					'birthday'   : '1931-01-17',
					'vehicles'   : [
						[
							'TIE Fighter'
						]
					]
				},
				{
					'id'         : '1',
					'first_name' : 'Leia',
					'last_name'  : 'Organa',
					'username'   : 'lorgana',
					'hands'      : 2,
					'occupation' : 'Rebel',
					'email'      : 'lorgana@galaxyfarfaraway.com',
					'birthday'   : '1956-10-21',
					'vehicles'   : [
						[
							'Alderaan Cruiser'
						],
						[
							'Tantive IV'
						]
					]
				},
				{
					'id'         : '2',
					'first_name' : 'Luke',
					'last_name'  : 'Skywalker',
					'username'   : 'lskywalker',
					'hands'      : 1,
					'occupation' : 'Jedi',
					'email'      : 'lskywalker@galaxyfarfaraway.com',
					'birthday'   : '1951-09-25',
					'vehicles'   : [
						[
							'X-wing Starfighter'
						],
						[
							'Snowspeeder'
						],
						[
							'X-34 Landspeeder'
						],
						[
							'T-16 Skyhopper'
						]
					]
				},
				{
					'id'         : '3',
					'first_name' : 'R2-D2',
					'last_name'  : '',
					'username'   : 'artoo',
					'hands'      : 0,
					'occupation' : 'Rebel Spy',
					'email'      : 'artoo@galaxyfarfaraway.com',
					'birthday'   : '1970-01-01',
					'vehicles'   : [
						[
							'X-wing Starfighter'
						],
						[
							'Jedi Starfighter'
						]
					]
				},
				{
					'id'         : '4',
					'first_name' : 'Han',
					'last_name'  : 'Solo',
					'username'   : 'solocup',
					'hands'      : 2,
					'occupation' : 'Smuggler',
					'email'      : 'solocup@galaxyfarfaraway.com',
					'birthday'   : '1942-07-13',
					'vehicles'   : [
						[
							'Millenium Falcon'
						]
					]
				},
				{
					'id'         : '5',
					'first_name' : 'Chewbacca',
					'last_name'  : '',
					'username'   : 'chewbaclava',
					'hands'      : 2,
					'occupation' : 'First Officer',
					'email'      : 'starwarsfurlife@galaxyfarfaraway.com',
					'birthday'   : '1944-05-19',
					'vehicles'   : [
						[
							'Millenium Falcon'
						]
					]
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
			},
			'tooltip': {
				'mods'    : [],
				'content' : <ToolTip tableKeys={this.tableKeys} workingResource={this.state.workingResource} />
			},
			'mutator': {
				'mods'    : [],
				'content' : <MutatorTable workingResource={this.state.workingResource} />
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
		"Name"       : "name",
		"Username"   : "username",
		"Hands"      : "hands",
		"Occupation" : "occupation",
		"Email"      : "email"
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
