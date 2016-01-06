var React = require('react/addons');
var SelectBox = require('../../resource-editing/resource-form/SelectBox');

var Filter = React.createClass({
	getInitialState: function () {
		return {
			boundResource: {}
		}
	},

	getDefaultProps: function () {
		return {
			label: 'No Filter'
		}
	},

	// Default option for display
	defaultOption:   {
		value: ''
	},

	buildOptionsList: function () {
		var filterOptions = [this.defaultOption];
		filterOptions[0]['label'] = this.props.label;

		for (var key in this.props.filters) {
			filterOptions.push({
				value: key,
				label: key
			});
		}

		return filterOptions;
	},

	handleChange: function (formKey, value, component) {
		//var modifiers = {};

		if (value === '') {
			//modifiers.filters = {}; // Default option
			this.props.actionMethod(this.props.filterKey, {});
		} else {
			//modifiers.filters = this.props.filters[value];
			this.props.actionMethod(this.props.filterKey, this.props.filters[value]);
		}

		//this.props.actionMethod(modifiers);
	},

	render: function () {
		return (
			<SelectBox fieldKey="filter"
				options={this.buildOptionsList()}
				bindResouce={this.state.boundResource}
				changeCallback={this.handleChange} />
		)
	}
});

module.exports = Filter;
