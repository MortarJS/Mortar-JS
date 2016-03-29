var React = require('react/addons');

var Header = React.createClass({
	propTypes: {
		homepage: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired
	},
	buildLogo: function () {
		return this.props.logo.map(function (logo, index) {
			return <img src={logo} />;
		}.bind(this));
	},
	render: function () {

		var brand = this.props.logo ? this.buildLogo(this.props.logo) : this.props.title;

		return (
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand" href={this.props.homepage}>{brand}</a>
			</div>
		)
	}
});

module.exports = Header;
