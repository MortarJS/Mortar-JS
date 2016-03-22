var _       = require('lodash');
var MortarJS = {};

MortarJS.Actions = {
	ErrorHandlingActionCreators : require('./actions/ErrorHandlingActionCreators'),
	PaginationActionCreators    : require('./actions/PaginationActionCreators'),
	GeneralCmsActionCreators    : require('./actions/GeneralCmsActionCreators'),
	FormActions                 : require('./actions/FormActionCreators')
};

MortarJS.Components = {
	/**
	 * @namespace GlobalComponents
	 */
	Global: {
		AlertHandler : require('./components/global/alert-handler/AlertHandler'),
		Modal        : require('./components/global/modal/ModalContainer'),
		Button       : require('./components/global/button/Button'),
		ButtonDrawer : require('./components/global/button-drawer/ButtonDrawer'),
		Spinner      : require('./components/global/spinner/Spinner')
	},

	PageStructure: {
		Column : require('./components/page-structure/Column'),
		Row    : require('./components/page-structure/Row')
	},

	ResourceBinding: {
		Form: {
			Form             : require('./components/resource-editing/resource-form/Form'),
			Checkbox         : require('./components/resource-editing/resource-form/Checkbox'),
			FileInput        : require('./components/resource-editing/resource-form/FileInput'),
			FormUtilityMixin : require('./components/resource-editing/resource-form/utils/FormUtilityMixin'),
			Input            : require('./components/resource-editing/resource-form/Input'),
			TypeAheadInput   : require('./components/resource-editing/resource-form/TypeAheadInput'),
			RadioButtons     : require('./components/resource-editing/resource-form/RadioButtons'),
			SelectBox        : require('./components/resource-editing/resource-form/SelectBox'),
			DropdownSelect   : require('./components/resource-editing/resource-form/DropdownSelect'),
			Submit           : require('./components/resource-editing/resource-form/Submit'),
			TextArea         : require('./components/resource-editing/resource-form/TextArea'),
			TimePicker       : require('./components/resource-editing/resource-form/Time/TimePicker'),
			DatePicker       : require('./components/resource-editing/resource-form/Time/DatePicker')
		},
		CreateResourceAction: require('./components/resource-editing/create-resource/AddNewResourceActionButton')
	},

	/**
	 * @namespace VisualizationComponents
	 */
	Visualization: {
		Buttons: {
			Actions: {
				ActionsDropDown: require('./components/visualization/buttons/actions/ActionsDropdown')
			}
		},
		Filter     : require('./components/visualization/filter/FilterDropdown'),
		PageSearch : require('./components/visualization/page-search/PageSearch'),
		Pagination : {
			PaginatedButtons : require('./components/visualization/paginator/Paginator'),
			PerPageSelector  : require('./components/visualization/paginator/PerPageSelector')
		},
		Tables: {
			Table: require('./components/visualization/tables/TableContainer')
		}
	}
};

MortarJS.Constants = require('./constants/AppActionConstants');

MortarJS.Dispatcher = require('./dispatcher/AppDispatcher');

MortarJS.Mixins = {
	FormKeyMixin           : require('./mixins/FormKeyMixin'),
	TabbedComponentMixin   : require('./mixins/TabbedComponentMixin'),
	ResourceComponentMixin : require('./mixins/ResourceComponentMixin')
};

/**
 * @namespace Stores
 */
MortarJS.Stores = {
	BaseStore  : require('./stores/BaseStore'),
	ModelStore : require('./stores/ModelStore'),
	AlertStore : require('./stores/AlertStore'),
	FormStore  : require('./stores/FormStore')
};

MortarJS.Utils = {
	ErrorHandler   : require('./utils/ErrorHandler'),
	SuccessHandler : require('./utils/SuccessHandler'),
	QueryHelper    : require('./utils/QueryHelper'),
	isEmpty        : require('./utils/isEmpty')
};

/**
 * Flatten an object and set keys to contain object paths
 *
 * @param {object} object The object to flatten
 * @param {string} path   The path to the component to require
 * @param {object} paths  The paths of the flattened object
 *
 * @returns {*}
 */
MortarJS.flatten = function (object, path, paths) {
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
				MortarJS.flatten(object[key], path + '.' + key, paths);
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
 * @param {string} type The type of components to require
 *
 * @returns {object}
 */
MortarJS.require = function (type) {
	var required = {};
	var exportType = type.toLowerCase().charAt(0).toUpperCase() + type.slice(1);
	var flattened = MortarJS.flatten(MortarJS[exportType], '', {});

	for (var key in arguments) {
		if (arguments.hasOwnPropert(key)) {
			var argument = arguments[key];
			if (flattened.hasOwnProperty(argument)) {
				required[argument] = _.get(MortarJS[exportType], flattened[argument]);
			}
		}
	}

	return required;
};

module.exports = MortarJS;
