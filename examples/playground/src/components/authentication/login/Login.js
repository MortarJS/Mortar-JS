var MortarJS = require('../../../bootstrap').MortarJS;
var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');
var AuthenticationActionCreators = MortarJS.Actions.AuthenticationServerActionCreators;
var Form = MortarJS.Components.ResourceBinding.Form.Form;
var ModalButton = MortarJS.Components.Global.OpenModalButton;
var QueryHelper = MortarJS.Utils.QueryHelper;
var FormStore = MortarJS.Stores.FormStore;
var headerConfig = require('../../../config/config').header;
var PasswordResetModal = require('./PasswordResetModal');
var ForgotPasswordModal = require('./ForgotPasswordModal');
var CmsUserStore = require('../../../stores/CmsUserStore');

/**
 * Login page component
 *
 * @type {*|Function}
 */
var Login = React.createClass({
	/**
	 * Require the React router as a mixin to help with redirects
	 */
	mixins: [Router.Navigation, Router.State],

	getInitialState: function () {
		return {
			loggedIn:                   false,
			formIsValid:                true,
			showForgotModal:            false,
			user:                       {
				username:   '',
				password:   '',
				rememberMe: false
			},
			forgotPasswordEmailSuccess: false,
			showResetPasswordModal:     false,
			resetData:                  {}
		};
	},

	/**
	 * Handle logins
	 *
	 * @param event
	 */
	handleSubmit: function (event) {
		var router   = this.context.router,
			nextPath = router.getCurrentQuery().nextPath,
			username = this.state.user.username;

		var requestObject = {
			password: this.state.user.password
		};

		// User is logging in with an email
		if (username.includes('@')
			&& usernmae.includes('\.')
			&& username.lastIndexOf('.') > username.lastIndexOf('@')) {

				requestObject['email'] = this.state.user.username;
		} else {
			requestObject['username'] = this.state.user.username;
		}

		// @todo proper remember me
		AuthenticationActionCreators.login(
			requestObject,
			// Because checkboxes return an array of selected options.
			this.state.user.rememberMe.length > 0 && this.state.user.rememberMe[0]
		);
	},

	/**
	 * Register a change listener with the CMS User Store
	 */
	componentDidMount: function () {
		// Redirect logged out users to login
		if (CmsUserStore.isAuthenticated()) {
			this.transitionTo('index');
		} else if (this.getPathname() === '/logout') {
			this.transitionTo('login');
		}

		this.checkForResetToken();

		this.changeListener = this._onChange;
		CmsUserStore.addChangeListener(this.changeListener);
		FormStore.addChangeListener(this.bindResource);
	},

	/**
	 * Deregister the change listener
	 */
	componentWillUnmount: function () {
		CmsUserStore.removeChangeListener(this.changeListener);
		FormStore.removeChangeListener(this.bindResource);
	},

	/**
	 * Retrieve user login state from the CMS User Store
	 *
	 * @returns {{loggedIn: *, error: *}}
	 * @private
	 */
	_getLoginState: function () {
		return {
			loggedIn: CmsUserStore.isAuthenticated(),
			error:    CmsUserStore.getError()
		};
	},

	/**
	 * If a user comes into /password-reset (handled by this component), check for a reset token
	 */
	checkForResetToken: function () {
		var queryString = location.hash.split('?')[1];

		if (typeof queryString === 'undefined') {
			return;
		}

		var queryParams = QueryHelper.deserialize(queryString);

		if (queryParams.token) {
			this.setState({
				showResetPasswordModal: true,
				resetData:              {
					username: queryParams.username,
					token:    queryParams.token
				}
			});
		}
	},

	/**
	 * Handle change events in user login state
	 *
	 * @private
	 */
	_onChange: function () {
		// Listen to changes in forgotPasswordSent state
		if (CmsUserStore.getPasswordResetSentStatus()) {
			this.setState({
				showForgotModal:            true,
				forgotPasswordEmailSuccess: true,

			});
		}

		this.setState(this._getLoginState());
	},

	componentDidUpdate: function () {
		if (this.state.loggedIn) {
			this.transitionTo('/');
		} else {
			this.transitionTo('login');
		}
	},

	loginFormKey: 'login',

	/**
	 * Bind callback for login form resource
	 *
	 * @param resource
	 * @param isValid
	 */
	bindResource: function () {
		this.setState({
			formIsValid: FormStore.isFormValid(this.loginFormKey),
			user:        FormStore.getResource(this.loginFormKey),
		});
	},

	/**
	 * Toggle forgotPasswordModal
	 *
	 * @param event
	 */
	toggleForgotPasswordModal: function (event) {
		this.setState({
			showForgotModal: !this.state.showForgotModal
		});
	},

	/**
	 * Toggle forgotPasswordModal
	 *
	 * @param event
	 */
	toggleResetPasswordModal: function (event) {
		this.setState({
			showResetPasswordModal: !this.state.showResetPasswordModal
		});
	},

	render: function () {
		return (
			<div id="page-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-md-offset-4">
							<div className="row">
								<div className="login-panel panel panel-default">
									<div className="panel-heading">
										<h3 className="panel-title">Please Sign In to {headerConfig.title}</h3>
									</div>
									<div className="panel-body">
									{this.state.error && (
										<p>Incorrect Login Credentials</p>
									)}
										<Form key="login" formKey={this.loginFormKey}
											role="login"
											bindResource={this.state.user}
											onSubmit={this.handleSubmit} >
											<Form.Input fieldKey="username" type="input" placeholder="Username or Email" validations="isEmail" required autofocus />

											<Form.Input fieldKey="password" type="password" placeholder="Password" required />
											<Form.Row>
												<Form.Column grid="sm" size="8">
													<Form.Checkbox fieldKey="rememberMe" options={[{
														name:           'rememberMe',
														value:          true,
														label:          "Remember Me",
														identifier:     'id',
														optionResource: {rememberMe: true}
													}]} />
												</Form.Column>

												<Form.Column grid="sm" size="4">
													<ModalButton buttonText="Forgot Password"
														classNames="btn btn-link btn-xs pull-right btn-forgot-password"
														handleOpenModal={this.toggleForgotPasswordModal} />
												</Form.Column>
											</Form.Row>

											<Form.Submit text="Login" />
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>

					{this.state.showForgotModal && (
						<ForgotPasswordModal showForgotModal={this.state.showForgotModal}
							emailSendSuccess={this.state.forgotPasswordEmailSuccess}
							toggleModal={this.toggleForgotPasswordModal} />
					)}

					{this.state.showResetPasswordModal && (
						<PasswordResetModal showModal={this.state.showResetPasswordModal}
							username={this.state.resetUsername}
							toggleModal={this.toggleResetPasswordModal}
							resetData={this.state.resetData}/>
					)}
				</div>

			</div>
		)
	}
});

Login.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Login;
