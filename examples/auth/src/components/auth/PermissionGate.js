import React from 'react';
import AuthStore from './AuthStore';
import PermissionsStore from './PermissionsStore';

var _ = require('lodash');

var PermissionGate = React.createClass({

	require: function() {
		if (! this.props.require) {
			return true;
		}

		let userPermissions = AuthStore.getUserPermissions();

		return (_.intersection(userPermissions, this.props.require).length > 0);
	},

	deny: function() {
		if (! this.props.deny) {
			return false;
		}

		let userPermissions = AuthStore.getUserPermissions();

		return (_.intersection(userPermissions, this.props.deny).length > 0);
	},

	render: function() {
		return (
			<div>
				{(() => {
					switch (this.require() && ! this.deny()) {
							case true  : return this.props.children;
							case false : return null;
							default    : return null;
					}
				})()}
			</div>
		);
	}
});

module.exports = PermissionGate;
