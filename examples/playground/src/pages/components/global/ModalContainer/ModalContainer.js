// External Requirements
var React                  = require('react');
var Router                 = require('react-router');
var MortarJS               = require('../../../../app-container').MortarJS;

// Bricks
var Br                     = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table', 'Button', 'Modal');

// Mixins
var ResourceComponentMixin = MortarJS.Mixins.ResourceComponentMixin;

/**
 * Table
 *
 * @type {*|Function}
 */
var ModalContainer = React.createClass({
	mixins: [ResourceComponentMixin, Router.Navigation],

	getInitialState: function () {
		return {
			openModal: false
		};
	},

	closeModal: function() {
		this.setState({
			openModal: false
		});
	},

	openModal: function(action) {
		this.setState({
			openModal: true
		});
	},

	render: function() {

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1 className="page-header">Modal Container</h1>
							</Br.Column>
						</Br.Row>
					</div>
					<Br.Row>
						<Br.Column grid="lg" size="6">
							<Br.Button
								action='open'
								text='Open Modal'
								mods={['primary']}
								handleAction={this.openModal}
							/>
						</Br.Column>
					</Br.Row>
					<Br.Row>
            <Br.Modal openWhen={this.state.openModal}
                title="This is a Mortar Modal"
                closeText="Close"
								saveText="Save"
								afterClose={this.closeModal}
              >
							<p>
								These are highly customizable and serve as a shell for many other components.
							</p>
							<p>
								Use Mortar modals to display additional information, open resource editing forms, or whatever else you would like.
							</p>
            </Br.Modal>
					</Br.Row>
				</div>
			</div>
		);

	}
});

module.exports = ModalContainer;

