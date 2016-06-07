// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
// var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Actionable Rows
 *
 * @type {*|Function}
 */
var ActionableRows = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function() {
		return {
			params          : {},
			modalResource   : {},
			workingResource : this.props.workingResource,
			openEditModal   : false,
			formIsValid     : true
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

	formKey: 'userForm',

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	bindResource: function() {
		this.setState({
			modalResource: FormStore.getResource(this.formKey)
		});
	},

	handleAction: function(action, resource) {
		switch (action) {
			case 'edit':
				this.setState({
					openEditModal : true,
					modalResource : resource
				});
				break;
			default:
				break;
		}
	},

	updateResource: function() {
		this.setState((previousState) => {
			previousState.workingResource.forEach((row, i) => {
				if (row.id === previousState.modalResource.id) {
					previousState.workingResource[i] = previousState.modalResource;
				}
			});

			previousState.openEditModal = false;
			previousState.modalResource = {};

			return previousState;
		});
	},

	closeModal: function() {
		this.setState({
			openEditModal: false
		});
	},

	render: function() {
		var tableOptions = {
			actionableRows  : true,
			actions         : ['edit:primary'],
			actionsCallback : this.handleAction,
			mutators        : {}
		};

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<Br.Row>
						<Br.Column grid="lg" size="12">
							<Br.Table data={this.state.workingResource}
							dataKeys={this.props.tableKeys}
							title={'Table with Actionable Rows'}
							options={tableOptions} />
						</Br.Column>
					</Br.Row>

					<Br.Modal openWhen={this.state.openEditModal}
						title="Edit User"
						closeText="Close" saveText="Save"
						afterClose={this.closeModal} beforeConfirm={this.updateResource}>
						<div className="edit-modal">
							<Br.Row>
								<Br.Form key="editUser" formKey={this.formKey}
									bindResource={this.state.modalResource} >
									<Br.Row>
										<Br.Column grid="sm" size="6">
											<Br.Form.Input fieldKey="name"
												type="text" label="Name"
												placeholder="User's Name"
											/>
											<Br.Form.Input fieldKey="username"
												type="text" label="Username"
												placeholder="Username"
											/>
											<Br.Form.Input fieldKey="email"
												type="text" label="Email"
												placeholder="Email"
											/>
										</Br.Column>
									</Br.Row>
								</Br.Form>
							</Br.Row>
						</div>
					</Br.Modal>

				</div>
			</div>
		);
	}
});

module.exports = ActionableRows;
