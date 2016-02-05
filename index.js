var _       = require('lodash');
var lib     = './dist/';
var MortarJS = {};

MortarJS.Actions = {
	ErrorHandlingActionCreators: require(lib + 'actions/ErrorHandlingActionCreators'),
	PaginationActionCreators: require(lib + 'actions/PaginationActionCreators'),
	GeneralCmsActionCreators: require(lib + 'actions/GeneralCmsActionCreators'),
	FormActions: require(lib + 'actions/FormActionCreators')
};

MortarJS.Components = {
	/**
	 * @namespace GlobalComponents
	 */
	Global: {
		AlertHandler: require(lib + 'components/global/alert-handler/AlertHandler'),
		Modal: require(lib + 'components/global/modal/ModalContainer'),
		Button: require(lib + 'components/global/button/Button'),
		ButtonDrawer: require(lib + 'components/global/button-drawer/ButtonDrawer'),
		Spinner: require(lib + 'components/global/spinner/Spinner')
	},

	PageStructure: {
		Column: require(lib + 'components/page-structure/Column'),
		Row: require(lib + 'components/page-structure/Row')
	},

	ResourceBinding: {
		Form: {
			Form: require(lib + 'components/resource-editing/resource-form/Form'),
			Checkbox: require(lib + 'components/resource-editing/resource-form/Checkbox'),
			FileInput: require(lib + 'components/resource-editing/resource-form/FileInput'),
			FormUtilityMixin: require(lib + 'components/resource-editing/resource-form/FormUtilityMixin'),
			Input: require(lib + 'components/resource-editing/resource-form/Input'),
			TypeAheadInput: require(lib + 'components/resource-editing/resource-form/TypeAheadInput'),
			RadioButtons: require(lib + 'components/resource-editing/resource-form/RadioButtons'),
			SelectBox: require(lib + 'components/resource-editing/resource-form/SelectBox'),
			DropdownSelect: require(lib + 'components/resource-editing/resource-form/DropdownSelect'),
			Submit: require(lib + 'components/resource-editing/resource-form/Submit'),
			TextArea: require(lib + 'components/resource-editing/resource-form/TextArea'),
			TimePicker: require(lib + 'components/resource-editing/resource-form/Time/TimePicker'),
			DatePicker: require(lib + 'components/resource-editing/resource-form/Time/DatePicker')
		},
		CreateResourceAction: require(lib + 'components/resource-editing/create-resource/AddNewResourceActionButton')
	},

	/**
	 * @namespace VisualizationComponents
	 */
	Visualization: {
		Buttons: {
			Actions: {
				ActionsDropDown: require(lib + 'components/visualization/buttons/actions/ActionsDropdown')
			}
		},
		Filter: require(lib + 'components/visualization/filter/FilterDropdown'),
		PageSearch: require(lib + 'components/visualization/page-search/PageSearch'),
		Pagination: {
			PaginatedButtons: require(lib + 'components/visualization/paginator/Paginator'),
			PerPageSelector: require(lib + 'components/visualization/paginator/PerPageSelector')
		},
		Tables: {
			Table: require(lib + 'components/visualization/tables/TableContainer')
		}
	}
};

MortarJS.Constants = require(lib + 'constants/AppActionConstants');

MortarJS.Dispatcher = require(lib + 'dispatcher/AppDispatcher');

MortarJS.Mixins = {
	FormKeyMixin           : require(lib + 'mixins/FormKeyMixin'),
	TabbedComponentMixin   : require(lib + 'mixins/TabbedComponentMixin'),
	ResourceComponentMixin : require(lib + 'mixins/ResourceComponentMixin')
};

/**
 * @namespace Stores
 */
MortarJS.Stores = {
	BaseStore: require(lib + 'stores/BaseStore'),
	ModelStore: require(lib + 'stores/ModelStore'),
	AlertStore: require(lib + 'stores/AlertStore'),
	FormStore: require(lib + 'stores/FormStore')
};

MortarJS.Utils = {
	ErrorHandler: require(lib + 'utils/ErrorHandler'),
	SuccessHandler: require(lib + 'utils/SuccessHandler'),
	QueryHelper: require(lib + 'utils/QueryHelper'),
	isEmpty: require(lib + 'utils/isEmpty')
};

/**
 * Flatten an object and set keys to contain object paths
 *
 * @param object
 * @param path
 * @param paths
 * @returns {*}
 */
MortarJS.Flatten = function (object, path, paths) {
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
				MortarJS.Flatten(object[key], path + '.' + key, paths);
			}
		}
	}
	return paths;
};

/**
 * Dynamically and intelligently parse string requirements
 *
 * Format: FuzzyReaction.require('type(components|action|etc)', 'require1', 'require2');
 *
 * @param type
 * @returns {{}}
 */
MortarJS.require = function (type) {
	var required = {};
	var exportType = type.toLowerCase().charAt(0).toUpperCase() + type.slice(1);
	var flattened = MortarJS.Flatten(MortarJS[exportType], '', {});

	for (var key in arguments) {
		var argument = arguments[key];
		if (flattened.hasOwnProperty(argument)) {
			required[argument] = _.get(MortarJS[exportType], flattened[argument]);
		}
	}

	return required;
};

module.exports = MortarJS;
