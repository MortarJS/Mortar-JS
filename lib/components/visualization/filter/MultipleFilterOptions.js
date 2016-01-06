// Extneral Requirements
var _            = require('lodash');
var React        = require('react/addons');

// Components
var Form         = require('../../resource-editing/resource-form/Form');

// Stores
var FormStore    = require('../../../stores/FormStore');

// Mixins
var FormKeyMixin = require('../../../mixins/FormKeyMixin');

/**
 * MultipleFilterOptions Component
 * A component for building filters with multiple options.
 * The user is not bound to a single selection, so the filters are sent as "ors"
 *
 * @class MultipleFilterOptions
 * @property {object}   options      The selectable options.
 * @property {function} actionMethod A function that is called when an option is toggled
 *
 * @memberOf Filters
 * @see {@link Filters}
 *
 * @example
 * // Like options will be nested under a single Header:
 * // ______________
 * // |Age:         |
 * // | [] 10-19... |
 * // |             |
 * // | Registered  |
 * // | [] Yes ...  |
 * // |_____________|
 *
 * filterOptions: {
 *	'Age': {
 *		'10-19': {'label': '10-19'},
 *		'20-29': {'label': '20-29'},
 *		'30-39': {'label': '30-39'}
 *	},
 *	'Registered': {
 *		'Yes': {'is_registered': true},
 *		'No' : {'is_registered': false}
 *	}
 * },
 * render: function() { return(
 *	<Fz.Filter filters={this.filterOptions} actionMethod={this.requestNewData} multiple={true} />
 * )}
 */
var MultipleFilterOptions = React.createClass({
	mixins: [FormKeyMixin],

	propTypes: {
		options: React.PropTypes.object,
		actionMethod: React.PropTypes.func
	},

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @return {obj}
	 */
	getInitialState: function() {
		return {
			formKey: '',
			formData: {}
		}
	},

	/**
	 * Called anytime the component mounts.
	 * Generates a unique formKey for the checkboxes's form and saves it to state.
	 * Also attached a change listener to the FormStore to get updates when changes are made.
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		var formKey = this._generateFormKey();

		this.setState({
			formKey: formKey,
			formData: FormStore.getResource(formKey)
		});

		FormStore.addChangeListener(this._onChange);
	},

	/**
	 * Called when the component is unmounted.
	 * Removes the FormStore listener.
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @return {null}
	 */
	componentWillUnmount: function() {
		FormStore.removeChangeListener(this._onChange);
	},

	/**
	 * Builds the JSX for each option group.
	 * Each group is built into an array, and then rendered under a single Form
	 * with a unique formKey for just this component.
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @return {null}
	 */
	buildOptionGroups: function() {
		var groups = [];
		for (var group in this.props.options) {
			groups.push(
				<div>
					{this.buildOptions(group)}
				</div>
			)
		}
		return (
			<Form key={this.state.formKey} formKey={this.state.formKey} bindResource={this.state.formData} >
				{groups}
			</Form>
		)
	},

	/**
	 * Builds the JSX for each checkbox in the filter.
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @param header {obj} The header label for the checkbox
	 * @return {JSX}
	 */
	buildOptions: function(header) {
		var options = [];
		for (var x in this.props.options[header]) {
			if (!this.props.options[header][x]) { return }
			options.push({
				label: x,
				value: this.props.options[header][x]
			});
		}

		return (
			<Form.Checkbox
				fieldKey       = {header}
				options        = {options}
				label          = {header}
				labelAttribute = 'label'
				required       = {false} />
		)
	},

	/**
	 * Use the filter object to request the resource again
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @param forKey  {string}    The form key for the filters form
	 * @param filters {obj}       The filters we're passing to be requested
	 * @return null
	 */
	handleChange: function(formKey, filters) {
		var modifiers = {};

		if (! filters) {
			modifiers.filters = {}; // Default options
		} else {
			modifiers.filters = filters;
		}
		this.props.actionMethod(modifiers);
	},

	_onChange: function() {
		var self = this;
		self.setState(function(previousState) {
			previousState.formData = FormStore.getResource(self.state.formKey);
			self.setFilters();
			return previousState;
		})
	},

	/**
	 * Builds a filter object that can span multiple attributes and multiple queries
	 * Output
	 * {
	 *     filter1: '[query, query, query]',
	 *     filter2: '[query, query, query]',  // Give me everything that meets any query in all filters.
	 *     filter3: '[query, query, query]',  // in other words give me anything with, filter1 (x or y) AND filter 2 (a or b)
	 * }
	 *
	 * Then requests the resource again using the new filter.
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @return null
	 */
	setFilters: function() {
		var data = _.cloneDeep(this.state.formData),
			filterOptions = {};

		for (var g in data) {
			data[g].forEach(function(datum) {
				var key = Object.keys(datum.value);
				if (! datum.value.hasOwnProperty(key)) { return }

				if (filterOptions[key] === undefined) {
					filterOptions[key] = '[' + datum.value[key];
				} else {
					filterOptions[key] += ',' + datum.value[key];
				}
			});
		}

		for (var filter in filterOptions) {
			filterOptions[filter] = filterOptions[filter] + ']';
		}

		this.handleChange(this.state.formKey, filterOptions);
	},

	/**
	 * Renders the MultipleFilterOptions component
	 *
	 * @memberOf Filters.MultipleFilterOptions
	 *
	 * @return {JSX}
	 */
	render: function () {
		return (
			<div className="multi-select form-group">
				{this.buildOptionGroups()}
			</div>
		)
	}
});

module.exports = MultipleFilterOptions;
