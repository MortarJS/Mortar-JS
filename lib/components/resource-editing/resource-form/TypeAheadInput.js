// External Requirements
var _                    = require('lodash');
var Fuse                 = require('fuse.js');
var React                = require('react');
var isEmpty              = require('../../../utils/isEmpty')
var className            = require('classnames');

// Components
var BrForm                = require('./Form');
var Input                = require('./Input');
var AppActionConstants   = require('../../../constants/AppActionConstants');
var ActionTypes          = AppActionConstants.ActionTypes.cms.form;
var FormActions          = require('../../../actions/FormActionCreators');

// Stores
var FormStore            = require('../../../stores/FormStore');

// Mixins
var FormUtility          = require('./utils/FormUtilityMixin');
var FormKeyMixin         = require('../../../mixins/FormKeyMixin');

/**
 * TypeAheadInput Component
 * A component for building 'type-ahead' or autocomplete functionality.
 *
 * @class TypeAheadInput
 * @type {ReactComponent}
 *
 * @prop  {!String}   fieldKey
 * @prop  {String}    label
 * @prop  {String}    placeholder
 * @prop  {String}    helpText
 * @prop  {Number}    limit          Limit on number of suggested results
 * @prop  {Object}    resourceAction
 * @prop  {String=}   returnField    Field to return from matching objects in source
 * @prop  {!Object}   source         Source, either a local array or 'remote'
 * @prop  {!Function} updateCallback A callback called every-time the component updates
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 * @example
 * // A local source array could be structured as follows:
 *
 * dataSource: [
 *	{ name: 'Alabama',              state : 'AL'},
 *	{ name: 'Alaska',               state : 'AK'},
 *	{ name: 'Arizona',              state : 'AZ'},
 *	{ name: 'Arkansas',             state : 'AR'},
 *	{ name: 'California',           state : 'CA'},
 *	{ name: 'Colorado',             state : 'CO'},
 *	{ name: 'Connecticut',          state : 'CT'},
 * ]
 *
 * render: function() { return(
 *	<Br.Form.TypeAheadInput
 *		source={this.dataSource}
 *		fields={['name', 'state']}
 *		returnField='state'
 *		label='Start Typing...'
 *		placeholder="USA state search"
 *	/>
 * )}
 *
 */
