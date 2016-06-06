// External Dependencies
const React           = require('react');
const classNames      = require('classnames');

/**
 * A container component for configurable modals
 * @class ModalContainer
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 *
 * @type {*|Function}
 */
const ModalContainer = React.createClass({
	propTypes: {
		openWhen         : React.PropTypes.bool.isRequired,
		width            : React.PropTypes.string,
		title            : React.PropTypes.string.isRequired,
		closeText        : React.PropTypes.string,
		confirmText      : React.PropTypes.string,
		modalBodyClasses : React.PropTypes.string,
		beforeOpen       : React.PropTypes.func,
		afterOpen        : React.PropTypes.func,
		beforeClose      : React.PropTypes.func,
		afterClose       : React.PropTypes.func,
		beforeConfirm    : React.PropTypes.func,
		afterConfirm     : React.PropTypes.func,
		disableConfirm   : React.PropTypes.bool,
		children         : React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
		options          : React.PropTypes.shape({
			keepOpen: React.PropTypes.bool // If this is true, clicking outside of a modal will not close the modal
		})
	},

	/**
	 * getInitialState
	 *
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			isOpen: false
		};
	},

	unitRegExp  : new RegExp(/^\d+(px|em|\%|cm|mm|in|pt|pc|ch|vh|vw|vmin|vmax)$/),
	digitRegExp : new RegExp(/\d+/),

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
	 * Invoked when a component is receiving new props. This method is not called for the initial render.
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @param  {object} newProps Incoming props from parent component
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function(newProps) {
		newProps.openWhen && this.openModal();
	},

	/**
	 * Open the modal and fire appropriate user functions
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
	 */
	openModal: function () {
		this._modalLifeCycleEvent('open', true);
	},

	/**
	 * Close the modal and fire appropriate user functions
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
	 */
	closeModal: function () {
		this._modalLifeCycleEvent('close', false);
	},

	/**
	 * Save modal and fire the appropriate user functions
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {null}
	 */
	confirmModal: function () {
		this._modalLifeCycleEvent('confirm', false);
	},

	/**
	 * Fire the before and after lifecycle hooks for the modal component.
	 *
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @param  {string} action         Modal lifecycle action
	 * @param  {bool}   nextModalState The next value for the modal `isOpen` prop
	 *
	 * @return {null}
	 */
	_modalLifeCycleEvent: function(action, nextModalState) {
		action = action.charAt(0).toUpperCase() + action.slice(1);

		this._callUserFunc(`before${action}`);

		this.setState({
			isOpen: nextModalState
		});

		this._callUserFunc(`after${action}`);
	},

	/**
	 * Determine whether the modal is open and we should render the overlay
	 *
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @returns {jsx|null}
	 */
	_shouldRenderOverlay: function () {
		return this.state.isOpen && <div className="mortar-modal-backdrop fade in"></div>;
	},

	/**
	 * Fire the selected user function, if it's provided
	 *
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @param {string} propName Lifecycle event for modal
	 *
	 * @return {null}
	 */
	_callUserFunc: function (propName) {
		if (this.props[propName]) {
			this.props[propName]();
		}
	},

	/**
	 * Return save button jsx
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @returns {jsx}
	 */
	confirmButton: function () {
		return <button type="button" className={"btn btn-primary"} disabled={this.props.disableConfirm} onClick={this.confirmModal}>{this.props.confirmText || 'Confirm'}</button>;
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
	 * @param {Event} event The click event
	 *
	 * @return {null}
	 */
	handleClick: function(event) {
		let clickArea = this.refs.dialog,
			options   = this.props.options || {};
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
	 * @param {Event} event The keyup event
	 *
	 * @return {null}
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
		return (
			<div className="mortar-modal-footer">
				{this.cancelButton()}
				{this.confirmButton()}
			</div>
		);
	},

	/**
	 * Set up a modal's class names
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {object} CSS classes for the entire modal component
	 */
	_modalClassnames: function() {
		return classNames({
			'mortar-modal' : true,
			fade           : true,
			in             : this.state.isOpen
		});
	},

	/**
	 * Prepares the CSS classes for the modal body
	 *
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {string} CSS classes for the modal body
	 */
	_modalBodyClasses: function() {
		return this.props.modalBodyClasses ? `mortar-modal-body ${this.props.modalBodyClasses}` : 'mortar-modal-body';
	},

	/**
	 * Sets the width of the modal component. The default modal size is 600px.
	 *
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {object} Width of modal in pixels or an empty object if none is provided
	 */
	_modalWidth: function() {
		let width = this.props.width;

		if (! this.props.width) {
			return {};
		}

		if (this.digitRegExp.test(width)) {
			if (! this.unitRegExp.test(width)) {
				let newWidth = width.match(this.digitRegExp)[0] + 'px';

				console.warn(`The value provided for width: "${width}" was not valid.  Adjusting to ${newWidth}. Please note that valid css units are required: https://developer.mozilla.org/en-US/docs/Web/CSS/length`);
				width = newWidth;
			}

			return {
				width: width
			};

		} else {
			console.error(`A digit is required when specifying width.  Your input: "${width}".  Falling back to 600px.`);
			return {};
		}
	},

	/**
	 * Render the active modal
	 *
	 * @private
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {jsx}
	 */
	_renderModal: function() {
		return (
			<div>
				<div className={this._modalClassnames()} role="dialog" onClick={this.handleClick}>
					<div className="mortar-modal-dialog" ref="dialog" style={this._modalWidth()}>
						<div className="mortar-modal-content">
							<div className="mortar-modal-header">
								<button type="button" className="close" onClick={this.closeModal}>&times;</button>
								<h4 className="mortar-modal-title">{this.props.title}</h4>
							</div>
							<div className={this._modalBodyClasses()}>
								{this.props.children}
							</div>
							<div className="clearfix" />
							{this._buildButtons()}
						</div>
					</div>
				</div>
				{this._shouldRenderOverlay()}
			</div>
		);
	},

	/**
	 * Renders the complete Modal component.
	 * @memberOf GlobalComponents.ModalContainer
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<div className="modal-component">
				{this.state.isOpen && this._renderModal()}
			</div>
		);
	}
});

module.exports = ModalContainer;
