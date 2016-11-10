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
 * Checkbox Input
 *
 * @type {*|Function}
 */
var Checkbox = React.createClass({
	mixins: [ResourceComponentMixin],

	getInitialState: function () {
		return {
			workingResource: {
				seasons: [],
				colors: [
					{label: 'Blue',   value: 'blue'},
					{label: 'Pink',   value: 'pink'}
				],
			},
			params: {},
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

	formKey: 'checkboxForm',

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

	checkboxValue: function(array) {
		return array.map((value) => {
			return value.label;
		}).join(', ');
	},

	checkboxOptions1: [
		{label: 'Winter', value: 'winter'},
		{label: 'Spring', value: 'spring'},
		{label: 'Summer', value: 'summer'},
		{label: 'Fall',   value: 'fall'}
	],

	checkboxOptions2: [
		{label: 'Red',    value: 'red'},
		{label: 'Blue',   value: 'blue'},
		{label: 'Green',  value: 'green'},
		{label: 'Yellow', value: 'yellow'},
		{label: 'Pink',   value: 'pink'},
		{label: 'Taupe',  value: 'taupe'},
		{label: 'Mauve',  value: 'mauve'}
	],

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="10" classes="col-lg-offset-1">
								<h1>Checkboxes</h1>
							</Br.Column>
						</Br.Row>
					</div>
				</div>
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
										<Br.Row classes="seasons-select">
											<h3>Seasons Checkbox</h3>
											<Br.Column grid="lg" size="6">
												<Br.Form.Checkbox fieldKey='seasons'
													options={this.checkboxOptions1}
													inputLabel='Select a Season' />
											</Br.Column>
											<Br.Column grid="lg" size="6">
												<b>Seasons value:</b>
												<p className="seasons-value">{this.checkboxValue(this.state.workingResource.seasons)}</p>
											</Br.Column>
										</Br.Row>

										<Br.Row classes="disabled-select">
											<h3>Disabled Checkbox</h3>
												<Br.Column grid="lg" size="6">
													<Br.Form.Checkbox fieldKey='colors'
														options={this.checkboxOptions2}
														inputLabel='Select a Color'
														disabled={true} />
												</Br.Column>
												<Br.Column grid="lg" size="6">
													<b>Colors value:</b>
													<p className="disabled-value">{this.checkboxValue(this.state.workingResource.colors)}</p>
												</Br.Column>
										</Br.Row>
									</Br.Form>
								</Br.Column>
							</Br.Row>

						</div>
					</Br.Column>
				</Br.Row>

			</div>
		);
	}
});

module.exports = Checkbox;
