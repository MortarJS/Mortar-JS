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
 * Radio Buttons
 *
 * @type {*|Function}
 */
var RadioButton = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			workingResource: {
				colors: 'Pink'
			},
			formIsValid: true
		}
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore,
					changeListener: this.bindResource
				}
			]
		}
	},

	formKey: 'radioForm',

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

	radioOptions1: [
		{label: 'Winter', value: 'Winter'},
		{label: 'Spring', value: 'Spring'},
		{label: 'Summer', value: 'Summer'},
		{label: 'Fall',   value: 'Fall'}
	],

	radioOptions2: [
		{label: 'Red',    value: 'Red'},
		{label: 'Blue',   value: 'Blue'},
		{label: 'Green',  value: 'Green'},
		{label: 'Yellow', value: 'Yellow'},
		{label: 'Pink',   value: 'Pink'},
		{label: 'Taupe',  value: 'Taupe'},
		{label: 'Mauve',  value: 'Mauve'}
	],

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="10" classes="col-lg-offset-1">
								<h1>Radio Buttons</h1>
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
												<Br.Row classes="season-select">
													<h3>Radio Buttons</h3>
													<Br.Column grid="lg" size="4">
														<Br.Form.RadioButtons key="seasonRadio" fieldKey='season'
															options={this.radioOptions1} identifier="label"
															label='Select a Season' />
													</Br.Column>
													<Br.Column grid="lg" size="6">
														<b>Season value:</b>
														<p className="season-value">{this.state.workingResource.season}</p>
													</Br.Column>
												</Br.Row>

												<Br.Row classes="disabled-select">
													<h3>Disabled Radio Buttons</h3>
													<Br.Column grid="lg" size="4">
														<Br.Form.RadioButtons key="colorRadio" fieldKey='colors'
															options={this.radioOptions2}
															label='Select a Color'
															disabled={true}/>
													</Br.Column>
													<Br.Column grid="lg" size="6">
														<b>Color value:</b>
														<p className="disabled-value">{this.state.workingResource.colors}</p>
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

module.exports = RadioButton;
