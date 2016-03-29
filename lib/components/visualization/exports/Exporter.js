var _            = require('lodash');
var React        = require('react');
var Button       = require('../../global/button/Button');
var CmsUserStore = require('../../../stores/CmsUserStore');

var Exporter = React.createClass({
	propTypes: {
		format          : React.PropTypes.string,
		resourceAction  : React.PropTypes.func.isRequired,
		resourceOptions : React.PropTypes.object.isRequired,
		params          : React.PropTypes.object,
		text            : React.PropTypes.string,
		mods            : React.PropTypes.array,
		overrideMethod  : React.PropTypes.func,
		disabled        : React.PropTypes.bool
	},

	defaultParams: function () {
		return {
			format   : this.props.format || 'csv',
			paginate : false
		};
	},

	handleClick: function (action) {
		switch (action) {
			case 'click':
				this.sendAction();
				break;
			default:
				break;
		}
	},

	buildRequestOptions: function () {
		var modifiers = {};
		modifiers.exportParams = this.props.params || this.defaultParams();
		modifiers.exportParams.access_token = CmsUserStore.getToken();

		var options = _.cloneDeep(this.props.resourceOptions);

		_.assign(options.modifiers, options.modifiers, modifiers);
		options.inNewWindow = true;

		return options;
	},

	sendAction: function () {
		var method = this.props.overrideMethod || 'listResource';
		this.props.resourceAction[method](this.buildRequestOptions());
	},

	render: function () {
		return (
			<div>
				<Button text={this.props.text || 'Export'}
					mods={this.props.mods || []}
					handleAction={this.handleClick}
					action="click"
					disabled={this.props.disabled || false} />
			</div>
		);
	}
});

module.exports = Exporter;
