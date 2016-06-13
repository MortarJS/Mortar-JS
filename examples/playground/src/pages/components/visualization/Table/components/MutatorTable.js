// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../../app-container').MortarJS;
var moment                 = require('moment');

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Table');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Mutator Table
 *
 * @type {*|Function}
 */
var MutatorTable = React.createClass({
	mixins: [ResourceComponentMixin],

	getInitialState: function() {
		return {
			params          : {},
			formIsValid     : true,
			workingResource : [
				{
					'id'         : '0',
					'first_name' : 'Darth',
					'last_name'  : 'Vader',
					'username'   : 'lilorphanannie',
					'hands'      : 0,
					'occupation' : 'Sith Lord',
					'email'      : 'lilorphanannie@galaxyfarfaraway.com',
					'birthday'   : '-1229385600',
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
					'birthday'   : '-416448000',
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
					'birthday'   : '-576547200',
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
					'birthday'   : '0',
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
					'birthday'   : '-866937600',
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
					'birthday'   : '-808531200',
					'vehicles'   : [
						[
							'Millenium Falcon'
						]
					]
				}
			]
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

	mutatedTableKeys: {
		"Name"                 : "first_name",
		"Username"             : "username",
		"Hands"                : "hands",
		"Occupation"           : "occupation",
		"Email"                : "email",
		"Date of Birth"        : "birthday",
		"Vehicle(s) of Choice" : "vehicles"
	},

	tableKeys: {
		"First Name"           : "first_name",
		"Last Name"            : "last_name",
		"Username"             : "username",
		"Hands"                : "hands",
		"Occupation"           : "occupation",
		"Email"                : "email",
		"Date of Birth"        : "birthday",
		"Vehicle(s) of Choice" : "vehicles"
	},

	render: function() {
		var tableOptions   = {
				mutators: {
					vehicles: function(vehicles) {
						return ('[' + vehicles.join(', ') + ']');
					}
				}
			},
			mutatedOptions = {
				mutators: {
					first_name: function(first_name, object) {
						return first_name + ' ' + object.last_name;
					},
					birthday: function(birthday) {
						return moment.unix(birthday).format('MMMM D, YYYY');
					},
					vehicles: function(vehicles) {
						return vehicles.join(', ');
					}
				}
			};

		return (
			<div id="page-wrapper">
				<div id="page-content">
				<Br.Row>
					<Br.Column grid="lg" size="12">
						<Br.Table data={this.state.workingResource}
							dataKeys={this.tableKeys}
							title={'Unmutated Data'}
							options={tableOptions} />
					</Br.Column>
				</Br.Row>
					<Br.Row>
						<Br.Column grid="lg" size="12">
							<Br.Table data={this.state.workingResource}
								dataKeys={this.mutatedTableKeys}
								title={'Mutated Data'}
								options={mutatedOptions} />
						</Br.Column>
					</Br.Row>
				</div>
			</div>
		);
	}
});

module.exports = MutatorTable;
