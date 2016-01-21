var _          = require('lodash');
var React      = require('react/addons');
var classNames = require('classnames');
var PageButton = require('./PageButton');

/**
 * Create a list of page selectors
 * @class PageList
 *
 * @memberOf VisualizationComponents.Paginator
 * @see {@link VisualizationComponents.Paginator}
 *
 * @type {*|Function}
 */
var PageList = React.createClass({
	propTypes: {
		currentPage: React.PropTypes.number,
		pageCount: React.PropTypes.number.isRequired,
		selectPageCallback: React.PropTypes.func.isRequired,
		range: React.PropTypes.number
	},

	/**
	 * Sets the initial state of the PageList
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @public
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			currentPage: this.props.currentPage
		}
	},

	/**
	 * Parent callback for page selection
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @param {number} pageNumber
	 *
	 * @return {null}
	 */
	selectPage: function (pageNumber) {
		this.props.selectPageCallback(pageNumber);
	},

	/**
	 * Build a list of page buttons based on page count
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @returns {Array.<jsx>}
	 */
	buildPageList: function () {
		var selectedPage = this.props.currentPage;
		var range = this.props.range || 3;
		var min = this.props.currentPage - range >= 1 ? this.props.currentPage - range : 1
		var max = this.props.currentPage + range <= this.props.pageCount ? this.props.currentPage + range : this.props.pageCount + 1;

		return _.range(min, max).map(function(pageNumber, index) {
			var classes = classNames({
				paginate_button: true,
				active: pageNumber === selectedPage
			});

			return (
				<PageButton key={index} pageNumber={pageNumber} classes={classes} selectPageCallback={this.selectPage} />
			)
		}.bind(this));
	},

	/**
	 * Parent callback to select the previous page
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @param {event} e
	 *
	 * @return {null}
	 */
	previousPage: function (e) {
		e.preventDefault();

		if (this.props.currentPage === 1) {
			return;
		}

		this.props.previousPageCallback();
	},

	/**
	 * Parent callback to select the next page
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @param {event} e
	 *
	 * @return {null}
	 */
	nextPage: function (e) {
		e.preventDefault();

		if (this.props.currentPage === this.props.pageCount) {
			return;
		}

		this.props.nextPageCallback();
	},

	/**
	 * Select the first page
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @param {event} e
	 *
	 * @return {null}
	 */
	firstPage: function (e) {
		e.preventDefault();

		this.selectPage(1);
	},

	/**
	 * Select the last page
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @param {event} e
	 *
	 * @return {null}
	 */
	lastPage: function (e) {
		e.preventDefault();

		this.selectPage(this.props.pageCount);
	},

	/**
	 * Renders the list of pages to the page
	 * @memberOf VisualizationComponents.Paginator.PageList
	 *
	 * @return {jsx}
	 */
	render: function () {
		// Build previous button's classes
		var previousClasses = classNames({
			paginate_button: true,
			previous: true,
			disabled: this.props.currentPage === 1
		});

		// Build next button's classes
		var nextClasses = classNames({
			paginate_button: true,
			next: true,
			disabled: this.props.currentPage === this.props.pageCount
		});

		return (
			<div className="dataTables_paginate paging_simple_numbers" id="dataTables-example_paginate">
				<ul className="pagination">
					<li className={previousClasses} tabIndex="0" id="dataTables-example_previous">
						<a href="#" onClick={this.firstPage} className="icon-angle-double-left" ></a>
					</li>

					<li className={previousClasses} tabIndex="0" id="dataTables-example_previous">
						<a href="#" onClick={this.previousPage} className="icon-chevron-left" ></a>
					</li>

					{this.buildPageList()}

					<li className={nextClasses} tabIndex="0" id="dataTables-example_next">
						<a href="#" onClick={this.nextPage} className="icon-chevron-right"></a>
					</li>

					<li className={nextClasses} tabIndex="0" id="dataTables-example_next">
						<a href="#" onClick={this.lastPage} className="icon-angle-double-right"></a>
					</li>
				</ul>
			</div>
		)
	}
});

module.exports = PageList;
