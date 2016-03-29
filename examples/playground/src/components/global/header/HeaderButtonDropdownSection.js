var React = require('react/addons');

var Header = React.createClass({
	render: function () {
		return (
			<li>
				<a href="#">
					<div>
						<strong>John Smith</strong>
						<span className="pull-right text-muted">
							<em>Yesterday</em>
						</span>
					</div>
					<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
				</a>
			</li>
		)
	}
});

module.exports = Header;
