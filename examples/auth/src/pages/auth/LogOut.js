// External Requirements
var React    = require('react');
var MortarJS = require('../../app-container').MortarJS;

// Bricks
var Br       = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table');

/**
 * The Dashboard list page view component
 *
 * @type {*|Function}
 */
var LogOut = React.createClass({
	render: function () {

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1>Logout</h1>
							</Br.Column>
						</Br.Row>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = LogOut;
