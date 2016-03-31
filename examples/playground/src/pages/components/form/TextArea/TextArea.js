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
 * Text Area Input
 *
 * @type {*|Function}
 */
var TextArea = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function() {
		return {
			workingResource: {},
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

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	bindResource: function() {
		this.setState({
			workingResource: FormStore.getResource(this.formKey)
		});
	},

	formKey: 'textAreaForm',

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1>Text Area</h1>
							</Br.Column>
						</Br.Row>

						<Br.Row>
							<Br.Column grid="lg" size="10" classes="col-lg-offset-1">
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
													<h3>Text Area Input</h3>
													<Br.Column grid="lg" size="6">
														<Br.Form.TextArea
															fieldKey="userComment"
															label="Comment"
															placeholder="Sample text area component. Type away!"
															required={true}
															/>

													</Br.Column>

													<Br.Column grid="lg" size="6">
														<b>Comment value:</b>
														<p>{this.state.workingResource.userComment}</p>
													</Br.Column>
												</Br.Row>

												<Br.Row>
													<h3>Disabled Text Area Input</h3>
													<Br.Column grid="lg" size="6">
														<Br.Form.TextArea
															fieldKey="userComplaint"
															label="Complaints"
															placeholder="This text area is disabled. No input is accepted!"
															required={true}
															disabled={true}
															/>
													</Br.Column>

													<Br.Column grid="lg" size="6">
														<b>Complaint value:</b>
														<p>{this.state.workingResource.userComplaint}</p>
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

module.exports = TextArea;
