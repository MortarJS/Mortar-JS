module.exports = function (config) {
	var _       = require('lodash');
	var lib     = './lib/';
	var React   = require('react/addons');
	var Router  = require('react-router');
	var exports = {};

	exports.startApp = function (Routes) {
		// Validate access token
		// @TODO this is here to fire the action and hide login screen while in AuthorizingToken state
		var CmsUserStore = exports.Stores.CmsUserStore;
		if (CmsUserStore.isTokenExpired()) {
			// Refresh the token, since it's expiring or about to expire
			var refreshToken = CmsUserStore.getRefreshToken();
			exports.Actions.AuthenticationServerActionCreators.refreshToken(refreshToken);
		} else {
			var token = CmsUserStore.getToken();
			if (token) {
				exports.Actions.AuthenticationServerActionCreators.loginWithToken(token);
			}
		}

		// Attach react router
		window.__app_container = document.getElementById('canvas-wrapper');
		Router.run(Routes, function (Handler) {
			React.render(<Handler/>, window.__app_container);
		});
	};

	exports.Actions = {
		AuthenticationServerActionCreators: require('./lib/actions/AuthenticationServerActionCreators')(config.base),
		ErrorHandlingActionCreators: require('./lib/actions/ErrorHandlingActionCreators'),
		ResourceActions: require('./lib/actions/ResourceActionCreators')(config),
		FormActions: require('./lib/actions/FormActionCreators')
	};

	exports.Components = {
		Authentication: {
			Login: {
				Login: require('./lib/components/authentication/login/Login')(config.base, config.header),
				Logout: require('./lib/components/authentication/login/Logout')(config.base)
			},

			RequireAuthentication: require('./lib/components/authentication/RequireAuthentication')(config.base, config.header),
			RequirePermissions: require('./lib/components/authentication/RequirePermissions')
		},

		/**
		 * @namespace GobalComponents
		 */
		Global: {
			AlertHandler: require('./lib/components/global/alert-handler/AlertHandler'),
			Header: {
				Header: require('./lib/components/global/header/Header')(config.header, config.navbar),
				NavBar: require('./lib/components/global/header/navigation/NavBar')(config.navbar)
			},
			App: require('./lib/components/global/layout/App')(config.base, config.header, config.navbar),
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

		/**
		 * @namespace VisualizationComponents
		 */
		Visualization: {
			Buttons: {
				Actions: {
					ActionsDropDown: require('./lib/components/visualization/buttons/actions/ActionsDropdown')
				}
			},
			Filter: require('./lib/components/visualization/filter/FilterDropdown'),
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

	/**
	 * @namespace Stores
	 */
	exports.Stores = {
		BaseStore: require('./lib/stores/BaseStore'),
		ModelStore: require('./lib/stores/ModelStore'),
		AlertStore: require('./lib/stores/AlertStore'),
		CmsUserStore: require('./lib/stores/CmsUserStore'),
		FormStore: require('./lib/stores/FormStore')
	};

	exports.Utils = {
		ApiService: require('./lib/utils/ApiService'),
		AuthenticationApi: require('./lib/utils/AuthenticationApi'),
		ErrorHandler: require('./lib/utils/ErrorHandler'),
		Paginator: require('./lib/utils/Paginator'),
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
	 * Format: Mortar.require('type(components|action|etc)', 'require1', 'require2');
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
};
