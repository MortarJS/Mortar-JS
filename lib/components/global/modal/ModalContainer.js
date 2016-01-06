// External Dependencies
var React           = require('react/addons');
var classNames      = require('classnames');

// Components
var OpenModalButton = require('./OpenModalButton');

/**
 * A container component for configurable modals
 *
 * @type {*|Function}
 */
var ModalContainer = React.createClass({
	propTypes: {
		openWhen   : React.PropTypes.bool.isRequired,
		options    : React.PropTypes.shape({
			width    : React.PropTypes.string,
			keepOpen : React.PropTypes.bool // If this is true, clicking outside of a modal will not close the modal
		}),
		buttonText : React.PropTypes.string,
		target     : React.PropTypes.string,
		title      : React.PropTypes.string.isRequired,
		closeText  : React.PropTypes.string,
		saveText   : React.PropTypes.string
	},

	getInitialState: function () {
		return {
			isOpen: false
		}
	},

	/**
	 * When the component mounts, an event listener is attached to the window
	 * to track keyup events, and filter them into this component's handleKeyUp function.
	 *
	 * @return null
	 */
	componentDidMount: function() {
		window.addEventListener('keyup', this.handleKeyUp);
	},

	/**
	 * When the component is unmounted, the window's KeyUp listener is removed
	 *
	 * @return null
	 */
	componentWillUnmount: function() {
		window.removeEventListener('keyup', this.handleKeyUp);
	},

	/**
	 * Open the modal and fire appropriate user functions
	 *
	 * @todo this isn't being fired
	 */
	openModal: function () {
		this._callUserFunc('beforeOpen');

		this.setState({
			isOpen: true
		});

		this._callUserFunc('afterOpen');
	},

	/**
	 * Close the modal and fire appropriate user functions
	 */
	closeModal: function () {
		this._callUserFunc('beforeClose');

		this.setState({
			isOpen: false
		});

		this._callUserFunc('afterClose');
	},

	/**
	 * Save modal and fire the appropriate user functions
	 */
	saveModal: function () {
		this._callUserFunc('beforeSave');

		this.setState({
			isOpen: false
		});

		this._callUserFunc('afterSave');
	},

	/**
	 * Determine whether the modal is open and we should render the overlay
	 *
	 * @returns {JSX}
	 * @private
	 */
	_shouldRenderOverlay: function () {
		if (this.props.openWhen) {
			return (
				<div className="modal-backdrop fade in"></div>
			)
		}
	},

	/**
	 * Fire the selected user function, if it's provided
	 *
	 * @param propName
	 * @private
	 */
	_callUserFunc: function (propName) {
		if (typeof this.props[propName] !== 'undefined') {
			this.props[propName]();
		}
	},

	/**
	 * Determine if we should disable the button
	 *
	 * @returns {string}
	 * @private
	 */
	_shouldDisableButton: function () {
		return this.props.disableSaveWhen;
	},

	/**
	 * Return save button jsx
	 *
	 * @returns {JSX}
	 */
	saveButton: function () {
		return <button type="button" className={"btn btn-primary"} disabled={this._shouldDisableButton()} onClick={this.saveModal}>{this.props.saveText || 'Save'}</button>;
	},

	/**
	 * Return cancel button jsx
	 *
	 * @returns {JSX}
	 */
	cancelButton: function () {
		return <button type="button" className="btn btn-default" onClick={this.closeModal}>{this.props.closeText || 'Cancel'}</button>;
	},

	/**
	 * A click listener attached to the modal.
	 * Every time a click happens, this function checks to see if the click was on the modal dialog,
	 * or outside of it.
	 *
	 * If the click is outside of the dialog, we close the modal without saving.
	 *
	 * @param event {event} The click event
	 *
	 * @return null
	 */
	handleClick: function(event) {
		var clickArea = this.refs.dialog.getDOMNode(),
			options = this.props.options || {};
		if (! options.keepOpen && ! clickArea.contains(event.target)) {
			this.closeModal();
		}
	},

	/**
	 * A keyup listener attached to the modal.
	 * Every time a key is released, this function checks to see if it was the 'ESC' key.
	 * If the 'ESC' was released, we close the modal.
	 *
	 * @param event {event} The keyup event
	 *
	 * @return null
	 */
	handleKeyUp: function(event) {
		if (event.keyCode === 27) {
			this.closeModal();
		}
	},

	/**
	 * Determine which, if any, buttons to display
	 *
	 * @returns {JSX}
	 * @private
	 */
	_buildButtons: function () {
		if (typeof this.props.showButton === 'string') {
			return (
				<div className="modal-footer">
					{this[this.props.showButton + 'Button']()}
				</div>
			);
		} else if (!this.props.disableButtons) {
			return (
				<div className="modal-footer">
					{this.cancelButton()}
					{this.saveButton()}
				</div>
			);
		}
	},

	render: function () {
		// Set up a modal's class names
		var modalClassnames = classNames({
			modal : true,
			fade  : true,
			in    : this.props.openWhen
		});

		// Set up modal styling
		var modalStyles = {
			display: this.props.openWhen ? 'block' : 'none'
		};

		var modalDialogStyles = {
			width: this.props.options && this.props.options.width ? this.props.options.width : '600px'
		};

		var modalBodyClasses = typeof this.props.modalBodyClasses === 'undefined' ? 'modal-body' :
		'modal-body ' + this.props.modalBodyClasses;

		return (
			<div className="modal-component">
				{this.props.openWhen && (
					<div>
						<div className={modalClassnames} id={this.props.target} tabIndex="-1" role="dialog" style={modalStyles} onClick={this.handleClick}>
							<div className="modal-dialog" ref="dialog" style={modalDialogStyles}>
								<div className="modal-content">
									<div className="modal-header">
										<button type="button" className="close" onClick={this.closeModal}>&times;</button>
										<h4 className="modal-title" id={this.props.target + 'Label'}>{this.props.title}</h4>
									</div>
									<div className={modalBodyClasses}>
										{this.props.children}
									</div>
									<div className="clearfix" />
									{this._buildButtons()}
								</div>
							</div>
						</div>
						{this._shouldRenderOverlay()}
					</div>
				)}
			</div>
		)
	}
});

module.exports = ModalContainer;

