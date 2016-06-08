'use strict';

/**
 * Packages
 * @type {exports}
 */
var React = require('react');
var reactDOM = require('react-dom');
var config = require('./config/config');
var AppContainer = require('./app-container').MortarJS;

import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

/**
 * Pull in application routes
 *
 * @type {Routes|exports}
 */
var Routes = require('./routes');

// Attach react router
window.__app_container = document.getElementById('root');

reactDOM.render((
	<div>

		<Router history={appHistory} routes={Routes} />
		<footer>Made by <a href="http://fuzzproductions.com">Fuzz Productions</a></footer>
	</div>
), window.__app_container)

/**
 * Pull in index.html!
 *
 * @type {exports}
 */
require('./index.html');

/**
 * Pull in css/scss/js file assets
 *
 * @type {exports}
 */
require('./assets');

/**
 * Pull in image assets
 *
 * @type {exports}
 */
require('./public/favicon.ico');
