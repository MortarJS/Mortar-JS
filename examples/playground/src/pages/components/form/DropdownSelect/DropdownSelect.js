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
 * Dropdown Select Input
 *
 * @type {*|Function}
 */
var DropdownSelect = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
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

	formKey: 'dropdownForm',

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

	dropdownOptions1: ['Winter', 'Spring', 'Summer', 'Fall'],

	dropdownOptions2: ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Taupe', 'Mauve'],

	render: function() {

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="10" classes="col-lg-offset-1">
								<h1>Dropdown Select</h1>
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
													<h3>Dropdown Select</h3>
													<Br.Column grid="lg" size="6">
														<Br.Form.DropdownSelect fieldKey='season'
															options={this.dropdownOptions1}
															multiple={false} placeholder='Select a Season'
															required={true} />
													</Br.Column>
													<Br.Column grid="lg" size="6">
														<b>Season value:</b>
														<p>{this.state.workingResource.season}</p>
													</Br.Column>
												</Br.Row>

												<Br.Row>
													<h3>Multiple Dropdown Select</h3>
													<Br.Column grid="lg" size="6">
														<Br.Form.DropdownSelect fieldKey='colors'
															options={this.dropdownOptions2}
															multiple={true} placeholder='Select a Color'
															required={true} />
													</Br.Column>
													<Br.Column grid="lg" size="6">
														<b>Colors value:</b>
														<p>[ {this.state.workingResource.colors && (this.state.workingResource.colors.join(', '))} ]</p>
													</Br.Column>
												</Br.Row>

												<Br.Row>
													<h3>Disabled Dropdown Select</h3>
													<Br.Column grid="lg" size="6">
														<Br.Form.DropdownSelect fieldKey='disabled'
															options={this.dropdownOptions2}
															multiple={false} placeholder='Select a Value'
															required={true} disabled={true} />
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

module.exports = DropdownSelect;
