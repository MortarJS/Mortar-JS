var React = require('react/addons');
var _ = require('lodash');
var Input = require('../../resource-editing/resource-form/Input');

var PageSearch = React.createClass({
	propTypes: {
		searchable: React.PropTypes.array.isRequired,
		minLength: React.PropTypes.number,
		options: React.PropTypes.shape({
			queryTimeout: React.PropTypes.number
		})
	},

	getInitialState: function () {
		return {
			search: {
				query: ''
			}
		}
	},

	/**
	 * Container for the current timeout ID
	 */
	currentTimeout: 0,

	/**
	 * Build a filters object with the structure:
	 *
	 * ```{
	 *   "field1": "query",
	 *   "or": {
	 *     "field2": "query",
	 *     ....
	 *   }
	 * }```
	 *
	 * @param {String} query
	 * @param {Array} fields
	 * @param {Object} filters
	 * @returns {Object}
	 * @private
	 */
	_buildFilterObject: function (query, fields, filters, nested) {
		nested = nested || false;
		var _buildFilterObject = this._buildFilterObject;
		fields.forEach(function (field, index) {
			if (! nested && index === 0) {
				filters[field] = '~' + query;
			} else if (filters.hasOwnProperty('or')) {
				_buildFilterObject(query, [field], filters.or, true);
			} else {
				filters.or = {};
				filters.or[field] = '~' + query;
			}
		});

		return filters;
	},

	/**
	 * Handle search field updates
	 *
	 * @param {String} key
	 * @param {String} value
	 * @param {Object} component
	 * @return void
	 * @private
	 */
	_handleSearchChange: function (key, value, component) {
		var options = this.props.options || {};

		// Clear the previous setTimeout callback and register a new one while a user keeps typing
		clearTimeout(this.currentTimeout);
		delete this.currentTimeout;

		var queryData = this.queryData;
		this.currentTimeout = setTimeout(function () {
			queryData();
		}, options.queryTimeout || 500);

		this.setState({
			search: {
				query: value
			}
		})
	},

	/**
	 * Manage query string
	 *
	 * @return void
	 */
	queryData: function () {
		var filters = {};
		var query = this.state.search.query;
		var minLengths = this.props.minLength || 1;

		if (query.length < this.props.minLength) {
			// Don't set any modification filters
		} else {
			filters = this._buildFilterObject(query, this.props.searchable, {});
		}

		this.props.actionMethod({filters: filters});
	},

	render: function () {
		return (
			<div className="input-group custom-search-form">
				<Input fieldKey="query" bindResource={this.state.search} changeCallback={this._handleSearchChange}
					placeholder="Search.." type="text" />

				<span className="input-group-btn">
					<button className="btn btn-default" type="button" onClick={this.queryData}>
						<i className="icon-search"></i>
					</button>
				</span>
			</div>
		)
	}
});

module.exports = PageSearch;
