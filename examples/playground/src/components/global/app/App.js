var React                    = require('react');
var MortarJS                 = require('../../../bootstrap').MortarJS;

var Login                    = MortarJS.Components.Authentication.Login.Login;
var Header                   = require('../header/Header');


var RequireAuth              = require('../../authentication/RequireAuthentication');
var AlertHandler             = MortarJS.Components.Global.AlertHandler;
var CmsUserStore             = require('../../../stores/CmsUserStore');
var SignOutConfirmationModal = require('../../authentication/login/SignOutConfirmationModal');

import {Router} from 'react-router';''

/**
 * Wrapper for the CMS application
 *
 * @type {*|exports}
 */
var App = RequireAuth(
	React.createClass({
		/**
		 * Used to state based on user authentication status
		 *
		 * @returns {{loggedIn: boolean}}
		 * @private
		 */
		_getLoginState: function () {
			return {
				loggedIn: !!CmsUserStore.isAuthenticated(),
				userIsRequestingSignOut: CmsUserStore.isRequestingSignOut()
			}
		},

		getInitialState: function () {
			return this._getLoginState();
		},

		/**
		 * Register a change listener with the CMS User Store
		 */
		componentDidMount: function () {
			this.changeListener = this._onChange;
			CmsUserStore.addChangeListener(this.changeListener);
		},

		/**
		 * Handle change events
		 *
		 * @private
		 */
		_onChange: function () {
			this.setState(this._getLoginState());
		},

		/**
		 * Deregister change listener
		 */
		componentWillUnmount: function () {
			CmsUserStore.removeChangeListener(this.changeListener);
		},

		/**
		 * Decide whether to render the app or a login page
		 *
		 * @returns {JSX}
		 */
		renderApp: function () {
			//if (! this.state.loggedIn) {
			//	return (
			//		<div id="wrapper">
			//			{! CmsUserStore.isVeryifyingAccessToken() && (
			//				<Login />
			//			)}
			//
			//			<AlertHandler />
			//		</div>
			//	)
			//} else {
				return (
					<div id="wrapper">
						<Header />

						{this.props.children}

						<AlertHandler />

						<SignOutConfirmationModal openWhen={this.state.userIsRequestingSignOut} />
					</div>
				)
		},

		render: function () {
			return this.renderApp();
		}
	})
);

module.exports = App;