var TypeAheadInput = React.createClass({
	propTypes: {
		fieldKey       : React.PropTypes.string.isRequired,
		label          : React.PropTypes.string,
		placeholder    : React.PropTypes.string,
		helpText       : React.PropTypes.string,
		limit          : React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.bool
		]),
		resourceAction : React.PropTypes.object,
		returnField    : React.PropTypes.string,

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

		updateCallback: React.PropTypes.func,
		debug: React.PropTypes.bool
	},

	mixins: [FormUtility, FormKeyMixin],

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		// Display debug information
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
		};
	},


	/**
	 * Clears the typeAhead of query results and the query string.
	 *
	 * @private
	 * @return {null}
	 */
	_clearTypeahead: function() {
			FormActions.clearTypeaheadQueryData(this.state.formKey);
			this.setState({
				typeAhead: {
					query: '',
					quertResults: []
				}
			});
	},

	/**
	 * Generates a unique formKey for the component and saves it to state.
	 *
	 * @return {null}
	 * @private
	 */
	_setFormKey: function() {
		this.setState({
			formKey: this._generateFormKey()
		});
	},

	/**
	 * Attaches a change listener to the FormStore to get updates when changes are made.
	 *
	 * Generates a unique formKey for the input's form and saves it to state.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {null}
	 */
	componentDidMount: function () {
		FormStore.addChangeListener(this._onChange);

		this._setFormKey();
	},

	/**
	 * Removes the FormStore listener.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {null}
	 */
	componentWillUnmount: function () {
		FormStore.removeChangeListener(this._onChange);
	},

	/**
	 * Any time the component updates, if there's a callback provided, fire it.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {null}
	 */
	componentDidUpdate: function() {
		if (typeof this.props.updateCallback === 'function') this.props.updateCallback();
	},

	/**
	 * On change handler.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @private
	 */
	_onChange: function () {
		var typeAhead  = this.state.typeAhead,
			fieldValue = FormStore.getField(this.props.formKey, this.props.fieldKey);

		if (this.props.source === 'remote') {
			typeAhead.queryResults = FormStore.getTypeaheadQueryData(this.state.formKey);
		}

		this.setState({
			typeAhead: typeAhead,
			fieldValue: fieldValue
		});
	},

	/**
	 * Traverses up an element's parents until a data-label is found.
	 * All selectable options will have data-labels, but if a mutator is used,
	 * that data-label might not pass down to a child element. In that case,
	 * we need to climb the tree until we find the data-label we're looking for.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @private
	 *
	 * @param {DOMNode} element The current element we're looking for
	 * @return {String|Function}
	 */
	_getDataLabel: function(element) {
		return element.dataset.label || this._getDataLabel(element.parentElement)
	},

	/**
	 * Custom change handler for clicks on select options and deselect buttons.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @param {event} event
	 *
	 * @return {null}
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

		var selected = this.state.fieldValue || [];
		if (typeof selected === 'object') {
			var isSelected = _.where(selected, searchObject).length > 0;
		} else {
			var isSelected = _.contains(searchObject, selected);
		}

		var newFieldValues = [];

		if (isSelected) {

			if (this.props.limit > 1 || this.props.limit === false) {
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
			if (this.props.limit > 1 || this.props.limit === false) {
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

		if (limit > 1 || this.props.limit === false) {
			var fieldValue = newFieldValues.slice(0, limit);
		} else {
			var fieldValue = newFieldValues;
			this._clearTypeahead();
		}

		this.props.changeCallback(this.props.fieldKey, fieldValue, this);
	},

	/**
	 * Removes a previously selected option from being selected.
	 * Triggered when a user clicks the `(x)` next to a selected option.
	 *
	 * @param {object} resource The selection that is getting removed.
	 *
	 * @return {null}
	 */
	removeSelectedOption: function(resource) {
		if (resource === this.state.fieldValue) {
			this.props.changeCallback(this.props.fieldKey, null);
		} else {
			var selected = this.state.fieldValue.filter(function(option) {
				return option !== resource;
			});

			this.props.changeCallback(this.props.fieldKey, selected);
		}
	},

	/**
	 * Build a set of selected option.label bubbles.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {*}
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
						<a href="javascript:void(0)" className="typeahead-unselect icon-times-circle-o pull-right"
							onClick={this.removeSelectedOption.bind(null, option)} data-label={option[field]}></a>
					</div>
				)
			}.bind(this));
		} else if (typeof fieldValue === 'object') {
			display = typeof options.selectDisplay === 'function' ? options.selectDisplay(fieldValue) : fieldValue[field];
			return (
				<div key={field} className="selected-option">
					{display}
					<a href="javascript:void(0)" className="typeahead-unselect icon-times-circle-o pull-right"
						onClick={this.removeSelectedOption.bind(null, fieldValue)} data-label={fieldValue[field]}></a>
				</div>
			)
		} else {
			display = typeof options.selectDisplay === 'function' ? options.selectDisplay(fieldValue) : fieldValue;
			return (
				<div key={field} className="selected-option">
					{display}
					<a href="javascript:void(0)" className="typeahead-unselect icon-times-circle-o pull-right"
						onClick={this.removeSelectedOption.bind(null, fieldValue)} data-label={fieldValue}></a>
				</div>
			)
		}
	},

	/**
	 * Build a set of selectable buttons based on results from the input field.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {*}
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
			var classes = className({
				'btn btn-flat btn-sm': ! isSelected,
				'btn btn-default btn-raised btn-sm': isSelected
			});

			return (
				<button className={classes} key={index} href="javascript:void(0)" onClick={this.customHandleChange}
					data-label={result[field]}>{display}</button>
			);
		}, this);
	},

	/**
	 * Handle a change in query input.
	 * Currently will only execute a request once the query is more than two characters.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @param {String}         key
	 * @param {String}         value
	 * @param {ReactComponent} component
	 *
	 * @return {null}
	 */
	handleSearchChange: function (key, value, component) {
		// Ignore for queries fewer than 2 characters to prevent unnecessary requests
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
	 * Build a string of query filters.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @param {String} query
	 *
	 * @returns {Object}
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
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @param {String} query
	 *
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
	 * Searches through the locally provided array.
	 * Uses the [Fuse.js](http://kiro.me/projects/fuse.html) library for fuzzy search.
	 * This search can be customized or lodash'ed where other libraries can be used instead.
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @param {Array}  array
	 * @param {String} search
	 *
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

	/**
	 * Renders the TypeAheadInput component
	 *
	 * @memberOf FormComponents.TypeAheadInput
	 *
	 * @return {JSX}
	 */
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

					<Input formKey={this.props.fieldKey + '-query'} fieldKey='query' bindResource={this.state.typeAhead} changeCallback={this.handleSearchChange}
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
