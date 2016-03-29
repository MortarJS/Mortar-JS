var React = require('react/addons');

var NavSearch = React.createClass({
	render: function () {
		return (
			<li className="sidebar-search">
				<div className="input-group custom-search-form">
					<input type="text" className="form-control" placeholder="Search..." />
					<span className="input-group-btn">
						<button className="btn btn-default" type="button">
							<i className="fa fa-search"></i>
						</button>
					</span>
				</div>
			</li>
		)
	}
});

module.exports = NavSearch;
