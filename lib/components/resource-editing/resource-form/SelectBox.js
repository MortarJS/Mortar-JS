var React = require('react/addons');
var FormUtility = require('./FormUtilityMixin');

var SelectBox = React.createClass({
	mixins: [FormUtility],

	buildSelectOptions: function () {
		return this.props.options.map(function (option, index) {
			return (
				<option key={index} value={option.value}>{option.label}</option>
			)
		}, this);
	},

	render: function () {
		var fieldValue = this._findValueByPath(this.props.bindResource, this.props.fieldKey);

		return (
			<div className="form-group">
				<label className="control-label">{this.props.label}</label>

				<select className="form-control" onChange={this.handleChange} value={fieldValue}>
					{this.buildSelectOptions()}
				</select>
			</div>
		)
	}
});

module.exports = SelectBox;
