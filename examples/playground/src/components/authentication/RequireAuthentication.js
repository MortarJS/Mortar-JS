var CmsUserStore = require('../../stores/CmsUserStore');
var Login = require('./login/Login');

/**
 * Wrap a component and require a user to be authorized to access the selected component and all its children.
 *
 * @param Component
 * @constructor
 */
var RequireAuthentication = function (Component) {
	var React = require('react/addons');
	return React.createClass({
		/**
		 * Handle redirects if not authenticated
		 * @param transition
		 */
		willTransitionTo: function(transition) {
			if (!CmsUserStore.isAuthenticated()) {
				transition.redirect('/login', {}, {'nextPath': transition.path});
			} else {
				// @todo validate the token
			}
		},

		getInitialState: function() {
			return this._getLoginState();
		},

		/**
		 * Retrieve login state from store.
		 *
		 * @returns {{loggedIn: *}}
		 * @private
		 */
		_getLoginState: function() {
			return {loggedIn: CmsUserStore.isAuthenticated()};
		},

		/**
		 * Register a change listener with the store
		 */
		componentDidMount: function() {
			this.changeListener = this._onChange;
			CmsUserStore.addChangeListener(this.changeListener);
		},

		/**
		 * Deregister change listener
		 */
		componentWillUnmount: function() {
			CmsUserStore.removeChangeListener(this.changeListener);
		},

		/**
		 * Handle emitted change events
		 *
		 * @private
		 */
		_onChange: function() {
			this.setState(this._getLoginState());
		},

		// @todo this is unneeded
		renderComponent: function() {
			if (this.state.loggedIn) {
				return (
					<Component {...this.props} loggedIn={this.state.loggedIn} />
				);
			}

			return (
				<Login />
			);
		},

		render: function() {
			return (
				<Component {...this.props} loggedIn={this.state.loggedIn} />
			);
		}
	});
};

module.exports = RequireAuthentication;
