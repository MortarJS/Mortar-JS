// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Text Input
 *
 * @type {*|Function}
 */
var Input = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			workingResource: {
				mods: 'default'
			},
			formIsValid: true
		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore,
					changeListener: this.bindResource
				}
			]
		};
	},

	formKey: 'inputForm',

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	bindResource: function () {
		this.setState({
			workingResource: FormStore.getResource(this.formKey)
		});
	},

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1 className="page-header">Toggle</h1>
							</Br.Column>
						</Br.Row>

						<Br.Row>
							<Br.Column grid="lg" size="10"  classes="col-lg-offset-1">
								<div className="panel panel-default">
									<Br.Row>
										<Br.Column grid="lg" size="12">
											<p></p>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="10">
											<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>

												<Br.Row>
													<h3>Toggles</h3>
													<Br.Column grid="lg" size="10">
														<Br.Column grid="lg" size="5">
															<Br.Form.Toggle fieldKey="toggle-1" fieldLabel="Default Mortar Toggle" mods={[this.state.workingResource.mods]} />
														</Br.Column>
														<Br.Column grid="lg" size="5">
															<Br.Form.Toggle fieldKey="toggle-2" fieldLabel="Simple Mortar Toggle" mods={[this.state.workingResource.mods, 'simple']} />
														</Br.Column>
													</Br.Column>
													<Br.Column grid="lg" size="2" classes="pull-right">
														<Br.Form.DropdownSelect fieldKey="mods" inputLabel="Toggle Size:" options={['small', 'default', 'large']} multiple={false} />
													</Br.Column>
												</Br.Row>

												<Br.Row>
													<h3>Disabled Toggles</h3>
													<Br.Column grid="lg" size="10">
														<Br.Column grid="lg" size="5">
															<Br.Form.Toggle fieldKey="toggle-3" fieldLabel="Disabled Mortar Toggle" disabled={true} mods={[this.state.workingResource.mods]} />
														</Br.Column>
														<Br.Column grid="lg" size="5">
															<Br.Form.Toggle fieldKey="toggle-4" fieldLabel="Disabled and Checked Mortar Toggle" disabled={true} checked={true} mods={[this.state.workingResource.mods]} />
														</Br.Column>
													</Br.Column>
												</Br.Row>

											</Br.Form>
										</Br.Column>
									</Br.Row>

								</div>
							</Br.Column>
						</Br.Row>

					</div>
				</div>
			</div>
		);
	}
});

module.exports = Input;
