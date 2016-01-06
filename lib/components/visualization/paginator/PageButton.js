var React = require('react/addons');
var classNames = require('classnames');
var _ = require('lodash');

/**
 * Page button component
 *
 * @type {*|Function}
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
	 * @param e
	 */
	selectPage: function (e) {
		e.preventDefault();
		this.props.selectPageCallback(this.props.pageNumber);
	},

	render: function () {
		return (
			<li key={this.props.pageNumber} className={this.props.classes} tabIndex="0">
				<a href="#" onClick={this.selectPage}>{this.props.pageNumber.toString()}</a>
			</li>
		)
	}
});

module.exports = PageButton;
