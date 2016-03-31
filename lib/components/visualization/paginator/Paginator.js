var React           = require('react');
var PageList        = require('./PageList');
var PaginationStore = require('../../../stores/PaginationStore');

/**
 * Wrapper component for a page list and selector
 *
 * @class Paginator
 *
 * @memberOf VisualizationComponents
 * @see {@link VisualizationComponents}
 *
 * @type {*|Function}
 */
var Paginator = React.createClass({
	propTypes: {
		actionMethod: React.PropTypes.func
	},

	/**
	 * Gets the initial state of the component by grabbing pagination information
	 * from the `PaginationStore`
	 *
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {function}
	 */
	getInitialState: function () {
		return this._getPaginationState();
	},

	/**
	 * Return a pagination state object.
	 * @private
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @returns {{currentPage: *, pageCount: *}}
	 */
	_getPaginationState: function () {
		return {
			currentPage : PaginationStore.getCurrentPage(),
			pageCount   : PaginationStore.getTotalPages()
		};
	},

	/**
	 * Register event listeners and fire request for data when the component mounts
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {null}
	 */
	componentDidMount: function () {
		PaginationStore.addChangeListener(this.onChange);
	},

	/**
	 * Deregister the event listeners when the component unmounts
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {null}
	 */
	componentWillUnmount: function () {
		PaginationStore.removeChangeListener(this.onChange);
	},

	/**
	 * Handle change events in pagination state.
	 * When changes occur, we
	 * @private
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {null}
	 */
	onChange: function () {
		this.setState(this._getPaginationState());
	},

	/**
	 * Master parent callback to select a specific page.
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @param {number} page The page to select
	 *
	 * @return {null}
	 *
	 * `per_page` comes from the api and cannont be camelCase
	 */
	selectPage: function (page) {
		// Set pagination modifiers
		var paginationModifiers = {
			per_page : PaginationStore.getPerPage(),
			page     : page
		};

		// Merge pagination modifiers with previously requested modifiers
		var allModifiers = Object.assign({}, PaginationStore.getRequestedModifiers(), paginationModifiers);

		// Fire action with the merged modifiers to request new data
		this.props.actionMethod({pagination: allModifiers});
	},

	/**
	 * Select the next page
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {null}
	 */
	nextPage: function () {
		this.selectPage(this.state.currentPage + 1);
	},

	/**
	 * Select the previous page
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {null}
	 */
	previousPage: function () {
		this.selectPage(this.state.currentPage - 1);
	},

	/**
	 * Renders the pagination bar to the page
	 * @memberOf VisualizationComponents.Paginator
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<div className="table-pagination">
				<div className="col-sm-6">
					<PageList currentPage={this.state.currentPage}
						pageCount={this.state.pageCount}
						selectPageCallback={this.selectPage}
						nextPageCallback={this.nextPage}
						previousPageCallback={this.previousPage} />
				</div>
			</div>
		);
	}
});

module.exports = Paginator;
