var React = require('react/addons');
var classNames = require('classnames');
var _ = require('lodash');

/**
 * Page button component
 * @class PageButton
 *
 * @memberOf VisualizationComponents.Paginator
 */
var PageButton = React.createClass({
	propTypes: {
		classes: React.PropTypes.string.isRequired,
		pageNumber: React.PropTypes.number.isRequired,
		selectPageCallback: React.PropTypes.func.isRequired
	},

	/**
	 * Child callback for page selection
	 *
	 * @memberOf VisualizationComponents.Paginator.PageButton
	 *
	 * @param {event} e
	 *
	 * @return {null}
	 */
	selectPage: function (e) {
		e.preventDefault();
		this.props.selectPageCallback(this.props.pageNumber);
	},

	/**
	 * Renders the button into the list of pages
	 * @memberOf VisualizationComponents.Paginator.PageButton
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<li key={this.props.pageNumber} className={this.props.classes} tabIndex="0">
				<a href="#" onClick={this.selectPage}>{this.props.pageNumber.toString()}</a>
			</li>
		)
	}
});

module.exports = PageButton;
