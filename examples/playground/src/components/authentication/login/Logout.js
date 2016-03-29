var React = require('react/addons');
var MortarJS = require('../../../bootstrap').MortarJS;
var AuthenticationActionCreators = require('../../../actions/AuthenticationServerActionCreators');

/**
 * Logout page component
 *
 * @type {*|Function}
 */
var Logout = React.createClass({
	/**
	 * Once a user is logged out, the Login component takes over.
	 */
	componentDidMount: function () {
		AuthenticationActionCreators.logoutUser();
	},

	render: function () {
		return (
			<div id="page-wrapper">
			</div>
		)
	}
});

Logout.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Logout;
