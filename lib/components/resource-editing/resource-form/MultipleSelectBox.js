var React = require('react/addons');

var MultipleSelectBox = React.createClass({
	buildSelectOptions: function () {
		return this.props.options.map(function (option) {
			return (
				<option value={option} onChange={this.props.changeCallback(this.props.fieldKey)}>{option}</option>
			)
		}, this);
	},

	render: function () {
		return (
			<div className="form-group">
				<label className="control-label">{this.props.label}</label>

				<select multiple className="form-control">
					{this.buildSelectOptions()}
				</select>
			</div>
		)
	}
});

module.exports = MultipleSelectBox;
