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

	tableKeys: {
		"Name"                 : "first_name",
		"Username"             : "username",
		"Hands"                : "hands",
		"Occupation"           : "occupation",
		"Email"                : "email",
		"Date of Birth"        : "birthday",
		"Vehicle(s) of Choice" : "vehicles"
	},

	render: function() {
		var tableOptions   = {},
			mutatedOptions = {
				mutators: {
					first_name: function(first_name, object) {
						return first_name + ' ' + object.last_name;
					},
					birthday: function(birthday) {
						return moment(birthday).format('MMMM D, YYYY');
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
						<Br.Table data={this.props.workingResource}
							dataKeys={this.tableKeys}
							title={'Unmutated Data'}
							options={tableOptions} />
					</Br.Column>
				</Br.Row>
					<Br.Row>
						<Br.Column grid="lg" size="12">
							<Br.Table data={this.props.workingResource}
								dataKeys={this.tableKeys}
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
