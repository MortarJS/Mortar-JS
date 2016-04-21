// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'ButtonDrawer', 'Tooltip');
var icomoonConfig = require('json!../../../../../../../../lib/styles/fonts/icomoon/selection.json');

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
	mixins: [ResourceComponentMixin, Router.Navigation],

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
					store: FormStore,
					changeListener: this.bindResource
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

	handleAction: function(action, resource) {

	},

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
				<Br.Tooltip key={index} text={name} width={width} orientation="top">
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
				action: 'test',
				handleAction: this.handleAction,
				icon: 'times',
				mod: 'danger'
			},
			{
				action: 'test',
				handleAction: this.handleAction,
				icon: 'pencil',
				mod: 'success'
			}
		];

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="9">
								<p>The ButtonDrawer component... </p>

								<h3>Customizing</h3>
								<p>The ButtonDrawer is built with icon fonts in mind.  We've made it compatible with any css-based icon font by adding the <b>iconClass</b> property to the component.</p>

								<p>We've included a few <a href="http://icomoon.io">icomoon</a> icons in Mortar that you can reference by default, which you can see below.</p>

								{this.buildIcomoonButtonExamples()}
							</Br.Column>

							<Br.Column grid="lg" classes="col-lg-offset-3" size="3">
								<Br.Form key="modForm" formKey={this.formKey} bindResource={this.state.workingResource}>
									<Br.Form.RadioButtons fieldKey='mod'
										options={this.modOptions}
										label='Select a Mod' />
								</Br.Form>
							</Br.Column>
						</Br.Row>

					</div>
				</div>
				<Br.ButtonDrawer icon="info-circle" mods={this.state.workingResource.mod} buttons={drawer1} />
			</div>
		);
	}
});

module.exports = Details;
