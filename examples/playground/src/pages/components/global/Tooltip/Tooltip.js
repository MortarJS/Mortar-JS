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
				width       : "300px",
				height      : "50px",
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
		{label: 'Right',  value: 'right'}
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
											<h2>Overview</h2>
											<br />
											<p>Tooltips can be applied to any object! Simply wrap your component in the Mortar Tooltip component, and the tooltip will show up on hover.</p>
											<p>Below are all the customization options that can be applied to the tooltip.</p>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<h2>Customizing</h2>
											<p>Below are all of the props that can be passed to the tooltip to customize it!  Try playing around to see how it changes!</p>
											<p>Please note that as of React 15, units are requred when specifying lengths.  As such, the <b>width</b> and <b>height</b> properties will require a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/length">valid CSS unit</a> to work properly.  If one is not provided, Mortar will do it's best to make sense of the input.</p>
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
														<Br.Form.Input fieldKey="text" type="text" label="text (required)" required={true} />
													</Br.Row>

													<Br.Row>
														<Br.Form.Input fieldKey="width" type="text" label="width" placeholder="300px"/>
													</Br.Row>
													<Br.Row>
														<Br.Form.Input fieldKey="height" type="text" label="height" placeholder="50px"/>
													</Br.Row>

												</Br.Column>

												<Br.Column grid="lg" size="4">
													<Br.Row>
														<Br.Form.RadioButtons fieldKey="orientation" options={this.orientations}
															label="orientation"
															required="true" />
													</Br.Row>
												</Br.Column>

												<Br.Column grid="lg" size="4">
													<Br.Tooltip text="Try a hex value, a rgba declaration, or a css color constant!" orientation="top" width="200px" height="110px">
														<Br.Row>
															<Br.Form.Input fieldKey="color" type="text" label="color" placeholder="50px"/>
														</Br.Row>
													</Br.Tooltip>

													<Br.Row>
														<Br.Tooltip text="Try a hex value, a rgba declaration, or a css color constant!" orientation="top" width="200px" height="110px">
															<Br.Form.Input fieldKey="background" type="text" label="background" placeholder="50px"/>
														</Br.Tooltip>
													</Br.Row>

													<Br.Row>
														<Br.Form.Toggle fieldKey="keepOpen" fieldLabel="keepOpen" mods={[this.state.workingResource.mods]} />
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

