// External Requirements
var React    = require('react');
var MortarJS = require('../../app-container').MortarJS;

// Assets
var logo     = require('../../public/images/logo.png');

// Bricks
var Br       = MortarJS.require('components', 'Row', 'Column', 'Form', 'Table');

// Components
var AuthGate = require('../../components/auth/AuthGate');
var PermissionGate = require('../../components/auth/PermissionGate');
var AuthStore = require('../../components/auth/AuthStore');

/**
 * The Dashboard list page view component
 *
 * @type {*|Function}
 */
var Dashboard = React.createClass({
	render: function () {

		return (
			<div id="page-wrapper">
				<div id="page-content">
					<div id="content">
						<Br.Row>
							<Br.Column grid="lg" size="6">
								<h1>Dashboard</h1>
							</Br.Column>
						</Br.Row>

						<Br.Row>
							<Br.Column grid="lg" size="10" classes="col-lg-offset-1">
								<div className="panel panel-default">
									<Br.Row>
										<Br.Column grid="lg" size="6">
											<h3>Welcome to the Mortar JS Playground</h3>
											<br />
										</Br.Column>
									</Br.Row>
									<Br.Row>
										<Br.Column grid="lg" size="4">
											<img src={logo} width="300" />
										</Br.Column>
										<Br.Column grid="lg" size="8">
											<br /> <br />
											<p>This site is meant to help developers, designers, producers (and anyone else really) understand what is included with Mortar JS out of the box.</p>
											<p>Mortar ships with a number of Bricks (what we call components) out of the box.  Right now all Form Components are ready to be shown off.  We're working hard to get all Bricks up and running with all customization options.  Check back soon!</p>
											<p>For now, if you need more information, check out the <a href="http://docs.mortarjs.io">documentation</a> or the <a href="https://github.com/fuzz-productions/Mortar-JS">source code</a>!</p>
										</Br.Column>
									</Br.Row>

									<Br.Row>
										<Br.Column grid="lg" size="12">
											<h2>Permissions: {AuthStore.getUserPermissions()} </h2>
											<AuthGate>
												<h2>User Is Authenticated </h2>
											</AuthGate>
										</Br.Column>

										<Br.Column grid="lg" size="3">
											<h3>ALLOW super-admin</h3>
											<PermissionGate require={['super-admin']}>
												<p>Content</p>
											</PermissionGate>
										</Br.Column>

										<Br.Column grid="lg" size="3">
											<h3>DENY super-admin</h3>
											<PermissionGate deny={['super-admin']}>
												<p>Content</p>
											</PermissionGate>
										</Br.Column>

										<Br.Column grid="lg" size="3">
											<h3>ALLOW logged in</h3>
											<AuthGate require={true}>
												<p>Content</p>
											</AuthGate>
										</Br.Column>

										<Br.Column grid="lg" size="3">
											<h3>DENY logged in</h3>
											<AuthGate deny>
												<p>Content</p>
											</AuthGate>
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

module.exports = Dashboard;
