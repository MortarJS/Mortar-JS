var React                    = require('react');
var MortarJS                 = require('../bootstrap').MortarJS;

import {Router} from 'react-router';

/**
 * Wrapper for the CMS application
 *
 * @type {*|exports}
 */
var App = React.createClass({

	getInitialState: function () {
		return {};
	},

	/**
	 * Register a change listener with the CMS User Store
	 */
	componentDidMount: function () {
	},

	/**
	 * Deregister change listener
	 */
	componentWillUnmount: function () {
	},

	/**
	 * Decide whether to render the app or a login page
	 *
	 * @returns {JSX}
	 */
	renderApp: function () {
		return (
			<div id="wrapper">

				{this.props.children}

			</div>
		);
	},

	render: function () {
		return this.renderApp();
	}
});

module.exports = App;

