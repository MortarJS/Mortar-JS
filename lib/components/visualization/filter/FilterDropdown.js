/**
 * @namespace Filters
 */

// External Requirements
var React                 = require('react');
var className             = require('classnames');

// Components
var Button                = require('../../global/button/Button');
var SelectBox             = require('../../resource-editing/resource-form/SelectBox');
var MultipleFilterOptions = require('./MultipleFilterOptions');

/**
 * Filter Component
 *
 * @class Filter
 *
 * @memberOf Filters
 * @see {@link Filters}
 */
var Filter = React.createClass({
	propTypes: {
		actionMethod : React.PropTypes.string,
		mods         : React.PropTypes.array,
		multiple     : React.PropTypes.bool,
		filters      : React.PropTypes.object,
		label        : React.PropTypes.string
	},

	getInitialState: function () {
		return {
			showFilters: false
		};
	},

	getDefaultProps: function () {
		return {
			label: 'No Filter'
		};
	},

	// Default option for display
	defaultOption:   {
		value: ''
	},

	buildOptionsList: function () {
		if (this.props.multiple) {
			return this.buildMultipleOptionsList();
		}

		return this.buildSingleOptionsList();
	},

	toggleFilter: function() {
		this.setState({
			showFilters: ! this.state.showFilters
		});
	},

	buildMultipleOptionsList: function() {
		var buttonMods = this.props.mods || ['info'];
		var classes = {
			'visible'      : this.state.showFilters,
			'hidden'       : ! this.state.showFilters,
			'panel'        : true,
			'multi-filter' : true
		};

		return (
			<div>
				<Button mods={buttonMods} action={this.toggleFilter} handleAction={this.toggleFilter} text="Filter"/>
				<div className={className(classes)}>
					<MultipleFilterOptions options={this.props.filters} bindResource={this.state.boundResource} actionMethod={this.props.actionMethod} />
				</div>
			</div>
		);
	},

	buildSingleOptionsList: function() {
		var filterOptions = [this.defaultOption];
		filterOptions[0].label = this.props.label;

		for (var key in this.props.filters) {
			if (this.props.filters.hasOwnProperty(key)) {
				filterOptions.push({
					value: key,
					label: key
				});
			}
		}

		return (
			<SelectBox fieldKey="filter"
				options={filterOptions}
				bindResource={this.state.boundResource}
				changeCallback={this.handleChange} />
		);
	},

	handleChange: function (formKey, value) {
		var modifiers = {};

		if (value === '') {
			modifiers.filters = {}; // Default option
		} else {
			modifiers.filters = this.props.filters[value];
		}

		this.props.actionMethod(modifiers);
	},

	render: function () {
		return (
				<div> {this.buildOptionsList()} </div>
		);
	}
});

module.exports = Filter;
