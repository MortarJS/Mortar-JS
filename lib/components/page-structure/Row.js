var React = require('react');

var Row = React.createClass({
	propTypes: {
		classes  : React.PropTypes.string,
		children : React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
	},

	determineComponentClasses: function () {
		return typeof this.props.classes !== 'undefined' ? this.props.classes : '';
	},

	render: function () {
		return (
			<div className={'row ' + this.determineComponentClasses()}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Row;
