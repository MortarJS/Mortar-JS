var React = require('react/addons');

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
		return (
			<button className="icon-sort pull-right" type="button" onClick={this.toggleSort}
				data-sortable={this.props.sortProperty}></button>
		)
	}
});

module.exports = SortButton;
