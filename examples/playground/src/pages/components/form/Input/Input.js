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
				username: '',
				email: 'luke@galaxyfarfaraway.com'
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
							<Br.Column grid="lg" size="10"  classes="col-lg-offset-1">
								<h1 className="page-header">Input</h1>
							</Br.Column>
						</Br.Row>

						<Br.Row>
							<Br.Column grid="lg" size="10"  classes="col-lg-offset-1">
								<div className="panel panel-default">
									<Br.Row>
										<Br.Column grid="lg" size="10">
											<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>
												<Br.Row>
													<h3>Text Input</h3>
													<Br.Column grid="lg" size="6">
														<Br.Column grid="lg" size="6">
															<Br.Form.Input fieldKey="username" type="text" label="Username"  placeholder="Example: lskywalker" required="true" />
														</Br.Column>
														<Br.Column grid="lg" size="6">
															<b>Username value:</b>
															<p>{this.state.workingResource.username}</p>
														</Br.Column>
													</Br.Column>
												</Br.Row>

												<Br.Row>
													<h3>Character Count Example</h3>
													<Br.Column grid="lg" size="6">
														<Br.Column grid="lg" size="6">
															<Br.Form.Input fieldKey="tweet" type="text" label="Compose a tweet!"  placeholder="Limit of 140 characters" required="true" limit={140} />
														</Br.Column>
														<Br.Column grid="lg" size="6">
															<b>Tweet value:</b>
															<p>{this.state.workingResource.tweet}</p>
														</Br.Column>
													</Br.Column>
												</Br.Row>


												<Br.Row>
													<h3>Disabled Input</h3>
													<Br.Column grid="lg" size="6">
														<Br.Column grid="lg" size="6">
															<Br.Form.Input fieldKey="email" type="email" label="Email"  placeholder="luke@galaxyfarfaraway.com" required="true" disabled={true} />
														</Br.Column>
														<Br.Column grid="lg" size="6">
															<b>Email value:</b>
															<p>{this.state.workingResource.email}</p>
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
