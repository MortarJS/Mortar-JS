var React = require('react');

/**
 * SortButton Component
 * Used to add the sorting arrows to columns that are sortable.
 *
 * @class SortButton
 * @type {ReactComponent}
 *
 * @memberOf TableComponents
 * @see {@link TableComponents}
 */
var SortButton = React.createClass({
	propTypes: {
		sortProperty    : React.PropTypes.string,
		actionsCallback : React.PropTypes.func
	},

	/**
	 * Gets and sets the initial state of the component.
	 *
	 * @memberOf TableComponents.SortButton
	 * @see {@link TableComponents}
	 *
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			direction: 'desc'
		};
	},

	/**
	 * Toggles the sort direction for the clicked column header.
	 *
	 * @memberOf TableComponents.SumRow
	 *
	 * @param {event} event A click event triggering a sort.
	 *
	 * @return {null}
	 */
	toggleSort: function (event) {
		var toggleDirection = this.state.direction === 'asc' ? 'desc' : 'asc';

		var modifiers = {
			sort: {}
		};

		modifiers.sort[event.target.dataset.sortable] = toggleDirection;

		this.props.actionsCallback('sort', modifiers);

		this.setState({
			direction: toggleDirection
		});
	},

	/**
	 * Renders the SortButton component next to the column header.
	 *
	 * @memberOf TableComponents.SumRow
	 *
	 * @return {jsx}
	 */
	render: function () {
		let sort_icon = (this.state.direction === 'asc') ? 'icon-chevron-up' : 'icon-chevron-down';

		return (
			<button className={`${sort_icon} pull-right`} type="button" onClick={this.toggleSort}
				data-sortable={this.props.sortProperty}></button>
		);
	}
});

module.exports = SortButton;
