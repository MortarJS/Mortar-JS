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

	_getActiveTab: function() {
		return this.tabs()[this.state.activeTab].content;
	},

	/**
	 * See http://stackoverflow.com/questions/22538638/how-to-have-conditional-elements-and-keep-dry-with-facebook-reacts-jsx
	 *
	 * @param {boolean} panel True to show the data inside of a panel, false to just return it as is.
	 *
	 * @returns {XML}
	 * @private
	 *
	 * @TODO This should be cleaned up to not need `.call`.  Ideally, we will make a `<Br.If>` & `<Br.Else>` component.
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
					<Column grid="lg" size="10" classes="col-lg-offset-1">
					{function (p) {
						if (p) {
							return (
								<div className="panel panel-default">
									<div className="panel-body">
										{this._getActiveTab()}
									</div>
								</div>
							);
						}

						return this._getActiveTab();

					}.call(this, panel)}
					</Column>
				</Row>
			</div>
		);
	}
};

module.exports = TabbedComponentMixin;
