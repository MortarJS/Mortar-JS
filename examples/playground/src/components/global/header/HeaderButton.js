var React = require('react');
var HeaderButtonDropdown = require('./HeaderButtonDropdown');

var HeaderButton = React.createClass({
	propTypes: {
		iconName: React.PropTypes.string.isRequired
	},

	render: function () {
		return (
			<li className="dropdown">
				<a className="dropdown-toggle" data-toggle="dropdown" href="#">
					<i className={'fa fa-'+this.props.iconName+' fa-fw'}></i>  <i className="fa fa-caret-down"></i>
				</a>
				<HeaderButtonDropdown {...this.props.children} />
			</li>
		)
	}
});

module.exports = HeaderButton;
