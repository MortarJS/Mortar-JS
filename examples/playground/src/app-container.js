var config = require('./config/config');
var MortarJS = require('./bootstrap').MortarJS;

// Should go separately into MortarJS.App or something other than the MortarJS index bootstrap because that's not actually exported
// until the end of this file
MortarJS.Actions.AuthenticationServerActionCreators = require('./actions/AuthenticationServerActionCreators');
MortarJS.Actions.ResourceActions = require('./actions/ResourceActionCreators');

MortarJS.Components.Authentication = {
	Login: {
		Login:  require('./components/authentication/login/Login'),
		Logout: require('./components/authentication/login/Logout'),
		SignOutConfirmationModal: require('./components/authentication/login/SignOutConfirmationModal'),
		PasswordResetModal: require('./components/authentication/login/PasswordResetModal'),
		ForgotPasswordModal: require('./components/authentication/login/ForgotPasswordModal'),
		SignOutHeaderLink: require('./components/authentication/login/SignOutHeaderLink')
	},

	RequireAuthentication: require('./components/authentication/RequireAuthentication'),
	RequirePermissions:    require('./components/authentication/RequirePermissions')
};

MortarJS.Components.Visualization.Exports = {
	Exporter: require('./components/visualization/exports/Exporter')
};

MortarJS.Components.Global.Header = {
	Header: require('./components/global/header/Header'),
	NavBar: require('./components/global/header/navigation/NavBar')
};

MortarJS.Components.Global.App = require('./components/global/app/App');

MortarJS.Stores.CmsUserStore = require('./stores/CmsUserStore');

MortarJS.Utils.ApiService = require('./utils/ApiService');
MortarJS.Utils.AuthenticationApi = require('./utils/AuthenticationApi');

/**
 * Overwrite how we dynamically and intelligently parse string requirements
 *
 * Format: MortarJS.require('type(components|action|etc)', 'require1', 'require2');
 *
 * @param type
 * @returns {{}}
 */
MortarJS.require = function (type) {
	var required = {};
	var exportType = type.toLowerCase().charAt(0).toUpperCase() + type.slice(1);
	var flattened = MortarJS.flatten(MortarJS[exportType], '', {});

	for (var key in arguments) {
		var argument = arguments[key];
		if (flattened.hasOwnProperty(argument)) {
			required[argument] = _.get(MortarJS[exportType], flattened[argument]);
		}
	}

	return required;
};

module.exports.MortarJS = MortarJS;
