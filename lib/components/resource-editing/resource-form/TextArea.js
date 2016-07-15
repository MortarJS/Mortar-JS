// External Requirements
var React = require('react');
var classNames = require('classnames');

// Components
var CharacterCount = require('./CharacterCount');

// Mixins
var FormUtility = require('./utils/FormUtilityMixin');

/**
 * TextArea Component
 * A component used for building long-form text input forms.
 *
 * @class TextArea
 * @type {ReactComponent}
 *
 * @prop  {Number=}  limit       Max character limit for text area
 * @prop  {String=}  label
 * @prop  {String=}  placeholder
 * @prop  {String=}  helpText
 * @prop  {Boolean=} disabled
 * @prop  {!String}  fieldKey
 * @prop  {Boolean=} required
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 * @example
 * render: function() { return(
 * 	<Br.Form.TextArea
 * 		fieldKey="userComment"
 * 		label="Comment"
 * 		placeholder="Sample text area component. Type away!"
 * 		required="true"
 *   />
 * )}
 *
 */
var TextArea = React.createClass({
	propTypes: {
		limit: React.PropTypes.number,
		label: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		helpText: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		fieldKey: React.PropTypes.string.isRequired,
		required: React.PropTypes.bool
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: null
		};
	},

	/**
	 * Calls the FormUtilityMixin's componentDidMount function to handle input changes.
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		this._componentDidMount();
	},

	/**
	 * Calls the FormUtilityMixin's componentWillUnmount function to handle removing change listeners
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	/**
	 * Handles user input into the input component.
	 * Sets `fieldValue` in the component state to equal the keyboard input and syncs with the provided remote through a callback.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @param {event} event The event that triggered this function
	 *
	 * @return {null}
	 */
	handleInput: function(event) {
		this.props.changeCallback(this.props.fieldKey, event.target.value, this);
	},

	/**
	 * When the field is out of focus, hide the text area character count.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @param {event} event
	 * @return {null}
	 */
	handleBlur: function (event) {
		this.setState({renderCharacterCounter: false});
	},

	/**
	 * When the field is in focus, show the text area character count.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @param  {event} event
	 * @return {null}
	 */
	handleFocus: function (event) {
		if (typeof this.props.limit !== 'undefined') {
			this.setState({renderCharacterCounter: true});
		}
	},

	/**
	 * Renders the TextArea component.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @return {JSX}
	 */
	render: function () {
		var classes = classNames({
			"form-group" : true,
			"has-error"  : this._checkFieldIsValid(),
			"disabled"   : this.props.disabled || false
		});

		return (
			<div className={classes}>
				<label className="control-label">{this.props.label}</label>

				<textarea className={`mortar-textarea form-control ${this.props.formKey}-${this.props.fieldKey}`}
					rows={this.props.rows || 3}
					placeholder={this.props.placeholder || ''}
					disabled={this.props.disabled}
					onChange={this.handleInput}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					value={this.state.fieldValue || ''} ></textarea>

				{this.state.renderCharacterCounter && (
					<CharacterCount input={this.state.fieldValue} limit={this.props.limit} />
				)}

				{this._shouldRenderHelpBlock(this.props.helpText)}
			</div>
		);
	}
});

module.exports = TextArea;
