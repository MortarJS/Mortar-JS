var React = require('react');
var MortarJS = require('../../../bootstrap').MortarJS;
var Form = MortarJS.Components.ResourceBinding.Form.Form;
var Modal = MortarJS.Components.Global.Modal;
var CmsUserStore = require('../../../stores/CmsUserStore');
var AuthenticationActionCreators = MortarJS.Actions.AuthenticationServerActionCreators;
var FormStore = MortarJS.Stores.FormStore;

var ForgotPasswordModal = React.createClass({
	getInitialState: function () {
		return {
			formIsValid:    true,
			forgotPassword: {
				email: ''
			}
		};
	},

	/**
	 * Register a change listener with the CMS User Store
	 */
	componentDidMount: function () {
		this.changeListener = this._onChange.bind(this);
		CmsUserStore.addChangeListener(this.changeListener);
		FormStore.addChangeListener(this.bindForgotPasswordForm);
	},

	/**
	 * Deregister the change listener
	 */
	componentWillUnmount: function () {
		CmsUserStore.removeChangeListener(this.changeListener);
		FormStore.removeChangeListener(this.bindForgotPasswordForm);
	},

	/**
	 * Handle change events in password reset request state
	 *
	 * @private
	 */
	_onChange: function () {
		if (CmsUserStore.getPasswordResetSentStatus()) {
			this.setState({
				showForgotModal:  true,
				emailSendSuccess: true,

			});
		}
	},

	formKey: 'forgotPassword',

	/**
	 * Bind callback for forgot password form resource
	 *
	 * @param resource
	 * @param isValid
	 */
	bindForgotPasswordForm: function () {
		this.setState({
			formIsValid: FormStore.isFormValid(this.formKey),

			forgotPassword: {
				email: FormStore.getResource(this.formKey).email
			}
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
			return this.props.emailSendSuccess ? 'Resend' : 'Send';
		}
	},

	/**
	 * Submit a passsword reset request
	 */
	handleForgotPasswordSubmit: function () {
		var requestObject = {};

		// User is submitted a request with an email
		if (this.state.forgotPassword.email.indexOf('@') > -1 && this.state.forgotPassword.email.indexOf('.') > -1) {
			requestObject['email'] = this.state.forgotPassword.email;
		} else {
			requestObject['username'] = this.state.forgotPassword.email;
		}

		AuthenticationActionCreators.forgotPassword(requestObject);
	},

	render: function () {
		return (
			<Modal openWhen={this.props.showForgotModal}
				beforeClose={this.props.toggleModal}
				beforeSave={this.handleForgotPasswordSubmit}
				afterSave={this.props.emailSendSuccess ? this.props.toggleModal : void(0)}
				saveText={this._renderForgotModalButtonText('save')}
				closeText={this._renderForgotModalButtonText('close')} >

				{!this.props.emailSendSuccess && (
					<Form.Column grid="sm" size="12">
						<Form.Row>
							<h1>Forgot Password&#63;</h1>
							<p>Enter your email address below and we’ll send you a code to reset your password.</p>
							<Form key="forgotPassword" formKey={this.formKey}
								role="forgot-password"
								bindResource={this.state.forgotPassword} >
								<Form.Input fieldKey="email" type="text" placeholder="Enter Email or Username" required autofocus />
							</Form>
						</Form.Row>
					</Form.Column>
				)}

				{this.props.emailSendSuccess && (
					<Form.Column grid="sm" size="12">
						<Form.Row>
							<h1>Check your email.</h1>
							<p>An email has been sent to the address you entered with a link to follow to reset your password.</p>
						</Form.Row>
					</Form.Column>
				)}

			</Modal>
		)
	}
});

module.exports = ForgotPasswordModal;
