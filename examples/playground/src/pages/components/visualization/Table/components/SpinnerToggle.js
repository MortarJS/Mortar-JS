// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Table', 'Form');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Spinner Toggle
 *
 * @type {*|Function}
 */
var SpinnerToggle = React.createClass({
	mixins: [ResourceComponentMixin],

	getInitialState: function() {
		return {
			params          : {},
			workingResource : [],
			toggleState     : { spinnerToggle: false },
			formIsValid     : true
		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store          : FormStore,
					changeListener : this.bindResource
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

	formKey: "toggleForm",

	bindResource: function () {
		this.setState({
			toggleState: FormStore.getResource(this.formKey)
		});
	},

	render: function() {
		if (this.state.toggleState.spinnerToggle === true) {
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
						<Br.Form key="myFancyForm" formKey="toggleForm" bindResource={this.state.toggleState}>
							<Br.Column grid="lg" size="5">
								<Br.Form.Toggle fieldKey="spinnerToggle" fieldLabel="Toggle the Spinner" mods={[this.state.workingResource.mods]} />
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
