// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Table', 'Form');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Spinner Toggle
 *
 * @type {*|Function}
 */
var SpinnerToggle = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			params          : {},
			workingResource : [],
			emptyText       : false,
			formIsValid     : true
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

	handleToggle: function () {
		this.setState({
			emptyText: ! this.state.emptyText
		});
	},

	render: function() {
		if (this.state.emptyText === true) {
			var tableOptions = {
				hideSpinner : true,
				emptyText   : 'This isn\'t the table you\'re looking for.'
			};
		} else {
			tableOptions = {};
		}

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<Br.Row>
						<Br.Form key="myFancyForm" formKey={'userForm'} bindResource={this.state.workingResource}>
							<Br.Column grid="lg" size="5">
								<Br.Form.Toggle fieldKey="spinnerToggle" fieldLabel="Toggle the Spinner" mods={[this.state.workingResource.mods]} changeCallback={this.handleToggle} />
							</Br.Column>
						</Br.Form>

						<Br.Column grid="lg" size="12">
							<Br.Table data={this.state.workingResource}
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

module.exports = SpinnerToggle;
