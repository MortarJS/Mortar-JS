// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Editable Rows
 *
 * @type {*|Function}
 */
var EditableRows = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			params        : {},
			modalResource : {},
			openEditModal : false,
			formIsValid   : true

		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore
				},
				{
					store   : UsersStore,
					bindTo  : 'users',
					action  : UsersStore.getResourceListData,
					options : this.getOptions
				}
			]
		};
	},

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	handleAction: function (action, resource) {
		switch (action) {
			case 'edit':
				this.setState({
					openEditModal     : true,
					modalResource     : resource,
					resourceOperation : action
				});
				break;
			default:
				break;
		}
	},

	handleUpdate: function () {

	},

	closeModal: function () {
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
							<Br.Table data={this.props.workingResource}
								dataKeys={this.props.tableKeys}
								title={'Table with Editable Rows'}
								options={tableOptions} />
						</Br.Column>

						<Br.Modal openWhen={this.state.openEditModal}
							title="Edit User"
							closeText="Close" saveText="Save"
							afterClose={this.closeModal} beforeConfirm={this.handleUpdate}>
							<div className="edit-modal">
								<Br.Row>
									<Br.Form key="editUser" formKey="modalForm"
											bindResource={this.state.modalResource}>
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
						</Br.Row>
				</div>
			</div>
		);
	}
});

module.exports = EditableRows;
