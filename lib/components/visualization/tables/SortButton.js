var React = require('react/addons');

var SortButton = React.createClass({
	getInitialState: function () {
		return {
			direction: 'desc'
		};
	},

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

	render: function () {
		return (
			<button className="fa fa-sort pull-right" type="button" onClick={this.toggleSort}
				data-sortable={this.props.sortProperty}></button>
		)
	}
});

module.exports = SortButton;
