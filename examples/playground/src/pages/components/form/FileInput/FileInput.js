// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * File Input
 *
 * @type {*|Function}
 */
var FileInput = React.createClass({
	mixins: [ResourceComponentMixin],

	getInitialState: function () {
		return {
			workingResource: {
				singleImage   : null,
				multipleImage : ['http : //playground.mortarjs.io/assets/img/img-683987.png']
			},
			formIsValid: true
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
							<Br.Column grid="lg" size="10"  classes="col-lg-offset-1">
								<h1 className="page-header">File Input</h1>
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
													<h3>Single File Input</h3>
													<Br.Column grid="lg" size="6">
														<Br.Column grid="lg" size="6">
														<Br.Form.File fieldKey='singleImage'
															options={{
																height  : 120,
																width   : 120,
																bgImage : this.state.workingResource.singleImage ? this.state.workingResource.singleImage.preview : this.state.workingResource.singleImage}}
															accept="image"
															label='Upload an image' />
														</Br.Column>
													</Br.Column>
												</Br.Row>

												<Br.Row>
													<h3>Multiple File Input</h3>
													<Br.Column grid="lg" size="12">
														<Br.Form.File fieldKey='multipleImage'
															options={{
																height   : 125,
																width    : 125,
																multiple : true,
																bgImage  : this.state.workingResource.multipleImage ? this.state.workingResource.multipleImage.preview : this.state.workingResource.multipleImage}}
															accept="any"
															label='Upload a file' />
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

module.exports = FileInput;
