var React = require('react/addons');

var OpenModalButton = React.createClass({
	propTypes: {
		handleOpenModal: React.PropTypes.func.isRequired,
		buttonText: React.PropTypes.string.isRequired,
		classNames: React.PropTypes.string.isRequired
	},

	handleOpenModal: function (event) {
		this.props.handleOpenModal(event);
	},

	render: function () {
		return (
			<button className={this.props.classNames} onClick={this.handleOpenModal} type="button">
					{this.props.buttonText}
			</button>
		)
	}
});

module.exports = OpenModalButton;
