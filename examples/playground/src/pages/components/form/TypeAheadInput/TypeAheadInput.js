// External Requirements
var React                  = require('react/addons');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form');

// Stores
var FormStore              = MortarJS.Stores.FormStore;

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Type-Ahead Input
 *
 * @type {*|Function}
 */
var TypeAheadInput = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function() {
		return {
			workingResource: {},
			params: {},
			source: [],
			formIsValid: true
		};
	},

	pageConfig: function() {
		return {
			stores: [
				{
					store: FormStore,
					changeListener: this.bindResource
				}
			]
		};
	},

	componentDidMount: function() {
		this._componentDidMount();
	},

	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	bindResource: function() {
		this.setState({
			workingResource: FormStore.getResource(this.formKey)
		});
	},

	formKey: 'typeaheadinputForm',

	typeAheadSource: [
		{ name: 'Alabama',              state : 'AL'},
		{ name: 'Alaska',               state : 'AK'},
		{ name: 'Arizona',              state : 'AZ'},
		{ name: 'Arkansas',             state : 'AR'},
		{ name: 'California',           state : 'CA'},
		{ name: 'Colorado',             state : 'CO'},
		{ name: 'Connecticut',          state : 'CT'},
		{ name: 'Delaware',             state : 'DE'},
		{ name: 'District Of Columbia', state : 'DC'},
		{ name: 'Florida',              state : 'FL'},
		{ name: 'Georgia',              state : 'GA'},
		{ name: 'Hawaii',               state : 'HI'},
		{ name: 'Idaho',                state : 'ID'},
		{ name: 'Illinois',             state : 'IL'},
		{ name: 'Indiana',              state : 'IN'},
		{ name: 'Iowa',                 state : 'IA'},
		{ name: 'Kansas',               state : 'KS'},
		{ name: 'Kentucky',             state : 'KY'},
		{ name: 'Louisiana',            state : 'LA'},
		{ name: 'Maine',                state : 'ME'},
		{ name: 'Maryland',             state : 'MD'},
		{ name: 'Massachusetts',        state : 'MA'},
		{ name: 'Michigan',             state : 'MI'},
		{ name: 'Minnesota',            state : 'MN'},
		{ name: 'Mississippi',          state : 'MS'},
		{ name: 'Missouri',             state : 'MO'},
		{ name: 'Montana',              state : 'MT'},
		{ name: 'Nebraska',             state : 'NE'},
		{ name: 'Nevada',               state : 'NV'},
		{ name: 'New Hampshire',        state : 'NH'},
		{ name: 'New Jersey',           state : 'NJ'},
		{ name: 'New Mexico',           state : 'NM'},
		{ name: 'New York',             state : 'NY'},
		{ name: 'North Carolina',       state : 'NC'},
		{ name: 'North Dakota',         state : 'ND'},
		{ name: 'Ohio',                 state : 'OH'},
		{ name: 'Oklahoma',             state : 'OK'},
		{ name: 'Oregon',               state : 'OR'},
		{ name: 'Pennsylvania',         state : 'PA'},
		{ name: 'Rhode Island',         state : 'RI'},
		{ name: 'South Carolina',       state : 'SC'},
		{ name: 'South Dakota',         state : 'SD'},
		{ name: 'Tennessee',            state : 'TN'},
		{ name: 'Texas',                state : 'TX'},
		{ name: 'Utah',                 state : 'UT'},
		{ name: 'Vermont',              state : 'VT'},
		{ name: 'Virginia',             state : 'VA'},
		{ name: 'Washington',           state : 'WA'},
		{ name: 'West Virginia',        state : 'WV'},
		{ name: 'Wisconsin',            state : 'WI'},
		{ name: 'Wyoming',              state : 'WY' }
	],

	typeAheadOptions: {},

	render: function() {
		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1>Type-Ahead</h1>
							</Br.Column>
						</Br.Row>

						<Br.Row>
							<Br.Column grid="lg" size="10" classes="col-lg-offset-1">
								<div className="panel panel-default">
									<Br.Row>
										<Br.Column grid="lg" size="12">
											<p></p>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>
												<h3>Single Selection Type-Ahead Input</h3>
												<Br.Column grid="lg" size="6">
													<Br.Form.TypeAheadInput
														source={this.typeAheadSource}
														fields={['name', 'state']}
														fieldKey='selelectedState'
														options={this.typeAheadOptions}
														label='Start Typing...'
														placeholder="USA state search"
													/>
												</Br.Column>
											</Br.Form>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>
												<h3>Limited Selection Type-Ahead Input (5 values)</h3>
												<Br.Column grid="lg" size="6">
													<Br.Form.TypeAheadInput
														source={this.typeAheadSource}
														fields={['name', 'state']}
														fieldKey='multiSelelectedState'
														options={this.typeAheadOptions}
														label='Start Typing...'
														placeholder="USA state search"
														limit={5}
													/>
												</Br.Column>
											</Br.Form>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<Br.Form key="myFancyForm" formKey={this.formKey} bindResource={this.state.workingResource}>
												<h3>Unlimited Selection Type-Ahead Input</h3>
												<Br.Column grid="lg" size="6">
													<Br.Form.TypeAheadInput
														source={this.typeAheadSource}
														fields={['name', 'state']}
														fieldKey='unlimitiedSelelectedState'
														options={this.typeAheadOptions}
														label='Start Typing...'
														placeholder="USA state search"
														limit={false}
													/>
												</Br.Column>
											</Br.Form>
										</Br.Column>
									</Br.Row>

								</div>
							</Br.Column>
						</Br.Row>

					</div>
				</div>
			</div>
		);
	}
});

module.exports = TypeAheadInput;
