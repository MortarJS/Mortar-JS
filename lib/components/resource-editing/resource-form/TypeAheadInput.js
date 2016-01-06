// External Requirements
var _                  = require('lodash');
var Fuse               = require('fuse.js');
var React              = require('react/addons');
var isEmpty            = require('../../../utils/isEmpty')
var className          = require('classnames');

// Components
var Input              = require('./Input');
var AppActionConstants = require('../../../constants/AppActionConstants');
var ActionTypes        = AppActionConstants.ActionTypes.cms.form;
var FormActionCreators = require('../../../actions/FormActionCreators');

// Stores
var FormStore          = require('../../../stores/FormStore');

// Mixins
var FormUtility        = require('./FormUtilityMixin');
var FormKeyMixin       = require('../../../mixins/FormKeyMixin');


var TypeAheadInput = React.createClass({
	propTypes: {
		fieldKey       : React.PropTypes.string.isRequired,
		label          : React.PropTypes.string,
		placeholder    : React.PropTypes.string,
		helpText       : React.PropTypes.string,
		limit          : React.PropTypes.number,
		resourceAction : React.PropTypes.object,
		returnField    : React.PropTypes.string, // The single field to return (optional)

		// Source, array or 'remote'
		source: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.array
		]).isRequired,

		options: React.PropTypes.shape({
			dataNode      : React.PropTypes.string,
			searchToken   : React.PropTypes.string,
			queryTimeout  : React.PropTypes.number,
			selectDisplay : React.PropTypes.func    // A callback function used to customize the display of query and select values
		}),

		updateCallback: React.PropTypes.func, // An optional callback called everytime the component updates
		debug: React.PropTypes.bool
	},

	mixins: [FormUtility, FormKeyMixin],

	getInitialState: function () {
		if (this.props.debug) {
			console.log('Typeahead Input Debug Information:');
			console.log('OPTIONS:');
			console.table(this.props.options);
			console.log('SOURCE:');
			console.table(this.props.source);
			console.log('LABEL:', this.props.label);
		};

		return {
			formKey: '',
			isValid: true,
			fieldValue: [],
			typeAhead: {
				query: '',
				queryResults: []
			}
		}
	},

	/**
	 * Register an event listener
	 */
	componentDidMount: function () {
		var formKey = this._generateFormKey();

		this.setState({
			formKey: formKey
		})
		FormStore.addChangeListener(this._onChange);
	},

	/**
	 * Deregister an event listener
	 */
	componentWillUnmount: function () {
		FormStore.removeChangeListener(this._onChange);
	},

	/**
	 * Set fieldValue based on currently selected.
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey) || []
		})
	},

	/**
	 * Any time the component updates, if there's a callback provided, fire it.
	 *
	 * @return null
	 */
	componentDidUpdate: function() {
		if (typeof this.props.updateCallback === 'function') this.props.updateCallback();
	},

	/**
	 * On change handler
	 *
	 * @private
	 */
	_onChange: function () {
		var typeAhead = this.state.typeAhead;
		typeAhead.queryResults = FormStore.getTypeaheadQueryData(this.state.formKey);
		this.setState({typeAhead: typeAhead});
	},

	/**
	 * Traverses up an element's parents until a data-label is found.
	 * All selectable options will have data-labels, but if a mutator is used,
	 * that data-label might not pass down to a child element.  In that case,
	 * we need to climb the tree until we find the data-label we're looking for.
	 *
	 * @param {DOMNode} element The current element we're looking for
	 * @return {String|Function}
	 */
	_getDataLabel: function(element) {
		return element.dataset.label || this._getDataLabel(element.parentElement)
	},

	/**
	 * Custom change handler for clicks on select options and deselect buttons
	 *
	 * @param event
	 */
	customHandleChange: function (event) {
		// A label to identify the resource
		var label = this._getDataLabel(event.target);
		var options = this.props.options || {};
		var field = options.returnField || this.props.fields[0];

		// An object to search against
		var searchObject = {};
		searchObject[field] = label;

		// Get the first return of _.where(), similar to laravel's queryBuilder->first()
		var option = _.where(this.state.typeAhead.queryResults, searchObject)[0];

		var selected = this.state.fieldValue;
		if (typeof selected === 'object') {
			var isSelected = _.where(selected, searchObject).length > 0;
		} else {
			var isSelected = _.contains(searchObject, selected);
		}

		var newFieldValues = [];

		if (isSelected) {

			if (this.props.limit > 1) {
				selected.forEach(function (selectedOption, index) {
					if (selectedOption[field] === label) {
						// Option is already selected. Do nothing so it is effectively unselected
						return;
					}

					newFieldValues.push(selectedOption);
					return;
				});
			} else {
				newFieldValues = this.props.returnField ? '' : [];
			}

		} else {
			if (this.props.limit > 1) {
				// Option is not selected. Select it.
				newFieldValues = selected;
				var value = this.props.returnField ? option[this.props.returnField] : option;

				newFieldValues.push(value);
			} else {
				newFieldValues = this.props.returnField ? option[this.props.returnField] : option;
			}
		}

		// Determine if we should limit the number of selections
		var limit = this.props.limit || newFieldValues.length;

		if (limit > 1) {
			var fieldValue = newFieldValues.slice(0, limit);
		} else {
			var fieldValue = newFieldValues;
			FormActionCreators.clearTypeaheadQueryData(this.state.formKey);
			this.setState({
				typeAhead: {
					query: ''
				}
			});
		}

		this.setState({
			fieldValue: fieldValue
		}, function () {
			this.props.changeCallback(this.props.fieldKey, this.state.fieldValue, this);
		});
	},

	/**
	 * Build a set of selected option.label bubbles
	 *
	 * @returns {*}
	 */
	buildSelectedBubbles: function () {
		if (isEmpty(this.state.fieldValue)) { return }

		var options = this.props.options || {},
			field = options.resultDisplayField || this.props.fields[0],
			fieldValue = this.state.fieldValue,
			display;

		if (typeof fieldValue === 'object' && fieldValue.length) {
			return this.state.fieldValue.map(function (option, index) {
				display = typeof options.selectDisplay === 'function' ? options.selectDisplay(option) : option[field];
				return (
					<div key={index} className="selected-option">
						{display}
						<a href="javascript:void(0)" className="typeahead-unselect fa fa-times-circle-o pull-right"
							onClick={this.customHandleChange} data-label={option[field]}></a>
					</div>
				)
			}.bind(this));
		} else if (typeof fieldValue === 'object') {
			display = typeof options.selectDisplay === 'function' ? options.selectDisplay(fieldValue) : fieldValue[field];
			return (
				<div key={field} className="selected-option">
					{display}
					<a href="javascript:void(0)" className="typeahead-unselect fa fa-times-circle-o pull-right"
						onClick={this.customHandleChange} data-label={fieldValue[field]}></a>
				</div>
			)
		} else {
			display = typeof options.selectDisplay === 'function' ? options.selectDisplay(fieldValue) : fieldValue;
			return (
				<div key={field} className="selected-option">
					{display}
					<a href="javascript:void(0)" className="typeahead-unselect fa fa-times-circle-o pull-right"
						onClick={this.customHandleChange} data-label={fieldValue}></a>
				</div>
			)
		}
	},

	/**
	 * Build a set of selectable buttons based on results from the input field
	 *
	 * @returns {*}
	 */
	buildSelectOptions: function () {
		var options = this.props.options || {};
		var field = options.resultDisplayField || this.props.fields[0];

		if (! this.state.typeAhead.queryResults || this.state.typeAhead.queryResults.length < 1) {
			return;
		}

		return this.state.typeAhead.queryResults.map(function (result, index) {
			if (options.selectDisplay) {
				var display = options.selectDisplay(result);
			} else {
				var display = result[field];
			}

			var searchObject = {};
			searchObject[field] = result[field];

			var isSelected = _.where(this.state.fieldValue, searchObject).length > 0;
			classes = className({
				'btn btn-flat btn-sm': ! isSelected,
				'btn btn-default btn-raised btn-sm': isSelected
			});

			return (
				<button className={classes} key={index} href="javascript:void(0)" onClick={this.customHandleChange}
					data-label={result[field]}>{display}</button>
			)
		}, this);
	},

	/**
	 * Handle a change in query input
	 *
	 * @param key
	 * @param value
	 * @param component
	 */
	handleSearchChange: function (key, value, component) {
		// Ignore for queries fewer than 2 characters to prevent unecessary requests
		if (value.length < 2) {
			this.setState({
				typeAhead: {
					query: value,
					queryResults: []
				}
			});
			return;
		}

		var typeAhead = this.state.typeAhead;
		typeAhead[key] = value;

		if (typeof this.props.source === 'object') {
			typeAhead.queryResults = this.where(this.props.source, typeAhead.query);
			this.setState({typeAhead: typeAhead});
		} else if (this.props.source === 'remote') {
			this.remoteWhere(typeAhead.query);
		}
	},

	/**
	 * Build a string of filters
	 *
	 * @param query
	 * @returns {object}
	 */
	buildFilters: function (query) {
		var filters = {},
			options = this.props.options || {},
			searchToken = options.searchToken || '~',
			path;

		/**
		 * Creates the filter query using nested 'or's
		 * ex:
		 * {
		 *     first_name: `~John`,
		 *     or: {
		 *         email: '~John',
		 *         or: {
		 *             age: '~John'
		 *         }
		 *     }
		 * }
		 *
		 * This will return result where the first_name OR email OR age contain 'John'
		 */
		this.props.fields.forEach(function (field, index) {
			// Always use 'contains' token
			if (path) {
				path.or = {};
				path.or[field] = searchToken + query;
				path = path.or;
			} else {
				filters[field] = searchToken + query;
				path = filters;
			}

		});
		return filters;
	},


	/**
	 * Query a remote source
	 *
	 * @param query
	 * @returns {Array}
	 */
	remoteWhere: function (query) {
		if (query === '') {
			return [];
		}

		var options = this.props.options || {},
			include = options.include || [];

		var queryOptions = {
			modifiers: {
				include: include,
				filters: this.buildFilters(query)
			},
			dataNode: options.dataNode || 'data',
			eventName: ActionTypes.TYPEAHEAD_QUERY,
			eventData: {
				formKey: this.state.formKey
			}
		};

		// Clear the previous setTimeout callback and register a new one while a user keeps typing
		clearTimeout(this.currentTimeout);
		delete this.currentTimeout;

		this.currentTimeout = setTimeout(function () {
			this.props.resourceAction.listResource(queryOptions);
		}.bind(this), options.queryTimeout || 500);
	},

	currentTimeout: 0,

	/**
	 * This can be customized or lodash's where can be used instead.
	 *
	 * @param array
	 * @param search
	 * @returns {Array}
	 */
	where: function (array, search) {
		if (search == '') return [];

		var options = {
			keys: this.props.fields,
			threshold: 0.4
		}

		var fuse = new Fuse(array, options);
		return fuse.search(search);
	},

	render: function () {
		var formGroupClasses = className({
			"form-group": true,
			"has-error": this._checkFieldIsValid()
		});

		return (
			<div className="typeahead-select">
				<div className={formGroupClasses}>
					<label className="control-label">{this.props.label}</label><br />
					{this.buildSelectedBubbles()}

					<Input fieldKey='query' bindResource={this.state.typeAhead} changeCallback={this.handleSearchChange}
						placeholder={this.props.placeholder} type="text" />
				</div>

				<div className="form-group">
					<div className="typeahead-select" multiple={true} onChange={this.customHandleChange} >
						{this.state.fieldValue && this.state.fieldValue.length < 1 && this._shouldRenderHelpBlock(this.props.helpText)}
						{this.buildSelectOptions()}
					</div>
				</div>
			</div>
		)
	}
});

module.exports = TypeAheadInput;

