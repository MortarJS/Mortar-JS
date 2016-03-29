var React = require('react/addons');

var HeaderButtonDropdownItem = React.createClass({
	propTypes: {
		iconName: React.PropTypes.string.isRequired,
		item: React.PropTypes.string.isRequired,
		href: React.PropTypes.string.isRequired
	},

	render: function () {
		return (
			<li>
				<a href={this.props.href}>
					<i className={'fa fa-'+this.props.iconName+' fa-fw'}></i>
					{this.props.item}
				</a>
			</li>
		)
	}
});

module.exports = HeaderButtonDropdownItem;
