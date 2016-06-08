var React = require('react');

import {Route, IndexRoute} from 'react-router';

/**
 * Components
 *
 * @type {exports}
 */
var MortarJS = require('./bootstrap').MortarJS;
var App      = MortarJS.Components.Global.App;
var AuthStore = require('./components/auth/AuthStore');
var PermissionsStore = require('./components/auth/PermissionsStore');

/**
 * CMS Pages
 *
 * @type {exports}
 */
var Dashboard = require('./pages/dashboard/Dashboard');
var LogOut    = require('./pages/auth/LogOut');

/**
 * Routing
 *
 * This configuration doesn't necessarily map to routes, but to how the layout is presented by the router
 *
 * @type {JSX}
 * @TODO: top-level pages with no content should default to the first view
 * @TODO: build all these pages
 */
var Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />

		<Route path="logout" component={LogOut} onEnter={AuthStore.requireRouteAuth} />
		<Route path="login" component={LogOut} onEnter={AuthStore.denyRouteAuth} />

		<Route path="poop" component={LogOut} onEnter={PermissionsStore.requireRoutePermissions.bind(null, 'super-admin')} />
		<Route path="pee" component={LogOut} onEnter={PermissionsStore.denyRoutePermissions.bind(null, 'super-admin')} />

		<Route path="*" component={Dashboard} />
	</Route>
);

module.exports = Routes;
