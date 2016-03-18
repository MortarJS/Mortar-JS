var React      = require('react/addons');
var Alert      = require('react-bootstrap').Alert;
var AlertStore = require('../../../stores/AlertStore');

/**
 * @class AlertHandler
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 *
 */
var AlertHandler = React.createClass({
	getInitialState: function () {
		return {
			showAlert    : false,
			alertMessage : null
		};
	},

	/**
	 * Register a change listener with the Error Store
	 * @memberOf GlobalComponents.AlertHandler
	 *
	 * @return {null}
	 */
	componentDidMount: function () {
		AlertStore.addChangeListener(this.onChange);
	},

	/**
	 * Handle change events
	 * @memberOf GlobalComponents.AlertHandler
	 *
	 * @return {null}
	 */
	onChange: function () {
		var alert = AlertStore.getAlert();

		if (alert.isError) {
			this.setState({
				showAlert    : true,
				title        : alert.actionOrError,
				alertMessage : alert.message,
				bsStyle      : 'danger'
			});
		} else {
			this.setState({
				showAlert    : true,
				title        : alert.actionOrError,
				alertMessage : alert.message,
				bsStyle      : 'success'
			});
		}
	},

	/**
	 * Deregister change listener
	 * @memberOf GlobalComponents.AlertHandler
	 *
	 * @return {null}
	 */
	componentWillUnmount: function () {
		AlertStore.removeChangeListener(this.onChange);
	},

	/**
	 * Handles closing the alert display
	 * @memberOf GlobalComponents.AlertHandler
	 *
	 * @return {null}
	 */
	handleCloseAlert: function () {
		this.setState({
			showAlert: false
		});
	},

	/**
	 * Renders the alert
	 * @memberOf GlobalComponents.AlertHandler
	 *
	 * @return {jsx}
	 */
	render: function () {
		if (this.state.showAlert) {
			return (
				<div className="alert-container">
					<div className="alert-wrapper">
						<Alert bsStyle={this.state.bsStyle} onDismiss={this.handleCloseAlert} dismissAfter={5000}>
							<h4><strong>{this.state.title}</strong></h4>
							<p>{this.state.alertMessage}</p>
						</Alert>
					</div>
				</div>
			);
		}

		// Otherwise, need to return some JSX..
		return (
			<div className="alert-container"></div>
		);
	}
});

module.exports = AlertHandler;
