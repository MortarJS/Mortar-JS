// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Button', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Table
 *
 * @type {*|Function}
 */
var ModalContainer = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			params         : {},
			formIsValid    : true,
			openModal      : false,
			workingResource: {
				mods : 'default',
				title: 'This is a Mortar Modal!'
			}
		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store         : FormStore,
					changeListener: this.bindResource
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

	closeModal: function() {
		this.setState({
			openModal: false
		});
	},

	openModal: function() {
		this.setState({
			openModal: true
		});
	},

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1 className="page-header">Modal Container</h1>
								<p>Use Mortar modals to display additional information, open resource editing forms, or whatever else your application needs.</p>
								<Br.Button
									action='open'
									text='Open Modal'
									mods={['primary']}
									handleAction={this.openModal}
								/>
							</Br.Column>
						</Br.Row>
						<Br.Row>
							<Br.Column grid="lg" size="3">
								<h3>Customizable Options</h3>
								<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>
									<Br.Row>
										<Br.Form.Input fieldKey="title" type="text" label="Title" required="true" />
									</Br.Row>
									<Br.Row>
										<Br.Form.Input fieldKey="confirmText" type="text" label="Confirm Text" placeholder="Confirm"/>
									</Br.Row>
									<Br.Row>
										<Br.Form.Input fieldKey="closeText" type="text" label="Close Text" placeholder="Close"/>
									</Br.Row>
									<Br.Row>
										<Br.Form.Input fieldKey="width" type="text" label="Width" placeholder="600px"/>
									</Br.Row>
									<Br.Row>
										<Br.Form.Toggle fieldKey="toggleConfirm" fieldLabel="Disable Confirm Button" mods={[this.state.workingResource.mods, 'simple']} />
									</Br.Row>
									<Br.Row>
										<Br.Form.Toggle fieldKey="toggleKeepOpen" fieldLabel="Keep Modal Open" mods={[this.state.workingResource.mods, 'simple']} />
									</Br.Row>
								</Br.Form>
							</Br.Column>
						</Br.Row>
						<Br.Row>
							<Br.Modal
								openWhen={this.state.openModal}
								title={this.state.workingResource.title}
								closeText={this.state.workingResource.closeText}
								confirmText={this.state.workingResource.confirmText}
								afterClose={this.closeModal}
								disableConfirm={this.state.workingResource.toggleConfirm}
								options={{
									keepOpen: this.state.workingResource.toggleKeepOpen
								}}
								width={this.state.workingResource.width} >

								<p>Modals are highly customizable and serve as a shell for many other components.</p>

							</Br.Modal>
						</Br.Row>
					</div>
				</div>
			</div>
		);

	}
});

module.exports = ModalContainer;

