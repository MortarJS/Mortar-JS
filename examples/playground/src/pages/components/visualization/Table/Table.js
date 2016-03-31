// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Table
 *
 * @type {*|Function}
 */
var Table = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			workingResource: [
				{
					'name'     : 'Leia Organa',
					'username' : 'lorgana',
					'email'    : 'lorgana@galaxyfarfaraway.com'
				},
				{
					'name'     : 'Luke Skywalker',
					'username' : 'lskywalker',
					'email'    : 'lskywalker@galaxyfarfaraway.com'
				},
				{
					'name'     : 'Han Solo',
					'username' : 'solocup',
					'email'    : 'solocup@galaxyfarfaraway.com'
				},
				{
					'name'     : 'Chewbacca',
					'username' : 'chewonthis',
					'email'    : 'chewie@galaxyfarfaraway.com'
				}],
			params        : {},
			openEditModal : false,
			formIsValid   : true,
			modalResource : {}

		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore
				},
				{
					store: UsersStore,
					bindTo: 'users',
					action: UsersStore.getResourceListData,
					options: this.getOptions
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

	handleAction: function(action, resource) {
		switch (action) {
			case 'edit':
				this.setState({
					openEditModal: true,
					modalResource: resource,
					resourceOperation: action
				});
				break;
			default:
				break;
		}
	},

	getOptions: {
		modifiers: {
		}
	},

	closeModal: function () {
		this.setState({
			openEditModal: false
		})
	},

	tableKeys: {
		"Name"    : "name",
		"Username" : "username",
		"Email"    : "email"
	},

	render: function() {
		var tableOptions = {};
		var editableOptions = {
			actionableRows: true,
			actions: ['edit:primary'],
			actionsCallback: this.handleAction,
			mutators: {

			}
		};

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1 className="page-header">Table</h1>
							</Br.Column>
						</Br.Row>
					</div>
					<Br.Row>
						<Br.Column grid="lg" size="12">
							<Br.Table data={this.state.workingResource}
								dataKeys={this.tableKeys}
								title={'Table'}
								options={tableOptions} />
						</Br.Column>
					</Br.Row>

					<Br.Row>
						<Br.Column grid="lg" size="12">
							<Br.Table data={this.state.workingResource}
								dataKeys={this.tableKeys}
								title={'Table with Editable Rows'}
								options={editableOptions} />
						</Br.Column>

						<Br.Modal openWhen={this.state.openEditModal}
								title="Edit User"
								closeText="Close" saveText="Save"
								afterClose={this.closeModal}>
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

module.exports = Table;

