// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Modal', 'ButtonDrawer');

// Stores
var FormStore              = MortarJS.Stores.FormStore;
var UsersStore             = require('../../../../../stores/UsersStore');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Table
 *
 * @type {*|Function}
 */
var Example = React.createClass({
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
			params          : {},
			openCreateModal : false,
			openDeleteModal : false,
			formIsValid     : true,
			formData        : {},
			modalResource   : {}

		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore,
					changeListener: this.bindResource
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

	formKey: "ModalForm",

	bindResource: function () {
		this.setState({
			formData: FormStore.getResource(this.formKey)
		});
	},

	handleAction: function(action, resource) {
		switch (action) {
			case 'add':
				this.setState({
					openCreateModal   : true,
					modalResource     : resource,
					resourceOperation : action
				});
				break;
			case 'delete':
				this.setState({
					openDeleteModal   : true,
					modalResource     : resource,
					resourceOperation : action
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
			openCreateModal: false,
			openDeleteModal: false
		});
	},

	deleteData: function() {
		this.setState({
			workingResource: [],
			openCreateModal: false,
			openDeleteModal: false
		});
	},

	addTableRow: function() {
		this.setState((previousState) => {
			previousState.workingResource.push(previousState.formData);
			previousState.formData = {};
			previousState.openCreateModal = false;
			previousState.openDeleteModal = false;

			return previousState;
		});
	},

	tableKeys: {
		"Name"     : "name",
		"Username" : "username",
		"Email"    : "email"
	},

	drawerButtons: function() {
		return [
			{
				action: 'add',
				icon: 'pencil',
				mods: 'success'
			},
			{
				action: 'delete',
				icon: 'times',
				mods: 'danger'
			}
		];
	},

	render: function() {
		var tableOptions = {
			hideSpinner: true,
			emptyText: "These aren't the droids you're looking for."
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

					<Br.ButtonDrawer handleAction={this.handleAction} icon="info-circle" mods={this.state.workingResource.mod} buttons={this.drawerButtons()} />

					<Br.Row>
						<Br.Modal
							openWhen={this.state.openCreateModal}
							title={'Add a row!'}
							closeText={'cancel'}
							confirmText={'save'}
							afterClose={this.closeModal}
							afterConfirm={this.addTableRow}
							width='500px' >

							<Br.Form key="ModalForm" formKey={this.formKey} bindResource={this.state.formData}>
								<Br.Form.Input fieldKey="name"     type="text" label="Name"     placeholder="" required="true" />
								<Br.Form.Input fieldKey="username" type="text" label="Username" placeholder="" required="true" />
								<Br.Form.Input fieldKey="email"    type="text" label="Email"    placeholder="" required="true" />
							</Br.Form>

							<p>Modals are highly customizable and serve as a shell for many other components.</p>

						</Br.Modal>
					</Br.Row>

					<Br.Row>
						<Br.Modal
							openWhen={this.state.openDeleteModal}
							title={'Delete Table Data'}
							closeText={'cancel'}
							confirmText={'confirm'}
							afterClose={this.closeModal}
							afterConfirm={this.deleteData}
							width='500px' >

							<p>Are you sure you'd like to delete all table data?</p>

						</Br.Modal>
					</Br.Row>
				</div>
			</div>
		);

	}
});

module.exports = Example;
