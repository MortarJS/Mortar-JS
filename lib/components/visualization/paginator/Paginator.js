var React = require('react/addons');
var PageList = require('./PageList');
var PaginationStore = require('../../../stores/PaginationStore');
var assign = require('react/lib/Object.assign');

/**
 * Wrapper component for a page list and selector
 *
 * @type {*|Function}
 */
var Paginator = React.createClass({
	getInitialState: function () {
		return this._getPaginationState();
	},

	/**
	 * Return a pagination state object.
	 *
	 * @returns {{currentPage: *, pageCount: *}}
	 * @private
	 */
	_getPaginationState: function () {
		return {
			currentPage: PaginationStore.getCurrentPage(),
			pageCount: PaginationStore.getTotalPages()
		}
	},

	/**
	 * Register event listeners and fire request for data
	 */
	componentDidMount: function () {
		this.changeListener = this._onChange;
		PaginationStore.addChangeListener(this.changeListener);
	},

	/**
	 * Deregister an event listener
	 */
	componentWillUnmount: function () {
		PaginationStore.removeChangeListener(this.changeListener);
	},

	/**
	 * Handle change events in pagination state.
	 *
	 * @private
	 */
	_onChange: function () {
		this.setState(this._getPaginationState());
	},

	/**
	 * Master parent callback to select a specific page.
	 *
	 * @param page
	 */
	selectPage: function (page) {
		// Set pagination modifiers
		var paginationModifiers = {
			per_page: PaginationStore.getPerPage(),
			page: page
		};

		// Merge pagination modifiers with previously requested modifiers
		var allModifiers = assign({}, PaginationStore.getRequestedModifiers(), paginationModifiers);

		// Fire action with the merged modifiers to request new data
		this.props.actionMethod({pagination: allModifiers});
	},

	/**
	 * Select the next page
	 */
	nextPage: function () {
		this.selectPage(this.state.currentPage + 1);
	},

	/**
	 * Select the previous page
	 */
	previousPage: function () {
		this.selectPage(this.state.currentPage - 1);
	},

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
		)
	}
});

module.exports = Paginator;
