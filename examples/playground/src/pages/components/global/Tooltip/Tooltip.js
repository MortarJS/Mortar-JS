// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Button', 'Modal', 'Tooltip');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Table
 *
 * @type {*|Function}
 */
var Tooltip = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			params         : {},
			formIsValid    : true,
			workingResource: {
				text        : "I'm a tooltip!",
				orientation : "top",
				width       : 300,
				height      : 50,
				color       : "black",
				background  : "white",
				keepOpen    : true
			}
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

	formKey: 'modalContainer',

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

	orientations: [
		{label: 'Top',    value: 'top'},
		{label: 'Bottom', value: 'bottom'},
		{label: 'Left',   value: 'left'},
		{label: 'Right',  value: 'right'},
	],

	doNothing: function() {},

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="10"  classes="col-lg-offset-1">
								<h1 className="page-header">Tooltip</h1>
							</Br.Column>
						</Br.Row>

						<Br.Row>
							<Br.Column grid="lg" size="10"  classes="col-lg-offset-1">
								<div className="panel panel-default">

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<br />
											<p>Tooltips can be applies to any object!</p>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="6" classes="col-lg-offset-5">
											<br />
											<br />
											<br />
											<br />
											<Br.Tooltip text={this.state.workingResource.text}
												orientation={this.state.workingResource.orientation}
												width={this.state.workingResource.width}
												height={this.state.workingResource.height}
												color={this.state.workingResource.color}
												background={this.state.workingResource.background}
												keepOpen={this.state.workingResource.keepOpen} >

												<Br.Button action="null" text="Hover me!" handleAction={this.doNothing} mods={['danger']} />
											</Br.Tooltip>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<h3>Customizable Options</h3>
											<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>

												<Br.Column grid="lg" size="4">
													<Br.Row>
														<Br.Form.Input fieldKey="text" type="text" label="Title" required="true" />
													</Br.Row>

													<Br.Row>
														<Br.Form.Input fieldKey="width" type="number" label="Width" placeholder="300px"/>
													</Br.Row>
													<Br.Row>
														<Br.Form.Input fieldKey="height" type="number" label="Height" placeholder="50px"/>
													</Br.Row>

												</Br.Column>

												<Br.Column grid="lg" size="4">
													<Br.Row>
														<Br.Form.RadioButtons fieldKey="orientation" options={this.orientations}
															label="Orientation"
															required="true" />
													</Br.Row>
												</Br.Column>

												<Br.Column grid="lg" size="4">
													<Br.Tooltip text="Try a hex value, or a css color constant!" orientation="top" width="200" height="75">
														<Br.Row>
															<Br.Form.Input fieldKey="color" type="text" label="Color" placeholder="50px"/>
														</Br.Row>
													</Br.Tooltip>

													<Br.Row>
														<Br.Tooltip text="Try a hex value, or a css color constant!" orientation="top" width="200" height="75">
															<Br.Form.Input fieldKey="background" type="text" label="Background" placeholder="50px"/>
														</Br.Tooltip>
													</Br.Row>

													<Br.Row>
														<Br.Form.Toggle fieldKey="keepOpen" fieldLabel="Keep Open" mods={[this.state.workingResource.mods]} />
													</Br.Row>
												</Br.Column>

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

module.exports = Tooltip;

