'use strict';
var React = require('react');

var CmsUserStore = require('../../stores/CmsUserStore');
var _ = require('lodash');

/**
 * Require certain permissions for selected components
 *
 * @type {*|Function}
 */
var RequirePermissions = React.createClass({
	propTypes: {
		requiredPermissions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	},

	getInitialState: function () {
		return {
			userPermissions: []
		}
	},

	/**
	 * Set state based on retrieved user permissions
	 */
	componentWillMount: function () {
		this.setState(this._setComponentState());
	},

	/**
	 * Retrieve user permissions
	 *
	 * @returns {{userPermissions: *}}
	 * @private
	 */
	_setComponentState: function () {
		return {
			userPermissions: this._getUserPermissions()
		}
	},

	/**
	 * Retrieve user permissions from the CMS User store
	 *
	 * @returns {*}
	 * @private
	 */
	_getUserPermissions: function () {
		return CmsUserStore.getUserPermissions();
	},

	/**
	 * Register change listeners with the CMS User Store
	 */
	componentDidMount: function () {
		CmsUserStore.addChangeListener(this._onChange);
	},

	/**
	 * Deregister listeners with the CMS User Store
	 */
	componentWillUnmount: function () {
		CmsUserStore.removeChangeListener(this._onChange);
	},

	/**
	 * Handle emitted changes
	 *
	 * @private
	 */
	_onChange: function () {
		this.setState(this._setComponentState());
	},

	/**
	 * Determine if we should render the child component(s) based on the user's permissions
	 *
	 * @returns {boolean}
	 * @private
	 */
	_shouldRenderComponent: function () {
		// Check that at least one of the requiredPermissions matches this one of the user's permissions
		return _.intersection(this.state.userPermissions, this.props.requiredPermissions).length > 0;
	},

	render: function () {
		if (this._shouldRenderComponent()) {
			return <div className="required-permissions">{this.props.children}</div>;
		}

		return null;
	}
});

module.exports = RequirePermissions;
