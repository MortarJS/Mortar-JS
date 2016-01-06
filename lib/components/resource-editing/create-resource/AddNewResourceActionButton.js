var React = require('react/addons');
var Modal = require('../../global/modal/ModalContainer');

var AddNewResourceActionButton = React.createClass({
	handleClick: function (event) {
		this.props.createResource('create', {}, event);
	},

	render: function () {
		return (
			<div className="resource-action-container">
				<div className="resource-action-button">
					<a href="javascript:void(0)" className="btn btn-info btn-fab btn-raised" onClick={this.handleClick}>
						<div className="ripple-wrapper"></div>
						<span className="add-new-resource-icon">+</span>
					</a>
				</div>

				{this.props.children}
			</div>
		);
	}
});

module.exports = AddNewResourceActionButton;
