var config = require('./config/config');
var MortarJS = require('./bootstrap').MortarJS;

// Should go separately into MortarJS.App or something other than the MortarJS index bootstrap because that's not actually exported
// until the end of this file

MortarJS.Components.Authentication = {
};

MortarJS.Components.Global.App = require('./components/App');

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
