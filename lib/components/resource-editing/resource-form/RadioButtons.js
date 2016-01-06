var React = require('react/addons');
var FormUtility = require('./FormUtilityMixin');
var _ = require('lodash');
var className = require('classnames');
var FormStore = require('../../../stores/FormStore');

var RadioButton = React.createClass({
	propTypes: {
		fieldKey: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		identifier: React.PropTypes.string,
		labelAttribute: React.PropTypes.string
	},

	mixins: [FormUtility],

	getInitialState: function () {
		return {
			isValid: true,
			fieldValue: {}
		}
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	customHandleChange: function (event) {
		var index = event.target.dataset.index;

		// Find first match (like laravel's queryBuilder->first())
		var selectedOption = this.props.options[index];

		this.setState({
			fieldValue: selectedOption.value
		}, function () {
			this.props.changeCallback(this.props.fieldKey, this.state.fieldValue, this);
		});
	},

	buildRadioButtons: function () {
		var fieldValue = this.state.fieldValue || {};

		return this.props.options.map(function (option, index) {
			return (
				<div key={index} className="radio radio-success">
					<label>
						<input
							type="radio" name={option.name || ('option' + index)} value={option.value}
							onChange={this.handleChange}
							data-index={index}
							checked={_.isEqual(this.state.fieldValue, option.value)} />
						<span className="circle"></span>
						<span className="check"></span>
						<div>{option.label}</div>
					</label>
				</div>
			)
		}.bind(this));
	},

	render: function () {
		var classes = className({
			"form-group": true,
			"has-error": this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				<label className="control-label">{this.props.label}</label>
				{this._shouldRenderHelpBlock(this.props.helpText)}

				{this.buildRadioButtons()}
			</div>
		)
	}
});

module.exports = RadioButton;
