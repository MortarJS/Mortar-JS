var React = require('react/addons');

var FormColumn = React.createClass({
	propTypes: {
		grid: React.PropTypes.oneOf([
			'xs', 'sm', 'md', 'lg'
		]).isRequired,
		size: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]).isRequired,
		classes  : React.PropTypes.string,
		children : React.PropTypes.array
	},

	determineComponentClasses: function () {
		return typeof this.props.classes !== 'undefined' ? this.props.classes : '';
	},

	render: function () {
		return (
			<div className={'col-' + this.props.grid + '-' + this.props.size.toString() + ' ' + this.determineComponentClasses()}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = FormColumn;
