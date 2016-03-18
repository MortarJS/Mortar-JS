var React = require('react/addons');

var FormRow = React.createClass({
	propTypes: {
		classes  : React.PropTypes.string,
		children : React.PropTypes.array
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

module.exports = FormRow;
