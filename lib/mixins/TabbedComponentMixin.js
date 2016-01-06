var React       = require('react/addons');
var Row         = require('../components/page-structure/Row');
var Column      = require('../components/page-structure/Column');
var Button      = require('../components/global/button/Button');
var ButtonGroup = require('react-bootstrap').ButtonGroup;

var TabbedComponentMixin = {
	changeTab: function(action, resource) {
		this.setState({
			activeTab: action
		});
	},

	_buildTabs: function() {
		var output = [];
		var tabs = this.tabs();

		for(var tab in tabs) {
			var className = this.state.activeTab === tab ? 'active' : '';
			tabs[tab].mods.push(className);

			output.push(
				<Button text={tab}
					mods={tabs[tab].mods}
					handleAction={this.changeTab}
					action={tab}
					disabled={tabs[tab].disabled ? tabs[tab].disabled : false}/>
			);
		};

		return (
			<div>
				{output}
			</div>
		);
	},

	_getActiveTab: function() {
		return this.tabs()[this.state.activeTab].content;
	},

	/**
	 * See http://stackoverflow.com/questions/22538638/how-to-have-conditional-elements-and-keep-dry-with-facebook-reacts-jsx
	 *
	 * @param panel
	 * @returns {XML}
	 * @private
	 */
	_buildTabView: function (panel) {
		return (
			<div>
				<Row>
					<Column grid="lg" size="8" classes="col-lg-offset-1">
						<ButtonGroup>
							{this._buildTabs()}
						</ButtonGroup>
					</Column>
				</Row>
				<Row>
					<Column grid="lg" size="10" classes="col-sm-offset-1">
					{function (panel) {
						if (panel) {
							return (
								<div className="panel panel-default">
									<div className="panel-body">
										{this._getActiveTab()}
									</div>
								</div>
							);
						} else {
							return this._getActiveTab();
						}
					}.call(this, panel)}
					</Column>
				</Row>
			</div>
		);
	}
};

module.exports = TabbedComponentMixin;

