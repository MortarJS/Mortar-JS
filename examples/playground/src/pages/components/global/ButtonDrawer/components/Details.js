// External Requirements
var React                  = require('react');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'ButtonDrawer', 'Tooltip');
var icomoonConfig          = require('json!../../../../../../../../lib/styles/fonts/icomoon/selection.json');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Text Input
 *
 * @type {*|Function}
 */
var Details = React.createClass({
	mixins: [ResourceComponentMixin],

	getInitialState: function () {
		return {
			workingResource: {
				mod: 'primary'
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

	formKey: 'modForm',

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	handleAction: function() { },

	bindResource: function() {
		this.setState({
			workingResource: FormStore.getResource(this.formKey)
		});
	},

	buildIcomoonButtonExamples: function() {
		return icomoonConfig.icons.map((icon, index) => {
			let name = icon.properties.name;

			if (name.includes(',')) {
				name = name.slice(0, name.indexOf(","));
			}

			let width = name.length > 15 ? name.length * 10 : name.length * 15;

			return (
				<Br.Tooltip key={index} text={name} width={width + 'px'} orientation="top">
					<a style={ {"margin": "0 5px"} } className={`btn btn-${this.state.workingResource.mod} btn-fab btn-raised icon icon-${name}`} />
				</Br.Tooltip>
			);
		});
	},

	modOptions: [
		{label: 'Default', value: 'default'},
		{label: 'Primary', value: 'primary'},
		{label: 'Success', value: 'success'},
		{label: 'Info',    value: 'info'},
		{label: 'Warning', value: 'warning'},
		{label: 'Danger',  value: 'danger'},
		{label: 'Link',    value: 'link'}
	],

	render: function() {
		let drawer1 = [
			{
				action       : 'test',
				handleAction : this.handleAction,
				icon         : 'table',
				mods         : ['info']
			},
			{
				action       : 'test',
				handleAction : this.handleAction,
				icon         : 'paint-brush',
				mods         : 'default'
			}
		];

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="9">
								<h2>Overview</h2>
								<p>The ButtonDrawer component is useful for adding multiple actionable events to a page without taking up a lot of valuable screen space.  Hover the fab button in the buttom right to see what it looks like in action.</p>
								<p>Please note that the hidden button elements are shown by hovering the button drawer.  Since there are no hover events on mobile, tapping the drawer will show all buttons, and tapping outside the drawer will hide them.</p>

								<h2>Customizing</h2>
								<p>The ButtonDrawer is built with icon fonts in mind.  We've made it compatible with any css-based icon font by adding the <code>iconClass</code> property to the component. For example, to use the ButtonDrawer with <a href="http://fontawesome.io">Font Awesome</a>, you would set the ButtonDrawer's <code>ButtonDrawer iconClass="fa"</code></p>

								<p>This allows for quick integration with your current workflow and styling choices.</p>

								<p>We've included a few <a href="http://icomoon.io">icomoon</a> icons in Mortar that you can reference by default, which you can see below.</p>

								<br />

								{this.buildIcomoonButtonExamples()}
							</Br.Column>

							<Br.Column grid="lg" size="3">
								<Br.Form key="modForm" formKey={this.formKey} bindResource={this.state.workingResource}>
									<Br.Form.RadioButtons fieldKey='mod'
										options={this.modOptions}
										label='Select a Mod' />
								</Br.Form>
							</Br.Column>
						</Br.Row>

					</div>
				</div>
				<Br.ButtonDrawer handleAction={this.handleAction} icon="info-circle" mods={this.state.workingResource.mod} buttons={drawer1} />
			</div>
		);
	}
});

module.exports = Details;
