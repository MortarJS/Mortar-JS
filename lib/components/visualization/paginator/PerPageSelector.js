var React = require('react/addons');
var PerPageOption = require('./PerPageOption');
var PaginationStore = require('../../../stores/PaginationStore');
var assign = require('react/lib/Object.assign');

/**
 * Wrapper component for a per-page selector for pagination
 * @class PerPageSelector
 *
 * @memberOf VisualizationComponents
 * @see {@link VisualizationComponents}
 */
var PerPageSelector = React.createClass({
	getInitialState: function () {
		return {
			perPage: 10
		}
	},

	/**
	 * Return a pagination state object.
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @returns {{currentPage: *, pageCount: *}}
	 * @private
	 */
	_getPaginationState: function () {
		return {
			perPage: PaginationStore.getPerPage()
		}
	},

	/**
	 * Register event listeners and fire request for data
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @return {null}
	 */
	componentDidMount: function () {
		PaginationStore.addChangeListener(this.onChange);
	},

	/**
	 * Deregister an event listener
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @return {null}
	 */
	componentWillUnmount: function () {
		PaginationStore.removeChangeListener(this.onChange);
	},

	/**
	 * Handle change events in pagination state.
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @return {null}
	 */
	onChange: function () {
		this.setState(this._getPaginationState());
	},

	/**
	 * Parent callback for selection
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @param {event} event
	 *
	 * @return {null}
	 */
	selectOption: function (event) {
		// Set pagination modifiers
		var paginationModifiers = {
			per_page: event.target.value,
			page: 1 // Always reset page
		};

		// Merge pagination modifiers with previously requested modifiers
		var allModifiers = assign({}, PaginationStore.getRequestedModifiers(), paginationModifiers);

		// Fire action with the merged modifiers to request new data
		this.props.actionMethod({pagination: allModifiers});
	},

	/**
	 * Option values
	 * @memberOf VisualizationComponents.PerPageSelector
	 */
	options: [10, 20, 30, 40, 50],

	/**
	 * Build a select box of options
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @returns {*}
	 */
	buildOptions: function () {
		return this.options.map(function(value, index) {
			return <PerPageOption key={index} value={value} onChangeCallback={this.selectOption} />
		}.bind(this));
	},

	/**
	 * Renders the perpage selector
	 * @memberOf VisualizationComponents.PerPageSelector
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<div className="col-sm-2 pull-right">
				<div className="dataTables_length" id="dataTables-example_length">
					<label>Entries per page:
						<select name="dataTables-example_length"
							className="form-control input-sm"
							onChange={this.selectOption}
							value={this.state.perPage}>
							{this.buildOptions()}
						</select>
					</label>
				</div>
			</div>
		)
	}
});

module.exports = PerPageSelector;
