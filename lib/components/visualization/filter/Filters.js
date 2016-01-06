var React = require('react/addons');
var Filter = require('./SingleSelectFilter');
var Column = require('../../page-structure/Column');
var _ = require('lodash');

var Filters = React.createClass({
	propTypes: {
		filters: React.PropTypes.array
	},

	getInitialState: function () {
		return {
			filters: []
		}
	},

	_onChange: function (filterKey, newFilter) {
		this.setState(function (previousState, currentProps) {
			previousState.filters[filterKey] = newFilter;
		}, function () {
			// Rebuild the filter object on each update
			var nextFilters = {};
			for (var key in this.state.filters) {
				var filter = this.state.filters[key];
				if (Object.keys(filter).length === 0) {
					// Empty filter, don't include
				} else {
					_.merge(nextFilters, filter);
				}
			}

			var modifiers = {
				filters: nextFilters
			};

			this.props.actionMethod(modifiers);
		});
	},

	_buildFilters: function () {
		var _onChange = this._onChange;
		return this.props.filters.map(function (filter, index) {
			return (
				<Column grid="lg" size="6">
					<Filter filterKey={index} label={filter.label} filters={filter.filters} actionMethod={_onChange} />
				</Column>
			)
		});
	},

	render: function () {
		return (
			<Column key={index} grid="lg" size="12" classes={'filter-container ' + (this.props.classes || '')}>
				{this._buildFilters()}
			</Column>
		)
	}
});

module.exports = Filters;
