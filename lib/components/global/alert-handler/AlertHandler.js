var React = require('react/addons');
var Alert = require('react-bootstrap').Alert;
var AlertStore = require('../../../stores/AlertStore');

/**
 * @class AlertHandler
 *
 * @memberOf GlobalComponents
 *
 */
var AlertHandler = React.createClass({
	getInitialState: function () {
		return {
			showAlert: false,
			alertMessage: null
		}
	},

	/**
	 * Register a change listener with the Error Store
	 */
	componentDidMount: function () {
		this.changeListener = this._onChange;
		AlertStore.addChangeListener(this.changeListener);
	},

	/**
	 * Handle change events
	 *
	 * @private
	 */
	_onChange: function () {
		var alert = AlertStore.getAlert();
		if (alert.isError) {
			this.setState({
				showAlert: true,
				title: alert.actionOrError,
				alertMessage: alert.message,
				bsStyle: 'danger'
			});
		} else {
			this.setState({
				showAlert: true,
				title: alert.actionOrError,
				alertMessage: alert.message,
				bsStyle: 'success'
			});
		}
	},

	/**
	 * Deregister change listener
	 */
	componentWillUnmount: function () {
		AlertStore.removeChangeListener(this.changeListener);
	},

	handleCloseAlert: function () {
		this.setState({
			showAlert: false
		});
	},

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
			)
		} else {
			// Need to return some JSX..
			return (
				<div className="alert-container"></div>
			)
		}
	}
});

module.exports = AlertHandler;
