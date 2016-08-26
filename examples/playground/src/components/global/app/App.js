var React                    = require('react');
var config                   = require('../../../config/config');
var MortarJS                 = require('../../../bootstrap').MortarJS;

var Menu                     = MortarJS.Components.Global.Menu;
var AlertHandler             = MortarJS.Components.Global.AlertHandler;
var CmsUserStore             = require('../../../stores/CmsUserStore');

import {Router} from 'react-router';''

/**
 * Wrapper for the CMS application
 *
 * @type {*|exports}
 */
var App = React.createClass({
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
			return (
				<div id="wrapper">
					<Menu items={config.navbar} />

					{this.props.children}

					<AlertHandler />
				</div>
			)
	},

	render: function () {
		return this.renderApp();
	}
})

module.exports = App;

