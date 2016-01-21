// External Dependencies
var React           = require('react/addons');
var classNames      = require('classnames');

/**
 * A container component for configurable modals
 * @class ModalContainer
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
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

	/**
	 * getInitialState
	 *
	 * @memberOf GlobalComponents.ModalContainer
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			isOpen: false
		}
	},

	/**
	 * When the component mounts, an event listener is attached to the window
	 * to track keyup events, and filter them into this component's handleKeyUp function.
	 *
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		window.addEventListener('keyup', this.handleKeyUp);
	},

	/**
	 * When the component is unmounted, the window's KeyUp listener is removed
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
	 */
	componentWillUnmount: function() {
		window.removeEventListener('keyup', this.handleKeyUp);
	},

	/**
	 * Open the modal and fire appropriate user functions
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @TODO this isn't being fired
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
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
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
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
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
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @returns {jsx}
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
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @param {string} propName
	 *
	 * @return {null}
	 */
	_callUserFunc: function (propName) {
		if (typeof this.props[propName] !== 'undefined') {
			this.props[propName]();
		}
	},

	/**
	 * Determine if we should disable the button
	 *
	 * @memberOf GlobalComponents.ModalContainer
	 * @private
	 *
	 * @returns {string}
	 */
	_shouldDisableButton: function () {
		return this.props.disableSaveWhen;
	},

	/**
	 * Return save button jsx
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @returns {jsx}
	 */
	saveButton: function () {
		return <button type="button" className={"btn btn-primary"} disabled={this._shouldDisableButton()} onClick={this.saveModal}>{this.props.saveText || 'Save'}</button>;
	},

	/**
	 * Return cancel button jsx
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @returns {jsx}
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
	 * @memberOf GlobalComponents.ModalContainer
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
	 * @memberOf GlobalComponents.ModalContainer
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
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @returns {jsx}
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

	/**
	 * Renders the Modal.
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {jsx}
	 */
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
