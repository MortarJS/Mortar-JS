var React       = require('react');
var Row         = require('../components/page-structure/Row');
var Column      = require('../components/page-structure/Column');
var Button      = require('../components/global/button/Button');
var ButtonGroup = require('react-bootstrap').ButtonGroup;

var TabbedComponentMixin = {
	changeTab: function(action) {
		this.setState({
			activeTab: action
		});
	},

	_buildTabs: function() {
		var output = [];
		var tabs = this.tabs();

		for (var tab in tabs) {

			if (tabs.hasOwnProperty(tab)) {
				var className = this.state.activeTab === tab ? 'active' : '';
				tabs[tab].mods.push(className);

				output.push(
					<Button key={tab}
						text={tab}
						mods={tabs[tab].mods}
						handleAction={this.changeTab}
						action={tab}
						disabled={tabs[tab].disabled ? tabs[tab].disabled : false}/>
				);
			}

		}

		return (
			<div>
				{output}
			</div>
		);
	},

	_getActiveTab: function(panel) {
		if (panel) {
			return (
				<Row>
					<Column grid="lg" size="10" classes="col-lg-offset-1">
						<div className="panel panel-default">
							<div className="panel-body">
								{this.tabs()[this.state.activeTab].content}
							</div>
						</div>
					</Column>
				</Row>
			);
		}

		return null;
	},

	/**
	 * See http://stackoverflow.com/questions/22538638/how-to-have-conditional-elements-and-keep-dry-with-facebook-reacts-jsx
	 *
	 * @param {boolean} panel True to show the data inside of a panel, false to just return it as is.
	 *
	 * @returns {XML}
	 * @private
	 */
	_buildTabView: function (panel = true) {
		return (
			<div>
				<Row>
					<Column grid="lg" size="8" classes="col-lg-offset-1">
						<ButtonGroup>
							{this._buildTabs()}
						</ButtonGroup>
					</Column>
				</Row>
				{this._getActiveTab(panel)}
			</div>
		);
	}
};

module.exports = TabbedComponentMixin;
