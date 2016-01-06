var React = require('react/addons');
var FormUtility = require('./FormUtilityMixin');
var CharacterCount = require('./CharacterCount');
var classNames = require('classnames');

var TextArea = React.createClass({
	propTypes: {
		limit: React.PropTypes.number,
		label: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		helpText: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		fieldKey: React.PropTypes.string.isRequired
	},

	mixins: [FormUtility],

	getInitialState: function () {
		return {
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: null
		}
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		})
	},

	handleBlur: function (event) {
		this.setState({renderCharacterCounter: false});
	},

	handleFocus: function (event) {
		if (typeof this.props.limit !== 'undefined') {
			this.setState({renderCharacterCounter: true});
		}
	},

	render: function () {
		var classes = classNames({
			"form-group": true,
			"has-error": this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				<label className="control-label">{this.props.label}</label>

				<textarea className="form-control"
					rows={this.props.rows || 3}
					placeholder={this.props.placeholder || ''}
					disabled={this.props.disabled}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					value={this.state.fieldValue || ''} ></textarea>

				{this.state.renderCharacterCounter && (
					<CharacterCount input={this.state.fieldValue} limit={this.props.limit} />
				)}

				{this._shouldRenderHelpBlock(this.props.helpText)}
			</div>
		)
	}
});

module.exports = TextArea;
