var React = require('react/addons');
var MortarJS = require('../../../bootstrap').MortarJS;
var Form = MortarJS.Components.ResourceBinding.Form.Form;
var Modal = MortarJS.Components.Global.Modal;
var CmsUserStore = MortarJS.Stores.CmsUserStore;
var AuthenticationActionCreators = MortarJS.Actions.AuthenticationServerActionCreators;
var FormStore = MortarJS.Stores.FormStore;

var PasswordResetModal = React.createClass({
	getInitialState: function () {
		return {
			newPassword: {
				password:     '',
				confirmation: '',
				username:     '',
			},
			token:       ''
		};
	},

	/**
	 * Set username on component reception
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps: function (nextProps) {
		// Merge with previous state
		var newPassword = this.state.newPassword;
		newPassword.username = nextProps.resetData.username;

		this.setState({
			newPassword: newPassword,
			token: nextProps.resetData.token
		});
	},

	/**
	 * Register a change listener with the CMS User Store
	 */
	componentDidMount: function () {
		FormStore.addChangeListener(this.bindResource);
	},

	/**
	 * Deregister the change listener
	 */
	componentWillUnmount: function () {
		FormStore.removeChangeListener(this.bindResource);
	},

	formKey: 'passwordReset',

	/**
	 * Bind callback for reset form resource
	 *
	 * @param resource
	 * @param isValid
	 */
	bindResource: function () {
		this.setState({
			newPassword: {
				username: this.props.resetData.username,
				password: FormStore.getResource(this.formKey).password
			},
			token: this.props.resetData.token,
			formIsValid: FormStore.isFormValid(this.formKey)
		});
	},

	/**
	 * Determine button text for password reset modal
	 *
	 * @param button
	 * @returns {string}
	 * @private
	 */
	_renderForgotModalButtonText: function (button) {
		if (button === 'close') {
			return this.props.emailSendSuccess ? 'Close' : 'Cancel';
		} else {
			return this.props.emailSendSuccess ? 'Log In' : 'OK';
		}
	},

	/**
	 * Submit a passsword reset request
	 */
	handleSubmit: function () {
		if (this.state.newPassword.password !== this.state.newPassword.confirmation) {
			this.setState({
				error: 'The passwords entered do not match.'
			});
			return;
		}

		var data = {
			password: this.state.newPassword.password,
			token:    this.state.token,
			username: this.state.newPassword.username
		}

		this.setState({
			error: false
		});

		AuthenticationActionCreators.resetPassword(data, {alertText: 'Password successfully reset.'});

		this.props.toggleModal();
	},

	render: function () {
		return (
			<Modal openWhen={this.props.showModal}
				beforeClose={this.props.toggleModal}
				beforeSave={this.handleSubmit}
				afterSave={this.props.emailSendSuccess ? this.props.toggleModal : void(0)}
				saveText={'OK'}
				closeText={'Cancel'}
				options={{width: '35%'}}
				title="Reset Password" >
				<div>
					<p>Enter a new password below. Passwords must be at least 8 characters</p>

					<Form key="passwordReset" formKey={this.formKey}
						role="passwordReset"
						bindResource={this.state.newPassword}
						onSubmit={this.handleSubmit} >
						<Form.Column grid="md" size="10" classes="col-md-offset-1">
							<Form.Input fieldKey="username" type="email" placeholder="Username" validations="isLength:8" disabled={true} required autofocus />

							<Form.Input fieldKey="password" type="password" placeholder="New Password" validations="isLength:8" required autofocus />

							<Form.Input fieldKey="confirmation" type="password" placeholder="Confirm New Password" validations="isLength:8" required
								helpText={this.state.error} />
						</Form.Column>
					</Form>
				</div>

			</Modal>
		)
	}
});

module.exports = PasswordResetModal;
