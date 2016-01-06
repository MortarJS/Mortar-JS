var _       = require('lodash');
var lib     = './lib/';
var exports = {};

exports.Actions = {
	ErrorHandlingActionCreators: require('./lib/actions/ErrorHandlingActionCreators'),
	FormActions: require('./lib/actions/FormActionCreators')
};

exports.Components = {
	Global: {
		AlertHandler: require('./lib/components/global/alert-handler/AlertHandler'),
		Modal: require('./lib/components/global/modal/ModalContainer'),
		Button: require('./lib/components/global/button/Button'),
		ButtonDrawer: require('./lib/components/global/button-drawer/ButtonDrawer'),
		Spinner: require('./lib/components/global/spinner/Spinner')
	},

	PageStructure: {
		Column: require('./lib/components/page-structure/Column'),
		Row: require('./lib/components/page-structure/Row')
	},

	ResourceBinding: {
		Form: {
			Form: require('./lib/components/resource-editing/resource-form/Form'),
			Checkbox: require('./lib/components/resource-editing/resource-form/Checkbox'),
			FileInput: require('./lib/components/resource-editing/resource-form/FileInput'),
			FormUtilityMixin: require('./lib/components/resource-editing/resource-form/FormUtilityMixin'),
			Input: require('./lib/components/resource-editing/resource-form/Input'),
			TypeAheadInput: require('./lib/components/resource-editing/resource-form/TypeAheadInput'),
			RadioButtons: require('./lib/components/resource-editing/resource-form/RadioButtons'),
			SelectBox: require('./lib/components/resource-editing/resource-form/SelectBox'),
			DropdownSelect: require('./lib/components/resource-editing/resource-form/DropdownSelect'),
			Submit: require('./lib/components/resource-editing/resource-form/Submit'),
			TextArea: require('./lib/components/resource-editing/resource-form/TextArea'),
			TimePicker: require('./lib/components/resource-editing/resource-form/Time/TimePicker'),
			DatePicker: require('./lib/components/resource-editing/resource-form/Time/DatePicker')
		},
		CreateResourceAction: require('./lib/components/resource-editing/create-resource/AddNewResourceActionButton')
	},

	Visualization: {
		Buttons: {
			Actions: {
				ActionsDropDown: require('./lib/components/visualization/buttons/actions/ActionsDropdown')
			}
		},
		Filter: require('./lib/components/visualization/filter/FilterDropdown'),
		Filters: require('./lib/components/visualization/filter/Filters'),
		PageSearch: require('./lib/components/visualization/page-search/PageSearch'),
		Pagination: {
			PaginatedButtons: require('./lib/components/visualization/paginator/Paginator'),
			PerPageSelector: require('./lib/components/visualization/paginator/PerPageSelector')
		},
		Tables: {
			Table: require('./lib/components/visualization/tables/TableContainer')
		},
		Exports: {
			Exporter: require('./lib/components/visualization/exports/Exporter')
		}
	}
};

exports.Constants = require('./lib/constants/AppActionConstants');

exports.Dispatcher = require('./lib/dispatcher/AppDispatcher');

exports.Mixins = {
	FormKeyMixin           : require('./lib/mixins/FormKeyMixin'),
	TabbedComponentMixin   : require('./lib/mixins/TabbedComponentMixin'),
	ResourceComponentMixin : require('./lib/mixins/ResourceComponentMixin')
};

exports.Stores = {
	BaseStore: require('./lib/stores/BaseStore'),
	ModelStore: require('./lib/stores/ModelStore'),
	AlertStore: require('./lib/stores/AlertStore'),
	FormStore: require('./lib/stores/FormStore')
};

exports.Utils = {
	ErrorHandler: require('./lib/utils/ErrorHandler'),
	isEmpty: require('./lib/utils/isEmpty')
};

/**
 * Flatten an object and set keys to contain object paths
 *
 * @param object
 * @param path
 * @param paths
 * @returns {*}
 */
function flatten(object, path, paths) {
	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			// Only include functions (stop at require() statements)
			if (typeof object[key] === 'function') {
				if (path !== '') {
					paths[key] = path.slice(1) + '.' + key;
				} else {
					paths[key] = key;
				}
			} else if (typeof object[key] === 'object') {
				flatten(object[key], path + '.' + key, paths);
			}
		}
	}
	return paths;
}

/**
 * Dynamically and intelligently parse string requirements
 *
 * Format: FuzzyReaction.require('type(components|action|etc)', 'require1', 'require2');
 *
 * @param type
 * @returns {{}}
 */
exports.require = function (type) {
	var required = {};
	var exportType = type.toLowerCase().charAt(0).toUpperCase() + type.slice(1);
	var flattened = flatten(exports[exportType], '', {});

	for (var key in arguments) {
		var argument = arguments[key];
		if (flattened.hasOwnProperty(argument)) {
			required[argument] = _.get(exports[exportType], flattened[argument]);
		}
	}

	return required;
};

return exports;

